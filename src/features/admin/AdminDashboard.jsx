import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/card.jsx";
import { Button } from "../../components/ui/button.jsx";
import { BarChart3, Users, FileText, HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-indigo-700 mb-6">
          Admin Dashboard
        </h1>

        <div className="grid md:grid-cols-4 gap-6">
          <Card className="shadow-lg rounded-2xl">
            <CardHeader className="flex gap-3 flex-row items-center">
              <Users className="text-indigo-600" size={30} />
              <CardTitle>Total Students</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-indigo-700">128</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg rounded-2xl">
            <CardHeader className="flex gap-3 flex-row items-center">
              <FileText className="text-purple-600" size={30} />
              <CardTitle>Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full rounded-xl">View Reports</Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg rounded-2xl">
            <CardHeader className="flex gap-3 flex-row items-center">
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

          <Card className="shadow-lg rounded-2xl">
            <CardHeader className="flex gap-3 flex-row items-center">
              <BarChart3 className="text-pink-600" size={30} />
              <CardTitle>Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                className="w-full rounded-xl"
                onClick={() => navigate("/admin/analytics")}
              >
                View Analytics
              </Button>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
