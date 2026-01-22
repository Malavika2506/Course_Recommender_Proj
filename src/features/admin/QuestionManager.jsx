import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";

export default function QuestionManager() {
  const [questions, setQuestions] = useState([
    { text: "Do you enjoy designing user interfaces and working with visuals?", tags: ["uiux"] },
    { text: "Do you prefer building mobile applications?", tags: ["flutter"] },
    { text: "Do you like developing websites using frontend technologies?", tags: ["react", "angular"] },
    { text: "Are you comfortable solving logical problems and writing clean code?", tags: ["pythonfs", "mern", "phpfs"] },
    { text: "Do you enjoy working with backend logic and APIs?", tags: ["pythonfs", "mern", "phpfs"] },
    { text: "Are you interested in analyzing or interpreting data?", tags: ["datasci", "businessanalytics"] },
    { text: "Do you enjoy mathematics, patterns, or statistics?", tags: ["datasci"] },
    { text: "Are you fascinated by artificial intelligence and machine learning?", tags: ["pythonai"] },
    { text: "Do you like identifying bugs and ensuring software quality?", tags: ["testing"] },
    { text: "Do you want to work with cyber security or ethical hacking?", tags: ["cybersecurity"] },
    { text: "Are you interested in deployment, CI/CD, or cloud-based automation?", tags: ["devops"] },
    { text: "Do you prefer creating interactive and fast front-end experiences?", tags: ["react", "angular"] },
    { text: "Do you like designing user flows and prototypes?", tags: ["uiux"] },
    { text: "Do you want to work as a backend developer with databases and server logic?", tags: ["pythonfs", "phpfs", "mern"] },
    { text: "Do you enjoy solving business problems using insights from data?", tags: ["businessanalytics"] },
  ]);

  const [newQuestion, setNewQuestion] = useState("");
  const [newTags, setNewTags] = useState("");

  function addQuestion() {
    if (!newQuestion.trim()) return;
    setQuestions([...questions, { text: newQuestion, tags: newTags.split(",") }]);
    setNewQuestion("");
    setNewTags("");
  }

  function deleteQuestion(index) {
    setQuestions(questions.filter((_, i) => i !== index));
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <Card className="p-6 max-w-3xl mx-auto shadow rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Question Manager</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            
            {/* Add New Question */}
            <div className="border p-4 rounded-lg bg-white shadow-sm">
              <h2 className="text-lg font-semibold mb-2">Add New Question</h2>
              <input
                type="text"
                placeholder="Enter question"
                className="border w-full px-3 py-2 rounded mb-2"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
              />
              <input
                type="text"
                placeholder="Enter tags (comma separated)"
                className="border w-full px-3 py-2 rounded mb-2"
                value={newTags}
                onChange={(e) => setNewTags(e.target.value)}
              />

              <Button onClick={addQuestion} className="w-full">
                Add Question
              </Button>
            </div>

            {/* Display All Questions */}
            {questions.map((q, i) => (
              <div
                key={i}
                className="border p-4 rounded-lg bg-white shadow-sm flex justify-between items-start"
              >
                <div>
                  <p className="font-medium">{q.text}</p>
                  <p className="text-sm text-gray-600">Tags: {q.tags.join(", ")}</p>
                </div>

                <Button
                  variant="destructive"
                  onClick={() => deleteQuestion(i)}
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
