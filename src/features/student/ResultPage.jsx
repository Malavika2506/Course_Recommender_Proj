import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Sparkles, ArrowRight, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

export default function ResultPage() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMore, setShowMore] = useState(false);

  
  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/result/me", {
          credentials: "include",
        });
        const data = await res.json();
        setResult(data);
      } catch (err) {
        setError("Failed to load your result. Please try again.");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, []);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
    float: {
      y: [-10, 10, -10],
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
    },
  };

  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: "0 10px 25px -5px rgba(236, 72, 153, 0.5)" },
    tap: { scale: 0.95 },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center overflow-hidden relative">
        {/* Animated Background Blobs */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 7, repeat: Infinity, delay: 1 }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"
        />

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="flex flex-col items-center z-10"
        >
          <Loader2 className="w-12 h-12 text-pink-500 mb-4" />
          <p className="text-pink-400 text-lg font-medium tracking-wide">Analyzing your results...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl text-center max-w-md border border-white/20 shadow-2xl"
        >
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Oops!</h2>
          <p className="text-gray-300">{error}</p>
        </motion.div>
      </div>
    );
  }

  const course = result?.recommendedCourse;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4 overflow-hidden relative">
      
      {/* Animated Background Blobs */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-0 left-0 w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"
      />
      <motion.div 
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, delay: 1 }}
        className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2"
      />

      <div className="max-w-4xl w-full z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center p-3 bg-pink-500/20 rounded-full mb-4 shadow-lg shadow-pink-500/20">
            <Sparkles className="w-6 h-6 text-pink-400 animate-pulse" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Your Personalized <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">Recommendation</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Based on your performance, we've selected the perfect course to help you grow.
          </p>
        </motion.div>

        {/* Main Card */}
        <AnimatePresence>
          {course ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex justify-center"
            >
              <motion.div
                variants={cardVariants}
                animate="float"
                className="relative w-full max-w-2xl"
              >
                {/* Background Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000" />
                
                {/* Card Content */}
                <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 md:p-10 shadow-2xl">
                  
                  {/* Badge */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                    className="inline-flex items-center px-4 py-2 bg-pink-500/20 rounded-full text-pink-300 text-sm font-medium mb-6 text-center border border-pink-500/30"
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Perfect Match
                  </motion.div>

                  {/* Course Name */}
                  <motion.h2
                    variants={textVariants}
                    className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight text-center"
                  >
                    {course.name}
                  </motion.h2>

                  {/* Short Description (Visible Always) */}
                  {/* <motion.p
                    variants={textVariants}
                    className="text-gray-300 text-lg mb-8 leading-relaxed text-center"
                  >
                    {course.description}
                  </motion.p> */}

                  {/* Button */}
                  <motion.div
                    variants={textVariants}
                    className="flex justify-center"
                  >
                    <motion.button
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      onClick={() => setShowMore(!showMore)}
                      className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-pink-600 rounded-xl hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-600 focus:ring-offset-gray-900 overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center">
                        {showMore ? "Show Less" : "Know More"}
                        <motion.div
                          animate={{ x: showMore ? -5 : 5 }}
                          transition={{ duration: 0.3 }}
                          className="ml-2"
                        >
                          <ArrowRight className="w-5 h-5" />
                        </motion.div>
                      </span>
                      {/* Button Shine Effect */}
                      <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
                    </motion.button>
                  </motion.div>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {showMore && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="mt-8 pt-8 border-t border-white/10 overflow-hidden"
                        layout
                      >
                        <div className="bg-white/5 rounded-xl p-6">
                          <h3 className="text-xl font-semibold text-white mb-4 flex items-center justify-center">
                            <BookOpen className="w-5 h-5 mr-2 text-pink-400" />
                            Course Details
                          </h3>
                          <p className="text-gray-300 leading-relaxed whitespace-pre-line text-center">
                            {course.description}
                          </p>
                          
                          {/* Additional Info */}
                          {course.instructor && (
                            <div className="mt-6 flex items-center justify-center space-x-4">
                              <div className="w-12 h-12 bg-pink-500/20 rounded-full flex items-center justify-center">
                                <span className="text-pink-400 font-bold text-lg">
                                  {course.instructor.charAt(0)}
                                </span>
                              </div>
                              <div>
                                <p className="text-sm text-gray-400">Instructor</p>
                                <p className="text-white font-medium">{course.instructor}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <BookOpen className="w-20 h-20 text-gray-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">No Recommendations Yet</h2>
              <p className="text-gray-400">Complete your assessment to get personalized course suggestions.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}