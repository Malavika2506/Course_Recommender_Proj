// import { Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// export default function ProtectedRoute({ children, role }) {
//   const { user } = useSelector((state) => state.auth);

//   if (!user) return <Navigate to="/login" />;

//   if (role && user.role !== role) {
//     return <Navigate to="/login" />;
//   }

//   return children;
// }

import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ children, role }) {
  const user = useSelector((state) => state.auth?.user);

  // If user not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If role is required and user role does not match
  if (role && user.role !== role) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
