import Attendance from "@/components/admin-dashboard/attendance/Attendance";
import Header from "@/components/shared/Header";

const AttendancePage = () => {

    return (
        <section className="home">
            <div className="home-content">
                <header className="home-header">
                    {/* Header with greeting */}
                    <Header
                        type="greeting"
                        title="Attendance"
                        subtext="All Staff Attendance"
                    />
                    <Attendance />
                </header>
            </div>
        </section>
    );
};

export default AttendancePage;