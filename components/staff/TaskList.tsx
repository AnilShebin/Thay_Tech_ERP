import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

const tasks = [
  { id: 1, title: "Complete project proposal", completed: false },
  { id: 2, title: "Review code changes", completed: true },
  { id: 3, title: "Update documentation", completed: false },
  { id: 4, title: "Prepare for team meeting", completed: false },
]

export default function TaskList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li key={task.id} className="flex items-center space-x-2">
              <Checkbox id={`task-${task.id}`} checked={task.completed} />
              <label
                htmlFor={`task-${task.id}`}
                className={`text-sm ${task.completed ? 'line-through text-muted-foreground' : ''}`}
              >
                {task.title}
              </label>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}