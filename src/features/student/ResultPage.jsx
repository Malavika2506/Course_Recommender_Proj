import { useEffect, useState } from "react";

export default function ResultPage() {
  const [result, setResult] = useState(null);
  const [showMore, setShowMore] = useState(false);
  useEffect(() => {
    fetch("http://localhost:5000/api/result/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setResult(data));
  }, []);

  if (!result) return <p className="text-white">Loading...</p>;

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
