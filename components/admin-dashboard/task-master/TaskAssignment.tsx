'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { format, differenceInMinutes } from "date-fns"
import { Calendar as CalendarIcon, Clock, FileCheck, MessageSquare, Send, Timer, Bell } from 'lucide-react'

export default function TaskAssignment() {
  // Task Assignment State
  const [tasks, setTasks] = useState([])
  const [selectedCompany, setSelectedCompany] = useState('')
  const [selectedService, setSelectedService] = useState('')
  const [selectedTask, setSelectedTask] = useState('')
  const [priority, setPriority] = useState('medium')
  const [dueDate, setDueDate] = useState(new Date())
  const [assignedStaff, setAssignedStaff] = useState([])
  const [assignee, setAssignee] = useState('')
  const [approver, setApprover] = useState('')

  // Task Tracking State
  const [trackingTasks, setTrackingTasks] = useState([])
  const [estimatedHours, setEstimatedHours] = useState(0)
  const [status, setStatus] = useState('pending')
  const [approval, setApproval] = useState('pending')
  const [completionPercentage, setCompletionPercentage] = useState(0)
  const [notes, setNotes] = useState('')

  // Communication State
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')

  // Mock data (replace with actual data from Service Company Management in a real application)
  const companies = [
    { id: 1, name: 'Company A', type: 'Private Limited', assignedServices: [1, 2] },
    { id: 2, name: 'Company B', type: 'Limited', assignedServices: [2, 3] },
    { id: 3, name: 'Company C', type: 'LLP', assignedServices: [1, 3] }
  ]
  const serviceTypes = [
    { id: 1, name: 'Income Tax', tasks: ['File Returns', 'Calculate Deductions'] },
    { id: 2, name: 'Annual Returns', tasks: ['Review Financials', 'Prepare Report'] },
    { id: 3, name: 'GST Filing', tasks: ['Collect Invoices', 'Prepare GSTR'] }
  ]
  const staff = ['John Doe', 'Jane Smith', 'Alice Johnson', 'Bob Wilson']
  const seniors = ['Sarah Manager', 'Tom Supervisor']

  const addTask = () => {
    const newTask = {
      id: Date.now(),
      company: selectedCompany,
      service: selectedService,
      task: selectedTask,
      priority,
      dueDate,
      assignedStaff,
      assignee,
      approver,
      status: 'pending',
      approval: 'pending',
      completionPercentage: 0,
      startTime: null,
      endTime: null,
      timeTaken: 0
    }
    setTasks([...tasks, newTask])
    setTrackingTasks([...trackingTasks, newTask])
  }

  const updateTaskStatus = (taskId, newStatus, newCompletionPercentage) => {
    setTrackingTasks(trackingTasks.map(task => {
      if (task.id === taskId) {
        const updatedTask = { 
          ...task, 
          status: newStatus, 
          completionPercentage: newCompletionPercentage 
        }
        if (newStatus === 'in-progress' && !task.startTime) {
          updatedTask.startTime = new Date()
        } else if (newStatus === 'completed' && !task.endTime) {
          updatedTask.endTime = new Date()
          updatedTask.timeTaken = differenceInMinutes(updatedTask.endTime, updatedTask.startTime)
        }
        return updatedTask
      }
      return task
    }))
  }

  const updateTaskApproval = (taskId, newApproval) => {
    setTrackingTasks(trackingTasks.map(task => 
      task.id === taskId ? { ...task, approval: newApproval } : task
    ))
  }

  const addMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage, sender: 'Staff', timestamp: new Date() }])
      setNewMessage('')
    }
  }

  const sendReminder = (taskId) => {
    // In a real application, this would send a reminder to the assigned staff
    console.log(`Reminder sent for task ${taskId}`)
  }

  return (
    <Tabs defaultValue="task-assignment" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="task-assignment">Task Assignment</TabsTrigger>
        <TabsTrigger value="task-tracking">Task Tracking</TabsTrigger>
      </TabsList>

      <TabsContent value="task-assignment">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Assign Tasks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Company</Label>
                <Select value={selectedCompany} onValueChange={setSelectedCompany}>
                  <SelectTrigger className="bg-white">
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
                <Label>Service</Label>
                <Select value={selectedService} onValueChange={setSelectedService}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Select service" />
                  </SelectTrigger>
                  <SelectContent>
                    {companies.find(c => c.id.toString() === selectedCompany)?.assignedServices.map(serviceId => {
                      const service = serviceTypes.find(s => s.id === serviceId)
                      return (
                        <SelectItem key={service.id} value={service.id.toString()}>
                          {service.name}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Task</Label>
              <Select value={selectedTask} onValueChange={setSelectedTask}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select task" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tasks</SelectItem>
                  {serviceTypes.find(s => s.id.toString() === selectedService)?.tasks.map((task, index) => (
                    <SelectItem key={index} value={task}>
                      {task}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Priority</Label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Due Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal bg-white",
                      !dueDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dueDate ? format(dueDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white">
                  <Calendar
                    mode="single"
                    selected={dueDate}
                    onSelect={setDueDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Assign To</Label>
              <div className="grid grid-cols-2 gap-2">
                {staff.map((member, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Checkbox
                      id={`staff-${index}`}
                      checked={assignedStaff.includes(member)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setAssignedStaff([...assignedStaff, member])
                        } else {
                          setAssignedStaff(assignedStaff.filter(s => s !== member))
                        }
                      }}
                    />
                    <Label htmlFor={`staff-${index}`}>{member}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Assignee</Label>
              <Select value={assignee} onValueChange={setAssignee}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select assignee" />
                </SelectTrigger>
                <SelectContent>
                  {staff.map((member, index) => (
                    <SelectItem key={index} value={member}>
                      {member}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Approver</Label>
              <Select value={approver} onValueChange={setApprover}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select approver" />
                </SelectTrigger>
                <SelectContent>
                  {seniors.map((senior, index) => (
                    <SelectItem key={index} value={senior}>
                      {senior}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button className="w-full bg-blue-500 text-white hover:bg-blue-600" onClick={addTask}>
              Assign Task
            </Button>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Task</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Assignee</TableHead>
                  <TableHead>Approver</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell>{companies.find(c => c.id.toString() === task.company)?.name}</TableCell>
                    <TableCell>{serviceTypes.find(s => s.id.toString() === task.service)?.name}</TableCell>
                    <TableCell>{task.task}</TableCell>
                    <TableCell>
                      <Badge className={cn(
                        "bg-gray-100 text-gray-800",
                        task.priority === 'high' && "bg-red-100 text-red-800",
                        task.priority === 'medium' && "bg-yellow-100 text-yellow-800",
                        task.priority === 'low' && "bg-green-100 text-green-800"
                      )}>
                        {task.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>{format(task.dueDate, "PPP")}</TableCell>
                    <TableCell>{task.assignedStaff.join(', ')}</TableCell>
                    <TableCell>{task.assignee}</TableCell>
                    <TableCell>{task.approver}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="task-tracking">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Track Tasks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Task</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Approval</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Time Taken</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trackingTasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell>{task.task}</TableCell>
                    <TableCell>{task.assignedStaff.join(', ')}</TableCell>
                    <TableCell>
                      <Badge className={cn(
                        "bg-gray-100 text-gray-800",
                        task.status === 'completed' && "bg-green-100 text-green-800",
                        task.status === 'in-progress' && "bg-blue-100 text-blue-800",
                        task.status === 'pending' && "bg-yellow-100 text-yellow-800"
                      )}>
                        {task.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn(
                        "bg-gray-100 text-gray-800",
                        task.approval === 'completed' && "bg-green-100 text-green-800",
                        task.approval === 'correction-needed' && "bg-red-100 text-red-800",
                        task.approval === 'pending' && "bg-yellow-100 text-yellow-800"
                      )}>
                        {task.approval}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Progress value={task.completionPercentage} className="w-[60px]" />
                    </TableCell>
                    <TableCell>{task.timeTaken ? `${task.timeTaken} mins` : '-'}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          onClick={() => updateTaskStatus(task.id, 'in-progress', 50)}
                          className="bg-blue-500 text-white hover:bg-blue-600"
                        >
                          Start
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => updateTaskStatus(task.id, 'completed', 100)}
                          className="bg-green-500 text-white hover:bg-green-600"
                        >
                          Complete
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => sendReminder(task.id)}
                          className="bg-yellow-500 text-white hover:bg-yellow-600"
                        >
                          <Bell className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="space-y-2">
              <Label>Update Approval Status</Label>
              <div className="flex space-x-2">
                <Select onValueChange={(value) => updateTaskApproval(trackingTasks[0]?.id, value)}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Select approval status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="correction-needed">Correction Needed</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={() => updateTaskApproval(trackingTasks[0]?.id, approval)} className="bg-purple-500 text-white hover:bg-purple-600">
                  Update Approval
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Task Notes</Label>
              <Textarea
                placeholder="Add notes about the task progress..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="bg-white"
              />
            </div>

            <div className="space-y-2">
              <Label>Communication</Label>
              <ScrollArea className="h-[200px] w-full border rounded-md p-4 bg-gray-50">
                {messages.map((message, index) => (
                  <div key={index} className={cn(
                    "mb-4 p-2 rounded-lg max-w-[80%]",
                    message.sender === 'Staff' ? "ml-auto bg-blue-100" : "bg-gray-100"
                  )}>
                    <p className="text-sm">{message.text}</p>
                    <span className="text-xs text-gray-500">{format(message.timestamp, "PPp")}</span>
                  </div>
                ))}
              </ScrollArea>
              <div className="flex space-x-2">
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="bg-white"
                />
                <Button onClick={addMessage} className="bg-blue-500 text-white hover:bg-blue-600">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Button className="w-full bg-green-500 text-white hover:bg-green-600">
              <FileCheck className="mr-2 h-4 w-4" />
              Save Tracking Information
            </Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}