import AddStaffTable from '@/components/admin-dashboard/AddStaffTable'
import Header from "@/components/shared/Header"
import { getStaff } from '../../actions/staffActions'

export default async function StaffPage() {
  const staff = await getStaff()
  
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <Header
            type="greeting"
            title="All Staff"
            subtext="View, search for and add new staff"
          />
        </header>

        <div className="mt-6">
          <AddStaffTable initialData={staff} />
        </div>
      </div>
    </section>
  )
}