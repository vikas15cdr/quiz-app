// src/shared/pages/AboutPage.tsx
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Define a type for our statistics data
interface Stats {
  activeUsers: number;
  quizzesCreated: number;
  countries: number;
}

export default function AboutPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch stats when the component mounts
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/stats');
        setStats(response.data.data);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            About QuizMaster
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transforming education through interactive quizzes and data-driven learning
          </p>
        </section>

        {/* Mission Section */}
        <Card className="p-8 mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">
            Our Mission
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-700 mb-4">
                Founded in 2025, QuizMaster was created to make learning more engaging 
                and effective through technology. We believe that instant feedback and 
                adaptive quizzes can significantly improve knowledge retention.
              </p>
              <p className="text-gray-700">
                Our platform serves students and educators worldwide, 
                helping them achieve better learning outcomes through data-driven insights.
              </p>
            </div>
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
              <h3 className="font-medium text-blue-800 mb-3">Key Statistics</h3>
              <ul className="space-y-3">
                <li className="flex justify-between">
                  <span className="text-gray-600">Active users</span>
                    {/* Display the fetched data or a loading placeholder */}
                  <span className="font-medium">{loading ? '...' : stats?.activeUsers}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Quizzes created</span>
                  <span className="font-medium">{loading ? '...' : stats?.quizzesCreated}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Countries</span>
                  <span className="font-medium">{loading ? '...' : stats?.countries}</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* CTA Section */}
        <section className="text-center">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Ready to transform your learning experience?
          </h2>
          <Button asChild className="mx-auto">
            <Link to="/register">Get Started for Free</Link>
          </Button>
        </section>
      </div>
    </div>
  );
}