// // src/features/student/StudentLayout.jsx
// import { useState } from "react";
// import { Outlet, useLocation } from "react-router-dom";
// import Sidebar from "./Sidebar";

// export default function StudentLayout() {
//   const location = useLocation();

//   const hideSidebar =
//     location.pathname.includes("/student/questionnaire");

//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   return (
//     <div className="flex min-h-screen bg-slate-100">
//       {!hideSidebar && (
//         <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
//       )}

//       <div className="flex-1 p-0">
//         <Outlet />
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Menu } from "lucide-react";

export default function StudentLayout() {
  const location = useLocation();

  // Hide sidebar on questionnaire pages
  const hideSidebar =
    location.pathname.includes("/student/questionnaire");

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Sidebar Component */}
      {!hideSidebar && (
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      )}

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col w-full">
        
        {/* Mobile Header (Toggle Button) - Visible only on small screens */}
        {!hideSidebar && (
          <div className="lg:hidden bg-white shadow-md p-4 flex items-center justify-between sticky top-0 z-30">
            <h2 className="text-lg font-bold text-pink-600">Student Panel</h2>
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)} 
              className="text-slate-800 hover:text-pink-600 transition"
            >
              <Menu size={28} />
            </button>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>

      </div>
    </div>
  );
}