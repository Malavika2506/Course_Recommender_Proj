import { Link } from "react-router-dom";
import { useState } from "react";
import {
  FaReact,
  FaPython,
  FaShieldAlt,
  FaPaintBrush,
  FaServer,
  FaNodeJs,
  FaGraduationCap,
  FaTimes,
} from "react-icons/fa";
import {
  SiMongodb,
  SiExpress,
  SiJavascript,
  SiDocker,
  SiFlutter,
} from "react-icons/si";

export default function Home() {
  const [selectedCourse, setSelectedCourse] = useState(null);

  const courses = [
    {
      name: "MERN Stack",
      description:
        "Learn MongoDB, Express.js, React, and Node.js to build full-stack modern web applications with real-world projects.",
      icon: (
        <div className="flex gap-2 justify-center text-3xl">
          <SiMongodb className="text-green-600" />
          <SiExpress className="text-gray-700" />
          <FaReact className="text-blue-500" />
          <FaNodeJs className="text-green-500" />
        </div>
      ),
    },
    {
      name: "Flutter Development",
      description:
        "Build beautiful cross-platform mobile apps using Flutter and Dart for Android and iOS.",
      icon: <SiFlutter className="text-4xl text-blue-400 mx-auto" />,
    },
    {
      name: "Data Science",
      description:
        "Master Python, data analysis, visualization, machine learning, and AI concepts.",
      icon: <FaPython className="text-4xl text-yellow-500 mx-auto" />,
    },
    {
      name: "Cyber Security",
      description:
        "Learn ethical hacking, network security, penetration testing, and cyber defense strategies.",
      icon: <FaShieldAlt className="text-4xl text-red-500 mx-auto" />,
    },
    {
      name: "React Front-End",
      description:
        "Build interactive UI using React.js, hooks, routing, and state management.",
      icon: <FaReact className="text-4xl text-blue-500 mx-auto" />,
    },
    {
      name: "Python Full Stack",
      description:
        "Develop full-stack applications using Python, Django/Flask, and frontend technologies.",
      icon: <FaPython className="text-4xl text-yellow-600 mx-auto" />,
    },
    {
      name: "UI/UX Design",
      description:
        "Learn design thinking, wireframing, prototyping, and user experience principles.",
      icon: <FaPaintBrush className="text-4xl text-pink-500 mx-auto" />,
    },
    {
      name: "DevOps",
      description:
        "Understand CI/CD, Docker, cloud deployment, automation, and server management.",
      icon: (
        <div className="flex gap-2 justify-center text-3xl">
          <FaServer className="text-gray-600" />
          <SiDocker className="text-blue-600" />
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-6 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-purple-700 flex items-center gap-2">
          <FaGraduationCap className="text-purple-600" />
          Smart Course Recommender
        </h1>
        <Link
          to="/login"
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium"
        >
          Login
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-center text-center md:text-left px-10 md:px-20 py-20">
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-5xl font-bold text-gray-800 leading-tight">
            Confused About Choosing a Course?
            <span className="block text-purple-700 mt-2">
              We’ll Help You Decide!
            </span>
          </h2>
          <p className="text-gray-600 text-lg">
            Our intelligent recommendation system analyzes your interests,
            skills, and aptitude to suggest the perfect career path.
          </p>
          {/* <div className="flex gap-4 justify-center md:justify-start">
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
          </div> */}
        </div>

        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <img
            src="https://img.freepik.com/free-vector/marketing-students-create-corporate-identity-personal-branding-course-strategic-self-marketing-education-personal-branding-online-courses-concept_335657-82.jpg"
            alt="Course Illustration"
            className="w-96 md:w-[500px]"
          />
        </div>
      </section>

      {/* Courses Section */}
      <section className="bg-white py-16 px-10 text-center">
        <h3 className="text-3xl font-semibold text-gray-800 mb-12">
          Explore Our Popular Courses
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {courses.map((course, i) => (
            <div
              key={i}
              onClick={() => setSelectedCourse(course)}
              className="cursor-pointer bg-purple-50 hover:bg-purple-100 hover:scale-105 transition-all rounded-xl p-6 text-purple-700 font-medium shadow-md"
            >
              {course.icon}
              <p className="mt-4">{course.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-[90%] md:w-[500px] rounded-2xl shadow-2xl p-8 relative animate-fadeIn">
            {/* Close Button */}
            <button
              onClick={() => setSelectedCourse(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl"
            >
              <FaTimes />
            </button>

            {/* Icon */}
            <div className="text-center mb-6">{selectedCourse.icon}</div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-purple-700 text-center mb-4">
              {selectedCourse.name}
            </h2>

            {/* Description */}
            <p className="text-gray-600 text-center">
              {selectedCourse.description}
            </p>

            {/* <div className="text-center mt-6">
              <Link
                to="/login"
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
              >
                Enroll Now
              </Link>
            </div> */}
          </div>
        </div>
      )}

      {/* Features Section */}
      <section className="py-16 px-10 text-center">
        <h3 className="text-3xl font-semibold text-gray-800 mb-10">
          Why Choose Our Platform?
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-md">
            <h4 className="text-xl font-bold text-purple-700 mb-3">
              AI-Based Recommendation
            </h4>
            <p className="text-gray-600">
              Smart algorithm analyzes your responses and matches you with the
              best course.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md">
            <h4 className="text-xl font-bold text-purple-700 mb-3">
              Personalized Results
            </h4>
            <p className="text-gray-600">
              Get tailored suggestions based on your skills and interests.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md">
            <h4 className="text-xl font-bold text-purple-700 mb-3">
              Instant Feedback
            </h4>
            <p className="text-gray-600">
              Complete the questionnaire and receive results immediately.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-16 px-10 text-center">
        <h3 className="text-3xl font-semibold text-gray-800 mb-10">
          How It Works
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-xl font-bold text-purple-700">1. Register</h4>
            <p className="text-gray-600 mt-2">Create your account and login.</p>
          </div>
          <div>
            <h4 className="text-xl font-bold text-purple-700">
              2. Answer Questions
            </h4>
            <p className="text-gray-600 mt-2">
              Complete a short aptitude and interest questionnaire.
            </p>
          </div>
          <div>
            <h4 className="text-xl font-bold text-purple-700">
              3. Get Recommendation
            </h4>
            <p className="text-gray-600 mt-2">
              Instantly receive your personalized course suggestion.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center bg-purple-700 text-white">
        <h3 className="text-4xl font-bold mb-6">
          Ready to Find Your Perfect Course?
        </h3>
        <Link
          to="/login"
          className="bg-white text-purple-700 px-8 py-3 rounded-lg font-semibold shadow-lg hover:bg-gray-100 transition-all"
        >
          Start Now
        </Link>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 bg-purple-800 text-white">
        <p>© 2026 Smart Course Recommender | All Rights Reserved</p>
      </footer>
    </div>
  );
}
