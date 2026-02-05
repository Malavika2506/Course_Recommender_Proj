import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../../components/ui/button";

export default function QuestionManager() {
  const [questions, setQuestions] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/questions")
      .then(res => setQuestions(res.data));
  }, []);

  function addQuestion() {
    axios.post("http://localhost:5000/api/questions", {
      text,
      points: {
        mern: 2,
        flutter: 1,
        datasci: 1,
        cybersecurity: 1,
        react: 2,
        pythonfs: 2,
        uiux: 1,
        devops: 1,
      }
    }).then(res => {
      setQuestions([...questions, res.data]);
      setText("");
    });
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">All Questions</h2>

      {questions.map(q => (
        <div key={q._id} className="border p-3 mb-2">
          {q.text}
        </div>
      ))}

      <input
        className="border p-2 w-full my-3"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="New Question"
      />

      <Button onClick={addQuestion}>Add Question</Button>
    </div>
  );
}
