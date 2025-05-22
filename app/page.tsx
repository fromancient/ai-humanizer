"use client";
import { useState } from "react";
import { useAuth } from "../lib/authContext";
import { supabase } from "../lib/supabaseClient";

export default function Home() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { user } = useAuth();

  const handleRewrite = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      // Submit text for humanization
      const submitResponse = await fetch("/api/humanize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          text: input,
          readability: "High School",
          purpose: "General Writing",
          strength: "Balanced",
          model: "v2"
        }),
      });
      const submitData = await submitResponse.json();
      if (!submitResponse.ok) throw new Error(submitData.error || "Failed to submit text for humanization");

      // Poll for document status until complete
      let isComplete = false;
      let humanizedText = "";
      
      while (!isComplete) {
        await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds between checks
        
        const statusResponse = await fetch("/api/humanize/status", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ documentId: submitData.id })
        });
        const statusData = await statusResponse.json();
        
        if (!statusResponse.ok) throw new Error(statusData.error || "Failed to retrieve document");
        
        if (statusData.output) {
          isComplete = true;
          humanizedText = statusData.output;
        }
      }

      setOutput(humanizedText);
      if (user) {
        const { error: dbError } = await supabase.from("projects").insert({
          user_id: user.id,
          input,
          output: humanizedText,
        });
        if (dbError) setError(dbError.message);
        else setSuccess("Saved to your dashboard!");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Transform AI Text into Human-Like Content
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Make your AI-generated content undetectable with our advanced humanization technology.
              Perfect for students, marketers, and content creators.
            </p>
            <div className="flex justify-center gap-4">
              <a href="#humanizer" className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Try Now
              </a>
              <a href="/pricing" className="bg-white text-blue-600 px-8 py-3 rounded-lg border border-blue-600 hover:bg-blue-50 transition-colors">
                View Pricing
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
              <p className="text-gray-600">Get humanized content in seconds with our advanced AI technology.</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">100% Secure</h3>
              <p className="text-gray-600">Your content is private and never shared with third parties.</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Undetectable</h3>
              <p className="text-gray-600">Bypass AI detection with our advanced humanization algorithms.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Humanizer Tool Section */}
      <div id="humanizer" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm border p-8">
            <h2 className="text-3xl font-bold text-center mb-8">AI Humanizer Tool</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Paste your AI-generated text</label>
                <textarea
                  className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Paste your AI-generated text here..."
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  rows={6}
                />
              </div>
              <div className="flex justify-center">
                <button
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleRewrite}
                  disabled={loading || !input}
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Humanizing...
                    </span>
                  ) : "Humanize Text"}
                </button>
              </div>
              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg">
                  {error}
                </div>
              )}
              {success && (
                <div className="bg-green-50 text-green-600 p-4 rounded-lg">
                  {success}
                </div>
              )}
              {output && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Humanized Text</label>
                  <div className="w-full border rounded-lg px-4 py-3 bg-gray-50">
                    {output}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-xl p-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">
                  A
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Alex Thompson</h4>
                  <p className="text-gray-600">Student</p>
                </div>
              </div>
              <p className="text-gray-700">
                &ldquo;This tool has been a game-changer for my academic writing. The humanized content passes all AI detection tools I&apos;ve tried.&rdquo;
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">
                  S
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Sarah Chen</h4>
                  <p className="text-gray-600">Content Creator</p>
                </div>
              </div>
              <p className="text-gray-700">
                &ldquo;I use this tool daily for my content creation. It saves me hours of editing and makes my content feel more authentic.&rdquo;
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">
                  J
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">John Doe</h4>
                  <p className="text-gray-600">Content Manager</p>
                </div>
              </div>
              <p className="text-gray-700">
                &ldquo;This tool has revolutionized how we handle our content.&rdquo;
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">
                  J
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Jane Smith</h4>
                  <p className="text-gray-600">Marketing Director</p>
                </div>
              </div>
              <p className="text-gray-700">
                &ldquo;The best AI humanization tool we&apos;ve used.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Content?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of users who trust our AI humanization tool.</p>
          <div className="flex justify-center gap-4">
            <a href="#humanizer" className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors">
              Try for Free
            </a>
            <a href="/pricing" className="bg-blue-700 text-white px-8 py-3 rounded-lg hover:bg-blue-800 transition-colors">
              View Plans
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
