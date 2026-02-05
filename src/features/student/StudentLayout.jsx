// src/features/student/StudentLayout.jsx
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function StudentLayout() {
  const location = useLocation();

  const hideSidebar =
    location.pathname.includes("/student/questionnaire");

  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-slate-100">
      {!hideSidebar && (
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      )}

      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
}
