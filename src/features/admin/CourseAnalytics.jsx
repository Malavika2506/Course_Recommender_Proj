import { useEffect, useState } from "react";
import { Card } from "../../components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import axios from "axios";

export default function CourseAnalytics() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/analytics/courses")
      .then(res => {
        const formatted = Object.entries(res.data).map(([name, value]) => ({
          name,
          students: value
        }));
        setData(formatted);
      });
  }, []);

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-4">Course Analytics</h2>
      <BarChart width={600} height={300} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="students" />
      </BarChart>
    </Card>
  );
}
