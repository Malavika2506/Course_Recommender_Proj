import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Users,
  HelpCircle,
  BarChart3,
  BookOpen,
  LayoutDashboard,
  Clock,
  TrendingUp,
  TrendingDown,
  Activity,
  Bell,
  Search,
  Menu,
  X,
  ChevronRight,
  Zap,
  Shield,
  Star,
  Calendar,
  Mail,
  Phone,
  MapPin,
  LogOut,
  Settings,
  User,
  ArrowRight,
} from "lucide-react";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [students, setStudents] = useState(0);
  const [coursesCount, setCoursesCount] = useState(0);
  const [questionsCount, setQuestionsCount] = useState(0);
  const [analytics, setAnalytics] = useState("0%");

  const [companyName, setCompanyName] = useState("Company");

  const [adminInfo, setAdminInfo] = useState({
    email: "",
    phone: "",
    location: "",
  });

  const [activityFeed, setActivityFeed] = useState([]);

  const [time, setTime] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  /* ---------------- FETCH DATA ---------------- */
  useEffect(() => {
    const loadData = async () => {
      try {
        await Promise.all([
          fetchStudents(),
          fetchCourses(),
          fetchQuestions(),
          fetchProfile(),
          fetchRecentActivity(),
        ]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadData();

    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const total = students + coursesCount + questionsCount;

    if (total > 0) {
      const percent = Math.min(100, Math.round((students / total) * 100));
      setAnalytics(`${percent}%`);
    }
  }, [students, coursesCount, questionsCount]);

  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/courses");

      setCoursesCount(res.data.length || 0);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchQuestions = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/questions");

      setQuestionsCount(res.data.length || 0);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchRecentActivity = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/result/activity", {
        withCredentials: true,
      });

      const activity = res.data.map((r) => {
        const dateObj = new Date(r.updatedAt);

        return {
          id: r._id,
          user: r.studentId?.name || "Student",
          action: "Completed Exam",
          course: r.recommendedCourse?.name || "Course",
          time: dateObj.toLocaleTimeString(),
          date: dateObj.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
          avatar: r.studentId?.name?.charAt(0) || "S",
        };
      });

      setActivityFeed(activity);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users", {
        withCredentials: true,
      });

      const users = res.data || [];

      setStudents(users.length);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/auth/admin-profile",
        { withCredentials: true },
      );

      const data = res.data;

      setCompanyName(data.companyName || "Company");

      setAdminInfo({
        email: data.email || "",
        phone: data.phone || "",
        location: data.location || "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  /* ---------------- GREETING ---------------- */

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const formatDate = time.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formatTime = time.toLocaleTimeString();

  /* ---------------- DASHBOARD CARDS ---------------- */

  const cards = [
    {
      title: "Total Students",
      value: students,
      icon: <Users size={28} />,
      color: "from-indigo-500 to-indigo-700",
      action: () => navigate("/admin/students"),
    },
    {
      title: "Active Courses",
      value: coursesCount,
      icon: <BookOpen size={28} />,
      color: "from-purple-500 to-purple-700",
      action: () => navigate("/admin/courses"),
    },
    {
      title: "Questions",
      value: questionsCount,
      icon: <HelpCircle size={28} />,
      color: "from-green-500 to-green-700",
      action: () => navigate("/admin/questions"),
    },
    {
      title: "Analytics",
      value: analytics,
      icon: <BarChart3 size={28} />,
      color: "from-pink-500 to-pink-700",
      action: () => navigate("/admin/analytics"),
    },
  ];

  /* ---------------- ANIMATION VARIANTS ---------------- */

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Activity size={48} className="text-indigo-600" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-2xl"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <LayoutDashboard className="text-white" size={20} />
                  </div>
                  <span className="font-bold text-lg text-gray-800">
                    {companyName}
                  </span>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X size={20} className="text-gray-600" />
                </button>
              </div>

              <nav className="space-y-2">
                {[
                  { icon: LayoutDashboard, label: "Dashboard", active: true },
                  { icon: Users, label: "Students" },
                  { icon: BookOpen, label: "Courses" },
                  { icon: HelpCircle, label: "Questions" },
                  { icon: BarChart3, label: "Analytics" },
                  { icon: Settings, label: "Settings" },
                  { icon: LogOut, label: "Logout" },
                ].map((item, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      item.active
                        ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <item.icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </motion.button>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-40"
          />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex">
        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-7xl mx-auto"
          >
            {/* Header */}
            <motion.div variants={itemVariants} className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className="lg:hidden p-2 hover:bg-white rounded-lg shadow-sm"
                  >
                    <Menu size={24} className="text-gray-700" />
                  </button>
                  <div>
                    <div className="flex items-center gap-3">
                      <LayoutDashboard className="text-indigo-600" size={34} />
                      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
                        Admin Dashboard
                      </h1>
                    </div>
                    <p className="text-lg text-gray-600 font-medium mt-1">
                      {getGreeting()},{" "}
                      <span className="text-indigo-600 font-semibold">
                        {companyName}
                      </span>{" "}
                      👋
                    </p>
                  </div>
                </div>
              </div>

              {/* Date & Time */}
              <div className="flex flex-wrap items-center gap-2 text-gray-500 text-sm">
                <Clock size={16} />
                <span>{formatDate}</span>
                <span className="mx-2">•</span>
                <span>{formatTime}</span>
              </div>
            </motion.div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {cards.map((card, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover={{ y: -5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={card.action}
                  className={`cursor-pointer p-6 rounded-2xl text-white shadow-xl bg-gradient-to-r ${card.color} relative overflow-hidden group`}
                >
                  {/* Background decoration */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500"></div>

                  <div className="relative">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-sm opacity-90 font-medium">
                          {card.title}
                        </p>
                        {card.value !== undefined && (
                          <h2 className="text-3xl font-bold mt-2">
                            {card.value}
                          </h2>
                        )}
                      </div>
                      <div className="bg-white/20 p-3 rounded-xl group-hover:scale-110 transition-transform">
                        {card.icon}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Activity Feed */}
              <motion.div
                variants={itemVariants}
                className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-800">
                    Recent Activity
                  </h2>
                  <button className="text-indigo-600 text-sm font-medium hover:underline flex items-center gap-1">
                    View All <ChevronRight size={16} />
                  </button>
                </div>

                <div className="space-y-3">
                  {activityFeed?.map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-xl transition-colors"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {activity.avatar}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">
                          {activity.user}
                        </p>
                        <p className="text-sm text-gray-600">
                          {activity.action} -{" "}
                          <span className="text-indigo-600">
                            {activity.course}
                          </span>
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-400">{activity.time}</p>
                        <p className="text-xs text-gray-500">{activity.date}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                variants={itemVariants}
                className="bg-white rounded-2xl shadow-xl p-6"
              >
                <h2 className="text-xl font-bold text-gray-800 mb-6">
                  Quick Actions
                </h2>
                <div className="space-y-3">
                  {[
                    {
                      icon: BookOpen,
                      label: "Create Course",
                      color: "bg-purple-500",
                    },
                    {
                      icon: HelpCircle,
                      label: "Add Question",
                      color: "bg-green-500",
                    },
                    {
                      icon: BarChart3,
                      label: "View Reports",
                      color: "bg-pink-500",
                    },
                  ].map((action, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        if (action.label === "Create Course")
                          navigate("/admin/courses");
                        if (action.label === "Add Question")
                          navigate("/admin/questions");
                        if (action.label === "View Reports")
                          navigate("/admin/analytics");
                      }}
                      className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-lg text-white ${action.color}`}
                        >
                          <action.icon size={18} />
                        </div>
                        <span className="font-medium text-gray-700">
                          {action.label}
                        </span>
                      </div>

                      <ArrowRight size={16} className="text-gray-400" />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Bottom Info Section */}
            <motion.div
              variants={itemVariants}
              className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {/* Support */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="text-indigo-600" />
                  <h3 className="font-bold text-gray-800">Support</h3>
                </div>
                <p className="text-sm text-gray-600">{adminInfo.email}</p>
              </div>

              {/* Contact */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Phone className="text-green-600" />
                  <h3 className="font-bold text-gray-800">Contact</h3>
                </div>
                <p className="text-sm text-gray-600">{adminInfo.phone}</p>
              </div>

              {/* Location */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="text-pink-600" />
                  <h3 className="font-bold text-gray-800">Location</h3>
                </div>
                <p className="text-sm text-gray-600">{adminInfo.location}</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
