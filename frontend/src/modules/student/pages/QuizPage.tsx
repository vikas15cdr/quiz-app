import { useState } from "react";

type Question = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
};

const sampleQuestions: Question[] = [
  {
    id: "q1",
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    correctAnswer: "Paris",
  },
  {
    id: "q2",
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    correctAnswer: "Mars",
  },
];

export default function QuizPage() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleOptionSelect = (questionId: string, option: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const calculateScore = () => {
    let score = 0;
    sampleQuestions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) score++;
    });
    return score;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">📝 Quiz</h1>

        {sampleQuestions.map((q) => (
          <div key={q.id} className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">{q.question}</h2>
            <div className="grid grid-cols-2 gap-3">
              {q.options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleOptionSelect(q.id, opt)}
                  className={`px-4 py-2 rounded border ${
                    answers[q.id] === opt
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))}

        {!submitted ? (
          <button
            onClick={handleSubmit}
            className="mt-6 px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Submit Quiz
          </button>
        ) : (
          <div className="mt-6 text-xl text-gray-800">
            ✅ You scored <strong>{calculateScore()}</strong> out of{" "}
            <strong>{sampleQuestions.length}</strong>
          </div>
        )}
      </div>
    </div>
  );
}
