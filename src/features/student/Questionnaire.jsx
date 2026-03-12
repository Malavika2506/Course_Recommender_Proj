import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle,
  LogOut,
  AlertTriangle,
  AlertCircle,
  X,
  Menu,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Questionnaire() {
  const navigate = useNavigate();

  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const [questions, setQuestions] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showQuitConfirm, setShowQuitConfirm] = useState(false);
  const [showValidationAlert, setShowValidationAlert] = useState(false);
  const [showNavigatorMobile, setShowNavigatorMobile] = useState(false);

  // Fetch Questions
  useEffect(() => {
    fetch("http://localhost:5000/api/questions")
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Timer Logic
  useEffect(() => {
    if (submitted) return;
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer);
          submitForm();
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [submitted]);

  // Format Timer
  const min = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const sec = String(timeLeft % 60).padStart(2, "0");
  const progressPercent =
    questions.length > 0 ? ((index + 1) / questions.length) * 100 : 0;

  // Stats Calculation - FIXED
  const answeredCount = answers.filter((a) => a !== undefined).length;
  const unansweredCount = questions.length - answeredCount;

  // Submit Logic
  async function submitForm() {
    if (submitted) return;

    // Validation: Check if all questions are answered
    if (unansweredCount > 0) {
      setShowValidationAlert(true);
      return;
    }

    setSubmitted(true);

    const res = await fetch("http://localhost:5000/api/result/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ answers }),
    });

    if (res.ok) {
      navigate("/student/result");
    }
  }

  // Answer Logic
  function choose(ans) {
    if (submitted) return;
    const updated = [...answers];
    updated[index] = ans;
    setAnswers(updated);

    if (index < questions.length - 1) {
      setIndex(index + 1);
    } else {
      submitForm();
    }
  }

  // Quit Logic
  function handleQuit() {
    setShowQuitConfirm(true);
  }

  function confirmQuit() {
    setIndex(0);
    setAnswers([]);
    setTimeLeft(30 * 60);
    setSubmitted(false);
    setShowQuitConfirm(false);
    navigate("/student/questionnaire-instructions");
  }

  function cancelQuit() {
    setShowQuitConfirm(false);
  }

  // Navigation Blocking
  useEffect(() => {
    const blockNavigation = (e) => {
      if (!submitted) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", blockNavigation);
    window.history.pushState(null, "", window.location.href);
    const preventBack = () =>
      window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", preventBack);
    return () => {
      window.removeEventListener("beforeunload", blockNavigation);
      window.removeEventListener("popstate", preventBack);
    };
  }, [submitted]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-4 w-48 bg-slate-700 rounded mb-4"></div>
          <div className="h-4 w-32 bg-slate-700 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-slate-950 text-white font-sans selection:bg-indigo-500/30">
      {/* BACKGROUND BLOBS */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[120px]" />
      </div>

      {/* HEADER / TIMER */}
      <div className="fixed top-0 left-0 w-full z-40 bg-slate-950/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-slate-800 p-2 rounded-lg border border-white/10">
              <Clock className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-slate-400 font-medium">
                Time Remaining
              </span>
              <span className="text-lg font-bold font-mono tracking-wider">
                {min}:{sec}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-right">
              <span className="text-xs text-slate-400 block">Progress</span>
              <span className="text-sm font-bold text-indigo-400">
                {answeredCount} / {questions.length}
              </span>
            </div>
            <button
              onClick={handleQuit}
              className="p-2 hover:bg-rose-500/10 hover:text-rose-400 rounded-lg transition-colors"
              title="Quit Assessment"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
        {/* Progress Bar */}
        <div className="h-1 bg-slate-800 w-full">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="pt-24 pb-32 px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT COLUMN: Question & Answers */}
          <div className="lg:col-span-8 flex flex-col">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden"
            >
              {/* Decorative gradient blob inside card */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider border border-indigo-500/30">
                    Question {index + 1}
                  </span>
                  <span className="text-slate-500 text-sm">
                    {questions[index]?.type || "General"}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-10 text-white">
                  {questions[index]?.text}
                </h2>

                <div className="grid sm:grid-cols-2 gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => choose(true)}
                    className={`group relative p-6 rounded-2xl border-2 transition-all duration-200 flex items-center gap-4 ${
                      answers[index] === true
                        ? "bg-emerald-600 border-emerald-500 shadow-lg shadow-emerald-900/50"
                        : "bg-slate-800/50 border-slate-700 hover:border-emerald-500/50 hover:bg-slate-800"
                    }`}
                  >
                    <div
                      className={`p-2 rounded-full ${answers[index] === true ? "bg-white/20" : "bg-slate-700 group-hover:bg-emerald-500/20"}`}
                    >
                      <CheckCircle
                        className={`w-6 h-6 ${answers[index] === true ? "text-white" : "text-slate-400 group-hover:text-emerald-400"}`}
                      />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-lg">Yes</div>
                    </div>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => choose(false)}
                    className={`group relative p-6 rounded-2xl border-2 transition-all duration-200 flex items-center gap-4 ${
                      answers[index] === false
                        ? "bg-rose-600 border-rose-500 shadow-lg shadow-rose-900/50"
                        : "bg-slate-800/50 border-slate-700 hover:border-rose-500/50 hover:bg-slate-800"
                    }`}
                  >
                    <div
                      className={`p-2 rounded-full ${answers[index] === false ? "bg-white/20" : "bg-slate-700 group-hover:bg-rose-500/20"}`}
                    >
                      <CheckCircle
                        className={`w-6 h-6 ${answers[index] === false ? "text-white" : "text-slate-400 group-hover:text-rose-400"}`}
                      />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-lg">No</div>
                    </div>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Navigator (Desktop) */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="sticky top-28">
              <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-4 shadow-xl">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-lg">Questions</h3>
                  <div className="flex gap-2 text-xs">
                    <div className="flex items-center gap-1 text-emerald-400">
                      <div className="w-2 h-2 rounded-full bg-emerald-400" />
                      {answeredCount}
                    </div>
                    <div className="flex items-center gap-1 text-slate-500">
                      <div className="w-2 h-2 rounded-full bg-slate-500" />
                      {unansweredCount}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-10 gap-3">
                  {questions.map((q, i) => {
                    const isAnswered = answers[i] !== undefined;
                    const isActive = i === index;

                    return (
                      <button
                        key={i}
                        onClick={() => setIndex(i)}
                        className={`
h-7 w-7 rounded-full text-sm font-bold transition-all duration-200 flex items-center justify-center
                          ${
                            isActive
                              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 scale-110 ring-2 ring-indigo-400 ring-offset-2 ring-offset-slate-900"
                              : isAnswered
                                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30"
                                : "bg-slate-800 text-slate-500 border border-slate-700 hover:bg-slate-700 hover:text-slate-300"
                          }
                        `}
                      >
                        {i + 1}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE NAVIGATOR TOGGLE */}
        <div className="lg:hidden mt-6">
          <button
            onClick={() => setShowNavigatorMobile(!showNavigatorMobile)}
            className="w-full flex items-center justify-center gap-2 p-4 bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl text-slate-300 hover:text-white transition-colors"
          >
            <Menu className="w-5 h-5" />
            <span className="font-medium">
              {showNavigatorMobile ? "Hide" : "Show"} Question Map
            </span>
          </button>

          <AnimatePresence>
            {showNavigatorMobile && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden mt-4"
              >
                <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg">Questions</h3>
                    <div className="flex gap-2 text-xs">
                      <div className="flex items-center gap-1 text-emerald-400">
                        <div className="w-2 h-2 rounded-full bg-emerald-400" />
                        {answeredCount}
                      </div>
                      <div className="flex items-center gap-1 text-slate-500">
                        <div className="w-2 h-2 rounded-full bg-slate-500" />
                        {unansweredCount}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-10 gap-2">
                    {questions.map((q, i) => {
                      const isAnswered = answers[i] !== undefined;
                      const isActive = i === index;

                      return (
                        <button
                          key={i}
                          onClick={() => setIndex(i)}
                          className={`
                            aspect-square rounded-xl text-sm font-bold transition-all duration-200 flex items-center justify-center
                            ${
                              isActive
                                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 scale-110 ring-2 ring-indigo-400 ring-offset-2 ring-offset-slate-900"
                                : isAnswered
                                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30"
                                  : "bg-slate-800 text-slate-500 border border-slate-700 hover:bg-slate-700 hover:text-slate-300"
                            }
                          `}
                        >
                          {i + 1}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* NAVIGATION FOOTER */}
        <div className="fixed bottom-0 left-0 w-full bg-slate-950/90 backdrop-blur-lg border-t border-white/10 p-4 z-30">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <button
              onClick={() => setIndex(index - 1)}
              disabled={index === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                index === 0
                  ? "text-slate-600 cursor-not-allowed"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Previous</span>
            </button>

            <div className="flex items-center gap-4">
              {index === questions.length - 1 ? (
                <button
                  onClick={submitForm}
                  disabled={unansweredCount > 0}
                  className={`px-8 py-3 rounded-xl font-bold text-lg shadow-lg transition-all transform hover:-translate-y-1 ${
                    unansweredCount > 0
                      ? "bg-slate-700 text-slate-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-indigo-500/25"
                  }`}
                >
                  Submit Assessment
                </button>
              ) : (
                <button
                  onClick={() => setIndex(index + 1)}
                  className="flex items-center gap-2 px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/25 transition-all transform hover:-translate-y-1"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* VALIDATION ALERT */}
        <AnimatePresence>
          {showValidationAlert && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-md bg-rose-600/90 backdrop-blur text-white p-4 rounded-xl flex items-center gap-3 shadow-xl border border-rose-500/50"
            >
              <AlertTriangle className="w-6 h-6 flex-shrink-0" />
              <div className="flex-1 text-sm font-medium">
                You have {unansweredCount} unanswered question(s). Please answer
                all questions before submitting.
              </div>
              <button
                onClick={() => setShowValidationAlert(false)}
                className="text-white/70 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* QUIT CONFIRMATION MODAL */}
        <AnimatePresence>
          {showQuitConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
              onClick={cancelQuit}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-slate-900 border border-white/10 rounded-2xl p-8 max-w-md w-full shadow-2xl"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-rose-500/20 rounded-full">
                    <AlertTriangle className="w-8 h-8 text-rose-400" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white text-center mb-2">
                  Quit Assessment?
                </h3>

                <p className="text-slate-400 text-center mb-6">
                  Your progress will be lost and you'll need to start from the
                  beginning.
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={cancelQuit}
                    className="flex-1 py-3 rounded-xl font-medium text-slate-300 hover:bg-white/5 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmQuit}
                    className="flex-1 py-3 rounded-xl font-medium bg-rose-600 hover:bg-rose-700 text-white transition-colors"
                  >
                    Quit
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
