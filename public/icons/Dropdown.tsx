"use client"; // Marking Dropdown as a Client Component

import React from "react";
import Image, { StaticImageData } from "next/image"; // Importing Image from next/image
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Adjust the import path as needed

interface DropdownProps {
  label: React.ReactNode; // Label can be any React node
  menuItems: { label: string; icon: StaticImageData; action: () => void }[]; // Menu items with icons and actions
}

const Dropdown: React.FC<DropdownProps> = ({ label, menuItems }) => {
  // Common class for all menu items with unified styling
  const menuItemClass =
    "w-full px-3 py-2 bg-white justify-start items-center gap-2 inline-flex rounded-lg transition-all duration-200 cursor-pointer text-[#16141b] text-sm font-medium font-lexend leading-tight hover:bg-[#f2f9f9]"; // Base styles for all menu items

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="focus:outline-none">{label}</button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="h-auto w-[184px] rounded-lg shadow-lg border border-[#a2a1a8]/20 bg-white flex-col justify-start items-center inline-flex font-lexend">
        {" "}
        {/* Set width to match profile */}
        {/* My Account Menu Item */}
        <DropdownMenuItem
          className={`${menuItemClass} font-semibold`} // Bold font for My Account
          onClick={() => alert("My Account clicked")} // Replace with the actual action for My Account
        >
          <Image
            src="/icons/account.svg" // Use appropriate icon for My Account
            alt="My Account"
            width={16} // Set width based on your design
            height={16} // Set height based on your design
            className="mr-2" // Add margin class for spacing
          />
          My Account
        </DropdownMenuItem>
        {/* Menu Items Section */}
        <DropdownMenuGroup className="flex-col">
          {menuItems.map((item, index) => (
            <DropdownMenuItem
              key={index}
              className={menuItemClass} // Use the same styles for other menu items
              onClick={item.action}
            >
              <Image
                src={item.icon} // Use the icon from the menu item
                alt={`${item.label} Icon`} // Alt text for accessibility
                width={16} // Set width based on your design
                height={16} // Set height based on your design
                className="mr-2" // Add margin class for spacing
              />
              {item.label}
            </DropdownMenuItem>
          ))}

          {/* Log out Section */}
          <DropdownMenuItem
            className={`${menuItemClass} hover:bg-[#FEE4E2]`} // Use the specified background color for logout hover
            onClick={() => alert("Logged out")}
          >
            <Image
              src="/icons/logout.svg" // Ensure this path is correct
              alt="Log out"
              width={16} // Set width based on your design
              height={16} // Set height based on your design
              className="mr-2" // Add margin class for spacing
            />
            Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;
