import { useState, useEffect } from "react";
import axios from "axios";
import { User, Mail, Phone, MapPin, Lock, Save, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    location: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [error, setError] = useState("");

  /* =========================
     FETCH STUDENT PROFILE
  ========================== */

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          "http://localhost:5000/api/auth/student-profile",
          { withCredentials: true }
        );

        setProfile({
          name: res.data.name || "",
          email: res.data.email || "",
          phone: res.data.phone || "",
          address: res.data.address || "",
          location: res.data.location || "",
          password: "",
        });

      } catch (error) {
        console.log("Failed to load profile");
        setError("Failed to load profile data");
        setShowErrorModal(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  /* =========================
     INPUT HANDLER
  ========================== */

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  /* =========================
     SAVE PROFILE
  ========================== */

  const saveProfile = async () => {
    try {
      setSaving(true);

      const payload = {
        name: profile.name,
        phone: profile.phone,
        address: profile.address,
        location: profile.location,
      };

      if (profile.password) {
        payload.password = profile.password;
      }

      await axios.put(
        "http://localhost:5000/api/auth/update-student",
        payload,
        { withCredentials: true }
      );

      setProfile({ ...profile, password: "" });
      setShowSuccessModal(true);

    } catch (error) {
      console.log("Failed to update profile");
      setError("Failed to update profile");
      setShowErrorModal(true);
    } finally {
      setSaving(false);
    }
  };

  /* =========================
     MODAL VARIANTS
  ========================== */

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.9, y: 20 }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <Loader2 className="w-12 h-12 text-indigo-500 animate-spin" />
          <p className="text-slate-400">Loading profile...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 relative overflow-hidden">
      {/* BACKGROUND BLOBS */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold flex items-center gap-3">
            <div className="p-3 bg-indigo-600/20 rounded-xl">
              <User className="w-8 h-8 text-indigo-400" />
            </div>
            <span>Profile Settings</span>
          </h2>
          <p className="text-slate-400 mt-2">Manage your personal information</p>
        </motion.div>

        {/* PROFILE CARD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl"
        >
          {/* ROW 1: Full Name (Full Width) */}
          <div className="mb-6">
            <label className="text-sm text-slate-400 flex items-center gap-2 mb-2">
              <User size={16} /> Full Name
            </label>
            <input
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="w-full p-4 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              placeholder="Enter your full name"
            />
          </div>

          {/* ROW 2: Email & Phone (Side by Side) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="text-sm text-slate-400 flex items-center gap-2 mb-2">
                <Mail size={16} /> Email Address
              </label>
              <input
                value={profile.email}
                readOnly
                className="w-full p-4 bg-slate-800/30 border border-slate-700 rounded-xl opacity-60 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="text-sm text-slate-400 flex items-center gap-2 mb-2">
                <Phone size={16} /> Phone Number
              </label>
              <input
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                className="w-full p-4 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          {/* ROW 3: Address & Location (Side by Side) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="text-sm text-slate-400 flex items-center gap-2 mb-2">
                <MapPin size={16} /> Address
              </label>
              <input
                name="address"
                value={profile.address}
                onChange={handleChange}
                className="w-full p-4 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                placeholder="Enter your address"
              />
            </div>

            <div>
              <label className="text-sm text-slate-400 flex items-center gap-2 mb-2">
                <MapPin size={16} /> Location
              </label>
              <input
                name="location"
                value={profile.location}
                onChange={handleChange}
                className="w-full p-4 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                placeholder="Enter your location"
              />
            </div>
          </div>

          {/* ROW 4: Change Password (Full Width) */}
          <div className="mb-8">
            <label className="text-sm text-slate-400 flex items-center gap-2 mb-2">
              <Lock size={16} /> Change Password
            </label>
            <input
              type="password"
              name="password"
              value={profile.password}
              onChange={handleChange}
              placeholder="Leave blank to keep current password"
              className="w-full p-4 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>

          {/* SAVE BUTTON (Centered) */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={saveProfile}
            disabled={saving}
            className="w-full max-w-xs mx-auto py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-xl font-bold text-lg shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Save Changes
              </>
            )}
          </motion.button>
        </motion.div>
      </div>

      {/* SUCCESS MODAL */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={backdropVariants}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            onClick={() => setShowSuccessModal(false)}
          >
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={modalVariants}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900/90 backdrop-blur-xl border border-emerald-500/30 rounded-3xl p-8 max-w-md w-full shadow-2xl"
            >
              <div className="flex justify-center mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  className="p-4 bg-emerald-500/20 rounded-full"
                >
                  <CheckCircle className="w-12 h-12 text-emerald-400" />
                </motion.div>
              </div>

              <h3 className="text-2xl font-bold text-white text-center mb-3">
                Profile Updated!
              </h3>

              <p className="text-slate-400 text-center mb-6">
                Your profile has been successfully updated. All changes have been saved.
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowSuccessModal(false)}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-bold text-white transition-all"
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ERROR MODAL */}
      <AnimatePresence>
        {showErrorModal && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={backdropVariants}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            onClick={() => setShowErrorModal(false)}
          >
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={modalVariants}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900/90 backdrop-blur-xl border border-rose-500/30 rounded-3xl p-8 max-w-md w-full shadow-2xl"
            >
              <div className="flex justify-center mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  className="p-4 bg-rose-500/20 rounded-full"
                >
                  <AlertCircle className="w-12 h-12 text-rose-400" />
                </motion.div>
              </div>

              <h3 className="text-2xl font-bold text-white text-center mb-3">
                Something Went Wrong
              </h3>

              <p className="text-slate-400 text-center mb-6">
                {error || "Failed to update profile. Please try again."}
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowErrorModal(false)}
                className="w-full py-3 bg-rose-600 hover:bg-rose-500 rounded-xl font-bold text-white transition-all"
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