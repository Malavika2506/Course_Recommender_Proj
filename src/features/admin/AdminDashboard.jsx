import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card.jsx";
import { Button } from "../../components/ui/button.jsx";
import { BarChart3, Users, Settings, FileText, HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-indigo-700 mb-6">
          Admin Dashboard
        </h1>

        <div className="grid md:grid-cols-4 gap-6">
          
          {/* Total Students */}
          <motion.div whileHover={{ scale: 1.03 }}>
            <Card className="shadow-lg rounded-2xl cursor-pointer">
              <CardHeader className="flex flex-row items-center gap-3">
                <Users className="text-indigo-600" size={30} />
                <CardTitle>Total Students</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-indigo-700">128</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Reports */}
          <motion.div whileHover={{ scale: 1.03 }}>
            <Card className="shadow-lg rounded-2xl">
              <CardHeader className="flex flex-row items-center gap-3">
                <FileText className="text-purple-600" size={30} />
                <CardTitle>Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full rounded-xl">View Reports</Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Question Manager */}
          <motion.div whileHover={{ scale: 1.03 }}>
            <Card className="shadow-lg rounded-2xl cursor-pointer">
              <CardHeader className="flex flex-row items-center gap-3">
                <HelpCircle className="text-green-600" size={30} />
                <CardTitle>Question Manager</CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  className="w-full rounded-xl bg-green-600 hover:bg-green-700"
                  onClick={() => navigate("/admin/questions")}
                >
                  Manage Questions
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* System Settings */}
          <motion.div whileHover={{ scale: 1.03 }}>
            <Card className="shadow-lg rounded-2xl">
              <CardHeader className="flex flex-row items-center gap-3">
                <Settings className="text-pink-600" size={30} />
                <CardTitle>Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full rounded-xl">
                  Open Settings
                </Button>
              </CardContent>
            </Card>
          </motion.div>

        </div>

        {/* Big Chart */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-10"
        >
          <Card className="rounded-2xl shadow-xl p-6">
            <CardHeader className="flex items-center gap-3">
              <BarChart3 className="text-indigo-700" size={28} />
              <CardTitle>Student Activity Overview</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="h-48 flex items-center justify-center text-gray-500">
                (Add Chart Here)
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
