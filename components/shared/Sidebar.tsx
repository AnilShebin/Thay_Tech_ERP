"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { adminSidebarLinks, staffSidebarLinks } from "@/constants";
import { ChevronLeft, ChevronRight } from "lucide-react";

type SidebarProps = {
  user: { firstName: string; lastName: string };
  role: "admin" | "staff";
};

export default function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();

  // Initialize state to true by default (sidebar not collapsed)
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

  // Function to toggle the collapsed state
  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  const sidebarLinks = role === "admin" ? adminSidebarLinks : staffSidebarLinks;

  // Helper function to check if the current route matches
  const isRouteActive = (route: string) => {
    // Handle dynamic routes by replacing ":id" with a regex that matches numbers or strings
    const dynamicRoute = route.replace(":id", "\\d+"); // or "[^/]+" for a more general match
    const regex = new RegExp(`^${dynamicRoute}`);
    return regex.test(pathname);
  };

  return (
    <div className="sidebar-wrapper">
      <section className={cn("sidebar", { "xl:w-fit": isCollapsed })}>
        <nav className="flex flex-col gap-4">
          <div className="mb-6 flex items-center gap-2">
            <Link href="/" className="cursor-pointer flex items-center gap-2">
              <Image
                src="/icons/logo.svg"
                width={34}
                height={34}
                alt="Jothilingam logo"
                className="size-12"
                priority
              />
              <h1 className={cn("sidebar-logo", { "xl:hidden": isCollapsed })}>
                Jothilingam
              </h1>
            </Link>
          </div>

          {sidebarLinks.map((item) => {
            const isActive =
              pathname === item.route ||
              (item.subRoutes &&
                item.subRoutes.some((subRoute) => isRouteActive(subRoute)));

            return (
              <Link
                href={item.route}
                key={item.label}
                className={cn("sidebar-link", { "bg-bank-gradient": isActive })}
              >
                <div className="relative size-6">
                  <Image
                    src={item.imgURL}
                    alt={item.label}
                    fill
                    className={cn("object-contain", {
                      "brightness-[3] invert-0": isActive,
                    })}
                  />
                </div>
                <p
                  className={cn("sidebar-label", {
                    "!text-white": isActive,
                    "xl:hidden": isCollapsed,
                  })}
                >
                  {item.label}
                </p>
              </Link>
            );
          })}
        </nav>
        <button
          onClick={toggleCollapse}
          className="collapse-btn"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <ChevronRight className="w-6 h-6" />
          ) : (
            <ChevronLeft className="w-6 h-6" />
          )}
        </button>
      </section>
    </div>
  );
}
