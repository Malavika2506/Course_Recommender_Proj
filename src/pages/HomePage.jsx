// import { Link } from "react-router-dom";
// import { useState } from "react";
// import {
//   FaReact,
//   FaPython,
//   FaShieldAlt,
//   FaPaintBrush,
//   FaServer,
//   FaNodeJs,
//   FaGraduationCap,
//   FaTimes,
// } from "react-icons/fa";
// import {
//   SiMongodb,
//   SiExpress,
//   SiJavascript,
//   SiDocker,
//   SiFlutter,
// } from "react-icons/si";

// export default function Home() {
//   const [selectedCourse, setSelectedCourse] = useState(null);

//   const courses = [
//     {
//       name: "MERN Stack",
//       description:
//         "Learn MongoDB, Express.js, React, and Node.js to build full-stack modern web applications with real-world projects.",
//       icon: (
//         <div className="flex gap-2 justify-center text-3xl">
//           <SiMongodb className="text-green-600" />
//           <SiExpress className="text-gray-700" />
//           <FaReact className="text-blue-500" />
//           <FaNodeJs className="text-green-500" />
//         </div>
//       ),
//     },
//     {
//       name: "Flutter Development",
//       description:
//         "Build beautiful cross-platform mobile apps using Flutter and Dart for Android and iOS.",
//       icon: <SiFlutter className="text-4xl text-blue-400 mx-auto" />,
//     },
//     {
//       name: "Data Science",
//       description:
//         "Master Python, data analysis, visualization, machine learning, and AI concepts.",
//       icon: <FaPython className="text-4xl text-yellow-500 mx-auto" />,
//     },
//     {
//       name: "Cyber Security",
//       description:
//         "Learn ethical hacking, network security, penetration testing, and cyber defense strategies.",
//       icon: <FaShieldAlt className="text-4xl text-red-500 mx-auto" />,
//     },
//     {
//       name: "React Front-End",
//       description:
//         "Build interactive UI using React.js, hooks, routing, and state management.",
//       icon: <FaReact className="text-4xl text-blue-500 mx-auto" />,
//     },
//     {
//       name: "Python Full Stack",
//       description:
//         "Develop full-stack applications using Python, Django/Flask, and frontend technologies.",
//       icon: <FaPython className="text-4xl text-yellow-600 mx-auto" />,
//     },
//     {
//       name: "UI/UX Design",
//       description:
//         "Learn design thinking, wireframing, prototyping, and user experience principles.",
//       icon: <FaPaintBrush className="text-4xl text-pink-500 mx-auto" />,
//     },
//     {
//       name: "DevOps",
//       description:
//         "Understand CI/CD, Docker, cloud deployment, automation, and server management.",
//       icon: (
//         <div className="flex gap-2 justify-center text-3xl">
//           <FaServer className="text-gray-600" />
//           <SiDocker className="text-blue-600" />
//         </div>
//       ),
//     },
//   ];

//   return (
//     <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100">
//       {/* Navbar */}
//       <nav className="flex justify-between items-center px-10 py-6 bg-white shadow-md">
//         <h1 className="text-2xl font-bold text-purple-700 flex items-center gap-2">
//           <FaGraduationCap className="text-purple-600" />
//           Smart Course Recommender
//         </h1>
//         <Link
//           to="/login"
//           className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium"
//         >
//           Login
//         </Link>
//       </nav>

//       {/* Hero Section */}
//       <section className="flex flex-col md:flex-row items-center justify-center text-center md:text-left px-10 md:px-20 py-20">
//         <div className="md:w-1/2 space-y-6">
//           <h2 className="text-5xl font-bold text-gray-800 leading-tight">
//             Confused About Choosing a Course?
//             <span className="block text-purple-700 mt-2">
//               We’ll Help You Decide!
//             </span>
//           </h2>
//           <p className="text-gray-600 text-lg">
//             Our intelligent recommendation system analyzes your interests,
//             skills, and aptitude to suggest the perfect career path.
//           </p>
        
//         </div>

//         <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
//           <img
//             src="https://img.freepik.com/free-vector/marketing-students-create-corporate-identity-personal-branding-course-strategic-self-marketing-education-personal-branding-online-courses-concept_335657-82.jpg"
//             alt="Course Illustration"
//             className="w-96 md:w-[500px]"
//           />
//         </div>
//       </section>

//       {/* Courses Section */}
//       <section className="bg-white py-16 px-10 text-center">
//         <h3 className="text-3xl font-semibold text-gray-800 mb-12">
//           Explore Our Popular Courses
//         </h3>

