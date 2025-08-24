import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import axios from 'axios';

interface Question {
  text: string;
  options: string[];
}

interface Quiz {
  title: string;
  questions: Question[];
}

const TakeQuizPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get<{ data: Quiz }>(
          `${import.meta.env.VITE_API_BASE_URL}/api/quizzes/${id}`
        );
        setQuiz(response.data.data);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || "Failed to load the quiz.");
        } else {
          setError("Unexpected error occurred while loading the quiz.");
        }
      }
    };
    fetchQuiz();
  }, [id]);

  const handleAnswerSelect = (option: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: option
    }));
  };

  const handleNext = () => {
    if (quiz && currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError("Authentication token missing. Please login again.");
        return;
      }

      const response = await axios.post<{ data: { score: number } }>(
        `${import.meta.env.VITE_API_BASE_URL}/api/quizzes/${id}/submit`,
        { answers: Object.values(answers) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setScore(response.data.data.score);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || "Failed to submit quiz.");
      } else {
        setError("Unexpected error occurred during submission.");
      }
    }
  };

  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;
  if (!quiz) return <div>Loading quiz...</div>;

  if (score !== null) {
    return (
      <Card className="w-full max-w-md mx-auto my-5 text-center">
        <CardHeader>
          <CardTitle>Quiz Completed!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl">Your score is: {score.toFixed(0)}%</p>
          <Button onClick={() => navigate('/student/dashboard')} className="mt-4">
            Back to Dashboard
          </Button>
        </CardContent>
      </Card>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <Card className="w-full max-w-xl mx-auto my-5">
      <CardHeader>
        <CardTitle>{quiz.title}</CardTitle>
        <p>Question {currentQuestionIndex + 1} of {quiz.questions.length}</p>
      </CardHeader>
      <CardContent>
        <h3 className="text-lg font-semibold mb-4">{currentQuestion.text}</h3>
        <div className="space-y-2">
          {currentQuestion.options.map((option, index) => (
            <Button
              key={index}
              variant={answers[currentQuestionIndex] === option ? "default" : "outline"}
              className="w-full justify-start text-left h-auto py-2 whitespace-normal"
              onClick={() => handleAnswerSelect(option)}
            >
              {option}
            </Button>
          ))}
        </div>
        <div className="flex justify-between mt-6">
          {currentQuestionIndex < quiz.questions.length - 1 ? (
            <Button onClick={handleNext} disabled={!answers[currentQuestionIndex]}>
              Next
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={!answers[currentQuestionIndex]}>
              Submit Quiz
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TakeQuizPage;
