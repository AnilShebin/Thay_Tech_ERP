import Image from "next/image";
import NotificationIcon from "/public/icons/notification-header.svg";
import ProfileIcon from "/public/icons/profile.svg";
import SettingsIcon from "/public/icons/settings.svg";
import ArrowIcon from "/public/icons/arrow-header.svg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HeaderProps } from "@/types";

export default function Header({
  type = "title",
  title,
  subtext,
  user,
  jobTitle,
}: HeaderProps) {
  return (
    <header className="w-full bg-white px-3 py-2 sm:px-4 sm:py-3 lg:px-6">
      <div className="flex flex-wrap items-center justify-between gap-2 sm:flex-nowrap">
        <div className="flex-1 min-w-0">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 truncate">
            {title}
            {type === "greeting" && (
              <span className="text-bankgradient">
                &nbsp;{user}
              </span>
            )}
          </h1>
          <p className="mt-1 text-sm text-gray-500 truncate">{subtext}</p>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <NotificationButton />
          <ProfileDropdown user={user} jobTitle={jobTitle} />
        </div>
      </div>
    </header>
  );
}

function NotificationButton() {
  return (
    <button
      className="flex items-center justify-center bg-gray-100 rounded-lg p-2 w-10 h-10 sm:w-12 sm:h-12 transition-colors hover:bg-gray-200"
      aria-label="Notifications"
    >
      <Image
        src={NotificationIcon}
        alt="Notification Icon"
        width={20}
        height={20}
        className="rounded"
      />
    </button>
  );
}

function ProfileDropdown({
  user,
  jobTitle,
}: {
  user?: string;
  jobTitle?: string;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center space-x-2 sm:space-x-3 bg-white rounded-lg border border-gray-200 p-1.5 sm:p-2 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-0 font-inter w-[184px] h-[50px]">
          <div className="w-[40px] h-[40px] relative rounded-full overflow-hidden flex-shrink-0">
            <Image
              src="/icons/logo.jpg"
              alt="Profile"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 text-left">
            <p className="text-sm font-semibold text-gray-800 truncate">
              {user || "My Profile"}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {jobTitle || "Designation"}
            </p>
          </div>
          <Image
            src={ArrowIcon}
            alt="Dropdown Arrow"
            width={20}
            height={20}
            className="flex-shrink-0"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-[184px] p-1 bg-white rounded-lg shadow-lg border border-gray-200"
      >
        <DropdownMenuItem className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
          <div className="w-5 h-5 mr-3 flex items-center justify-center">
            <Image
              src={ProfileIcon}
              alt="Profile"
              width={20}
              height={20}
            />
          </div>
          <span className="font-medium">Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
          <div className="w-5 h-5 mr-3 flex items-center justify-center">
            <Image
              src={SettingsIcon}
              alt="Settings"
              width={20}
              height={20}
            />
          </div>
          <span className="font-medium">Settings</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}