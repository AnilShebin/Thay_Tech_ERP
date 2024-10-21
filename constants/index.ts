// sidebarLinks (Admin and Staff Sidebar Links)
export const adminSidebarLinks = [
    {
      imgURL: "/icons/dashboard-sidebar.svg",
      route: "/admin-dashboard",
      label: "Home",
    },
    {
      imgURL: "/icons/staff-sidebar.svg",
      route: "/staff",
      label: "Staff",
      subRoutes: ["/staff/add", "/staff/edit/:id"],
    },
    {
      imgURL: "/icons/attendence-sidebar.svg",
      route: "/attendance",
      label: "Attendance",
    },
    {
      imgURL: "/icons/client-companies.svg",
      route: "/client-companies",
      label: "Clients",
      subRoutes: ["/client-companies/add", "/client-companies/edit/:id"],
    },
  ];
  
  export const staffSidebarLinks = [
    {
      imgURL: "/icons/dashboard-sidebar.svg",
      route: "/staff-dashboard",
      label: "Home",
      subRoutes: ["/staff/add", "/staff/edit/:id"],
    },
  ];