//         <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//           {courses.map((course, i) => (
//             <div
//               key={i}
//               onClick={() => setSelectedCourse(course)}
//               className="cursor-pointer bg-purple-50 hover:bg-purple-100 hover:scale-105 transition-all rounded-xl p-6 text-purple-700 font-medium shadow-md"
//             >
//               {course.icon}
//               <p className="mt-4">{course.name}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Modal */}
//       {selectedCourse && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white w-[90%] md:w-[500px] rounded-2xl shadow-2xl p-8 relative animate-fadeIn">
//             {/* Close Button */}
//             <button
//               onClick={() => setSelectedCourse(null)}
//               className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl"
//             >
//               <FaTimes />
//             </button>

//             {/* Icon */}
//             <div className="text-center mb-6">{selectedCourse.icon}</div>

//             {/* Title */}
//             <h2 className="text-2xl font-bold text-purple-700 text-center mb-4">
//               {selectedCourse.name}
//             </h2>

//             {/* Description */}
//             <p className="text-gray-600 text-center">
//               {selectedCourse.description}
//             </p>

//             {/* <div className="text-center mt-6">
//               <Link
//                 to="/login"
//                 className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
//               >
//                 Enroll Now
//               </Link>
//             </div> */}
//           </div>
//         </div>
//       )}

//       {/* Features Section */}
//       <section className="py-16 px-10 text-center">
//         <h3 className="text-3xl font-semibold text-gray-800 mb-10">
//           Why Choose Our Platform?
//         </h3>
//         <div className="grid md:grid-cols-3 gap-8">
//           <div className="bg-white p-8 rounded-xl shadow-md">
//             <h4 className="text-xl font-bold text-purple-700 mb-3">
//               AI-Based Recommendation
//             </h4>
//             <p className="text-gray-600">
//               Smart algorithm analyzes your responses and matches you with the
//               best course.
//             </p>
//           </div>
//           <div className="bg-white p-8 rounded-xl shadow-md">
//             <h4 className="text-xl font-bold text-purple-700 mb-3">
//               Personalized Results
//             </h4>
//             <p className="text-gray-600">
//               Get tailored suggestions based on your skills and interests.
//             </p>
//           </div>
//           <div className="bg-white p-8 rounded-xl shadow-md">
//             <h4 className="text-xl font-bold text-purple-700 mb-3">
//               Instant Feedback
//             </h4>
//             <p className="text-gray-600">
//               Complete the questionnaire and receive results immediately.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* How It Works */}
//       <section className="bg-white py-16 px-10 text-center">
//         <h3 className="text-3xl font-semibold text-gray-800 mb-10">
//           How It Works
//         </h3>
//         <div className="grid md:grid-cols-3 gap-8">
//           <div>
//             <h4 className="text-xl font-bold text-purple-700">1. Register</h4>
//             <p className="text-gray-600 mt-2">Create your account and login.</p>
//           </div>
//           <div>
//             <h4 className="text-xl font-bold text-purple-700">
//               2. Answer Questions
//             </h4>
//             <p className="text-gray-600 mt-2">
//               Complete a short aptitude and interest questionnaire.
//             </p>
//           </div>
//           <div>
//             <h4 className="text-xl font-bold text-purple-700">
//               3. Get Recommendation
//             </h4>
//             <p className="text-gray-600 mt-2">
//               Instantly receive your personalized course suggestion.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 text-center bg-purple-700 text-white">
//         <h3 className="text-4xl font-bold mb-6">
//           Ready to Find Your Perfect Course?
//         </h3>
//         <Link
//           to="/login"
//           className="bg-white text-purple-700 px-8 py-3 rounded-lg font-semibold shadow-lg hover:bg-gray-100 transition-all"
//         >
//           Start Now
//         </Link>
//       </section>

//       {/* Footer */}
//       <footer className="text-center py-6 bg-purple-800 text-white">
//         <p>© 2026 Smart Course Recommender | All Rights Reserved</p>
//       </footer>
//     </div>
//   );
// }

