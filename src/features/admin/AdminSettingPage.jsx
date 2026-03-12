import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  Building2,
  MapPin,
  Globe,
  Phone,
  Save,
  CheckCircle,
  Loader2,
  Camera,
  Shield,
} from "lucide-react";

export default function AdminSettingsPage() {
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    password: "",
    companyName: "",
    address: "",
    location: "",
    phone: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Fetch admin profile
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          "http://localhost:5000/api/auth/admin-profile",
          { withCredentials: true },
        );

        setProfile({
          username: res.data.name || "",
          email: res.data.email || "",
          password: "",
          companyName: res.data.companyName || "",
          address: res.data.address || "",
          location: res.data.location || "",
          phone: res.data.phone || "",
        });
      } catch (error) {
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await axios.put("http://localhost:5000/api/auth/update-admin", profile, {
        withCredentials: true,
      });
      toast.success("Settings updated successfully!");
      setShowModal(true);
    } catch (error) {
      toast.error("Failed to update settings");
    } finally {
      setSaving(false);
    }
  };

  // Animation variants
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

  const modalVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
    exit: {
      scale: 0.8,
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 size={48} className="text-indigo-400" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 p-4">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-4xl mx-auto"
      >
        {/* Profile Card */}
        <motion.div
          variants={itemVariants}
          className="bg-white/10 backdrop-blur-lg rounded-3xl p-4 shadow-2xl border border-white/20"
        >
          {/* Profile Header */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6 mb-8 pb-6 border-b border-white/10">
            {/* Avatar */}
            <div className="flex justify-center sm:justify-start">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20">
                {/* Profile Circle */}
                <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl sm:text-2xl font-bold">
                  {profile.username?.charAt(0).toUpperCase() || "A"}
                </div>

                {/* Camera Icon */}
                <button className="absolute -bottom-1 -right-1 p-1.5 sm:p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-colors border border-white/20">
                  <Camera size={14} className="text-white sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>

            {/* User Info */}
            <div className="text-center sm:text-left w-full">
              {/* Username */}
              <h2 className="text-xl sm:text-2xl font-bold text-white break-words">
                {profile.username || "Admin"}
              </h2>

              {/* Email */}
              <div className="flex items-center justify-center sm:justify-start gap-2 mt-1">
                <Mail size={14} className="text-slate-400 flex-shrink-0" />

                <p className="text-slate-400 text-sm sm:text-base truncate max-w-[200px] sm:max-w-[280px] md:max-w-[360px] lg:max-w-[420px]">
                  {profile.email || "admin@example.com"}
                </p>
              </div>

              {/* Status Tags */}
              <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-3">
                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs sm:text-sm font-medium">
                  Active
                </span>

                <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-xs sm:text-sm font-medium">
                  Administrator
                </span>
              </div>
            </div>
          </div>

          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Username */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                <User size={16} className="inline mr-2" />
                Username
              </label>
              <input
                name="username"
                value={profile.username}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                placeholder="Enter username"
              />
            </motion.div>

            {/* Email */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                <Mail size={16} className="inline mr-2" />
                Email Address
              </label>
              <input
                value={profile.email}
                readOnly
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-3 text-slate-400 cursor-not-allowed"
                placeholder="Email cannot be changed"
              />
            </motion.div>

            {/* Password */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                <Lock size={16} className="inline mr-2" />
                Change Password
              </label>
              <input
                type="password"
                name="password"
                value={profile.password}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                placeholder="Leave blank to keep current"
              />
            </motion.div>

            {/* Company Name */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                <Building2 size={16} className="inline mr-2" />
                Company Name
              </label>
              <input
                name="companyName"
                value={profile.companyName}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                placeholder="Enter company name"
              />
            </motion.div>

            {/* Address */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                <MapPin size={16} className="inline mr-2" />
                Address
              </label>
              <input
                name="address"
                value={profile.address}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                placeholder="Enter address"
              />
            </motion.div>

            {/* Location */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                <Globe size={16} className="inline mr-2" />
                Location
              </label>
              <input
                name="location"
                value={profile.location}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                placeholder="City, Country"
              />
            </motion.div>

            {/* Phone */}
            <motion.div variants={itemVariants} className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                <Phone size={16} className="inline mr-2" />
                Phone Number
              </label>
              <input
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                placeholder="+1 (555) 000-0000"
              />
            </motion.div>
          </div>

          {/* Save Button */}
          <motion.div variants={itemVariants} className="mt-8">
            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={20} />
                  Save Changes
                </>
              )}
            </button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Success Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10 shadow-2xl rounded-3xl p-8 w-full max-w-md mx-4 relative overflow-hidden"
            >
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

              {/* Success Icon */}
              <div className="relative flex justify-center mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30"
                >
                  <CheckCircle size={40} className="text-white" />
                </motion.div>
              </div>

              {/* Content */}
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-2xl font-bold text-white text-center mb-2"
              >
                Settings Updated!
              </motion.h2>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-slate-400 text-center mb-8"
              >
                Your admin settings have been updated successfully.
              </motion.p>

              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                onClick={() => setShowModal(false)}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-indigo-500/30"
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
