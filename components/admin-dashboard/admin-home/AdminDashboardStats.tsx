import { use } from 'react'
import DashboardStat from "@/components/shared/DashboardStat"
import { getTotalStaffCount, getPreviousTotalStaffCount } from "@/app/actions/staffActions"

interface AdminDashboardStatsProps {
  attendanceRate: number
  previousAttendanceRate: number
  totalTasks: number
  previousTotalTasks: number
}

export default function AdminDashboardStats({
  attendanceRate,
  previousAttendanceRate,
  totalTasks,
  previousTotalTasks,
}: AdminDashboardStatsProps) {
  const totalStaffs = use(getTotalStaffCount())
  const previousTotalStaffs = use(getPreviousTotalStaffCount())

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