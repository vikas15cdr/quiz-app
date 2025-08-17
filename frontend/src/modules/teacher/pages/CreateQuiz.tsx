import { useState } from "react";

type Question = {
  question: string;
  options: string[];
  correctIndex: number;
};

export default function CreateQuiz() {
  const [quizTitle, setQuizTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentOptions, setCurrentOptions] = useState(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState<number | null>(null);
  const [error, setError] = useState("");

  const MAX_QUESTIONS = 10;

  const handleAddQuestion = () => {
    if (!currentQuestion.trim() || currentOptions.some(opt => !opt.trim()) || correctIndex === null) {
      setError("Please fill all fields and select the correct answer.");
      return;
    }

    const newQ: Question = {
      question: currentQuestion.trim(),
      options: currentOptions.map(opt => opt.trim()),
      correctIndex,
    };

    setQuestions([...questions, newQ]);
    setCurrentQuestion("");
    setCurrentOptions(["", "", "", ""]);
    setCorrectIndex(null);
    setError("");
  };

  const handleSubmit = () => {
    const payload = {
      title: quizTitle.trim(),
      description: description.trim(),
      questions,
    };
    console.log("Quiz submitted:", payload);
    alert("Quiz created successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">🎓 Create New Quiz</h1>

        {/* Quiz Details */}
        <div className="mb-8">
          <label className="block font-medium text-gray-700 mb-2">Quiz Title *</label>
          <input
            type="text"
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-neutral-800"
            placeholder="Enter quiz title"
          />

          <label className="block font-medium text-gray-700 mt-6 mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-neutral-800"
            placeholder="Enter quiz description"
            rows={3}
          />
        </div>

        {/* Question Builder */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Questions ({questions.length}/{MAX_QUESTIONS})</h2>

          {questions.length < MAX_QUESTIONS && (
            <div className="border border-gray-300 p-6 rounded-lg bg-gray-50 mb-6">
              <label className="block font-medium text-gray-700 mb-2">Question *</label>
              <textarea
                value={currentQuestion}
                onChange={(e) => setCurrentQuestion(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-neutral-800"
                placeholder="Enter your question"
                rows={2}
              />

              <label className="block font-medium text-gray-700 mt-4 mb-2">Options</label>
              {currentOptions.map((opt, idx) => (
                <div key={idx} className="flex items-center mb-3">
                  <input
                    type="text"
                    value={opt}
                    onChange={(e) => {
                      const updated = [...currentOptions];
                      updated[idx] = e.target.value;
                      setCurrentOptions(updated);
                    }}
                    className="flex-1 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-neutral-800"
                    placeholder={`Option ${String.fromCharCode(65 + idx)}`}
                  />
                  <label className="ml-4 flex items-center text-sm text-gray-600">
                    <input
                      type="radio"
                      name="correct"
                      checked={correctIndex === idx}
                      onChange={() => setCorrectIndex(idx)}
                      className="mr-2"
                    />
                    Correct
                  </label>
                </div>
              ))}

              {error && <p className="text-red-600 mt-2">{error}</p>}

              <button
                onClick={handleAddQuestion}
                className="mt-4 px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                ✅ Save Question
              </button>
            </div>
          )}

          {/* Preview Questions */}
          {questions.map((q, idx) => (
            <div key={idx} className="mb-4 p-5 border border-gray-300 rounded-lg bg-white shadow-sm">
              <p className="font-medium text-gray-700 mb-2">
                <span className="text-neutral-800 font-bold">{idx + 1}. </span> {q.question}
              </p>
              <ul className="list-none ml-2 text-gray-600">
                {q.options.map((opt, i) => (
                  <li
                    key={i}
                    className={`mb-1 px-2 py-1 rounded ${
                      i === q.correctIndex ? "bg-green-100 text-green-700 font-semibold" : ""
                    }`}
                  >
                    <strong>{String.fromCharCode(65 + i)}:</strong> {opt}
                    {i === q.correctIndex && <span className="ml-2 text-xs font-medium">(Correct)</span>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={questions.length === 0 || !quizTitle.trim()}
          className="mt-6 px-6 py-3 bg-neutral-800 text-white rounded hover:bg-neutral-900 transition disabled:opacity-50"
        >
          🚀 Create Quiz
        </button>
      </div>
    </div>
  );
}
