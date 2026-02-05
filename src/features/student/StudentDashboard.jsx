// src/features/student/StudentDashboard.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { ClipboardList, Award, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function StudentDashboard() {
  const navigate = useNavigate();

  // later replace this with backend check
  const [hasAttempted, setHasAttempted] = useState(false);

  useEffect(() => {
    // TEMP: check if result exists (replace with API later)
    const attempted = localStorage.getItem("hasAttempted");
    if (attempted) setHasAttempted(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-blue-700 mb-6">
          Student Dashboard
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Questionnaire */}
          <motion.div whileHover={{ scale: 1.03 }}>
            <Card className="shadow-lg rounded-2xl">
              <CardHeader className="flex items-center gap-3">
                <ClipboardList className="text-blue-600" size={28} />
                <CardTitle>Course Questionnaire</CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  className="w-full rounded-xl"
                  onClick={() =>
                    navigate(
                      hasAttempted
                        ? "questionnaire"
                        : "questionnaire-instructions"
                    )
                  }
                >
                  {hasAttempted ? "Restart Questionnaire" : "Start Now"}
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* View Result */}
          <motion.div whileHover={{ scale: 1.03 }}>
            <Card className="shadow-lg rounded-2xl">
              <CardHeader className="flex items-center gap-3">
                <Award className="text-green-600" size={28} />
                <CardTitle>Your Results</CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  variant="outline"
                  className="w-full rounded-xl"
                  onClick={() => navigate("result")}
                >
                  View Result
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Logout */}
          <motion.div whileHover={{ scale: 1.03 }}>
            <Card className="shadow-lg rounded-2xl">
              <CardHeader className="flex items-center gap-3">
                <LogOut className="text-red-600" size={28} />
                <CardTitle>Logout</CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  variant="destructive"
                  className="w-full rounded-xl"
                  onClick={() => {
                    localStorage.clear();
                    navigate("/login");
                  }}
                >
                  Logout
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
