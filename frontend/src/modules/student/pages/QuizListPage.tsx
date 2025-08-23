import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import axios from 'axios';

const QuizListPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/quizzes');
        setQuizzes(response.data.data);
      } catch (error) {
        console.error("Failed to fetch quizzes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, []);

  if (loading) return <div>Loading quizzes...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Available Quizzes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quizzes.map(quiz => (
          <Card key={quiz._id}>
            <CardHeader>
              <CardTitle>{quiz.title}</CardTitle>
              <CardDescription>Category: {quiz.category} | By: {quiz.createdBy?.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{quiz.description}</p>
              <Link to={`/quiz/${quiz._id}`}>
                <Button className="mt-4 w-full">Start Quiz</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default QuizListPage;