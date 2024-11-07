import AddStaffTable from '@/components/admin-dashboard/staff/StaffTable'
import Header from "@/components/shared/Header"
import { getStaff } from '../../../components/actions/staffActions'

export default async function StaffPage() {
  const staff = await getStaff()
  
  return (
    <section className="home">
      <div className="home-content w-[95vh]">
        <header className="home-header">
          <Header
            type="greeting"
            title="All Staff"
            subtext="View, search for and add new staff"
          />
        </header>

        <div className="">
          <AddStaffTable initialData={staff} />
        </div>
      </div>
    </section>
  )
}