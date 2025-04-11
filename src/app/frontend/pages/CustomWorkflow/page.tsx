"use client";

import React, { useState } from "react";
import axios from "axios";
import ProtectedRoute from "../../Created Components/AuthGuard/Authguard";
import Navbar from "../../Created Components/Navbar/page";
import Footer from "../../Created Components/Footer/page";

interface Props {}

interface Pipeline {
  name: string;
  repository: string;
  branch: string;
  buildscript: string;
  testscript: string;
  deploymentscript: string;
  status: string;
}

const Page: React.FC<Props> = () => {
  const [pipelines, setPipelines] = useState<Pipeline[]>([]);
  const [newPipeline, setNewPipeline] = useState({
    name: "",
    repository: "",
    branch: "",
    buildscript: "",
    testscript: "",
    deploymentscript: "",
  });

  // Handle form input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPipeline((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add new pipeline
  const addPipeline = async () => {
    try {
      const response = await axios.post("http://localhost:3000/Backend/Routes/CreateWorkflow", {
        name: newPipeline.name,
        url: newPipeline.repository, // Map repository to url
        branch: newPipeline.branch,
        buildscript: newPipeline.buildscript,
        testscript: newPipeline.testscript,
        deploymentscript: newPipeline.deploymentscript,
      });
  
      // Add newly created pipeline to state
      setPipelines((prevPipelines) => [
        ...prevPipelines,
        { ...response.data, status: "Pending" },
      ]);
  
      // Reset form
      setNewPipeline({
        name: "",
        repository: "",
        branch: "",
        buildscript: "",
        testscript: "",
        deploymentscript: "",
      });
  
      alert("Workflow created successfully");
    } catch (error:any) {
      console.error("Error creating workflow:", error);
      alert(error.response?.data?.message || "Failed to create workflow");
    }
  };

  return (
    <ProtectedRoute>
      <Navbar />

      <div className="container mx-auto py-5">
        {/* CI/CD Pipeline Form */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Custom Workflow</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addPipeline();
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Workflow Name */}
              <div>
                <label className="block text-gray-700 mb-1">Workflow Name</label>
                <input
                  type="text"
                  name="name"
                  value={newPipeline.name}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-2"
                  placeholder="Enter Pipeline Name"
                  required
                />
              </div>

              {/* Repository URL */}
              <div>
                <label className="block text-gray-700 mb-1">Repository URL</label>
                <input
                  type="text"
                  name="repository"
                  value={newPipeline.repository}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-2"
                  placeholder="Enter Repository URL"
                  required
                />
              </div>

              {/* Branch */}
              <div>
                <label className="block text-gray-700 mb-1">Branch</label>
                <input
                  type="text"
                  name="branch"
                  value={newPipeline.branch}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-2"
                  placeholder="Enter Branch (e.g., main)"
                  required
                />
              </div>

              {/* Build Script */}
              <div>
                <label className="block text-gray-700 mb-1">Build Script</label>
                <input
                  type="text"
                  name="buildscript"
                  value={newPipeline.buildscript}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-2"
                  placeholder="Enter Script (e.g., npm build)"
                  required
                />
              </div>

              {/* Test Script */}
              <div>
                <label className="block text-gray-700 mb-1">Test Script</label>
                <input
                  type="text"
                  name="testscript"
                  value={newPipeline.testscript}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-2"
                  placeholder="Enter Script (e.g., npm test)"
                  required
                />
              </div>

              {/* Deployment Script */}
              <div>
                <label className="block text-gray-700 mb-1">Deployment Script</label>
                <input
                  type="text"
                  name="deploymentscript"
                  value={newPipeline.deploymentscript}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-2"
                  placeholder="Enter Script (e.g., asadmin deploy h.war)"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Add Pipeline
            </button>
          </form>
        </div>

        {/* Pipeline List */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Workflow Status</h2>
          {pipelines.length > 0 ? (
            <ul>
              {pipelines.map((pipeline, index) => (
                <li
                  key={index}
                  className="mb-4 p-4 bg-gray-100 rounded-lg flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold">{pipeline.name}</p>
                    <p className="text-sm text-gray-600">
                      Repo: {pipeline.repository} | Branch: {pipeline.branch}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        pipeline.status === "Success"
                          ? "bg-green-200 text-green-800"
                          : pipeline.status === "Failed"
                          ? "bg-red-200 text-red-800"
                          : "bg-yellow-200 text-yellow-800"
                      }`}
                    >
                      {pipeline.status}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No workflows created yet.</p>
          )}
        </div>
      </div>

      <Footer />
    </ProtectedRoute>
  );
};

export default Page;
