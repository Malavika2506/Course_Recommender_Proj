import { Link } from "react-router-dom";
import { FaBookOpen, FaGraduationCap } from "react-icons/fa";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-6 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-purple-700 flex items-center gap-2">
          <FaGraduationCap className="text-purple-600" />
          Smart Course Recommender
        </h1>
        <div className="flex gap-6">
          <Link to="/login" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-all">
            Login
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-center text-center md:text-left px-10 md:px-20 py-16">
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Confused About Choosing a Course? <br />
            <span className="text-purple-700">We’ll Help You Decide!</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Our smart system analyzes your interests and skills to suggest the best course for you. 
            Answer a few simple questions and get your personalized recommendation instantly!
          </p>
          <div className="flex gap-4 justify-center md:justify-start">
            <Link
              to="/register"
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium shadow-md transition-all"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="border border-purple-600 text-purple-700 hover:bg-purple-50 px-6 py-3 rounded-lg font-medium transition-all"
            >
              Already a user?
            </Link>
          </div>
        </div>

        {/* Illustration */}
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <img
            src="https://img.freepik.com/free-vector/marketing-students-create-corporate-identity-personal-branding-course-strategic-self-marketing-education-personal-branding-online-courses-concept_335657-82.jpg"
            alt="Course Illustration"
            className="w-96 md:w-[480px]"
          />
        </div>
      </section>

      {/* Courses Preview Section */}
      <section className="bg-white py-14 px-10 text-center">
        <h3 className="text-3xl font-semibold text-gray-800 mb-8">
          Explore Our Popular Courses
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-center">
          {[
            "MERN Stack",
            "Flutter Development",
            "Data Science",
            "Cyber Security",
            "React Front-End",
            "Python Full Stack",
            "UI/UX Design",
            "DevOps",
          ].map((course, i) => (
            <div
              key={i}
              className="bg-purple-50 hover:bg-purple-100 transition-all rounded-xl p-6 text-purple-700 font-medium shadow-sm"
            >
              <FaBookOpen className="text-3xl mx-auto mb-3" />
              {course}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 bg-purple-700 text-white mt-auto">
        <p>© 2025 Smart Course Recommender</p>
      </footer>
    </div>
  );
}
