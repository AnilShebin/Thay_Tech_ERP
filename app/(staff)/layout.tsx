import Sidebar from "@/components/shared/Sidebar";
import Image from "next/image";
import { Toaster } from "@/components/ui/sonner"

export default function StaffLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Ensure the role is explicitly typed as "staff"
  const loggedIn: { firstName: string; lastName: string; role: "admin" | "staff" } = {
    firstName: "Staff",
    lastName: "User",
    role: "staff",
  };

  return (
    <main className="flex h-screen w-full font-inter">
      <Sidebar user={loggedIn} role={loggedIn.role} />

      <div className="flex size-full flex-col">
        <div className="root-layout">
          <Image src="/icons/logo.svg" width={30} height={30} alt="menu icon" />
        </div>
        {children}
        <Toaster />
      </div>
    </main>
  );
}
