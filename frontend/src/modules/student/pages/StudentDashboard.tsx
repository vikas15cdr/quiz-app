import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// --- Define TypeScript types ---
interface User {
  _id: string;
  name: string;
}

interface QuizInfo {
  _id: string;
  title: string;
  category: string;
}

interface Result {
  _id: string;
  quiz: QuizInfo;
  score: number;
  createdAt: string;
}

interface DashboardData {
  user: User | null;
  results: Result[];
}

const StudentDashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData>({ user: null, results: [] });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No token found. Redirecting to login...');
          setTimeout(() => navigate('/login'), 1500);
          return;
        }

        const response = await axios.get<DashboardData>(
          `${import.meta.env.VITE_API_BASE_URL}/api/dashboards/student`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setDashboardData(response.data);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || err.message);
        } else {
          setError('Unexpected error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Welcome, {dashboardData?.user?.name || 'Student'}!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Here are the quizzes you have attempted.</p>
          <Link to="/student/quizzes">
            <Button>Attempt a New Quiz</Button>
          </Link>

          <h3 className="text-lg font-semibold mt-6 mb-2 border-t pt-4">My Quiz History</h3>

          {dashboardData.results.length > 0 ? (
            <ul className="space-y-2">
              {dashboardData.results.map(result => (
                <li key={result._id} className="flex justify-between items-center p-3 border rounded-md">
                  <div>
                    <p className="font-medium">{result.quiz.title}</p>
                    <p className="text-sm text-gray-500">{result.quiz.category}</p>
                    <p className="text-xs text-gray-400">
                      Taken on {new Date(result.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="font-bold text-lg">{result.score.toFixed(0)}%</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>You haven't attempted any quizzes yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentDashboard;
