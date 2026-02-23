

import { useEffect, useState } from "react";
import axios from "axios";
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
  const [selectedCourse, setSelectedCourse] = useState("");

  useEffect(() => {
    fetchQuestions();
    fetchCourses();
  }, []);

  // ✅ Fetch questions
  const fetchQuestions = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/questions");
      setQuestions(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ Fetch courses from backend
  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/courses");
      setCourses(res.data);

      // Set first course as default
      if (res.data.length > 0) {
        setSelectedCourse(res.data[0]._id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addQuestion = async () => {
    if (!text || !selectedCourse) {
      alert("Please enter question and select course");
      return;
    }

    const points = { ...emptyPoints };
    points[category] = 3;

    try {
      const res = await axios.post(
        "http://localhost:5000/api/questions",
        {
          text,
          points,
          course: selectedCourse, // ✅ send course id
        }
      );

      setQuestions([...questions, res.data]);
      setText("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">All Questions</h2>

      {/* Questions List */}
      {questions.map((q) => (
        <div key={q._id} className="border p-3 mb-2 rounded">
          <p>{q.text}</p>
          {q.course && (
            <p className="text-sm text-gray-500">
              Course: {q.course.name}
            </p>
          )}
        </div>
      ))}

      {/* Add Question Form */}
      <div className="mt-6 border p-4 rounded-lg">
        <input
          className="border p-2 w-full mb-3"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter Question"
        />

        {/* ✅ Course Dropdown from Backend */}
        <select
          className="border p-2 w-full mb-3"
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
        >
          {courses.length === 0 ? (
            <option value="">No Courses Available</option>
          ) : (
            courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.name}
              </option>
            ))
          )}
        </select>

       

        <Button onClick={addQuestion}>Add Question</Button>
      </div>
    </div>
  );
}
