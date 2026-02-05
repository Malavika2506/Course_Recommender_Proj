import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "../../components/ui/card";

export default function StudentList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/students")
      .then(res => setStudents(res.data));
  }, []);

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-4">Registered Students</h2>
      <table className="w-full border">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Best Course</th>
          </tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s._id}>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.bestCourse}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
