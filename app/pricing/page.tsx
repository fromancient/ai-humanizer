"use client";
import { useState } from "react";
import { useAuth } from "../../lib/authContext";

export default function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const { user } = useAuth();

  const handlePlanSelect = (plan: string) => {
    setSelectedPlan(plan);
    console.log("Selected plan:", plan);
    // Simulate redirecting to a payment page
    alert(`Redirecting to payment page for ${plan} plan...`);
  };

  const features = {
    basic: [
      "100 credits per month",
      "Basic humanization",
      "Standard support",
      "Basic analytics",
    ],
    pro: [
      "500 credits per month",
      "Advanced humanization",
      "Priority support",
      "Advanced analytics",
      "API access",
      "Custom templates",
    ],
    enterprise: [
      "Unlimited credits",
      "Premium humanization",
      "24/7 support",
      "Custom analytics",
      "API access",
      "Custom templates",
      "Dedicated account manager",
      "Custom integrations",
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the perfect plan for your needs. All plans include our core AI humanization technology.
          </p>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Basic Plan */}
          <div className="bg-white rounded-2xl shadow-sm border p-8 hover:shadow-md transition-shadow">
            <h2 className="text-2xl font-bold mb-4">Basic</h2>
            <div className="mb-6">
              <span className="text-4xl font-bold">$9.99</span>
              <span className="text-gray-600">/month</span>
            </div>
            <ul className="space-y-4 mb-8">
              {features.basic.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handlePlanSelect("Basic")}
              className="w-full bg-gray-100 text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Get Started
            </button>
          </div>

          {/* Pro Plan */}
          <div className="bg-white rounded-2xl shadow-lg border-2 border-blue-500 p-8 hover:shadow-xl transition-shadow relative">
            <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 rounded-bl-lg rounded-tr-lg text-sm font-medium">
              Most Popular
            </div>
            <h2 className="text-2xl font-bold mb-4">Pro</h2>
            <div className="mb-6">
              <span className="text-4xl font-bold">$19.99</span>
              <span className="text-gray-600">/month</span>
            </div>
            <ul className="space-y-4 mb-8">
              {features.pro.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handlePlanSelect("Pro")}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Get Started
            </button>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-white rounded-2xl shadow-sm border p-8 hover:shadow-md transition-shadow">
            <h2 className="text-2xl font-bold mb-4">Enterprise</h2>
            <div className="mb-6">
              <span className="text-4xl font-bold">$49.99</span>
              <span className="text-gray-600">/month</span>
            </div>
            <ul className="space-y-4 mb-8">
              {features.enterprise.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handlePlanSelect("Enterprise")}
              className="w-full bg-gray-100 text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Contact Sales
            </button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-2">What are credits?</h3>
              <p className="text-gray-600">Credits are used to process text through our AI humanization system. Each text submission uses one credit.</p>
            </div>
            <div className="bg-white rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-2">Can I upgrade or downgrade?</h3>
              <p className="text-gray-600">Yes, you can change your plan at any time. Changes will be reflected in your next billing cycle.</p>
            </div>
            <div className="bg-white rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-2">Is there a free trial?</h3>
              <p className="text-gray-600">Yes, all plans come with a 7-day free trial. No credit card required.</p>
            </div>
            <div className="bg-white rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-600">We accept all major credit cards, PayPal, and bank transfers for enterprise plans.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 