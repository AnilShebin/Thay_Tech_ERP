import AddStaffTable from "@/components/admin-dashboard/AddStaffTable";
import Header from "@/components/shared/Header";

export default function StaffPage() {
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

        <div className="grid gap-6 grid-cols-1">
          <AddStaffTable />
        </div>
      </div>
    </section>
  );
}
