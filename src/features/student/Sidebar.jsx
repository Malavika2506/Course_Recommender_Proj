// src/features/student/Sidebar.jsx
import { ClipboardList, Award, BookOpen, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ open, setOpen }) {
  const navigate = useNavigate();

  return (
    <div className={`bg-slate-900 text-white w-64 p-6 transition-all`}>
      <h2 className="text-2xl font-bold mb-8 text-pink-400">Student Panel</h2>

      <div className="space-y-4">
        <SidebarItem
          icon={<ClipboardList />}
          text="Questionnaire"
          onClick={() => {
            setOpen(false);
            navigate("questionnaire-instructions");
          }}
        />

      <SidebarItem
  icon={<Award />}
  text="Your Results"
  onClick={() => {
    setOpen(false);
    navigate("/student/result");
  }}
/>
 

        <SidebarItem
          icon={<BookOpen />}
          text="Course Details"
          onClick={() => navigate("/courses")}
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
      className={`flex items-center gap-3 w-full p-3 rounded-xl
        ${danger ? "hover:bg-red-600" : "hover:bg-slate-700"}`}
    >
      {icon}
      <span>{text}</span>
    </button>
  );
}
