import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./features/auth/LoginPage";
import Questionnaire from "./features/student/Questionnaire";
import ResultPage from "./features/student/ResultPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./features/admin/AdminDashboard";
import StudentDashboard from "./features/student/StudentDashboard";
import QuestionnaireInstructions from "./features/student/QuestionnaireInstruction";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Admin Dashboard */}
      <Route path="/admin" element={<AdminDashboard />} />

      {/* Student Dashboard */}
      <Route path="/student" element={<StudentDashboard />} />

      {/* Instructions Page */}
      <Route
        path="/questionnaire-instructions"
        element={
          // <ProtectedRoute>
            <QuestionnaireInstructions />
          // </ProtectedRoute>
        }
      />

      {/* Student Questionnaire */}
      <Route
        path="/questionnaire"
        element={
          // <ProtectedRoute>
            <Questionnaire />
          // </ProtectedRoute>
        }
      />

      {/* Result Page */}
      <Route
        path="/result"
        element={
          // <ProtectedRoute>
            <ResultPage />
          // </ProtectedRoute>
        }
      />

      {/* 404 Page */}
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
}

export default App;
