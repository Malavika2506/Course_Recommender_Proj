import {
  LayoutDashboard,
  ClipboardList,
  Award,
  BookOpen,
  LogOut,
  X,
  User,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar({ open, setOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-slate-900 text-white p-6 
        transform transition-transform duration-300 ease-in-out z-50
        overflow-y-auto
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen lg:w-64`}
      >
        {/* Logo Section */}
        <div className="flex justify-between items-center mb-8 lg:hidden">
          <h2 className="text-xl font-bold text-pink-400">Student Panel</h2>
          <button onClick={() => setOpen(false)} className="text-white">
            <X size={26} />
          </button>
        </div>

        <h2 className="hidden lg:block text-2xl font-bold mb-8 text-pink-400">
          Student Panel
        </h2>

        <div className="space-y-2">
          <SidebarItem
            icon={<LayoutDashboard />}
            text="Dashboard"
            path="/student"
            isActive={isActive("/student")}
            onClick={() => {
              setOpen(false);
              navigate("/student");
            }}
          />

          <SidebarItem
            icon={<ClipboardList />}
            text="Questionnaire"
            path="/student/questionnaire-instructions"
            isActive={isActive("/student/questionnaire-instructions")}
            onClick={() => {
              setOpen(false);
              navigate("/student/questionnaire-instructions");
            }}
          />

          <SidebarItem
            icon={<Award />}
            text="Your Results"
            path="/student/result"
            isActive={isActive("/student/result")}
            onClick={() => {
              setOpen(false);
              navigate("/student/result");
            }}
          />

          <SidebarItem
            icon={<BookOpen />}
            text="Course Details"
            path="/student/courses"
            isActive={isActive("/student/courses")}
            onClick={() => {
              setOpen(false);
              navigate("/student/courses");
            }}
          />

          <SidebarItem
            icon={<User />}
            text="Profile"
            path="/student/profile"
            isActive={isActive("/student/profile")}
            onClick={() => {
              setOpen(false);
              navigate("/student/profile");
            }}
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

      {/* Mobile Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
        />
      )}
    </>
  );
}

function SidebarItem({ icon, text, path, isActive, onClick, danger }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 w-full p-3 rounded-xl transition-all duration-200 text-left
        ${
          isActive
            ? "bg-gradient-to-r from-pink-600 to-pink-500 shadow-lg shadow-pink-500/30"
            : danger
              ? "hover:bg-red-600"
              : "hover:bg-slate-700"
        }`}
    >
      <span className={`${isActive ? "text-white" : "text-slate-300"}`}>
        {icon}
      </span>
      <span
        className={`font-medium ${isActive ? "text-white" : "text-slate-300"}`}
      >
        {text}
      </span>
    </button>
  );
}
