import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

interface Employee {
  id: string
  name: string
  department: string
  performance: number
  avatar?: string
}

async function getTopPerformingEmployees(): Promise<Employee[]> {
  // In a real application, this would be an API call or database query
  return [
    { id: '1', name: 'Alice Brown', department: 'Sales', performance: 98, avatar: '/avatars/alice-brown.png' },
    { id: '2', name: 'Bob Wilson', department: 'Marketing', performance: 95, avatar: '/avatars/bob-wilson.png' },
    { id: '3', name: 'Carol Davis', department: 'Development', performance: 92, avatar: '/avatars/carol-davis.png' },
    { id: '4', name: 'David Clark', department: 'Customer Support', performance: 90, avatar: '/avatars/david-clark.png' },
    { id: '5', name: 'Eva Martinez', department: 'HR', performance: 89, avatar: '/avatars/eva-martinez.png' },
  ]
}

export async function TopPerformingEmployees() {
  const employees = await getTopPerformingEmployees()

  return (
    <Card className="col-span-1 lg:col-span-3 h-[600px] overflow-hidden bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="p-6">
        <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">Top Performing Employees</CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="space-y-6">
          {employees.map((employee) => (
            <div key={employee.id} className="space-y-2">
              <div className="flex items-center">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={employee.avatar} alt={employee.name} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {employee.name[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-3 space-y-0.5 flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{employee.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {employee.department}
                  </p>
                </div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">{employee.performance}%</div>
              </div>
              <Progress 
                value={employee.performance} 
                className="h-2"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}