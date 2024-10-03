'use client'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { adminSidebarLinks, staffSidebarLinks } from "@/constants"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

type MobileNavProps = {
  user: { firstName: string; lastName: string };
  role: "admin" | "staff";
};

const MobileNav = ({ user, role }: MobileNavProps) => {
  const pathname = usePathname();

  // Determine which links to use based on the role
  const sidebarLinks = role === "admin" ? adminSidebarLinks : staffSidebarLinks;

  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger>
          <Image
            src="/icons/hamburger.svg"
            width={30}
            height={30}
            alt="menu"
            className="cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-white">
          <SheetClose asChild>
            <Link href="/" className="cursor-pointer flex items-center gap-1 px-4">
              <Image 
                src="/icons/logo.svg"
                width={34}
                height={34}
                alt="Jothilingam logo"
              />
              <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">Jothilingam</h1>
            </Link>
          </SheetClose>
          <div className="mobilenav-sheet">
            <SheetClose asChild>
              <nav className="flex h-full flex-col gap-6 pt-10 text-black-2">
                {sidebarLinks.map((item) => {
                  const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`)

                  return (
                    <SheetClose asChild key={item.route}>
                      <Link
                        href={item.route}
                        className={cn("mobilenav-sheet_close w-full", {
                          "bg-bank-gradient": isActive,
                        })}
                      >
                        <Image 
                          src={item.imgURL}
                          alt={item.label}
                          width={20}
                          height={20}
                          className={cn({
                            "brightness-[3] invert-0": isActive
                          })}
                        />
                        <p
                          className={cn("text-16 font-semibold", {
                            "text-white": isActive,
                            "text-black-2": !isActive,
                          })}
                        >
                          {item.label}
                        </p>
                      </Link>
                    </SheetClose>
                  )
                })}
              </nav>
            </SheetClose>
          </div>
          <div className="mt-auto p-4">
            <p className="text-sm font-medium text-gray-600">Logged in as:</p>
            <p className="text-base font-semibold text-black-1">{user.firstName} {user.lastName}</p>
            <p className="text-sm text-gray-600 capitalize">{role}</p>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  )
}

export default MobileNav