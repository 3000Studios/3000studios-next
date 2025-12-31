import Link from "next/link";
import Card from "../ui/Card";

export const metadata = {
  title: "Apps - 3000 Studios",
  description: "AI-Powered Applications by 3000 Studios",
};

export default function AppsPage() {
  const apps = [
    {
      name: "AI Automation Toolkit",
      href: "/apps/ai-automation-toolkit",
      description: "Streamline your workflows with intelligent automation",
    },
    {
      name: "AI Content Writer Pro",
      href: "/apps/ai-content-writer-pro",
      description: "Generate high-quality content effortlessly",
    },
    {
      name: "AI Video Editor",
      href: "/apps/ai-video-editor",
      description: "Professional video editing powered by AI",
    },
  ];

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
          Our Applications
        </h1>
        <p className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto">
          Explore our suite of AI-powered applications designed to enhance your productivity
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {apps.map((app) => (
            <Link key={app.href} href={app.href}>
              <Card gradient className="h-full hover:scale-105 transition-transform duration-300 cursor-pointer">
                <h3 className="text-2xl font-bold text-yellow-400 mb-4">{app.name}</h3>
                <p className="text-gray-300">{app.description}</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
