import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../../components/ui/button";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  function fetchCourses() {
    axios.get("http://localhost:5000/api/courses")
      .then(res => setCourses(res.data));
  }

  function addCourse() {
    axios.post("http://localhost:5000/api/courses", {
      name,
      description
    }).then(res => {
      setCourses([...courses, res.data]);
      setName("");
      setDescription("");
      setShowForm(false);
    });
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Courses</h2>
        <Button onClick={() => setShowForm(!showForm)}>
          Add Course
        </Button>
      </div>

      {showForm && (
        <div className="border p-4 mb-6 rounded-lg">
          <input
            className="border p-2 w-full mb-3"
            placeholder="Course Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <textarea
            className="border p-2 w-full mb-3"
            placeholder="Course Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Button onClick={addCourse}>Submit</Button>
        </div>
      )}

      <table className="w-full border">
        <thead>
          <tr className="bg-slate-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Description</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(course => (
            <tr key={course._id}>
              <td className="border p-2">{course.name}</td>
              <td className="border p-2">{course.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
