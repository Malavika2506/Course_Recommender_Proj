
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { Menu } from "lucide-react";
import { useState } from "react";

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Sidebar Component */}
      <AdminSidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col w-full">
        
        {/* Mobile Header (Toggle Button) - Visible only on small screens */}
        <div className="lg:hidden bg-white shadow-md p-4 flex items-center justify-between sticky top-0 z-30">
          <h2 className="text-lg font-bold text-indigo-600">Admin Panel</h2>
          <button 
            onClick={toggleSidebar} 
            className="text-slate-800 hover:text-indigo-600 transition"
          >
            <Menu size={28} />
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-4 sm:p-6 lg:p-4 overflow-y-auto">
          <Outlet />
        </div>

      </div>
    </div>
  );
}