import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface Employee {
  id: string;
  name: string;
  department: string;
  performance: number;
  avatar?: string;
}

async function getTopPerformingEmployees(): Promise<Employee[]> {
  // In a real application, this would be an API call or database query
  return [
    {
      id: "1",
      name: "Alice Brown",
      department: "Sales",
      performance: 98,
      avatar: "https://avatar.iran.liara.run/public",
    },
    {
      id: "2",
      name: "Bob Wilson",
      department: "Marketing",
      performance: 95,
      avatar: "https://avatar.iran.liara.run/public",
    },
    {
      id: "3",
      name: "Carol Davis",
      department: "Development",
      performance: 92,
      avatar: "https://avatar.iran.liara.run/public",
    },
    {
      id: "4",
      name: "David Clark",
      department: "Customer Support",
      performance: 90,
      avatar: "https://avatar.iran.liara.run/public",
    },
    {
      id: "5",
      name: "Eva Martinez",
      department: "HR",
      performance: 89,
      avatar: "https://avatar.iran.liara.run/public",
    },
    {
      id: "6",
      name: "Frank Miller",
      department: "Finance",
      performance: 87,
      avatar: "https://avatar.iran.liara.run/public",
    },
    {
      id: "7",
      name: "Grace Lee",
      department: "Legal",
      performance: 93,
      avatar: "https://avatar.iran.liara.run/public",
    },
    {
      id: "8",
      name: "Henry Green",
      department: "IT",
      performance: 91,
      avatar: "https://avatar.iran.liara.run/public",
    },
    {
      id: "9",
      name: "Isabella Turner",
      department: "R&D",
      performance: 96,
      avatar: "https://avatar.iran.liara.run/public",
    },
    {
      id: "10",
      name: "Jack King",
      department: "Operations",
      performance: 88,
      avatar: "https://avatar.iran.liara.run/public",
    },
  ];
}

export async function TopPerformingEmployees() {
  const employees = await getTopPerformingEmployees();

  return (
    <Card className="col-span-1 lg:col-span-3 h-[600px] overflow-hidden bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="p-6">
        <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
          Top Performing Employees
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <ScrollArea className="h-[500px] pr-4 overflow-y-auto">
          <div className="space-y-6">
            {employees.map((employee) => (
              <div key={employee.id} className="space-y-2">
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 flex-shrink-0">
                    <AvatarImage src={employee.avatar} alt={employee.name} />
                    <AvatarFallback className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
                      {employee.name[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1 flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {employee.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {employee.department}
                    </p>
                  </div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white flex-shrink-0">
                    {employee.performance}%
                  </div>
                </div>
                <Progress
                  value={employee.performance}
                  className="h-2 bg-gray-200 dark:bg-gray-700"
                >
                  <div
                    className="h-full bg-blue-600 dark:bg-blue-400 transition-all"
                    style={{ width: `${employee.performance}%` }}
                  />
                </Progress>
              </div>
            ))}
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
}