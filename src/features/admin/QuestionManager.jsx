// //src/features/admin/QuestionManager
import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Trash2, Plus } from "lucide-react";
import { Button } from "../../components/ui/button";

const emptyPoints = {
  mern: 0,
  flutter: 0,
  datasci: 0,
  cybersecurity: 0,
  react: 0,
  pythonfs: 0,
  uiux: 0,
  devops: 0,
};

export default function QuestionManager() {

  const [questions, setQuestions] = useState([]);
  const [courses, setCourses] = useState([]);

  const [text, setText] = useState("");
  const [category, setCategory] = useState("mern");
  const [selectedCourses, setSelectedCourses] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchQuestions();
    fetchCourses();
  }, []);

  const fetchQuestions = async () => {
    const res = await axios.get("http://localhost:5000/api/questions");
    setQuestions(res.data);
  };

  const fetchCourses = async () => {
    const res = await axios.get("http://localhost:5000/api/courses");
    setCourses(res.data);
  };

  const handleCourseChange = (courseId) => {
    if (selectedCourses.includes(courseId)) {
      setSelectedCourses(selectedCourses.filter((id) => id !== courseId));
    } else {
      setSelectedCourses([...selectedCourses, courseId]);
    }
  };

  const openAddModal = () => {
    setEditingId(null);
    setText("");
    setSelectedCourses([]);
    setShowModal(true);
  };

  const editQuestion = (q) => {
    setEditingId(q._id);
    setText(q.text);
    setSelectedCourses(q.courses.map((c) => c._id));
    setShowModal(true);
  };

  const addQuestion = async () => {
    const points = { ...emptyPoints };
    points[category] = 3;

    const res = await axios.post("http://localhost:5000/api/questions", {
      text,
      points,
      courses: selectedCourses,
    });

    setQuestions([...questions, res.data]);
    setShowModal(false);
  };

  const updateQuestion = async () => {
    const points = { ...emptyPoints };
    points[category] = 3;

    const res = await axios.put(
      `http://localhost:5000/api/questions/${editingId}`,
      { text, points, courses: selectedCourses }
    );

    setQuestions(
      questions.map((q) => (q._id === editingId ? res.data : q))
    );

    setShowModal(false);

    setSuccessMessage("Updated Successfully");
    setTimeout(() => setSuccessMessage(""), 2000);
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
  };

  const deleteQuestion = async () => {
    await axios.delete(`http://localhost:5000/api/questions/${deleteId}`);
    setQuestions(questions.filter((q) => q._id !== deleteId));
    setDeleteId(null);
  };

  return (
<div className="p-4 sm:p-6">

      {/* Header */}

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">

        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Question Manager
        </h1>

        <Button
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 w-full sm:w-auto"
        >
          <Plus size={18} />
          Add Question
        </Button>

      </div>

      {/* Question List */}

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >

        {questions.map((q, index) => (
          <motion.div
            key={q._id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ scale: 1.01 }}
            className="bg-white shadow-md rounded-xl p-4 sm:p-5 mb-4 border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >

            <div className="flex gap-4">

              <div className="bg-indigo-600 text-white min-w-[40px] h-10 flex items-center justify-center rounded-full font-semibold">
                {index + 1}
              </div>

              <div>

                <p className="font-medium text-gray-800 text-sm sm:text-base">
                  {q.text}
                </p>

                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  {q.courses.map((c) => c.name).join(", ")}
                </p>

              </div>

            </div>

            <div className="flex gap-3 justify-end">

              <button
                onClick={() => editQuestion(q)}
                className="text-blue-600 hover:text-blue-800"
              >
                <Pencil size={18} />
              </button>

              <button
                onClick={() => confirmDelete(q._id)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 size={18} />
              </button>

            </div>

          </motion.div>
        ))}

      </motion.div>

      {/* Add/Edit Modal */}

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/30 backdrop-blur flex justify-center items-start sm:items-center p-4 z-50 overflow-y-auto"
          >

            <motion.div
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40 }}
              className="bg-white/30 backdrop-blur-lg border border-white/40 shadow-xl rounded-2xl p-6 w-full max-w-md"
            >

              <h2 className="text-lg sm:text-xl font-semibold mb-4 text-center">
                {editingId ? "Edit Question" : "Add Question"}
              </h2>

              <input
                className="border p-2 w-full mb-4 rounded"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter Question"
              />

              <div className="mb-4">

                <p className="font-medium mb-2">Select Courses</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">

                  {courses.map((course) => (
                    <label
                      key={course._id}
                      className="flex items-center gap-2 text-sm"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCourses.includes(course._id)}
                        onChange={() => handleCourseChange(course._id)}
                      />
                      {course.name}
                    </label>
                  ))}

                </div>

              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-end">

                <Button
                  variant="outline"
                  onClick={() => setShowModal(false)}
                  className="w-full sm:w-auto"
                >
                  Cancel
                </Button>

                {editingId ? (
                  <Button
                    onClick={updateQuestion}
                    className="w-full sm:w-auto"
                  >
                    Update
                  </Button>
                ) : (
                  <Button
                    onClick={addQuestion}
                    className="w-full sm:w-auto"
                  >
                    Add
                  </Button>
                )}

              </div>

            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Modal */}

      <AnimatePresence>
        {deleteId && (
          <motion.div className="fixed inset-0 bg-black/30 backdrop-blur flex justify-center items-center p-4 z-50">

            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white/30 backdrop-blur-lg border border-white/40 p-6 rounded-2xl text-center w-full max-w-sm"
            >

              <p className="mb-4 font-medium">
                Delete this question?
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">

                <Button
                  variant="outline"
                  onClick={() => setDeleteId(null)}
                  className="w-full sm:w-auto"
                >
                  Cancel
                </Button>

                <Button
                  onClick={deleteQuestion}
                  className="bg-red-600 hover:bg-red-700 w-full sm:w-auto"
                >
                  OK
                </Button>

              </div>

            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Popup */}

      <AnimatePresence>
        {successMessage && (
          <motion.div className="fixed inset-0 flex justify-center items-center p-4 z-50">

            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white/30 backdrop-blur-lg border border-white/40 px-6 py-4 rounded-2xl text-lg font-semibold text-center"
            >
              {successMessage}
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
