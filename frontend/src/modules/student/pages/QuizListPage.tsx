import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Quiz {
  _id: string;
  title: string;
  description: string;
  category: string;
  createdBy?: {
    name: string;
  };
}

const QuizListPage: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        // This endpoint correctly fetches only published quizzes
        const response = await axios.get('http://localhost:5000/api/quizzes');
        setQuizzes(response.data.data.quizzes); // Access the nested quizzes array
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch quizzes.");
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, []);

  if (loading) return <div>Loading quizzes...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Available Quizzes</h1>
      {quizzes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quizzes.map(quiz => (
            <Card key={quiz._id}>
              <CardHeader>
                <CardTitle>{quiz.title}</CardTitle>
                <CardDescription>Category: {quiz.category} | By: {quiz.createdBy?.name || 'Unknown'}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{quiz.description}</p>
                <Link to={`/student/quiz/${quiz._id}`}>
                  <Button className="mt-4 w-full">Start Quiz</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p>No published quizzes are available at the moment.</p>
      )}
    </div>
  );
};

export default QuizListPage;