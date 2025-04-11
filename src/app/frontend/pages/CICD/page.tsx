"use client";

import { useEffect, useState } from "react";
import {
  GitBranchIcon,
  FactoryIcon as GitRepositoryIcon,
  BaselineIcon as PipelineIcon,
  PackageIcon,
  PlayIcon,
  RocketIcon,
  TestTubeIcon,
} from "lucide-react";
import Navbar from "../../Created Components/Navbar/page";
import Footer from "../../Created Components/Footer/page";
import axios from "axios";

interface PipelineConfig {
  name: string;
  url: string;
  branch: string;
  pipelineName: string;
  buildscript: string;
  testscript: string;
  deploymentscript: string;
}

interface Workflow {
  _id: string;
  name: string;
  url: string;
  branch: string;
  buildscript: string;
  testscript: string;
  deploymentscript: string;
  createdAt?: Date;
}

export default function Home() {
  const [config, setConfig] = useState<PipelineConfig>({
    name: "",
    url: "",
    branch: "main",
    pipelineName: "",
    buildscript: "npm run build",
    testscript: "npm run test",
    deploymentscript: "npm run deploy",
  });
  const [workflows, setWorkflows] = useState<Workflow[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    success?: boolean;
    message?: string;
    workflowUrl?: string;
  }>({});

  useEffect(() => {
    const fetchWorkflows = async () => {
      try {
        const response = await axios.get("http://localhost:3000/Backend/Routes/GetWorkflow");
        if (response.data.success) {
          console.log(response.data.workflow);
          setWorkflows(response.data.workflow);
          console.log(workflows)
        } else {
          console.error("Failed to fetch workflows:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching workflows:", error);
      }
    };
  
    fetchWorkflows();
  }, []);

    const handleWorkflowSelect = (workflowId: string) => {
      const selectedWorkflow = workflows.find((workflow) => workflow._id === workflowId);
      if (selectedWorkflow) {
        setConfig({
          ...config,
          name: selectedWorkflow.name,
          url: selectedWorkflow.url,
          branch: selectedWorkflow.branch,
          buildscript: selectedWorkflow.buildscript,
          testscript: selectedWorkflow.testscript,
          deploymentscript: selectedWorkflow.deploymentscript,
        });
      }
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({});
    
    try {
      console.log(config);
      const response = await fetch("../../Backend/Routes/CreateCICD", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // ✅ Include token for authorization
        },
        body: JSON.stringify({
          name: config.name,
          url: config.url,
          branch: config.branch,
          buildscript: config.buildscript,
          testscript: config.testscript,
          deploymentscript: config.deploymentscript,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to configure pipeline");
      }

      setStatus({
        success: true,
        message: data.message,
        workflowUrl: data.data?.workflowUrl,
      });
    } catch (error) {
      console.error("Failed to configure pipeline:", error);
      setStatus({
        success: false,
        message: error instanceof Error ? error.message : "Failed to configure pipeline",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Navbar/>
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            CI/CD Pipeline Configuration
          </h1>
          <p className="text-gray-600 mb-4">
            Configure your automated deployment pipeline
          </p>
        </div>

        {status.message && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              status.success ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
            }`}
          >
            <p>{status.message}</p>
            {status.workflowUrl && (
              <a
                href={status.workflowUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center mt-2 text-sm font-medium text-primary hover:underline"
              >
                View Workflow →
              </a>
            )}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-xl p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* ✅ Name */}
            <div>
              <label
                htmlFor="name"
                className="flex items-center text-sm font-medium text-gray-700 mb-1"
              >
                <PackageIcon className="w-4 h-4 mr-2" />
                Project Name
              </label>
              <input
                type="text"
                id="name"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                placeholder="my-awesome-project"
                value={config.name}
                onChange={(e) =>
                  setConfig({ ...config, name: e.target.value })
                }
              />
            </div>

            {/* ✅ URL */}
            <div>
              <label
                htmlFor="url"
                className="flex items-center text-sm font-medium text-gray-700 mb-1"
              >
                <GitRepositoryIcon className="w-4 h-4 mr-2" />
                Repository URL
              </label>
              <input
                type="url"
                id="url"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                placeholder="https://github.com/username/repo"
                value={config.url}
                onChange={(e) =>
                  setConfig({ ...config, url: e.target.value })
                }
              />
            </div>

            {/* ✅ Branch */}
            <div>
              <label
                htmlFor="branch"
                className="flex items-center text-sm font-medium text-gray-700 mb-1"
              >
                <GitBranchIcon className="w-4 h-4 mr-2" />
                Branch
              </label>
              <input
                type="text"
                id="branch"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                value={config.branch}
                onChange={(e) =>
                  setConfig({ ...config, branch: e.target.value })
                }
              />
            </div>

            {/* ✅ Build Script */}
            <div>
              <label
                htmlFor="buildscript"
                className="flex items-center text-sm font-medium text-gray-700 mb-1"
              >
                <PlayIcon className="w-4 h-4 mr-2" />
                Build Command
              </label>
              <input
                type="text"
                id="buildscript"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                value={config.buildscript}
                onChange={(e) =>
                  setConfig({ ...config, buildscript: e.target.value })
                }
              />
            </div>

            {/* ✅ Test Script */}
            <div>
              <label
                htmlFor="testscript"
                className="flex items-center text-sm font-medium text-gray-700 mb-1"
              >
                <TestTubeIcon className="w-4 h-4 mr-2" />
                Test Command
              </label>
              <input
                type="text"
                id="testscript"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                value={config.testscript}
                onChange={(e) =>
                  setConfig({ ...config, testscript: e.target.value })
                }
              />
            </div>

            {/* ✅ Deploy Script */}
            <div>
              <label
                htmlFor="deploymentscript"
                className="flex items-center text-sm font-medium text-gray-700 mb-1"
              >
                <RocketIcon className="w-4 h-4 mr-2" />
                Deploy Command
              </label>
              <input
                type="text"
                id="deploymentscript"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                value={config.deploymentscript}
                onChange={(e) =>
                  setConfig({ ...config, deploymentscript: e.target.value })
                }
              />
            </div>

            <div className="mb-4">
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Select Existing Workflow
                </label>
                <select
                  onChange={(e) => handleWorkflowSelect(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a Workflow
                  </option>
                  {workflows.map((workflow) => (
                    <option key={workflow._id} value={workflow._id}>
                      {workflow.name}
                    </option>
                  ))}
                </select>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-blue-600 text-white rounded-md"
            >
              {isSubmitting ? "Configuring..." : "Configure Pipeline"}
            </button>
          </form>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
}
