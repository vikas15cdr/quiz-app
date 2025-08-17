import { useState } from "react";

type Quiz = {
  id: string;
  title: string;
  description: string;
  questions: number;
  attempted: boolean;
};

export default function StudentDashboard() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([
    {
      id: "q1",
      title: "Physics Basics",
      description: "MCQs on Newton's laws and motion",
      questions: 8,
      attempted: false,
    },
    {
      id: "q2",
      title: "Math Quiz",
      description: "Algebra and Geometry fundamentals",
      questions: 10,
      attempted: true,
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">🎓 Student Dashboard</h1>
        <p className="text-gray-600 mb-6">Available Quizzes: <strong>{quizzes.length}</strong></p>

        {quizzes.length === 0 ? (
          <p className="text-gray-500">No quizzes available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quizzes.map((quiz) => (
              <div key={quiz.id} className="border border-gray-300 p-6 rounded-lg bg-white shadow-sm">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{quiz.title}</h2>
                <p className="text-gray-600 mb-2">{quiz.description}</p>
                <p className="text-sm text-gray-500 mb-4">🧠 {quiz.questions} questions</p>
                <button
                  onClick={() => alert(`Navigating to quiz: ${quiz.title}`)}
                  className={`px-4 py-2 rounded text-white transition ${
                    quiz.attempted
                      ? "bg-yellow-500 hover:bg-yellow-600"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {quiz.attempted ? "Resume Quiz" : "Start Quiz"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
