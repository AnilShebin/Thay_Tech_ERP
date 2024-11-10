import StaffDashboard from "@/components/staff/StaffDashboard";
import Header from "@/components/shared/Header";

const StaffDashBoard = () => {
  const loggedIn = { firstName: "Anil Shebin" };

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <Header
            type="greeting"
            title="Welcome,"
            user={loggedIn?.firstName || "Guest"}
            subtext="Let's elevate your efficiency and precision together."
          />
          <div>
            <StaffDashboard />
          </div>
        </header>
      </div>
    </section>
  );
};

export default StaffDashBoard;
