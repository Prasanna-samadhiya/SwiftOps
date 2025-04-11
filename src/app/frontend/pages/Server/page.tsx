"use client";

import React, { useState } from "react";
import axios from "axios";
import ProtectedRoute from "../../Created Components/AuthGuard/Authguard";
import Navbar from "../../Created Components/Navbar/page";
import Footer from "../../Created Components/Footer/page";

const Page: React.FC = () => {
  const [newServer, setNewServer] = useState({
    name: "",
    ip: "",
    type: "",
    metrics: "",
    SSH: "",
    alerting: "",
  });

  const [loading, setLoading] = useState(false);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewServer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add new server
  const addServer = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        alert("User not authenticated. Please login.");
        return;
      }

      const response = await axios.post(
        "http://localhost:3000/Backend/Routes/CreateServer",
        newServer,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message || "Server created successfully!");

      // Reset form after successful submission
      setNewServer({
        name: "",
        ip: "",
        type: "",
        metrics: "",
        SSH: "",
        alerting: "",
      });
    } catch (error) {
      console.log(error.message);
      console.error("Error creating server:", error);
      alert("Failed to create server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <Navbar />
      <div className="container mx-auto py-5">
        {/* Server Creation Form */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Initiate Server Monitoring</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addServer();
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700">Server Name</label>
                <input
                  type="text"
                  name="name"
                  value={newServer.name}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded p-2 mt-1"
                  placeholder="Enter Server Name"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Server IP</label>
                <input
                  type="text"
                  name="ip"
                  value={newServer.ip}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded p-2 mt-1"
                  placeholder="Enter Server IP"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Type</label>
                <select
                  name="type"
                  value={newServer.type}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded p-2 mt-1"
                  required
                >
                  <option value="">Select server type</option>
                  <option value="Windows">Windows</option>
                  <option value="Linux">Linux</option>
                  <option value="MacOS">MacOS</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700">Metrics</label>
                <select
                  name="metrics"
                  value={newServer.metrics}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded p-2 mt-1"
                  required
                >
                  <option value="">Select metrics</option>
                  <option value="Overuse">Above 90% usage (Overuse)</option>
                  <option value="Underuse">Under 10% usage (Underuse)</option>
                  <option value="OverTraffic">Over traffic</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700">SSH Keys</label>
                <input
                  type="text"
                  name="SSH"
                  value={newServer.SSH}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded p-2 mt-1"
                  placeholder="Enter SSH keys (e.g., ssh-rsa I3 root@localhost)"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Alerting</label>
                <select
                  name="alerting"
                  value={newServer.alerting}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded p-2 mt-1"
                  required
                >
                  <option value="">Select alerting option</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="After10Days">After 10 days</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Server"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </ProtectedRoute>
  );
};

export default Page;
