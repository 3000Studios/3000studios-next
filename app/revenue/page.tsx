import Link from "next/link";
import Card from "../ui/Card";

export const metadata = {
  title: "Revenue Guides - 3000 Studios",
  description: "Monetization guides and resources for creators and entrepreneurs",
};

export default function RevenuePage() {
  const guides = [
    {
      name: "Best AI Tools for Creators",
      href: "/revenue/best-ai-tools-for-creators",
      description: "Discover the most profitable AI-powered tools",
    },
    {
      name: "Best Gaming Laptops 2025",
      href: "/revenue/best-gaming-laptops-2025",
      description: "Top earning potential through gaming hardware reviews",
    },
    {
      name: "Best Passive Income Tools",
      href: "/revenue/best-passive-income-tools",
      description: "Automated income generation strategies",
    },
    {
      name: "Ultimate Developer Setup",
      href: "/revenue/ultimate-developer-setup",
      description: "Monetize your development expertise",
    },
    {
      name: "Web Design Trends 2025",
      href: "/revenue/web-design-trends-2025",
      description: "Capitalize on emerging design trends",
    },
  ];

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
          Revenue & Monetization
        </h1>
        <p className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto">
          Expert guides to help you maximize your earning potential
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {guides.map((guide) => (
            <Link key={guide.href} href={guide.href}>
              <Card gradient className="h-full hover:scale-105 transition-transform duration-300 cursor-pointer">
                <h3 className="text-2xl font-bold text-yellow-400 mb-4">{guide.name}</h3>
                <p className="text-gray-300">{guide.description}</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
