export default function FeaturesPage() {
  const features = [
    {
      title: "Interactive Quizzes",
      description: "Engaging multiple-choice questions with instant feedback",
      icon: "📝"
    },
    {
      title: "Progress Tracking",
      description: "Monitor your learning journey with detailed analytics",
      icon: "📊"
    },
    {
      title: "Teacher Tools",
      description: "Create and manage quizzes for your students",
      icon: "👩‍🏫"
    }
  ];

  return (
    <div className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Our Features
        </h1>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="border rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h2 className="text-xl font-semibold mb-2 text-gray-800">
                {feature.title}
              </h2>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}