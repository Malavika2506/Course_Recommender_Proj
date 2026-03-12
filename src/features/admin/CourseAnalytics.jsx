import { useEffect, useState } from "react";
import { Card } from "../../components/ui/card";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from "recharts";
import { motion } from "framer-motion";
import axios from "axios";
import { 
  TrendingUp, 
  Users, 
  BookOpen, 
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Star
} from "lucide-react";

// Color Palette for Charts
const COLORS = ["#6366f1", "#8b5cf6", "#ec4899", "#f43f5e", "#f59e0b"];

// Animation Variants (Moved outside component)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 }
  }
};

// Reusable Stat Card Component (Moved outside)
const StatCard = ({ title, value, icon, color }) => (
  <motion.div 
    variants={itemVariants}
    whileHover={{ y: -5 }}
    className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start justify-between"
  >
    <div>
      <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
      <h3 className="text-3xl font-bold text-slate-900">{value}</h3>
    </div>

    <div className={`p-3 rounded-xl ${color}`}>
      {icon}
    </div>
  </motion.div>
);


export default function CourseAnalytics() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({ totalCourses: 0, totalStudents: 0, avgRating: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Analytics Data
        const res = await axios.get("http://localhost:5000/api/analytics/courses");
        
        // Format Data for Charts
        const formatted = Object.entries(res.data).map(([name, value]) => ({
          name,
          students: value
        }));

        setData(formatted);

        // Calculate Summary Stats (Mock logic if backend doesn't provide them)
        const totalCourses = formatted.length;
        const totalStudents = formatted.reduce((acc, curr) => acc + curr.students, 0);
        const avgRating = totalStudents > 0 ? (totalStudents / totalCourses).toFixed(1) : 0;

        setSummary({ totalCourses, totalStudents, avgRating });

      } catch (error) {
        console.error("Failed to fetch analytics", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="h-8 w-64 bg-slate-200 rounded animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-slate-200 rounded-xl animate-pulse"></div>
          ))}
        </div>
        <div className="h-96 bg-slate-200 rounded-xl animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto space-y-8"
      >
        {/* Header */}
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Course Analytics
            </h1>
            <p className="text-slate-500 mt-1">Overview of student engagement and course performance</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm">
            <Activity size={16} />
            <span>Last updated: Just now</span>
          </div>
        </div>

        {/* Stats Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <StatCard 
            title="Total Courses" 
            value={summary.totalCourses} 
            icon={<BookOpen className="text-indigo-600" />}
            color="bg-indigo-50"
            
            
          />
          <StatCard 
            title="Total Students" 
            value={summary.totalStudents} 
            icon={<Users className="text-purple-600" />}
            color="bg-purple-50"
            
            
          />
          <StatCard 
            title="Avg. Engagement" 
            value={`${summary.avgRating}/5`} 
            icon={<Star className="text-pink-600" />}
            color="bg-pink-50"
          />
        </motion.div>

        {/* Main Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Area Chart */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-800">Student Enrollment Trends</h3>
              <button className="text-sm text-indigo-600 font-medium hover:underline">View Report</button>
            </div>
            
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748b', fontSize: 12 }} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748b', fontSize: 12 }} 
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      borderRadius: '8px', 
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="students" 
                    stroke="#6366f1" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorStudents)" 
                    animationDuration={1500}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Distribution Pie Chart */}
          <motion.div 
            variants={itemVariants}
            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100"
          >
            <h3 className="text-lg font-bold text-slate-800 mb-6">Course Distribution</h3>
            <div className="h-64 w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="students"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              {/* Center Text for Donut */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                  <span className="block text-2xl font-bold text-slate-800">{data.length}</span>
                  <span className="text-xs text-slate-500">Courses</span>
                </div>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              {data.slice(0, 3).map((entry, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                    <span className="text-slate-600">{entry.name}</span>
                  </div>
                  <span className="font-semibold text-slate-800">{entry.students}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}