// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Button } from "../../components/ui/button";

// export default function QuestionManager() {
//   const [questions, setQuestions] = useState([]);
//   const [text, setText] = useState("");

//   useEffect(() => {
//     axios.get("http://localhost:5000/api/questions")
//       .then(res => setQuestions(res.data));
//   }, []);

//   function addQuestion() {
//     axios.post("http://localhost:5000/api/questions", {
//       text,
//       points: {
//         mern: 2,
//         flutter: 1,
//         datasci: 1,
//         cybersecurity: 1,
//         react: 2,
//         pythonfs: 2,
//         uiux: 1,
//         devops: 1,
//       }
//     }).then(res => {
//       setQuestions([...questions, res.data]);
//       setText("");
//     });
//   }

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-bold mb-4">All Questions</h2>

//       {questions.map(q => (
//         <div key={q._id} className="border p-3 mb-2">
//           {q.text}
//         </div>
//       ))}

//       <input
//         className="border p-2 w-full my-3"
//         value={text}
//         onChange={e => setText(e.target.value)}
//         placeholder="New Question"
//       />

//       <Button onClick={addQuestion}>Add Question</Button>
//     </div>
//   );
// }


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
  const [text, setText] = useState("");
  const [category, setCategory] = useState("mern");

  useEffect(() => {
    axios.get("http://localhost:5000/api/questions")
      .then(res => setQuestions(res.data));
  }, []);

  function addQuestion() {
    const points = { ...emptyPoints };

    // Give strong weight to selected category
    points[category] = 3;

    axios.post("http://localhost:5000/api/questions", {
      text,
      points,
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

      <select
        className="border p-2 w-full mb-3"
        value={category}
        onChange={e => setCategory(e.target.value)}
      >
        <option value="mern">MERN</option>
        <option value="flutter">Flutter</option>
        <option value="datasci">Data Science</option>
        <option value="cybersecurity">Cybersecurity</option>
        <option value="react">React</option>
        <option value="pythonfs">Python Full Stack</option>
        <option value="uiux">UI/UX</option>
        <option value="devops">DevOps</option>
      </select>

      <Button onClick={addQuestion}>Add Question</Button>
    </div>
  );
}
