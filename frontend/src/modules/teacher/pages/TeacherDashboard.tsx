import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// --- Define TypeScript types for the data ---
interface User {
  _id: string;
  name: string;
  email: string;
}

interface Quiz {
  _id: string;
  title: string;
  isPublished: boolean;
}

interface DashboardData {
  user: User | null;
  quizzes: Quiz[];
}

const TeacherDashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData>({ user: null, quizzes: [] });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('No token found. Please login.');
            setLoading(false);
            return;
        }
        
        const response = await axios.get<DashboardData>('http://localhost:5000/api/dashboards/teacher', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setDashboardData(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch dashboard data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // --- NEW: Function to handle quiz deletion ---
  const handleDelete = async (quizId: string) => {
    // A simple confirmation dialog. For a real app, you'd use a custom modal.
    if (!window.confirm('Are you sure you want to delete this quiz?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/quizzes/${quizId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // To update the UI instantly, filter out the deleted quiz from the state
      setDashboardData(prevData => ({
        ...prevData,
        quizzes: prevData.quizzes.filter(quiz => quiz._id !== quizId)
      }));

    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete quiz.');
    }
  };


  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Welcome, {dashboardData?.user?.name || 'Teacher'}!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">This is your dashboard. You can create and manage your quizzes here.</p>
          <Link to="/teacher/create-quiz">
            <Button>Create New Quiz</Button>
          </Link>
          
          <h3 className="text-lg font-semibold mt-6 mb-2 border-t pt-4">My Quizzes</h3>
          
          {dashboardData.quizzes.length > 0 ? (
            <ul className="space-y-2">
              {dashboardData.quizzes.map(quiz => (
                <li key={quiz._id} className="flex justify-between items-center p-3 border rounded-md">
                  <div>
                    <span>{quiz.title}</span>
                    <span className={`ml-3 text-sm font-medium px-2 py-1 rounded-full ${quiz.isPublished ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {quiz.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  {/* --- NEW: Edit and Delete Buttons --- */}
                  <div className="space-x-2">
                    <Link to={`/teacher/edit-quiz/${quiz._id}`}>
                      <Button variant="outline" size="sm">Edit</Button>
                    </Link>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(quiz._id)}>
                      Delete
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>You haven't created any quizzes yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherDashboard;