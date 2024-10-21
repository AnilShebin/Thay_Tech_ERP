import MobileNav from "@/components/shared/MobileNav";
import Sidebar from "@/components/shared/Sidebar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Ensure the role is explicitly typed as "admin"
  const loggedIn: {
    firstName: string;
    lastName: string;
    role: "admin" | "staff";
  } = {
    firstName: "Admin",
    lastName: "User",
    role: "admin",
  };

  return (
    <div className="flex h-screen w-full overflow-hidden font-inter">
      <Sidebar 
        user={loggedIn} 
        role="admin" 
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="root-layout md:hidden">
          <MobileNav user={loggedIn} role="admin" />
        </div>
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
