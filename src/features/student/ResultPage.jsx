import { useEffect, useState } from "react";

export default function ResultPage() {
  const [result, setResult] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const courseDetails = {
  mern: "Full stack development using MongoDB, Express, React, and Node.js.",
  flutter: "Cross-platform mobile app development using Flutter.",
  datasci: "Data analysis, visualization, and machine learning foundations.",
  cybersecurity: "Security fundamentals, networks, and ethical hacking.",
  react: "Frontend development with React ecosystem.",
  pythonfs: "Backend development using Python and frameworks.",
  uiux: "User interface and user experience design principles.",
  devops: "CI/CD, cloud, containers, and deployment automation.",
};


  useEffect(() => {
    fetch("http://localhost:5000/api/result/me", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("No result found");
        return res.json();
      })
      .then((data) => setResult(data))
      .catch((err) => console.error(err));
  }, []);

  if (!result) {
    return (
      <p className="text-white text-center mt-10">
        No result found. Please complete the questionnaire.
      </p>
    );
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 p-10 rounded-3xl max-w-xl w-full text-center text-white shadow-xl">
        <h1 className="text-3xl font-bold mb-3">Recommended Course</h1>

        <h2 className="text-4xl font-extrabold text-pink-400 mb-6">
          {result.recommended}
        </h2>

        <button
          onClick={() => setShowMore(!showMore)}
          className="bg-pink-600 hover:bg-pink-700 py-3 px-6 rounded-xl text-lg font-semibold mb-6"
        >
          Know More
        </button>

        {showMore && <p className="text-lg">{result.details}</p>}
      </div>
    </div>
  );
}
