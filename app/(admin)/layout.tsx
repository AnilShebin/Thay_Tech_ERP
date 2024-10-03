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
    <main className="flex h-screen w-full font-inter">
      <Sidebar user={loggedIn} role={"admin"} />

      <div className="flex size-full flex-col">
        <div className="root-layout">
          <div>
            <MobileNav user={loggedIn} role={"admin"} />
          </div>
        </div>
        {children}
      </div>
    </main>
  );
}

