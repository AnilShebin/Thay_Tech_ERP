import ClientCompanyTable from '@/components/admin-dashboard/client-companies/ClientCompanyTable'
import Header from "@/components/shared/Header"
import { getCompanies } from '../../actions/companyActions'

export default async function ClientCompaniesPage() {
  const companies = await getCompanies()
  
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

          <ClientCompanyTable initialData={companies} />
      </div>
    </section>
  )
}