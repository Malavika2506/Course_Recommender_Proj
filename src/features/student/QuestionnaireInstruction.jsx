import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Clock,
  Target,
  CheckCircle2,
  RotateCcw,
  LogOut,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function QuestionnaireInstructions() {
  const navigate = useNavigate();
  const [hasCompleted, setHasCompleted] = useState(false);
  const [modal, setModal] = useState({
    open: false,
    type: "",
  });

  useEffect(() => {
    const checkCompletion = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/result/me", {
          credentials: "include",
        });
        const data = await res.json();
        if (data && data.recommendedCourse) {
          setHasCompleted(true);
        }
      } catch (err) {
        console.log("No completion data found");
      }
    };
    checkCompletion();
  }, []);

  const handleRestart = () => {
    setModal({ open: true, type: "restart" });
  };

  const handleQuit = () => {
    setModal({ open: true, type: "quit" });
  };

  const confirmAction = () => {
    if (modal.type === "restart") {
      navigate("/student/questionnaire");
    }

    if (modal.type === "quit") {
      navigate("/student");
    }

    setModal({ open: false, type: "" });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-slate-950 px-4 py-8 sm:py-12 overflow-hidden font-sans">
      {/* BACKGROUND EFFECTS */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-pink-600/20 rounded-full blur-[100px]" />
      </div>

      {/* Quit Button */}
      <button
        onClick={handleQuit}
        className="fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-2  bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl
  text-white hover:text-rose-400 hover:bg-white/20
  transition-all duration-300 shadow-lg"
      >
        <LogOut className="w-5 h-5" />
        Quit
      </button>

      {/* MAIN CARD */}
      <div className="relative z-10 w-full max-w-lg">
        <div className="backdrop-blur-2xl bg-white/5 border border-white/10 shadow-2xl rounded-3xl p-5 sm:p-6 md:p-7 text-center text-white relative overflow-hidden">
          {/* Decorative Top Line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

          <div className="mb-6 sm:mb-8 inline-flex items-center justify-center p-3 bg-indigo-500/20 rounded-2xl border border-indigo-500/30">
            <Target className="w-8 h-8 text-indigo-400" />
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 tracking-tight">
            Assessment Guide
          </h1>
          <p className="text-slate-400 mb-6 sm:mb-10 text-sm sm:text-base md:text-lg">
            Please read the following instructions carefully before starting.
          </p>

          <div className="grid gap-3 sm:gap-4 mb-8 sm:mb-10 text-left">
            <InstructionItem
              icon={<Clock className="w-5 h-5 text-pink-400" />}
              text="You have <b>30 minutes</b> to complete the assessment."
            />
            <InstructionItem
              icon={<CheckCircle2 className="w-5 h-5 text-indigo-400" />}
              text="Select <b>Yes</b> or <b>No</b> for every question."
            />
            <InstructionItem
              icon={<Target className="w-5 h-5 text-emerald-400" />}
              text="We will recommend the best course based on your answers."
            />
          </div>

          <div className="flex flex-col gap-3">
            {hasCompleted ? (
              <button
                onClick={handleRestart}
                className="group relative w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 
                py-4 rounded-xl font-bold text-lg text-white shadow-lg shadow-amber-500/25 transition-all duration-300 transform hover:-translate-y-1"
              >
                <span className="flex items-center justify-center gap-2">
                  <RotateCcw className="w-5 h-5" />
                  Restart Assessment
                </span>
              </button>
            ) : (
              <button
                onClick={() => navigate("../questionnaire")}
                className="group relative w-full bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 
                py-4 rounded-xl font-bold text-lg text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 transform hover:-translate-y-1"
              >
                <span className="flex items-center justify-center gap-2">
                  Start Assessment
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-8 w-[90%] max-w-md text-center text-white shadow-2xl">
            <h2 className="text-xl font-bold mb-4">
              {modal.type === "restart"
                ? "Restart Assessment?"
                : "Quit Assessment?"}
            </h2>

            <p className="text-slate-400 mb-6">
              {modal.type === "restart"
                ? "Your previous results will be lost."
                : "You will be redirected to the dashboard."}
            </p>

            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setModal({ open: false, type: "" })}
                className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition"
              >
                Cancel
              </button>

              <button
                onClick={confirmAction}
                className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 transition"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper component for list items
function InstructionItem({ icon, text }) {
  return (
    <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
      <div className="flex-shrink-0">{icon}</div>
      <p
        className="text-slate-200 text-sm sm:text-base leading-relaxed"
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </div>
  );
}
