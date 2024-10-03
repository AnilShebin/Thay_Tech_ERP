import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Activity {
  id: string
  user: string
  action: string
  time: string
  avatar?: string
}

async function getRecentActivities(): Promise<Activity[]> {
  // In a real application, this would be an API call or database query
  return [
    { id: '1', user: 'John Doe', action: 'Completed Task A', time: '2 hours ago', avatar: '/avatars/john-doe.png' },
    { id: '2', user: 'Jane Smith', action: 'Updated Project X', time: '4 hours ago', avatar: '/avatars/jane-smith.png' },
    { id: '3', user: 'Mike Johnson', action: 'Submitted Report', time: '1 day ago', avatar: '/avatars/mike-johnson.png' },
    { id: '4', user: 'Emily Brown', action: 'Created New Task', time: '2 days ago', avatar: '/avatars/emily-brown.png' },
    { id: '5', user: 'Alex Lee', action: 'Commented on Issue', time: '3 days ago', avatar: '/avatars/alex-lee.png' },
    { id: '6', user: 'Sarah Wilson', action: 'Approved Budget', time: '4 days ago', avatar: '/avatars/sarah-wilson.png' },
    { id: '7', user: 'Tom Harris', action: 'Scheduled Meeting', time: '5 days ago', avatar: '/avatars/tom-harris.png' },
  ]
}

export async function RecentActivities() {
  const activities = await getRecentActivities()

  return (
    <Card className="col-span-1 lg:col-span-6 h-[600px] overflow-hidden bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="p-6">
        <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">Recent Activities</CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-6">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-center">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={activity.avatar} alt={activity.user} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {activity.user[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1 flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.user}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {activity.action}
                  </p>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}