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
      <Sidebar user={loggedIn} role={loggedIn.role} />
      <div className="flex-grow flex-col">
        {/* Render children here */}
        {children}
      </div>
    </main>
  );
}
