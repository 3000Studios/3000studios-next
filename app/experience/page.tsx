// Copyright (c) 2025 NAME.
// All rights reserved.
// Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.

export default function ExperiencePage() {
  const experiences = [
    {
      title: "Full-Stack Development",
      description: "Building modern web applications with Next.js, React, and Node.js",
      icon: "💻",
    },
    {
      title: "AI Integration",
      description: "Implementing AI-powered features and automation",
      icon: "🤖",
    },
    {
      title: "UI/UX Design",
      description: "Creating beautiful, responsive, and intuitive interfaces",
      icon: "🎨",
    },
    {
      title: "Cloud Infrastructure",
      description: "Deploying and managing applications on Vercel, AWS, and Azure",
      icon: "☁️",
    },
  ];

  return (
    <div className="min-h-screen px-4 py-12 md:py-20 w-full max-w-full overflow-x-hidden">
      <div className="max-w-6xl mx-auto w-full">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-center mb-4 md:mb-6 glow-text">
          Experience
        </h1>
        
        <p className="text-lg md:text-xl text-center text-gray-300 mb-12 md:mb-16 max-w-3xl mx-auto px-4">
          A showcase of expertise, innovation, and cutting-edge technology solutions
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="glass p-8 rounded-2xl hover:scale-105 transition-transform duration-300"
            >
              <div className="text-6xl mb-4">{exp.icon}</div>
              <h3 className="text-2xl font-bold mb-3">{exp.title}</h3>
              <p className="text-gray-300">{exp.description}</p>
            </div>
          ))}
        </div>

        <div className="glass p-10 rounded-2xl">
          <h2 className="text-3xl font-bold mb-6 text-center">Tech Stack</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {["Next.js", "React", "TypeScript", "TailwindCSS", "Node.js", "WordPress", "Vercel", "AWS"].map(
              (tech) => (
                <div
                  key={tech}
                  className="bg-black/40 p-4 rounded-lg text-center font-bold hover:bg-purple-600/20 transition-colors"
                >
                  {tech}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
