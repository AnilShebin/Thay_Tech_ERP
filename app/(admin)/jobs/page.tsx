import ServiceCompanyManagement from "@/components/admin-dashboard/job-master/ServiceCompanyManagement";
import Header from "@/components/shared/Header";

export default function ClientCompaniesPage() {
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <Header
            type="greeting"
            title="Services"
            subtext="Browse, search, and create new services"
          />
        </header>
        <ServiceCompanyManagement />
      </div>
    </section>
  );
}