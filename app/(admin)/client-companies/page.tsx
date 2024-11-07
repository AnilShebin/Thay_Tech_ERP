import ProfessionalEntityManagementERP from '@/components/admin-dashboard/client-companies/client/ProfessionalEntityManagementERP'
import Header from "@/components/shared/Header"

export default function ClientCompaniesPage() {
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <Header
            type="greeting"
            title="All Clients"
            subtext="View, search for and add new client companies"
          />
        </header>
        <ProfessionalEntityManagementERP />
      </div>
    </section>
  )
}