import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface Activity {
  id: string;
  user: string;
  action: string;
  time: string;
  avatar?: string;
}

async function getRecentActivities(): Promise<Activity[]> {
  // In a real application, this would be an API call or database query
  return [
    {
      id: "1",
      user: "John Doe",
      action: "Completed Task A",
      time: "2 hours ago",
      avatar: "https://avatar.iran.liara.run/public",
    },
    {
      id: "2",
      user: "Jane Smith",
      action: "Updated Project X",
      time: "4 hours ago",
      avatar: "https://avatar.iran.liara.run/public",
    },
    {
      id: "3",
      user: "Mike Johnson",
      action: "Submitted Report",
      time: "1 day ago",
      avatar: "https://avatar.iran.liara.run/public",
    },
    {
      id: "4",
      user: "Emily Brown",
      action: "Created New Task",
      time: "2 days ago",
      avatar: "https://avatar.iran.liara.run/public",
    },
    {
      id: "5",
      user: "Alex Lee",
      action: "Commented on Issue",
      time: "3 days ago",
      avatar: "https://avatar.iran.liara.run/public",
    },
    {
      id: "6",
      user: "Sarah Wilson",
      action: "Approved Budget",
      time: "4 days ago",
      avatar: "https://avatar.iran.liara.run/public",
    },
    {
      id: "7",
      user: "Tom Harris",
      action: "Scheduled Meeting",
      time: "5 days ago",
      avatar: "https://avatar.iran.liara.run/public",
    },
    {
      id: "8",
      user: "Linda Taylor",
      action: "Reviewed Task B",
      time: "6 days ago",
      avatar: "https://avatar.iran.liara.run/public",
    },
    {
      id: "9",
      user: "Chris Evans",
      action: "Completed Sprint Review",
      time: "7 days ago",
      avatar: "https://avatar.iran.liara.run/public",
    },
    {
      id: "10",
      user: "Olivia Adams",
      action: "Assigned Task C",
      time: "8 days ago",
      avatar: "https://avatar.iran.liara.run/public",
    },
    {
      id: "11",
      user: "Daniel Green",
      action: "Updated Documentation",
      time: "9 days ago",
      avatar: "https://avatar.iran.liara.run/public",
    },
    {
      id: "12",
      user: "Sophia Wright",
      action: "Closed Issue #123",
      time: "10 days ago",
      avatar: "https://avatar.iran.liara.run/public",
    },
    {
      id: "13",
      user: "Jason Moore",
      action: "Opened Pull Request",
      time: "11 days ago",
      avatar: "https://avatar.iran.liara.run/public",
    },
    {
      id: "14",
      user: "Emma Harris",
      action: "Merged Branch A",
      time: "12 days ago",
      avatar: "https://avatar.iran.liara.run/public",
    },
    {
      id: "15",
      user: "Matthew Robinson",
      action: "Resolved Bug B",
      time: "13 days ago",
      avatar: "https://avatar.iran.liara.run/public",
    },
    
  ];
}

export async function RecentActivities() {
  const activities = await getRecentActivities();

  return (
    <Card className="col-span-1 lg:col-span-6 h-[600px] overflow-hidden bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="p-6">
        <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
          Recent Activities
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <ScrollArea className="h-[500px] pr-4 overflow-y-auto">
          <div className="space-y-6">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-center">
                <Avatar className="h-10 w-10 flex-shrink-0">
                  <AvatarImage src={activity.avatar} alt={activity.user} />
                  <AvatarFallback className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
                    {activity.user[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1 flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {activity.user}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {activity.action}
                  </p>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">
                  {activity.time}
                </div>
              </div>
            ))}
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
}