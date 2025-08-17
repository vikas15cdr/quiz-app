import { useState } from "react";
import { format } from "date-fns";

type Quiz = {
  id: string;
  title: string;
  description: string;
  questions: number;
  createdAt: string;
};

export default function TeacherDashboard() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([
    {
      id: "q1",
      title: "Physics Basics",
      description: "MCQs on Newton's laws and motion",
      questions: 8,
      createdAt: new Date().toISOString(),
    },
    {
      id: "q2",
      title: "Math Quiz",
      description: "Algebra and Geometry fundamentals",
      questions: 10,
      createdAt: new Date().toISOString(),
    },
  ]);

  const handleDelete = (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this quiz?");
    if (confirmed) {
      setQuizzes(quizzes.filter(q => q.id !== id));
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">📚 Teacher Dashboard</h1>
        <a
          href="/teacher/create-quiz"
          className="px-4 py-2 bg-neutral-800 text-white rounded hover:bg-neutral-900 transition"
        >
          ➕ Create New Quiz
        </a>
      </header>

      {/* Main Content */}
      <main className="flex-grow px-8 py-10">
        <p className="text-gray-600 mb-6">You have <strong>{quizzes.length}</strong> quizzes.</p>

        {quizzes.length === 0 ? (
          <p className="text-gray-500">No quizzes yet. Start by creating one!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quizzes.map((quiz) => (
              <div key={quiz.id} className="border border-gray-300 p-6 rounded-lg bg-white shadow-sm">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{quiz.title}</h2>
                <p className="text-gray-600 mb-2">{quiz.description}</p>
                <p className="text-sm text-gray-500 mb-4">
                  🧠 {quiz.questions} questions • 📅 {format(new Date(quiz.createdAt), "dd MMM yyyy")}
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => alert(`Viewing quiz: ${quiz.title}`)}
                    className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                  >
                    View
                  </button>
                  <button
                    onClick={() => alert(`Editing quiz: ${quiz.title}`)}
                    className="px-4 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(quiz.id)}
                    className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-10 py-4 px-8 text-sm text-gray-500 flex justify-between items-center">
        <span>© 2025 QuizMaster</span>
        <div className="flex gap-4">
          <a href="/terms" className="hover:underline">Terms</a>
          <a href="/privacy" className="hover:underline">Privacy</a>
          <a href="/contact" className="hover:underline">Contact</a>
        </div>
      </footer>
    </div>
  );
}
