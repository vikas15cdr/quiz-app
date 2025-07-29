// src/modules/shared/pages/HomePage.tsx
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button'; // Using shadcn/ui components

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-6">
          Welcome to QuizMaster
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Test your knowledge or create quizzes for your students
        </p>

        <div className="flex gap-4 justify-center">
          <Button asChild size="lg">
            <Link to="/login" className="text-white">
              I'm a Student
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/login">
              I'm an Educator
            </Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '📊',
                title: 'Detailed Analytics',
                desc: 'Track your progress with real-time statistics'
              },
              {
                icon: '⚡',
                title: 'Instant Feedback',
                desc: 'Get results immediately after submission'
              },
              {
                icon: '🎯',
                title: 'Custom Quizzes',
                desc: 'Teachers can create targeted assessments'
              }
            ].map((feature) => (
              <div key={feature.title} className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}