import DashboardStat from "@/components/shared/DashboardStat"

interface AdminDashboardStatsProps {
  totalStaffs: number
  previousTotalStaffs: number
  attendanceRate: number
  previousAttendanceRate: number
  totalTasks: number
  previousTotalTasks: number
}

export default function AdminDashboardStats({
  totalStaffs,
  previousTotalStaffs,
  attendanceRate,
  previousAttendanceRate,
  totalTasks,
  previousTotalTasks
}: AdminDashboardStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <DashboardStat
        title="Total Staff"
        value={totalStaffs}
        previousValue={previousTotalStaffs}
        icon="/icons/staff-sidebar.svg"
        type="default"
      />
      <DashboardStat
        title="Attendance Rate"
        value={attendanceRate}
        previousValue={previousAttendanceRate}
        icon="/icons/calendar.svg"
        type="percentage"
      />
      <DashboardStat
        title="Total Tasks"
        value={totalTasks}
        previousValue={previousTotalTasks}
        icon="/icons/task-outline.svg" 
        type="default"
      />
    </div>
  )
}
