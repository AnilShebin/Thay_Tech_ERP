import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, ClockIcon, UserIcon } from "lucide-react"

interface AuditEvent {
  id: string
  title: string
  date: string
  time: string
  auditor: string
  department: string
  status: 'Scheduled' | 'In Progress' | 'Completed'
}

async function getAuditSchedule(): Promise<AuditEvent[]> {
  // In a real application, this would be an API call or database query
  return [
    { id: '1', title: 'Financial Audit', date: '2023-06-15', time: '10:00 AM', auditor: 'John Smith', department: 'Finance', status: 'Scheduled' },
    { id: '2', title: 'HR Policy Review', date: '2023-06-16', time: '2:00 PM', auditor: 'Emily Johnson', department: 'Human Resources', status: 'Scheduled' },
    { id: '3', title: 'IT Security Audit', date: '2023-06-14', time: '11:00 AM', auditor: 'Michael Brown', department: 'IT', status: 'In Progress' },
    { id: '4', title: 'Operational Efficiency', date: '2023-06-13', time: '9:00 AM', auditor: 'Sarah Davis', department: 'Operations', status: 'Completed' },
    { id: '5', title: 'Compliance Check', date: '2023-06-17', time: '1:00 PM', auditor: 'Robert Lee', department: 'Legal', status: 'Scheduled' },
  ]
}

export async function AuditSchedule() {
  const schedule = await getAuditSchedule()

  return (
    <Card className="col-span-1 lg:col-span-3 h-[600px] overflow-hidden bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="p-6">
        <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">Audit Schedule</CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="space-y-6">
          {schedule.map((event) => (
            <div key={event.id} className="space-y-2 border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0 last:pb-0">
              <div className="flex justify-between items-start">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">{event.title}</h3>
                <Badge
                  variant={event.status === 'Completed' ? 'default' : 
                           event.status === 'In Progress' ? 'secondary' : 'outline'}
                >
                  {event.status}
                </Badge>
              </div>
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 space-x-2">
                <span className="flex items-center">
                  <CalendarIcon className="h-3 w-3 mr-1" />
                  {event.date}
                </span>
                <span className="flex items-center">
                  <ClockIcon className="h-3 w-3 mr-1" />
                  {event.time}
                </span>
              </div>
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 space-x-2">
                <span className="flex items-center">
                  <UserIcon className="h-3 w-3 mr-1" />
                  {event.auditor}
                </span>
                <span>{event.department}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}