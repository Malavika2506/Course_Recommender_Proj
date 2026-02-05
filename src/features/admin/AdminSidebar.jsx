import {
  LayoutDashboard,
  HelpCircle,
  Users,
  BarChart3,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdminSidebar() {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-900 text-white w-64 p-6 min-h-screen">
      <h2 className="text-2xl font-bold mb-8 text-indigo-400">
        Admin Panel
      </h2>

      <div className="space-y-4">
        <SidebarItem
          icon={<LayoutDashboard />}
          text="Dashboard"
          onClick={() => navigate("/admin")}
        />

        <SidebarItem
          icon={<Users />}
          text="Students"
          onClick={() => navigate("/admin/students")}
        />

        <SidebarItem
          icon={<HelpCircle />}
          text="Question Manager"
          onClick={() => navigate("/admin/questions")}
        />

        <SidebarItem
          icon={<BarChart3 />}
          text="Course Analytics"
          onClick={() => navigate("/admin/analytics")}
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
  );
}

function SidebarItem({ icon, text, onClick, danger }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 w-full p-3 rounded-xl transition
        ${danger ? "hover:bg-red-600" : "hover:bg-slate-700"}`}
    >
      {icon}
      <span>{text}</span>
    </button>
  );
}
