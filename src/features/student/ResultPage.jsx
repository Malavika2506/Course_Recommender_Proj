import { useState } from "react";

export default function ResultPage() {
  const [showMore, setShowMore] = useState(false);
  const answers = JSON.parse(localStorage.getItem("answers") || "{}");

  let recommended = "MERN Full Stack Development";
  let details = "Full-stack development using MongoDB, Express, React, and Node.";

  if (answers[0] === "yes") {
    recommended = "UI/UX Design";
    details = "Learn prototyping, design systems, wireframes, and Figma.";
  }
  if (answers[1] === "yes") {
    recommended = "Flutter Mobile Development";
    details = "Build cross-platform apps using Flutter and Dart.";
  }
  if (answers[4] === "yes") {
    recommended = "AI & Machine Learning";
    details = "Deep learning, ML algorithms, Python, TensorFlow.";
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-slate-950 px-4">
      
      {/* BG GRADIENT */}
      <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] 
      rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>

      <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] 
      rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>

      {/* RESULT CARD */}
      <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 p-10 rounded-3xl max-w-xl w-full text-center text-white shadow-xl">
        <h1 className="text-3xl font-bold mb-3">Recommended Course</h1>

        <h2 className="text-4xl font-extrabold text-pink-400 mb-6">
          {recommended}
        </h2>

        <button
          onClick={() => setShowMore(!showMore)}
          className="bg-pink-600 hover:bg-pink-700 py-3 px-6 rounded-xl text-lg font-semibold mb-6"
        >
          Know More
        </button>

        {showMore && <p className="text-lg">{details}</p>}
      </div>
    </div>
  );
}
