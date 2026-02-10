//src/features/admin/StudentList
import { useEffect, useState } from "react";
import { Card } from "../../components/ui/card";

export default function StudentList() {
  const [students, setStudents] = useState([]);

useEffect(() => {
  fetch("http://localhost:5000/api/users", {
    credentials: "include",
  })
    .then(res => res.json())
    .then(data => {
      if (Array.isArray(data)) {
        setStudents(data);
      } else {
        setStudents([]);
      }
    })
    .catch(err => console.error(err));
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
          {students.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center py-4">
                No students found
              </td>
            </tr>
          ) : (
            students.map(s => (
              <tr key={s._id}>
                <td>{s.name}</td>
                <td>{s.email}</td>
                <td>{s.bestCourse || "-"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </Card>
  );
}
