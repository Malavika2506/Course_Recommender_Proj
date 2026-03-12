import {
  LayoutDashboard,
  HelpCircle,
  Users,
  BarChart3,
  LogOut,
  BookOpen,
  X,
  Settings,
} from "lucide-react";

import { useNavigate, useLocation } from "react-router-dom";

export default function AdminSidebar({ isOpen, onToggle }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-slate-900 text-white p-6 
        transform transition-transform duration-300 ease-in-out z-50
        overflow-y-auto
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen lg:w-64`}
      >
        {/* Desktop Title */}
        <h2 className="hidden lg:block text-2xl font-bold mb-8 text-indigo-400">
          Admin Panel
        </h2>

        {/* Mobile Title */}
        <div className="flex justify-between items-center mb-8 lg:hidden">
          <h2 className="text-xl font-bold text-indigo-400">Admin Panel</h2>
          <button onClick={onToggle} className="text-white">
            <X size={26} />
          </button>
        </div>

        <div className="space-y-3">
          <SidebarItem
            icon={<LayoutDashboard />}
            text="Dashboard"
            active={location.pathname === "/admin"}
            onClick={() => navigate("/admin")}
          />

          <SidebarItem
            icon={<Users />}
            text="Students"
            active={location.pathname === "/admin/students"}
            onClick={() => navigate("/admin/students")}
          />

          <SidebarItem
            icon={<HelpCircle />}
            text="Question Manager"
            active={location.pathname === "/admin/questions"}
            onClick={() => navigate("/admin/questions")}
          />

          <SidebarItem
            icon={<BookOpen />}
            text="Courses"
            active={location.pathname === "/admin/courses"}
            onClick={() => navigate("/admin/courses")}
          />

          <SidebarItem
            icon={<BarChart3 />}
            text="Course Analytics"
            active={location.pathname === "/admin/analytics"}
            onClick={() => navigate("/admin/analytics")}
          />

          <SidebarItem
            icon={<Settings />}
            text="Settings"
            active={location.pathname === "/admin/settings"}
            onClick={() => navigate("/admin/settings")}
          />

          <SidebarItem
            icon={<LogOut />}
            text="Logout"
            danger
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
          />
        </div>
      </div>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          onClick={onToggle}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
        />
      )}
    </>
  );
}

function SidebarItem({ icon, text, onClick, danger, active }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 w-full p-3 rounded-xl transition text-left
      ${
        active
          ? "bg-indigo-600 text-white shadow-lg"
          : danger
          ? "text-white hover:bg-red-600"
          : "text-white hover:bg-slate-700"
      }`}
    >
      <span>{icon}</span>
      <span className="font-medium">{text}</span>
    </button>
  );
}
