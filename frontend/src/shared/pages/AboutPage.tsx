
// src/shared/pages/AboutPage.tsx
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import vikasImg from "@/assets/vikas.jpeg";
import dhruvImg from "@/assets/dhruv.jpg";

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Vikas",
      role: "AI & Web Developer",
      bio: "Web developer with a passion for creating engaging educational experiences",
      img: vikasImg
    },
    {
      name: "Dhruv Gupta",
      role: "Web Developer",
      bio: "Full-stack developer focused on creating interactive learning experiences",
      img: dhruvImg
    },
    {
      name: "Jitesh Dhawan",
      role: "AI & Web Developer",
      bio: "Passionate about creating intuitive user interfaces for education",
      img: "https://randomuser.me/api/portraits/men/75.jpg"
    }
  ];

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
                Our platform serves over 50,000 students and educators worldwide, 
                helping them achieve better learning outcomes through data-driven insights.
              </p>
            </div>
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
              <h3 className="font-medium text-blue-800 mb-3">Key Statistics</h3>
              <ul className="space-y-3">
                <li className="flex justify-between">
                  <span className="text-gray-600">Active users</span>
                  <span className="font-medium">----</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Quizzes created</span>
                  <span className="font-medium">----</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Countries</span>
                  <span className="font-medium">----</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Team Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">
            Meet Our Team
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <Card key={member.name} className="p-6 text-center">
                <img 
                  src={member.img} 
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-medium mb-1">{member.name}</h3>
                <p className="text-blue-600 mb-3">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </Card>
            ))}
          </div>
        </section>

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