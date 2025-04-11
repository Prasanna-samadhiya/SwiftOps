"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../../Created Components/Navbar/page";
import Footer from "../../Created Components/Footer/page";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Store/Store";
import Link from "next/link";

const activities = [
  { activity: "Triggered Workflow: Build and Deploy Pipeline", time: "2 hours ago" },
  { activity: "Monitored Server: AWS EC2 Instance", time: "Yesterday" },
  { activity: "Integrated Monitoring with Prometheus", time: "3 days ago" },
  { activity: "Updated CI/CD Pipeline for Node.js App", time: "Last week" },
];

const ProfilePage = () => {
  const loggedIn = useSelector((state: RootState) => state.auth);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Next and Previous Slide functions
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === activities.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? activities.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Navbar />

      {/* Profile Section */}
      <div className="bg-gray-50 min-h-screen py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">Profile</h1>

          {/* Profile Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Profile Information */}
            <div className="bg-white shadow-lg rounded-2xl p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Profile Information</h2>
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 bg-blue-500 text-white flex items-center justify-center rounded-full mb-4 text-2xl font-bold">
                  {loggedIn.details.name[0]}
                </div>
                <p className="text-xl font-semibold">{loggedIn.details.name}</p>
                <p className="text-gray-500">{loggedIn.details.email}</p>
              </div>
            </div>

            {/* DevOps Credentials */}
            <div className="bg-white shadow-lg rounded-2xl p-8 md:col-span-2">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">DevOps Credentials</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-100 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold mb-2">CI/CD Integration</h3>
                  <p className="text-gray-600 mb-4">Connect to Git Action</p>
                  <button className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition">
                    <Link href="/frontend/pages/CICD">
                    Manage Integration
                    </Link>
                  </button>
                </div>

                <div className="bg-gray-100 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold mb-2">Workflow Management</h3>
                  <p className="text-gray-600 mb-4">Create your custom resuable CICD</p>
                  <button className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition">
                    <Link href="/frontend/pages/CustomWorkflow">
                    Manage Integration
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Overview */}
          <div className="mt-12">
            <div className="bg-white shadow-lg rounded-2xl p-8 mx-auto w-full max-w-2xl relative">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Recent Activities</h2>
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform ease-out duration-500"
                  style={{
                    transform: `translateX(-${currentSlide * 100}%)`,
                    width: `${activities.length * 100}%`,
                  }}
                >
                  {activities.map((activity, index) => (
                    <div key={index} className="min-w-full">
                      <div className="p-4 bg-gray-100 rounded-xl">
                        <p className="text-gray-700">{activity.activity}</p>
                        <p className="text-sm text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Controls */}
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-2 rounded-full transition"
              >
                ❮
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-2 rounded-full transition"
              >
                ❯
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProfilePage;
