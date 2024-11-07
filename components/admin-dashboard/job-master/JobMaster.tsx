"use client"

import { useState, useEffect } from "react"
import { Plus, Upload, Search, Filter, Edit, Trash2, CheckCircle, X, Calendar, Clock, ChevronRight, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { format } from "date-fns"

// Types
type ServiceType = "Income tax" | "Annual returns" | "GST Returns" | "ROC Filings" | "Appeal" | "Certification"
type TaskStatus = "Not Started" | "In Progress" | "Completed" | "On Hold"
type Priority = "Low" | "Medium" | "High"

interface SubTask {
  id: string
  name: string
  status: TaskStatus
}

interface Task {
  id: string
  name: string
  status: TaskStatus
  priority: Priority
  subTasks: SubTask[]
}

interface Service {
  id: string
  name: ServiceType
  description: string
  tasks: Task[]
}

interface ClientTask {
  id: string
  serviceId: string
  taskId: string
  clientName: string
  assignedTo: string
  startDate: Date
  endDate: Date
  status: TaskStatus
  priority: Priority
  notes: string
}

interface Employee {
  id: string
  name: string
  avatar: string
}

// Dummy data
const dummyServices: Service[] = [
  {
    id: "1",
    name: "Income tax",
    description: "Preparation and filing of income tax returns",
    tasks: [
      {
        id: "1-1",
        name: "Gather financial documents",
        status: "Not Started",
        priority: "High",
        subTasks: [
          { id: "1-1-1", name: "Collect income statements", status: "Not Started" },
          { id: "1-1-2", name: "Collect expense receipts", status: "Not Started" },
        ]
      },
      {
        id: "1-2",
        name: "Prepare tax return",
        status: "Not Started",
        priority: "High",
        subTasks: [
          { id: "1-2-1", name: "Calculate deductions", status: "Not Started" },
          { id: "1-2-2", name: "Fill out tax forms", status: "Not Started" },
        ]
      },
      {
        id: "1-3",
        name: "Review and file return",
        status: "Not Started",
        priority: "Medium",
        subTasks: [
          { id: "1-3-1", name: "Internal review", status: "Not Started" },
          { id: "1-3-2", name: "Client approval", status: "Not Started" },
          { id: "1-3-3", name: "Submit to tax authority", status: "Not Started" },
        ]
      },
    ]
  },
]

const dummyClientTasks: ClientTask[] = [
  {
    id: "1",
    serviceId: "1",
    taskId: "1-1",
    clientName: "ABC Corp",
    assignedTo: "John Doe",
    startDate: new Date(2023, 4, 1),
    endDate: new Date(2023, 4, 15),
    status: "In Progress",
    priority: "High",
    notes: "Ensure all documents are collected before proceeding"
  },
]

const dummyEmployees: Employee[] = [
  { id: "1", name: "John Doe", avatar: "/placeholder.svg?height=32&width=32" },
  { id: "2", name: "Jane Smith", avatar: "/placeholder.svg?height=32&width=32" },
  { id: "3", name: "Bob Johnson", avatar: "/placeholder.svg?height=32&width=32" },
]

export default function AdvancedTaskManagementSystem() {
  const [services, setServices] = useState<Service[]>(dummyServices)
  const [clientTasks, setClientTasks] = useState<ClientTask[]>(dummyClientTasks)
  const [filteredClientTasks, setFilteredClientTasks] = useState<ClientTask[]>(dummyClientTasks)
  const [isAddTaskDialogOpen, setIsAddTaskDialogOpen] = useState(false)
  const [isAddServiceDialogOpen, setIsAddServiceDialogOpen] = useState(false)
  const [newClientTask, setNewClientTask] = useState<Partial<ClientTask>>({})
  const [newService, setNewService] = useState<Partial<Service>>({
    tasks: [{ subTasks: [] }]
  })
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<TaskStatus | "All">("All")

  useEffect(() => {
    const filtered = clientTasks.filter((task) => {
      const matchesSearch = task.clientName.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === "All" || task.status === statusFilter
      return matchesSearch && matchesStatus
    })
    setFilteredClientTasks(filtered)
  }, [clientTasks, searchTerm, statusFilter])

  const handleAddClientTask = () => {
    if (newClientTask.serviceId && newClientTask.taskId && newClientTask.clientName && newClientTask.assignedTo && newClientTask.startDate && newClientTask.endDate && newClientTask.status && newClientTask.priority) {
      setClientTasks([...clientTasks, { ...newClientTask, id: Date.now().toString() } as ClientTask])
      setNewClientTask({})
      setIsAddTaskDialogOpen(false)
    }
  }

  const handleAddService = () => {
    if (newService.name && newService.description && newService.tasks && newService.tasks.length > 0) {
      const newServiceWithIds: Service = {
        ...newService as Service,
        id: Date.now().toString(),
        tasks: newService.tasks.map((task, index) => ({
          ...task,
          id: `${Date.now()}-${index}`,
          subTasks: task.subTasks.map((subTask, subIndex) => ({
            ...subTask,
            id: `${Date.now()}-${index}-${subIndex}`
          }))
        }))
      }
      setServices([...services, newServiceWithIds])
      setNewService({ tasks: [{ subTasks: [] }] })
      setIsAddServiceDialogOpen(false)
    }
  }

  const handleDeleteClientTask = (taskId: string) => {
    setClientTasks(clientTasks.filter(task => task.id !== taskId))
  }

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800"
      case "Medium": return "bg-yellow-100 text-yellow-800"
      case "Low": return "bg-green-100 text-green-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case "Not Started": return "bg-gray-100 text-gray-800"
      case "In Progress": return "bg-blue-100 text-blue-800"
      case "Completed": return "bg-green-100 text-green-800"
      case "On Hold": return "bg-orange-100 text-orange-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="w-full min-h-screen bg-white p-6">
      <Tabs defaultValue="tasks" className="space-y-6">
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="tasks">Client Tasks</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
          </TabsList>
          <div className="flex items-center space-x-2">
            <Button onClick={() => setIsAddTaskDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> Add Client Task
            </Button>
            <Button variant="outline" onClick={() => setIsAddServiceDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> Add Service
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between space-x-4 mb-4">
          <div className="flex items-center space-x-2 flex-1">
            <Search className="h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search tasks..." 
              className="max-w-sm" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as TaskStatus | "All")}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Statuses</SelectItem>
                <SelectItem value="Not Started">Not Started</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="On Hold">On Hold</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="tasks">
          <Card>
            <CardHeader>
              <CardTitle>Client Task Management</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client Name</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Task</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClientTasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell>{task.clientName}</TableCell>
                      <TableCell>{services.find(s => s.id === task.serviceId)?.name}</TableCell>
                      <TableCell>{services.find(s => s.id === task.serviceId)?.tasks.find(t => t.id === task.taskId)?.name}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={dummyEmployees.find(e => e.name === task.assignedTo)?.avatar} />
                            <AvatarFallback>{task.assignedTo.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <span>{task.assignedTo}</span>
                        </div>
                      </TableCell>
                      <TableCell>{format(task.endDate, 'MMM dd, yyyy')}</TableCell>
                      <TableCell className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteClientTask(task.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services">
          <Card>
            <CardHeader>
              <CardTitle>Services Management</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {services.map((service) => (
                  <AccordionItem value={service.id} key={service.id}>
                    <AccordionTrigger>{service.name}</AccordionTrigger>
                    <AccordionContent>
                      <p className="mb-4">{service.description}</p>
                      <h4 className="font-semibold mb-2">Tasks:</h4>
                      <ul className="space-y-2">
                        {service.tasks.map((task) => (
                          <li key={task.id}>
                            <Accordion type="single" collapsible className="w-full">
                              <AccordionItem value={task.id}>
                                <AccordionTrigger>{task.name}</AccordionTrigger>
                                <AccordionContent>
                                  <p>Priority: {task.priority}</p>
                                  <h5 className="font-semibold mt-2 mb-1">Subtasks:</h5>
                                  <ul className="list-disc list-inside">
                                    {task.subTasks.map((subTask) => (
                                      <li key={subTask.id}>{subTask.name} - {subTask.status}</li>
                                    ))}
                                  </ul>
                                </AccordionContent>
                              </AccordionItem>
                            </Accordion>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isAddTaskDialogOpen} onOpenChange={setIsAddTaskDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Client Task</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="clientName">Client Name</Label>
                <Input
                  id="clientName"
                  value={newClientTask.clientName || ""}
                  onChange={(e) => setNewClientTask({ ...newClientTask, clientName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="service">Service</Label>
                <Select
                  value={newClientTask.serviceId}
                  onValueChange={(value) => setNewClientTask({ ...newClientTask, serviceId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select service" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service.id} value={service.id}>
                        {service.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="task">Task</Label>
              <Select
                value={newClientTask.taskId}
                onValueChange={(value) => setNewClientTask({ ...newClientTask, taskId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select task" />
                </SelectTrigger>
                <SelectContent>
                  {services.find(s => s.id === newClientTask.serviceId)?.tasks.map((task) => (
                    <SelectItem key={task.id} value={task.id}>
                      {task.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={newClientTask.status}
                  onValueChange={(value) => setNewClientTask({ ...newClientTask, status: value as TaskStatus })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Not Started">Not Started</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="On Hold">On Hold</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={newClientTask.priority}
                  onValueChange={(value) => setNewClientTask({ ...newClientTask, priority: value as Priority })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="assignedTo">Assigned To</Label>
              <Select
                value={newClientTask.assignedTo}
                onValueChange={(value) => setNewClientTask({ ...newClientTask, assignedTo: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select employee" />
                </SelectTrigger>
                <SelectContent>
                  {dummyEmployees.map((employee) => (
                    <SelectItem key={employee.id} value={employee.name}>
                      {employee.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={`w-full justify-start text-left font-normal ${
                        !newClientTask.startDate && "text-muted-foreground"
                      }`}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {newClientTask.startDate ? format(newClientTask.startDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={newClientTask.startDate}
                      onSelect={(date) => setNewClientTask({ ...newClientTask, startDate: date })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={`w-full justify-start text-left font-normal ${
                        !newClientTask.endDate && "text-muted-foreground"
                      }`}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {newClientTask.endDate ? format(newClientTask.endDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={newClientTask.endDate}
                      onSelect={(date) => setNewClientTask({ ...newClientTask, endDate: date })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={newClientTask.notes || ""}
                onChange={(e) => setNewClientTask({ ...newClientTask, notes: e.target.value })}
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsAddTaskDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddClientTask}>Add Client Task</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isAddServiceDialogOpen} onOpenChange={setIsAddServiceDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Service</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="serviceName">Service Name</Label>
              <Select
                value={newService.name}
                onValueChange={(value) => setNewService({ ...newService, name: value as ServiceType })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select service type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Income tax">Income tax</SelectItem>
                  <SelectItem value="Annual returns">Annual returns</SelectItem>
                  <SelectItem value="GST Returns">GST Returns</SelectItem>
                  <SelectItem value="ROC Filings">ROC Filings</SelectItem>
                  <SelectItem value="Appeal">Appeal</SelectItem>
                  <SelectItem value="Certification">Certification</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="serviceDescription">Service Description</Label>
              <Textarea
                id="serviceDescription"
                value={newService.description || ""}
                onChange={(e) => setNewService({ ...newService, description: e.target.value })}
              />
            </div>
            <div className="space-y-4">
              <Label>Tasks</Label>
              {newService.tasks.map((task, taskIndex) => (
                <div key={taskIndex} className="space-y-2 border p-4 rounded-md">
                  <Input
                    placeholder="Task name"
                    value={task.name || ""}
                    onChange={(e) => {
                      const updatedTasks = [...newService.tasks]
                      updatedTasks[taskIndex] = { ...updatedTasks[taskIndex], name: e.target.value }
                      setNewService({ ...newService, tasks: updatedTasks })
                    }}
                  />
                  <Select
                    value={task.priority}
                    onValueChange={(value) => {
                      const updatedTasks = [...newService.tasks]
                      updatedTasks[taskIndex] = { ...updatedTasks[taskIndex], priority: value as Priority }
                      setNewService({ ...newService, tasks: updatedTasks })
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="space-y-2">
                    <Label>Subtasks</Label>
                    {task.subTasks.map((subTask, subTaskIndex) => (
                      <Input
                        key={subTaskIndex}
                        placeholder="Subtask name"
                        value={subTask.name || ""}
                        onChange={(e) => {
                          const updatedTasks = [...newService.tasks]
                          updatedTasks[taskIndex].subTasks[subTaskIndex] = { ...updatedTasks[taskIndex].subTasks[subTaskIndex], name: e.target.value }
                          setNewService({ ...newService, tasks: updatedTasks })
                        }}
                      />
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const updatedTasks = [...newService.tasks]
                        updatedTasks[taskIndex].subTasks.push({ id: "", name: "", status: "Not Started" })
                        setNewService({ ...newService, tasks: updatedTasks })
                      }}
                    >
                      Add Subtask
                    </Button>
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setNewService({
                    ...newService,
                    tasks: [...newService.tasks, { id: "", name: "", status: "Not Started", priority: "Medium", subTasks: [] }]
                  })
                }}
              >
                Add Task
              </Button>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsAddServiceDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddService}>Add Service</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}