import AddStaffTable from '@/components/admin-dashboard/AddStaffTable';
import Header from "@/components/shared/Header";

// Define the Staff type based on your backend data structure
type Staff = {
  staff_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  alternate_number: string | null;
  roleId: number;
  designation: string;
  documents_collected: boolean;
  isVerified: boolean;
};

type ApiResponse = {
  success: boolean;
  data: Staff[];
};

async function getStaff() {
  const res = await fetch('http://localhost:3001/staff', { cache: 'no-store' })
  
  if (!res.ok) {
    throw new Error('Failed to fetch staff data')
  }
 
  const apiResponse: ApiResponse = await res.json()
  
  if (!apiResponse.success || !Array.isArray(apiResponse.data)) {
    throw new Error('Invalid data structure received from API')
  }

  return apiResponse.data
}

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

        <div className="grid gap-6 grid-cols-1">
          <AddStaffTable initialData={staff} />
        </div>
      </div>
    </section>
  );
}