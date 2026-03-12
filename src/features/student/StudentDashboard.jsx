import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ClipboardList,
  BookOpen,
  Clock,
  Star,
  User,
  TrendingUp,
  Award,
  Target,
  Zap,
  ChevronRight,
  Bell,
  Search,
  Menu,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function StudentDashboard() {
  const navigate = useNavigate();

  const [hasAttempted, setHasAttempted] = useState(false);
  const [time, setTime] = useState(new Date());
  const [studentName, setStudentName] = useState("");
  const [courseCount, setCourseCount] = useState(0);
  const [score, setScore] = useState(0);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [recommendedCourse, setRecommendedCourse] = useState("");


  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    if (hour < 21) return "Good Evening";
    return "Good Night";
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileRes = await axios.get(
          "http://localhost:5000/api/auth/student-profile",
          { withCredentials: true },
        );
        setStudentName(profileRes.data.name);

      const resultRes = await axios.get(
  "http://localhost:5000/api/result/me",
  { withCredentials: true },
);

if (resultRes.data?.recommendedCourse) {
  setHasAttempted(true);
  setScore(resultRes.data.score || 0);
  setRecommendedCourse(resultRes.data.recommendedCourse.name);
}



        const courseRes = await axios.get("http://localhost:5000/api/courses");
        setCourseCount(courseRes.data.length);
      } catch (error) {
        console.log("Dashboard load failed");
      }
    };

    fetchData();

    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatDate = time.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formatTime = time.toLocaleTimeString();

  const handleQuestionnaire = () => {
      navigate("questionnaire-instructions");
  
  };

const cards = [
  {
    title: "Questionnaire",
    icon: <ClipboardList size={26} />,
    color: "from-blue-500 to-indigo-600",
    action: () => navigate("questionnaire-instructions"),
    button: "Start Assessment",
    status: hasAttempted ? "Retake Available" : "Pending",
    gradient: "from-blue-500/20 to-indigo-600/20",
  },
  {
    title: "Courses",
    icon: <BookOpen size={26} />,
    color: "from-purple-500 to-pink-600",
    action: () => navigate("courses"),
    button: "View Courses",
    status: `${courseCount} Available`,
    gradient: "from-purple-500/20 to-pink-600/20",
  },
  {
    title: "Progress",
    icon: <TrendingUp size={26} />,
    color: "from-emerald-500 to-teal-600",
    action: () => navigate("result"),
    button: "View Result",
    status: hasAttempted
      ? `Recommended: ${recommendedCourse}`
      : "Assessment Not Completed",
    gradient: "from-emerald-500/20 to-teal-600/20",
  },
];




  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const scaleItem = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* BACKGROUND BLOBS */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-900/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-900/30 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] left-[20%] w-[400px] h-[400px] bg-blue-900/20 rounded-full blur-[100px]" />
      </div>

      {/* HEADER */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Search */}
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="lg:hidden p-2 rounded-lg hover:bg-white/10"
              >
                {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
              </motion.button>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
                  <User className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold hidden sm:block">Student Dashboard</span>
              </div>

            </div>

        
          </div>
        </div>
      </motion.header>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div variants={container} initial="hidden" animate="visible">
          {/* GREETING SECTION */}
          <motion.div variants={item} className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <motion.h1
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="text-3xl md:text-4xl font-bold flex items-center gap-3"
                >
                  <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    {getGreeting()},
                  </span>
                  <span className="text-white">{studentName || "Student"}</span>
                </motion.h1>
                <p className="text-slate-400 mt-2 text-lg">
                  Welcome back to your learning dashboard
                </p>
              </div>

              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="flex items-center gap-3 bg-slate-800/50 px-4 py-3 rounded-xl border border-white/10"
              >
                <Clock className="text-indigo-400" size={20} />
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400">Today</span>
                  <span className="text-sm font-semibold">{formatDate}</span>
                </div>
                <span className="text-slate-600">•</span>
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400">Time</span>
                  <span className="text-sm font-semibold">{formatTime}</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* PROGRESS BANNER */}
          <motion.div
            variants={item}
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6 rounded-2xl shadow-2xl mb-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px]" />
            <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Star className="text-yellow-400" size={24} />
                  <h2 className="text-xl font-bold">Your Progress</h2>
                </div>
                <p className="text-sm opacity-90">
                  {hasAttempted
                    ? `🎉 You completed the assessment! `
                    : "Complete the questionnaire to get personalized course recommendations."}
                </p>
              </div>

              <motion.div
                whileHover={{ rotate: 10 }}
                className="bg-white/20 p-4 rounded-xl"
              >
                <Target className="text-white" size={40} />
              </motion.div>
            </div>
          </motion.div>

        

          {/* ACTION CARDS */}
          <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
>
            {cards.map((card, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -8, scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="relative group cursor-pointer p-6 rounded-2xl text-white shadow-xl overflow-hidden"
                onClick={card.action}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-90`} />
                <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient}`} />

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-lg font-semibold">{card.title}</span>
                    <div className="p-2 bg-white/20 rounded-lg">
                      {card.icon}
                    </div>
                  </div>

                  <p className="text-sm opacity-80 mb-4">{card.status}</p>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg text-sm hover:bg-white/30 transition"
                  >
                    {card.button}
                    <ChevronRight size={16} />
                  </motion.button>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </motion.div>

        
        </motion.div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="fixed inset-0 z-50 bg-slate-900/95 backdrop-blur-xl lg:hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold">Menu</h2>
                <button
                  onClick={() => setShowMobileMenu(false)}
                  className="p-2 hover:bg-slate-800 rounded-lg"
                >
                  <X size={24} />
                </button>
              </div>

              <nav className="space-y-4">
                {[
                  { name: "Dashboard", icon: User, action: () => navigate("dashboard") },
                  { name: "Courses", icon: BookOpen, action: () => navigate("courses") },
                  { name: "Assessment", icon: ClipboardList, action: handleQuestionnaire },
                  { name: "Progress", icon: TrendingUp, action: () => navigate("progress") },
                  { name: "Achievements", icon: Award, action: () => navigate("achievements") },
                ].map((item, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ x: 10 }}
                    onClick={item.action}
                    className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-slate-800 transition-colors"
                  >
                    <item.icon size={24} className="text-indigo-400" />
                    <span className="text-lg font-medium">{item.name}</span>
                  </motion.button>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}