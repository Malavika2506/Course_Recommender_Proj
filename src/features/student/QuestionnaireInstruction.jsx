import { useNavigate } from "react-router-dom";

export default function QuestionnaireInstructions() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-slate-950 px-4 py-10 overflow-hidden">

      {/* BACKGROUND GRADIENT BLOBS */}
      <div className="absolute bottom-0 left-[-30%] top-[-15%] 
      h-[350px] w-[350px] sm:h-[450px] sm:w-[450px] lg:h-[550px] lg:w-[550px]
      rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),transparent)]"></div>

      <div className="absolute bottom-0 right-[-30%] top-[-15%] 
      h-[350px] w-[350px] sm:h-[450px] sm:w-[450px] lg:h-[550px] lg:w-[550px]
      rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),transparent)]"></div>


      {/* GLASS CARD */}
      <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl 
      p-6 sm:p-10 rounded-2xl sm:rounded-3xl w-full max-w-md sm:max-w-xl text-center text-white">

        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
          Instructions
        </h1>

        <ul className="text-base sm:text-lg space-y-3 mb-6 sm:mb-8 leading-relaxed">
          <li>⭐ Choose <b>Yes</b> or <b>No</b> for each question.</li>
          <li>⏳ You have <b>30 minutes</b> to complete.</li>
          <li>🎯 Best recommended course will be shown at the end.</li>
        </ul>

        <button
          onClick={() => navigate("/questionnaire")}
          className="w-full bg-pink-600 hover:bg-pink-700 py-3 rounded-xl 
          text-base sm:text-lg font-semibold text-white transition"
        >
          Start Now
        </button>
      </div>
    </div>
  );
}
