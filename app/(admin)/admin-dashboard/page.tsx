import AdminDashboardStats from "@/components/admin-dashboard/AdminDashboardStats";
import Header from "@/components/shared/Header";
import { RecentActivities } from "@/components/admin-dashboard/RecentActivities";
import { TopPerformingEmployees } from "@/components/admin-dashboard/TopPerformingEmployees";
import { AuditSchedule } from "@/components/admin-dashboard/AuditSchedule";

export default async function AdminDashboard() {
  const loggedIn = { firstName: "Jothilingam" };

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <Header
            type="greeting"
            title="Welcome,"
            user={loggedIn?.firstName || "Guest"}
            subtext="Let's elevate your efficiency and precision together."
          />
          <AdminDashboardStats
            totalStaffs={150}
            previousTotalStaffs={140}
            attendanceRate={92}
            previousAttendanceRate={89}
            totalTasks={500}
            previousTotalTasks={780}
          />
        </header>

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-12">
          <RecentActivities />
          <TopPerformingEmployees />
          <AuditSchedule />
        </div>
      </div>
    </section>
  );
}
