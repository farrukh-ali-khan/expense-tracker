// frontend/pages/index.tsx
import type { NextPage } from "next";
import Head from "next/head";

const HomePage: NextPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Expense Tracker - Smart Budget Management</title>
        <meta
          name="description"
          content="Track your expenses effortlessly with our AI-powered budget management system"
        />
      </Head>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-800">
            Take Control of Your Finances
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-500">
            Smart expense tracking and budget management made simple
          </p>
          <button className="bg-white text-gray-500 border border-gray-500 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-500 hover:text-white transition-all">
            Get Started
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Why Choose Expense Tracker?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Real-time Tracking",
                description:
                  "Monitor your expenses instantly across all devices",
                icon: "💰",
              },
              {
                title: "Smart Analytics",
                description:
                  "AI-powered insights and spending patterns analysis",
                icon: "📈",
              },
              {
                title: "Secure & Private",
                description: "Bank-grade security for your financial data",
                icon: "🔒",
              },
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-700">
            Start Tracking Today!
          </h2>
          <p className="text-lg mb-8 text-gray-500">
            Join thousands of users who have already taken control of their
            finances
          </p>
          <div className="space-x-4">
            <button className="text-gray-600 px-4 py-2 bg-white text-primary border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Sign Up Free
            </button>
            <button className="text-gray-600 px-4 py-2 bg-white text-primary border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            © 2023 Expense Tracker. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
