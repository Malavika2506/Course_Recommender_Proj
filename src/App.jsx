import { Routes, Route } from "react-router-dom";

/* ---------- PUBLIC ---------- */
import HomePage from "./pages/HomePage";
import LoginPage from "./features/auth/LoginPage";

/* ---------- AUTH ---------- */
import ProtectedRoute from "./components/ProtectedRoute";

/* ---------- ADMIN ---------- */
import AdminLayout from "./features/admin/AdminLayout";
import AdminDashboard from "./features/admin/AdminDashboard";
import QuestionManager from "./features/admin/QuestionManager";
import CourseAnalytics from "./features/admin/CourseAnalytics";
import StudentList from "./features/admin/StudentList";

/* ---------- STUDENT ---------- */
import StudentLayout from "./features/student/StudentLayout";
import StudentDashboard from "./features/student/StudentDashboard";
import QuestionnaireInstructions from "./features/student/QuestionnaireInstruction";
import Questionnaire from "./features/student/Questionnaire";
import ResultPage from "./features/student/ResultPage";
import CourseDetails from "./features/student/CourseDetails";

function App() {
  return (
    <Routes>
      {/* ========== PUBLIC ROUTES ========== */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* ========== ADMIN ROUTES ========== */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="questions" element={<QuestionManager />} />
        <Route path="analytics" element={<CourseAnalytics />} />
        <Route path="students" element={<StudentList />} />
      </Route>

      {/* ========== STUDENT ROUTES ========== */}
      <Route
        path="/student"
        element={
          <ProtectedRoute role="student">
            <StudentLayout />
          </ProtectedRoute>
        }
      >
        {/* Dashboard */}
        <Route index element={<StudentDashboard />} />

        {/* Instructions */}
        <Route
          path="questionnaire-instructions"
          element={<QuestionnaireInstructions />}
        />

        {/* Questionnaire */}
        <Route path="questionnaire" element={<Questionnaire />} />

        {/* Result */}
        <Route path="result" element={<ResultPage />} />

        {/* Course Details */}
        <Route path="courses" element={<CourseDetails />} />
      </Route>

      {/* ========== 404 ========== */}
      <Route
        path="*"
        element={<h1 className="text-center mt-20">404 | Page Not Found</h1>}
      />
    </Routes>
  );
}

export default App;
