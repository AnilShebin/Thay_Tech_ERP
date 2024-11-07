'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Plus, Trash2, Edit2, MoreVertical, CalendarIcon, X } from 'lucide-react'

export default function ServiceCompanyManagement() {
  const [serviceTypes, setServiceTypes] = useState([
    { id: 1, name: 'Income Tax', tasks: [{ id: 1, name: 'File Returns', subtasks: ['Gather Documents', 'Calculate Deductions'] }] },
    { id: 2, name: 'Annual Returns', tasks: [{ id: 2, name: 'Prepare Statement', subtasks: ['Review Financials', 'Draft Report'] }] },
    { id: 3, name: 'GST Filing', tasks: [{ id: 3, name: 'Prepare GSTR', subtasks: ['Collect Invoices', 'Reconcile Data'] }] }
  ])
  const [newServiceType, setNewServiceType] = useState('')
  const [newTasks, setNewTasks] = useState([{ name: '', subtasks: [''] }])
  const [editingItem, setEditingItem] = useState(null)

  const [companies, setCompanies] = useState([
    { id: 1, name: 'Company A', type: 'Private Limited', assignedServices: [] },
    { id: 2, name: 'Company B', type: 'Limited', assignedServices: [] },
    { id: 3, name: 'Company C', type: 'Private Limited', assignedServices: [] },
    { id: 4, name: 'Company D', type: 'LLP', assignedServices: [] }
  ])
  const [selectedCompany, setSelectedCompany] = useState('')
  const [selectedService, setSelectedService] = useState('')
  const [jobType, setJobType] = useState('one-time')
  const [recurringFrequency, setRecurringFrequency] = useState('monthly')
  const [allocatedDate, setAllocatedDate] = useState(new Date())
  const [dueDate, setDueDate] = useState(new Date())
  const [reminderCount, setReminderCount] = useState(1)

  const [bulkAssignmentType, setBulkAssignmentType] = useState('byType')
  const [selectedCompanyType, setSelectedCompanyType] = useState('')
  const [selectedCompanies, setSelectedCompanies] = useState([])
  const [bulkService, setBulkService] = useState('')

  const addServiceType = () => {
    if (newServiceType) {
      const newService = {
        id: Date.now(),
        name: newServiceType,
        tasks: newTasks.map(task => ({
          id: Date.now() + Math.random(),
          name: task.name,
          subtasks: task.subtasks.filter(subtask => subtask.trim() !== '')
        })).filter(task => task.name.trim() !== '')
      }
      setServiceTypes([...serviceTypes, newService])
      setNewServiceType('')
      setNewTasks([{ name: '', subtasks: [''] }])
    }
  }

  const addTask = () => {
    setNewTasks([...newTasks, { name: '', subtasks: [''] }])
  }

  const updateTaskName = (index, name) => {
    const updatedTasks = [...newTasks]
    updatedTasks[index].name = name
    setNewTasks(updatedTasks)
  }

  const addSubtask = (taskIndex) => {
    const updatedTasks = [...newTasks]
    updatedTasks[taskIndex].subtasks.push('')
    setNewTasks(updatedTasks)
  }

  const updateSubtask = (taskIndex, subtaskIndex, value) => {
    const updatedTasks = [...newTasks]
    updatedTasks[taskIndex].subtasks[subtaskIndex] = value
    setNewTasks(updatedTasks)
  }

  const removeSubtask = (taskIndex, subtaskIndex) => {
    const updatedTasks = [...newTasks]
    updatedTasks[taskIndex].subtasks.splice(subtaskIndex, 1)
    setNewTasks(updatedTasks)
  }

  const removeTask = (index) => {
    const updatedTasks = [...newTasks]
    updatedTasks.splice(index, 1)
    setNewTasks(updatedTasks)
  }

  const updateItem = (type, id, taskId = null, subtaskIndex = null, newName) => {
    setServiceTypes(serviceTypes.map(service => {
      if (type === 'service' && service.id === id) {
        return { ...service, name: newName }
      } else if (type === 'task' && service.id === id) {
        return {
          ...service,
          tasks: service.tasks.map(task => 
            task.id === taskId ? { ...task, name: newName } : task
          )
        }
      } else if (type === 'subtask' && service.id === id) {
        return {
          ...service,
          tasks: service.tasks.map(task => 
            task.id === taskId
              ? { ...task, subtasks: task.subtasks.map((subtask, index) => index === subtaskIndex ? newName : subtask) }
              : task
          )
        }
      }
      return service
    }))
    setEditingItem(null)
  }

  const deleteItem = (type, id, taskId = null, subtaskIndex = null) => {
    if (type === 'service') {
      setServiceTypes(serviceTypes.filter(service => service.id !== id))
    } else if (type === 'task') {
      setServiceTypes(serviceTypes.map(service => 
        service.id === id
          ? { ...service, tasks: service.tasks.filter(task => task.id !== taskId) }
          : service
      ))
    } else if (type === 'subtask') {
      setServiceTypes(serviceTypes.map(service => 
        service.id === id
          ? {
              ...service,
              tasks: service.tasks.map(task => 
                task.id === taskId
                  ? { ...task, subtasks: task.subtasks.filter((_, index) => index !== subtaskIndex) }
                  : task
              )
            }
          : service
      ))
    }
  }

  const assignServiceToCompany = () => {
    if (selectedCompany && selectedService) {
      setCompanies(companies.map(company => 
        company.id === parseInt(selectedCompany)
          ? { ...company, assignedServices: [...company.assignedServices, parseInt(selectedService)] }
          : company
      ))
    }
  }

  const bulkAssignService = () => {
    if (bulkService) {
      let companiesToUpdate = []
      if (bulkAssignmentType === 'byType') {
        companiesToUpdate = companies.filter(company => company.type === selectedCompanyType)
      } else if (bulkAssignmentType === 'bySelection') {
        companiesToUpdate = companies.filter(company => selectedCompanies.includes(company.id.toString()))
      }

      setCompanies(companies.map(company => 
        companiesToUpdate.some(c => c.id === company.id)
          ? { ...company, assignedServices: [...new Set([...company.assignedServices, parseInt(bulkService)])] }
          : company
      ))

      setSelectedCompanyType('')
      setSelectedCompanies([])
      setBulkService('')
    }
  }

  const ItemActions = ({ type, id, taskId = null, subtaskIndex = null, name }) => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreVertical className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-40">
        <div className="flex flex-col space-y-1">
          <Button
            variant="ghost"
            className="justify-start"
            onClick={() => setEditingItem({ type, id, taskId, subtaskIndex, name })}
          >
            <Edit2 className="mr-2 h-4 w-4" /> Edit
          </Button>
          <Button
            variant="ghost"
            className="justify-start text-red-600 hover:text-red-600 hover:bg-red-100"
            onClick={() => deleteItem(type, id, taskId, subtaskIndex)}
          >
            <Trash2 className="mr-2 h-4 w-4" /> Delete
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )

  return (
    <Tabs defaultValue="service-types" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="service-types">Service Types</TabsTrigger>
        <TabsTrigger value="company-assignment">Company Assignment</TabsTrigger>
        <TabsTrigger value="bulk-assignment">Bulk Assignment</TabsTrigger>
      </TabsList>

      <TabsContent value="service-types">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold">Manage Service Types</CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" /> Add Service
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>Add New Service Type</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="service-name">Service Name</Label>
                    <Input
                      id="service-name"
                      placeholder="Service type name"
                      value={newServiceType}
                      onChange={(e) => setNewServiceType(e.target.value)}
                    />
                  </div>
                  {newTasks.map((task, taskIndex) => (
                    <Card key={taskIndex} className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Label htmlFor={`task-${taskIndex}`}>Task {taskIndex + 1}</Label>
                        <Button variant="ghost" size="sm" onClick={() => removeTask(taskIndex)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <Input
                        id={`task-${taskIndex}`}
                        placeholder="Task name"
                        value={task.name}
                        onChange={(e) => updateTaskName(taskIndex, e.target.value)}
                        className="mb-2"
                      />
                      {task.subtasks.map((subtask, subtaskIndex) => (
                        <div key={subtaskIndex} className="flex items-center space-x-2 mb-2">
                          <Input
                            placeholder="Subtask name"
                            value={subtask}
                            onChange={(e) => updateSubtask(taskIndex, subtaskIndex, e.target.value)}
                          />
                          <Button variant="ghost" size="sm" onClick={() => removeSubtask(taskIndex, subtaskIndex)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button variant="outline" size="sm" onClick={() => addSubtask(taskIndex)}>
                        <Plus className="mr-2 h-4 w-4" /> Add Subtask
                      </Button>
                    </Card>
                  ))}
                  <Button variant="outline" onClick={addTask}>
                    <Plus className="mr-2 h-4 w-4" /> Add Task
                  </Button>
                  <Button onClick={addServiceType}>Add Service</Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[calc(100vh-200px)] pr-4">
              {serviceTypes.map((service) => (
                <Card key={service.id} className="mb-4 border-l-4 border-l-blue-500">
                  <CardHeader className="flex flex-row items-center justify-between py-2">
                    <CardTitle className="text-lg font-medium">{service.name}</CardTitle>
                    <ItemActions type="service" id={service.id} name={service.name} />
                  </CardHeader>
                  <CardContent className="py-2">
                    {service.tasks.map((task) => (
                      <Card key={task.id} className="mb-2 border-l-4 border-l-green-500">
                        <CardHeader className="flex flex-row items-center justify-between py-1">
                          <CardTitle className="text-base font-medium">{task.name}</CardTitle>
                          <ItemActions type="task" id={service.id} taskId={task.id} name={task.name} />
                        </CardHeader>
                        <CardContent className="py-1">
                          {task.subtasks.map((subtask, index) => (
                            <div key={index} className="flex items-center justify-between py-1">
                              <span className="text-sm">{subtask}</span>
                              <ItemActions
                                type="subtask"
                                id={service.id}
                                taskId={task.id}
                                subtaskIndex={index}
                                name={subtask}
                              />
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="company-assignment">
        <Card>
          <CardHeader>
            <CardTitle>Assign Services to Companies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Select Company</Label>
                <Select value={selectedCompany} onValueChange={setSelectedCompany}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select company" />
                  </SelectTrigger>
                  <SelectContent>
                    {companies.map((company) => (
                      <SelectItem key={company.id} value={company.id.toString()}>
                        {company.name} ({company.type})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Select Service</Label>
                <Select value={selectedService} onValueChange={setSelectedService}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select service" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceTypes.map((service) => (
                      <SelectItem key={service.id} value={service.id.toString()}>
                        {service.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Job Type</Label>
              <RadioGroup value={jobType} onValueChange={setJobType} className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="one-time" id="one-time" />
                  <Label htmlFor="one-time">One-time Job</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="recurring" id="recurring" />
                  <Label htmlFor="recurring">Recurring Job</Label>
                </div>
              </RadioGroup>
            </div>

            {jobType === 'recurring' && (
              <div className="space-y-2">
                <Label>Recurring Frequency</Label>
                <Select value={recurringFrequency} onValueChange={setRecurringFrequency}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Allocated Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !allocatedDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {allocatedDate ? format(allocatedDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={allocatedDate}
                      onSelect={setAllocatedDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Due Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !dueDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dueDate ? format(dueDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={dueDate}
                      onSelect={setDueDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Reminders</Label>
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  value={reminderCount}
                  onChange={(e) => setReminderCount(parseInt(e.target.value))}
                  className="w-20"
                />
                <span>reminder(s)</span>
              </div>
            </div>

            <Button className="w-full" onClick={assignServiceToCompany}>
              Assign Service to Company
            </Button>

            <ScrollArea className="h-[300px] w-full rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Assigned Services</TableHead>
                    <TableHead>Job Type</TableHead>
                    <TableHead>Due Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {companies.map((company) => (
                    <TableRow key={company.id}>
                      <TableCell>{company.name}</TableCell>
                      <TableCell>{company.type}</TableCell>
                      <TableCell>
                        {company.assignedServices.map(serviceId => 
                          serviceTypes.find(s => s.id === serviceId)?.name
                        ).join(', ')}
                      </TableCell>
                      <TableCell>{jobType}</TableCell>
                      <TableCell>{dueDate ? format(dueDate, "PPP") : "-"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="bulk-assignment">
        <Card>
          <CardHeader>
            <CardTitle>Bulk Service Assignment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Assignment Type</Label>
              <RadioGroup value={bulkAssignmentType} onValueChange={setBulkAssignmentType} className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="byType" id="byType" />
                  <Label htmlFor="byType">By Company Type</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="bySelection" id="bySelection" />
                  <Label htmlFor="bySelection">By Selection</Label>
                </div>
              </RadioGroup>
            </div>

            {bulkAssignmentType === 'byType' && (
              <div className="space-y-2">
                <Label>Select Company Type</Label>
                <Select value={selectedCompanyType} onValueChange={setSelectedCompanyType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select company type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Private Limited">Private Limited</SelectItem>
                    <SelectItem value="Limited">Limited</SelectItem>
                    <SelectItem value="LLP">LLP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {bulkAssignmentType === 'bySelection' && (
              <div className="space-y-2">
                <Label>Select Companies</Label>
                <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {companies.map((company) => (
                      <div key={company.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`company-${company.id}`}
                          checked={selectedCompanies.includes(company.id.toString())}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedCompanies([...selectedCompanies, company.id.toString()])
                            } else {
                              setSelectedCompanies(selectedCompanies.filter(id => id !== company.id.toString()))
                            }
                          }}
                        />
                        <Label htmlFor={`company-${company.id}`}>{company.name}</Label>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}

            <div className="space-y-2">
              <Label>Select Service</Label>
              <Select value={bulkService} onValueChange={setBulkService}>
                <SelectTrigger>
                  <SelectValue placeholder="Select service for bulk assignment" />
                </SelectTrigger>
                <SelectContent>
                  {serviceTypes.map((service) => (
                    <SelectItem key={service.id} value={service.id.toString()}>
                      {service.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button className="w-full" onClick={bulkAssignService}>
              Bulk Assign Service
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      {editingItem && (
        <Dialog open={true} onOpenChange={() => setEditingItem(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit {editingItem.type}</DialogTitle>
            </DialogHeader>
            <div className="flex items-center space-x-2">
              <Input
                placeholder={`${editingItem.type} name`}
                value={editingItem.name}
                onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
              />
              <Button onClick={() => updateItem(
                editingItem.type,
                editingItem.id,
                editingItem.taskId,
                editingItem.subtaskIndex,
                editingItem.name
              )}>
                Update
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </Tabs>
  )
}