import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
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

  // Refs for scroll detection
  const coursesRef = useRef(null);
  const featuresRef = useRef(null);
  const howItWorksRef = useRef(null);
  const ctaRef = useRef(null);

  // Detect when sections are in view
  const isCoursesInView = useInView(coursesRef, { once: true, amount: 0.3 });
  const isFeaturesInView = useInView(featuresRef, { once: true, amount: 0.3 });
  const isHowItWorksInView = useInView(howItWorksRef, { once: true, amount: 0.3 });
  const isCtaInView = useInView(ctaRef, { once: true, amount: 0.3 });

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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 overflow-x-hidden">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-6 bg-white shadow-md sticky top-0 z-40">
        <h1 className="text-2xl font-bold text-purple-700 flex items-center gap-2">
          <FaGraduationCap className="text-purple-600" />
          Smart Course Recommender
        </h1>
        <Link
          to="/login"
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Login
        </Link>
      </nav>

      {/* Hero Section - Animates on Page Load */}
      <section className="flex flex-col md:flex-row items-center justify-center text-center md:text-left px-10 md:px-20 py-20">
        {/* First Div: Animates from Left */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="md:w-1/2 space-y-6"
        >
          <h2 className="text-5xl font-bold text-gray-800 leading-tight">
            Confused About Choosing a Course?
            <span className="block text-purple-700 mt-2">
              We'll Help You Decide!
            </span>
          </h2>
          <p className="text-gray-600 text-lg">
            Our intelligent recommendation system analyzes your interests,
            skills, and aptitude to suggest the perfect career path.
          </p>
        </motion.div>

        {/* Second Div: Animates from Right */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="md:w-1/2 mt-10 md:mt-0 flex justify-center"
        >
          <img
            src="https://img.freepik.com/free-vector/marketing-students-create-corporate-identity-personal-branding-course-strategic-self-marketing-education-personal-branding-online-courses-concept_335657-82.jpg"
            alt="Course Illustration"
            className="w-96 md:w-[500px] rounded-lg shadow-lg"
          />
        </motion.div>
      </section>

      {/* Courses Section - Animates on Scroll */}
      <section className="bg-white py-16 px-10 text-center" ref={coursesRef}>
        <h3 className="text-3xl font-semibold text-gray-800 mb-12">
          Explore Our Popular Courses
        </h3>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
              },
            },
          }}
          initial="hidden"
          animate={isCoursesInView ? "show" : "hidden"}
        >
          {courses.map((course, i) => {
            const directions = [
              { x: -50, y: -50 }, // Top Left
              { x: 50, y: -50 },  // Top Right
              { x: -50, y: 50 },  // Bottom Left
              { x: 50, y: 50 },   // Bottom Right
            ];
            const direction = directions[i % 4];

            return (
              <motion.div
                key={i}
                onClick={() => setSelectedCourse(course)}
                variants={{
                  hidden: { opacity: 0, x: direction.x, y: direction.y },
                  show: { opacity: 1, x: 0, y: 0 },
                }}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                className="cursor-pointer bg-purple-50 hover:bg-purple-100 rounded-xl p-6 text-purple-700 font-medium shadow-md"
              >
                {course.icon}
                <p className="mt-4">{course.name}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* Features Section - Animates on Scroll */}
      <section className="py-16 px-10 text-center" ref={featuresRef}>
        <motion.h3
          initial={{ y: -50, opacity: 0 }}
          animate={isFeaturesInView ? { y: 0, opacity: 1 } : { y: -50, opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl font-semibold text-gray-800 mb-10"
        >
          Why Choose Our Platform?
        </motion.h3>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "AI-Based Recommendation",
              desc: "Smart algorithm analyzes your responses and matches you with the best course.",
            },
            {
              title: "Personalized Results",
              desc: "Get tailored suggestions based on your skills and interests.",
            },
            {
              title: "Instant Feedback",
              desc: "Complete the questionnaire and receive results immediately.",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ y: 50, opacity: 0 }}
              animate={isFeaturesInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              whileHover={{ scale: 1.03 }}
              className="bg-white p-8 rounded-xl shadow-md"
            >
              <h4 className="text-xl font-bold text-purple-700 mb-3">
                {feature.title}
              </h4>
              <p className="text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works - Animates on Scroll */}
      <section className="bg-white py-16 px-10 text-center" ref={howItWorksRef}>
        <motion.h3
          initial={{ opacity: 0 }}
          animate={isHowItWorksInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-semibold text-gray-800 mb-10"
        >
          How It Works
        </motion.h3>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "1. Register", desc: "Create your account and login." },
            { title: "2. Answer Questions", desc: "Complete a short aptitude and interest questionnaire." },
            { title: "3. Get Recommendation", desc: "Instantly receive your personalized course suggestion." },
          ].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -50 }}
              animate={isHowItWorksInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.5, delay: i * 0.3 }}
              className="bg-purple-50 p-6 rounded-xl shadow-md"
            >
              <h4 className="text-xl font-bold text-purple-700">{step.title}</h4>
              <p className="text-gray-600 mt-2">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section - Animates on Scroll */}
      <section className="py-20 text-center bg-purple-700 text-white" ref={ctaRef}>
        <motion.h3
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isCtaInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold mb-6"
        >
          Ready to Find Your Perfect Course?
        </motion.h3>
        
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <Link
            to="/login"
            className="bg-white text-purple-700 px-8 py-3 rounded-lg font-semibold shadow-lg hover:bg-gray-100 transition-all inline-block"
          >
            Start Now
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 bg-purple-800 text-white">
        <p>© 2026 Smart Course Recommender | All Rights Reserved</p>
      </footer>
    </div>
  );
}