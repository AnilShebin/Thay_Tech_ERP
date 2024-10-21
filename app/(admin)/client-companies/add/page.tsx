import Header from "@/components/shared/Header";
import ClientCompanyForm from "@/components/admin-dashboard/client-companies/ClientCompanyForm";

export default function AddClient() {
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <Header
            type="greeting"
            title="Add New Client"
            subtext="Enter details to add a new client"
          />
        </header>

        <ClientCompanyForm />
      </div>
    </section>
  );
}
