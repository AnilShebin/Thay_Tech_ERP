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
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { HeaderProps, NotificationItemProps } from "@/types";
import { MessageSquare, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center justify-center bg-gray-100 rounded-lg p-2 w-10 h-10 sm:w-12 sm:h-12 transition-colors hover:bg-gray-200 relative focus:outline-none focus:ring-0 focus:ring-offset-0"
          aria-label="Notifications"
        >
          <Image
            src={NotificationIcon}
            alt="Notification Icon"
            width={20}
            height={20}
            className="rounded"
          />
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">3</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-4 bg-white rounded-lg shadow-lg border border-gray-200">
        <DropdownMenuLabel className="text-lg font-semibold text-gray-800 mb-2">Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-[300px] overflow-y-auto">
          <NotificationItem
            icon={<MessageSquare className="text-blue-500" />}
            title="New Message"
            description="You have a new message from John Doe"
            time="5 minutes ago"
          />
          <NotificationItem
            icon={<AlertTriangle className="text-yellow-500" />}
            title="System Alert"
            description="Server load is approaching 90% capacity"
            time="10 minutes ago"
          />
          <NotificationItem
            icon={<CheckCircle className="text-green-500" />}
            title="Task Completed"
            description="Project X has been successfully deployed"
            time="1 hour ago"
          />
          <NotificationItem
            icon={<Clock className="text-purple-500" />}
            title="Reminder"
            description="Team meeting starts in 15 minutes"
            time="2 hours ago"
          />
        </div>
        <DropdownMenuSeparator className="my-2" />
        <DropdownMenuItem className="text-center text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
          View All Notifications
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function NotificationItem({ icon, title, description, time }: NotificationItemProps) {
  return (
    <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-md transition-colors">
      <div className="flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900">{title}</p>
        <p className="text-sm text-gray-500 truncate">{description}</p>
        <p className="text-xs text-gray-400 mt-1">{time}</p>
      </div>
    </div>
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