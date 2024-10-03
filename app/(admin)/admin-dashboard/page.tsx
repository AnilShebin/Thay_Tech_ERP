import { Suspense } from 'react'
import AdminDashboardStats from "@/components/admin-dashboard/AdminDashboardStats"
import Header from "@/components/shared/Header"
import { RecentActivities } from "@/components/admin-dashboard/RecentActivities"
import { TopPerformingEmployees } from "@/components/admin-dashboard/TopPerformingEmployees"
import { AuditSchedule } from "@/components/admin-dashboard/AuditSchedule"
import { Skeleton } from "@/components/ui/skeleton"

export default async function AdminDashboard() {
  const loggedIn = { firstName: "Jothilingam" }

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
          <Suspense fallback={<Skeleton className="h-[600px] w-full col-span-1 lg:col-span-6" />}>
            <RecentActivities />
          </Suspense>
          <Suspense fallback={<Skeleton className="h-[600px] w-full col-span-1 lg:col-span-3" />}>
            <TopPerformingEmployees />
          </Suspense>
          <Suspense fallback={<Skeleton className="h-[600px] w-full col-span-1 lg:col-span-3" />}>
            <AuditSchedule />
          </Suspense>
        </div>
      </div>
    </section>
  )
}