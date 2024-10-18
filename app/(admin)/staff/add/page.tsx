import Header from "@/components/shared/Header"
import AddStaffForm from '@/components/admin-dashboard/AddStaffForm'

export default function AddStaff() {
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <Header
            type="greeting"
            title="Add New Staff"
            subtext="Enter details to add a new staff member"
          />
        </header>

          <AddStaffForm />
      </div>
    </section>
  )
}