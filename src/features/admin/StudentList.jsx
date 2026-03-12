
// src/features/admin/StudentList.jsx

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Users } from "lucide-react";

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

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

  const filteredStudents = students.filter((s) =>
    s.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center mb-6"
      >
        <div className="flex items-center gap-2">
          <Users className="text-indigo-600" size={28} />
          <h1 className="text-2xl font-bold text-gray-800">
            Registered Students
          </h1>
        </div>

        {/* Search */}
        <div className="flex items-center bg-white shadow px-3 py-2 rounded-xl">
          <Search size={18} className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search student..."
            className="outline-none"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-xl rounded-2xl overflow-hidden"
      >
        <table className="w-full text-left">

          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Recommended Course</th>
            </tr>
          </thead>

          <tbody>
            {filteredStudents.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center py-6 text-gray-500">
                  No students found
                </td>
              </tr>
            ) : (
              filteredStudents.map((student, index) => (
                <motion.tr
                  key={student._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b hover:bg-gray-50 transition"
                >

                  <td className="p-4 font-medium">
                    {student.name}
                  </td>

                  <td className="p-4 text-gray-600">
                    {student.email}
                  </td>

                  <td className="p-4">
                    {student.bestCourse ? (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                        {student.bestCourse}
                      </span>
                    ) : (
                      <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-sm">
                        Not Attempted
                      </span>
                    )}
                  </td>

                </motion.tr>
              ))
            )}

          </tbody>
        </table>
      </motion.div>

      {/* Footer */}
      <div className="mt-4 text-gray-500 text-sm">
        Total Students: <span className="font-semibold">{students.length}</span>
      </div>

    </div>
  );
}
