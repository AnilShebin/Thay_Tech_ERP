import TaskAssignment from "@/components/admin-dashboard/task-master/TaskAssignment";
import Header from "@/components/shared/Header";

export default function TaskAssignmentPage() {
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <Header
            type="greeting"
            title="Task Assignment"
            subtext="Assign tasks, set priorities, and track completion in real-time."
          />
        </header>
        <TaskAssignment />
      </div>
    </section>
  );
}