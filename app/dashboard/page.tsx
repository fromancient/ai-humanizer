"use client";
import { useEffect, useState } from "react";
import { useAuth } from "../../lib/authContext";
import { supabase } from "../../lib/supabaseClient";
import Link from 'next/link';

interface Project {
  id: string;
  created_at: string;
  input: string;
  output: string;
}

export default function Dashboard() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;
    const fetchProjects = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      if (error) setError(error.message);
      else setProjects(data || []);
      setLoading(false);
    };
    fetchProjects();
  }, [user]);

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-2">Welcome back{user?.email ? `, ${user.email.split('@')[0]}` : ''}!</h1>
        <p className="text-gray-600">Track your AI humanization projects and usage</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow">
          <h3 className="text-gray-500 text-sm font-medium mb-2">Total Projects</h3>
          <p className="text-3xl font-bold">{projects.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow">
          <h3 className="text-gray-500 text-sm font-medium mb-2">Credits Used</h3>
          <p className="text-3xl font-bold">{projects.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow">
          <h3 className="text-gray-500 text-sm font-medium mb-2">Last Activity</h3>
          <p className="text-3xl font-bold">
            {projects[0] ? new Date(projects[0].created_at).toLocaleDateString() : 'Never'}
          </p>
        </div>
      </div>

      {/* Projects Section */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Recent Projects</h2>
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            New Project →
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="text-red-600 bg-red-50 p-4 rounded-lg">{error}</div>
        ) : projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No projects yet</p>
            <Link href="/" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Create Your First Project
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {projects.map((project) => (
              <div key={project.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Project {project.id.slice(0, 8)}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(project.created_at).toLocaleString()}
                    </p>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                    </svg>
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Original Text</h4>
                    <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{project.input}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Humanized Text</h4>
                    <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{project.output}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 