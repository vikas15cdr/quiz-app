import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// A more detailed feature list with better icons
const features = [
  {
    title: "Interactive Quizzes",
    description: "Engage students with dynamic multiple-choice questions that provide instant feedback to reinforce learning.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    )
  },
  {
    title: "Progress Tracking",
    description: "Monitor learning journeys with detailed analytics on scores and performance over time for data-driven insights.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )
  },
  {
    title: "Teacher Tools",
    description: "Easily create, customize, and publish quizzes. Manage your classes and view student results all in one place.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    )
  }
];

export default function FeaturesPage() {
  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Powerful Features for Modern Learning
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            QuizMaster provides all the tools you need to create an engaging and effective educational experience.
          </p>
        </section>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto bg-gray-100 rounded-full h-16 w-16 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* --- NEW "HOW IT WORKS" SECTION --- */}
        <section className="py-20 bg-white rounded-lg">
            <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">How It Works</h2>
            <div className="grid md:grid-cols-2 gap-12">
                
                {/* For Students Path */}
                <div className="text-center">
                <h3 className="text-2xl font-semibold mb-6 text-blue-600">For Students</h3>
                <ol className="space-y-4">
                    <li className="flex flex-col items-center">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 font-bold text-lg mb-2">1</div>
                    <h4 className="font-semibold">Sign Up</h4>
                    <p className="text-gray-600">Create your free student account in seconds.</p>
                    </li>
                    <li className="flex flex-col items-center">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 font-bold text-lg mb-2">2</div>
                    <h4 className="font-semibold">Browse Quizzes</h4>
                    <p className="text-gray-600">Explore a wide range of quizzes published by educators.</p>
                    </li>
                    <li className="flex flex-col items-center">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 font-bold text-lg mb-2">3</div>
                    <h4 className="font-semibold">Take & Learn</h4>
                    <p className="text-gray-600">Attempt quizzes, get instant scores, and track your progress.</p>
                    </li>
                </ol>
                </div>

                {/* For Educators Path */}
                <div className="text-center">
                <h3 className="text-2xl font-semibold mb-6 text-purple-600">For Educators</h3>
                <ol className="space-y-4">
                    <li className="flex flex-col items-center">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-purple-100 text-purple-600 font-bold text-lg mb-2">1</div>
                    <h4 className="font-semibold">Register</h4>
                    <p className="text-gray-600">Sign up as an educator to access teacher tools.</p>
                    </li>
                    <li className="flex flex-col items-center">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-purple-100 text-purple-600 font-bold text-lg mb-2">2</div>
                    <h4 className="font-semibold">Create & Customize</h4>
                    <p className="text-gray-600">Build custom quizzes with our easy-to-use editor.</p>
                    </li>
                    <li className="flex flex-col items-center">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-purple-100 text-purple-600 font-bold text-lg mb-2">3</div>
                    <h4 className="font-semibold">Publish & Track</h4>
                    <p className="text-gray-600">Publish quizzes for your students and monitor their results.</p>
                    </li>
                </ol>
                </div>

            </div>
            </div>
        </section>

        {/* CTA Section */}
        <section className="text-center mt-16">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Ready to get started?
          </h2>
          <Button asChild size="lg">
            <Link to="/register">Create Your First Quiz</Link>
          </Button>
        </section>
      </div>
    </div>
  );
}