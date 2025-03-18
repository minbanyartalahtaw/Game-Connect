import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Home, Search, Users, UserPlus, Menu, X, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

interface SideBarProps {
  profilePicture?: string;
  username?: string;
}

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  badge?: number;
}

const SideBar: React.FC<SideBarProps> = ({
  profilePicture = "/default-avatar.png",
  username = "User",
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if the screen is mobile size
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  // Toggle sidebar for mobile view
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Navigation items
  const mainNavItems: NavItem[] = [
    { icon: <Home size={18} />, label: "Home", href: "#" },
    { icon: <Search size={18} />, label: "Search", href: "#" },
  ];

  const friendsNavItems: NavItem[] = [
    { icon: <Users size={18} />, label: "All Friends", href: "#" },
    {
      icon: <UserPlus size={18} />,
      label: "Friend Requests",
      href: "#",
      badge: 3,
    },
  ];

  const logout = () => {
    console.log("Logout");
    document.cookie =
      "login-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/auth/login");
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="fixed top-4 left-4 z-50 p-2 rounded-full bg-black text-white shadow-lg hover:bg-zinc-800 transition-colors md:hidden"
        onClick={toggleSidebar}
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full shadow-xl z-40 border-r border-zinc-800
          transform transition-transform duration-300 ease-in-out
          ${
            isMobile
              ? isOpen
                ? "translate-x-0"
                : "-translate-x-full"
              : "translate-x-0"
          }
          ${isMobile ? "w-64" : "w-64"}`}
      >
        <div className="flex flex-col h-full p-5">
          {/* Profile section */}
          <div className="flex flex-col items-center mb-6 mt-8">
            <div className="relative w-20 h-20 mb-3 overflow-hidden rounded-xl ring-2 ring-zinc-700 shadow-lg">
              <Image
                src={profilePicture}
                alt="Profile"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
            <h3 className="text-base font-medium text-white">{username}</h3>
            <div className="w-16 h-0.5 bg-zinc-700 rounded-full mt-3"></div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 mt-2">
            <ul className="space-y-1">
              {mainNavItems.map((item, index) => (
                <li key={`main-${index}`}>
                  <Link
                    href={item.href}
                    className="flex items-center p-3 text-zinc-300 rounded-lg hover:bg-zinc-900 hover:text-white group transition-all"
                  >
                    <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-zinc-900 group-hover:bg-zinc-800 transition-all">
                      <span className="text-zinc-400 group-hover:text-white">
                        {item.icon}
                      </span>
                    </div>
                    <span className="ml-3 text-sm">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Friends section */}
            <div className="mt-6 mb-2 pl-2 text-xs font-medium text-zinc-500 uppercase tracking-wider">
              Friends
            </div>
            <ul className="space-y-1">
              {friendsNavItems.map((item, index) => (
                <li key={`friend-${index}`}>
                  <Link
                    href={item.href}
                    className="flex items-center p-3 text-zinc-300 rounded-lg hover:bg-zinc-900 hover:text-white group transition-all"
                  >
                    <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-zinc-900 group-hover:bg-zinc-800 transition-all">
                      <span className="text-zinc-400 group-hover:text-white">
                        {item.icon}
                      </span>
                    </div>
                    <span className="ml-3 text-sm">{item.label}</span>
                    {item.badge && (
                      <span className="ml-auto bg-zinc-800 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Logout button */}
          <div className="pt-4 mt-auto border-t border-zinc-800">
            <button
              className="w-full flex items-center p-3 text-zinc-300 rounded-lg hover:bg-zinc-900 hover:text-white group transition-all cursor-pointer"
              onClick={logout}
            >
              <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-zinc-900 group-hover:bg-zinc-800 transition-all">
                <LogOut
                  size={18}
                  className="text-red-400 group-hover:text-white"
                />
              </div>
              <span className="ml-3 text-sm">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile with fade animation */}
      {isMobile && (
        <div
          className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-30 transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default SideBar;
