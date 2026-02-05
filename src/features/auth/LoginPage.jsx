import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./authSlice";
import { registerUser } from "./authSlice";


export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");

  const navigate = useNavigate();

  // ---------------- LOGIN HANDLER ----------------
const dispatch = useDispatch();
const { loading, error } = useSelector((state) => state.auth);

const handleLogin = async (e) => {
  e.preventDefault();

  if (!email || !password) {
    alert("Please enter email and password!");
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
  }
};


  // ---------------- REGISTER HANDLER ----------------

const handleRegister = async (e) => {
  e.preventDefault();

  if (!regName || !regEmail || !regPassword) {
    alert("Please fill all fields!");
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
    alert(result.payload || "Registration failed");
  }
};

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 px-4">
      <div
        className="relative w-full max-w-4xl h-auto md:h-[460px] rounded-2xl shadow-2xl overflow-hidden transition-all duration-700 bg-white"
      >
        <div
          className={`absolute top-0 left-0 h-full flex flex-col items-center justify-center px-8 py-10 md:px-10 text-center transition-all duration-700
            ${
              isRegister
                ? "translate-x-full md:translate-x-full bg-white text-purple-800"
                : "bg-purple-700 text-white"
            }
            w-full md:w-1/2`}
        >
          {!isRegister ? (
            <>
              <h2 className="text-3xl font-bold mb-3">Welcome</h2>
              <p className="text-sm md:text-base mb-5">
                Not sure what to study? We’ll help you choose!
              </p>
              <button
                onClick={() => setIsRegister(true)}
                className="border-2 border-white rounded-full px-6 py-2 hover:bg-white hover:text-purple-700 transition"
              >
                REGISTER
              </button>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold mb-3">Welcome Back!</h2>
              <p className="text-sm md:text-base mb-5">
                Please login using your credentials
              </p>
              <button
                onClick={() => setIsRegister(false)}
                className="border-2 border-purple-700 text-purple-700 rounded-full px-6 py-2 hover:bg-purple-700 hover:text-white transition"
              >
                SIGN IN
              </button>
            </>
          )}
        </div>

        <div
          className={`absolute top-0 right-0 h-full flex items-center justify-center transition-all duration-700
            ${isRegister ? "-translate-x-full" : ""}
            w-full md:w-1/2`}
        >
          {!isRegister ? (
            <form
              className="w-80 sm:w-96 md:w-72 bg-white md:bg-transparent p-8 md:p-0 rounded-2xl md:rounded-none shadow-lg md:shadow-none"
              onSubmit={handleLogin}
            >
              <h2 className="text-2xl font-semibold mb-5 text-purple-700 text-center">
                Sign In
              </h2>

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mb-3 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mb-3 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              />

              <button
                type="submit"
                className="w-full bg-purple-700 text-white py-2 rounded-md hover:bg-purple-800 transition"
              >
                LOGIN
              </button>
            </form>
          ) : (
            /* REGISTER FORM */
            <form
              className="w-80 sm:w-96 md:w-72 bg-white md:bg-transparent p-8 md:p-0 rounded-2xl md:rounded-none shadow-lg md:shadow-none"
              onSubmit={handleRegister}
            >
              <h2 className="text-2xl font-semibold mb-5 text-purple-700 text-center">
                Create Account
              </h2>

              <input
                type="text"
                placeholder="Name"
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                className="w-full mb-3 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              />

              <input
                type="email"
                placeholder="Email"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                className="w-full mb-3 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              />

              <input
                type="password"
                placeholder="Password"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              />

              <button
                type="submit"
                className="w-full bg-purple-700 text-white py-2 rounded-md hover:bg-purple-800 transition"
              >
                REGISTER
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
