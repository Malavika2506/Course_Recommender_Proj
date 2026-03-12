//src/features/auth/LoginPage
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./authSlice";
import { registerUser } from "./authSlice";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  // ---------------- LOGIN HANDLER ----------------
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage("Please enter email and password!");
      setShowErrorModal(true);
      return;
    }

    const result = await dispatch(loginUser({ email, password }));

    if (loginUser.fulfilled.match(result)) {
      const role = result.payload.user.role;

      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/student");
      }
    } else {
      setErrorMessage("Invalid credentials! Please try again.");
      setShowErrorModal(true);
    }
  };

  // ---------------- REGISTER HANDLER ----------------
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!regName || !regEmail || !regPassword) {
      setErrorMessage("Please fill all fields!");
      setShowErrorModal(true);
      return;
    }

    const result = await dispatch(
      registerUser({
        name: regName,
        email: regEmail,
        password: regPassword,
      })
    );

    if (registerUser.fulfilled.match(result)) {
      alert("Account created! Please login.");
      setIsRegister(false);
    } else {
      setErrorMessage(result.payload || "Registration failed");
      setShowErrorModal(true);
    }
  };

  // Close modal
  const closeModal = () => {
    setShowErrorModal(false);
    setErrorMessage("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 px-4 py-8">
      {/* Home Logo at Top Center */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute top-10 left-0 right-0 flex justify-center z-10"
      >
        <Link
          to="/"
          className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/30 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110"
        >
          {/* Glassmorphism Glow Effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
          
          {/* Logo Icon */}
          <svg
            className="w-8 h-8 text-purple-600 group-hover:text-purple-800 transition-colors duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        </Link>
      </motion.div>

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
      >
        
        {/* Left Side: Welcome Message (Hidden on Mobile) */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`hidden md:flex flex-col items-center justify-center px-32 py-12 text-center transition-all duration-700 w-full md:w-1/2
            ${
              isRegister
                ? "bg-white text-purple-800"
                : "bg-purple-700 text-white"
            }`}
        >
          {!isRegister ? (
            <>
              <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
              <p className="text-lg mb-8 text-purple-100">
                Not sure what to study? We'll help you choose the perfect course!
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsRegister(true)}
                className="border-2 border-white rounded-full px-3 py-3 hover:bg-white hover:text-purple-700 transition font-semibold"
              >
                CREATE ACCOUNT
              </motion.button>
            </>
          ) : (
            <>
              <h2 className="text-4xl font-bold mb-4">Join Us Today</h2>
              <p className="text-lg mb-8 text-purple-800">
                Sign up to access personalized course recommendations and start your journey.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsRegister(false)}
                className="border-2 border-purple-700 text-purple-700 rounded-full px-8 py-3 hover:bg-purple-700 hover:text-white transition font-semibold"
              >
                SIGN IN
              </motion.button>
            </>
          )}
        </motion.div>

        {/* Right Side: Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          {/* Mobile Header (Visible only on Mobile) */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:hidden mb-8 text-center"
          >
            <h2 className="text-3xl font-bold text-purple-700 mb-2">
              {isRegister ? "Create Account" : "Welcome Back"}
            </h2>
            <p className="text-gray-600">
              {isRegister
                ? "Sign up to access personalized course recommendations"
                : "Not sure what to study? We'll help you choose!"}
            </p>
          </motion.div>

          {/* Form */}
          <form className="space-y-4" onSubmit={isRegister ? handleRegister : handleLogin}>
            {/* Name Input (Only for Register) */}
            {isRegister && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  autoComplete="name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                />
              </motion.div>
            )}

            {/* Email Input */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={isRegister ? regEmail : email}
                onChange={(e) =>
                  isRegister
                    ? setRegEmail(e.target.value)
                    : setEmail(e.target.value)
                }
                autoComplete="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              />
            </motion.div>

            {/* Password Input */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={isRegister ? regPassword : password}
                onChange={(e) =>
                  isRegister
                    ? setRegPassword(e.target.value)
                    : setPassword(e.target.value)
                }
                autoComplete={isRegister ? "new-password" : "current-password"}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              />
            </motion.div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-purple-700 text-white py-3 rounded-lg hover:bg-purple-800 transition font-semibold shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Processing..." : isRegister ? "Register" : "Login"}
            </motion.button>

            {/* Toggle Link (Mobile Only) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.7 }}
              className="md:hidden text-center mt-4"
            >
              <p className="text-gray-600">
                {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
                <button
                  type="button"
                  onClick={() => setIsRegister(!isRegister)}
                  className="text-purple-700 font-semibold hover:underline"
                >
                  {isRegister ? "Sign In" : "Register"}
                </button>
              </p>
            </motion.div>
          </form>
        </div>
      </motion.div>

      {/* Error Modal with Glassmorphism */}
      {showErrorModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl"
          >
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                <svg
                  className="h-8 w-8 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Oops! Something went wrong
              </h3>
              <p className="text-gray-900 mb-6">{errorMessage}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={closeModal}
                className="bg-purple-700 text-white px-6 py-2 rounded-lg hover:bg-purple-800 transition"
              >
                OK
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}