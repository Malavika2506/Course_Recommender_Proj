import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Questionnaire() {
  const navigate = useNavigate();
  
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(30 * 60);


const [questions, setQuestions] = useState([]);
const [submitted, setSubmitted] = useState(false);


useEffect(() => {
  fetch("http://localhost:5000/api/questions")
    .then(res => res.json())
    .then(data => setQuestions(data));
}, []);

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timer);
          submitForm();
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format timer
  const min = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const sec = String(timeLeft % 60).padStart(2, "0");

  // Submit
async function submitForm() {
  if (submitted) return;   // 🔒 prevent double submit
  setSubmitted(true);

  const res = await fetch("http://localhost:5000/api/result/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ answers }),
  });

  if (res.ok) {
    navigate("/student/result"); // ✅ absolute path
  }
}





  // Auto-next on yes/no
  function choose(ans) {
    setAnswers({ ...answers, [index]: ans });
    if (index < questions.length - 1) {
      setIndex(index + 1);
    }
  }

  useEffect(() => {
  const blockNavigation = (e) => {
    e.preventDefault();
    e.returnValue = "";
  };

  window.addEventListener("beforeunload", blockNavigation);
  window.history.pushState(null, "", window.location.href);

  const preventBack = () => {
    window.history.pushState(null, "", window.location.href);
  };

  window.addEventListener("popstate", preventBack);

  return () => {
    window.removeEventListener("beforeunload", blockNavigation);
    window.removeEventListener("popstate", preventBack);
  };
}, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-slate-950 px-4">
      
      {/* GRADIENT BG */}
      <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] 
      rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>

      <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] 
      rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>

      {/* TIMER */}
      <div className="absolute top-6 text-white text-xl font-semibold">
        ⏳ {min}:{sec}
      </div>

      {/* CARD */}
      <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl 
      p-10 rounded-3xl max-w-xl w-full text-white text-center">

        <h2 className="text-xl font-semibold mb-2">
          Question {index + 1}/{questions.length}
        </h2>

<h1 className="text-2xl font-bold mb-8">
  {questions[index]?.text}
</h1>

        {/* YES / NO */}
        <div className="flex gap-6 justify-center">
          <button
            onClick={() => choose("yes")}
            className="bg-green-600 px-6 py-3 rounded-xl hover:bg-green-700 font-semibold"
          >
            Yes
          </button>

          <button
            onClick={() => choose("no") }
            className="bg-red-600 px-6 py-3 rounded-xl hover:bg-red-700 font-semibold"
          >
            No
          </button>
        </div>

        {/* LEFT ARROW */}
        {index > 0 && (
          <ChevronLeft
            size={45}
            className="absolute top-1/2 left-4 cursor-pointer hover:scale-110 transition"
            onClick={() => setIndex(index - 1)}
          />
        )}

        {/* RIGHT ARROW */}
        {index < questions.length - 1 && (
          <ChevronRight
            size={45}
            className="absolute top-1/2 right-4 cursor-pointer hover:scale-110 transition"
            onClick={() => setIndex(index + 1)}
          />
        )}

        {/* SUBMIT BUTTON ONLY AT LAST */}
        {index === questions.length - 1 && (
          <button
            onClick={submitForm}
            className="mt-6 w-full bg-pink-600 hover:bg-pink-700 py-3 rounded-xl text-lg font-semibold"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
}
