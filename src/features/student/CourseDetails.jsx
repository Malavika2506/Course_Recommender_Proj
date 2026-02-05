// src/features/student/CourseDetails.jsx
export default function CourseDetails() {
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        Course Details
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        <CourseCard
          title="MERN Stack"
          desc="MongoDB, Express, React, Node.js"
        />
        <CourseCard
          title="Flutter"
          desc="Cross-platform mobile apps"
        />
        <CourseCard
          title="UI/UX Design"
          desc="Figma, Wireframes, Prototyping"
        />
        <CourseCard
          title="AI & ML"
          desc="Python, ML models, Deep learning"
        />
      </div>
    </div>
  );
}

function CourseCard({ title, desc }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg hover:scale-105 transition">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
}
