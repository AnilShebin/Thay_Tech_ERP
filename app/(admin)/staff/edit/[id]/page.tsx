import Header from "@/components/shared/Header"
import EditStaffForm from '@/components/admin-dashboard/EditStaffForm'

export default function EditStaff({ params }: { params: { id: string } }) {
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <Header
            type="greeting"
            title="Edit Staff"
            subtext="Update staff member details"
          />
        </header>

        <div className="mt-6">
          <EditStaffForm staffId={params.id} />
        </div>
      </div>
    </section>
  )
}