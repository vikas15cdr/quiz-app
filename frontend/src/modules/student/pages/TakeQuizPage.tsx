import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import axios from 'axios';

const TakeQuizPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/quizzes/${id}`);
        setQuiz(response.data.data);
      } catch (error) {
        console.error("Failed to fetch quiz:", error);
      }
    };
    fetchQuiz();
  }, [id]);

  const handleAnswerSelect = (option) => {
    setAnswers({
      ...answers,
      [currentQuestionIndex]: option
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`http://localhost:5000/api/quizzes/${id}/submit`, 
        { answers: Object.values(answers) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setScore(response.data.data.score);
    } catch (error) {
      console.error("Failed to submit quiz:", error.response?.data?.message || error.message);
    }
  };

  if (!quiz) return <div>Loading quiz...</div>;

  if (score !== null) {
    return (
      <Card className="w-full max-w-md mx-auto my-5 text-center">
        <CardHeader>
          <CardTitle>Quiz Completed!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl">Your score is: {score.toFixed(2)}%</p>
          <Button onClick={() => navigate('/quizzes')} className="mt-4">Back to Quizzes</Button>
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
              className="w-full justify-start text-left h-auto py-2"
              onClick={() => handleAnswerSelect(option)}
            >
              {option}
            </Button>
          ))}
        </div>
        <div className="flex justify-between mt-6">
          {currentQuestionIndex < quiz.questions.length - 1 ? (
            <Button onClick={handleNext}>Next</Button>
          ) : (
            <Button onClick={handleSubmit}>Submit Quiz</Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TakeQuizPage;