"use client";

import Image from "next/image";
import Navbar from "./frontend/Created Components/Navbar/page";
import Footer from "./frontend/Created Components/Footer/page";
import { Link } from "lucide-react";

export default function Home() {
  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gray-800 text-white py-20 text-center ">
        <h1 className="text-4xl font-bold mb-4">DevOps Automation Tool</h1>
        <p className="text-lg mb-8">
          Automate CI/CD, server management, monitoring, and workflows all in one platform.
        </p>
        <button className="px-8 py-3 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded">
          Get Started
        </button>
      </div>

      {/* Features Section */}
      <div className="py-20 px-10 bg-gray-100 text-center hover:bg-gray-200">
        <h2 className="text-3xl font-bold mb-8">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">

          {/* CI/CD Automation */}
          <div className="p-6 bg-white rounded shadow-lg hover:bg-gray-200">
            <Image
              src="/images/th.jpg" // replace with your image path
              alt="CI/CD Automation"
              width={100}
              height={100}
              className="mx-auto"
            />
            <h3 className="text-xl font-semibold mt-4">CI/CD Automation</h3>
            <p className="text-sm text-gray-600 mt-2">
              Automate your software delivery pipeline with continuous integration and deployment.
            </p>
          </div>

          {/* Monitoring */}
          <div className="p-6 bg-white rounded shadow-lg hover:bg-gray-200">
            <Image
              src="/images/th(2).jpg" // replace with your image path
              alt="Monitoring"
              width={100}
              height={100}
              className="mx-auto"
            />
            <h3 className="text-xl font-semibold mt-4">Monitoring</h3>
            <p className="text-sm text-gray-600 mt-2">
              Track the performance and health of your infrastructure in real-time.
            </p>
          </div>

          {/* Customizable Workflows */}
          <div className="p-6 bg-white rounded shadow-lg hover:bg-gray-200">
            <Image
              src="/images/th(2).jpg" // replace with your image path
              alt="Customizable Workflows"
              width={100}
              height={100}
              className="mx-auto"
            />
            <h3 className="text-xl font-semibold mt-4">Customizable Workflows</h3>
            <p className="text-sm text-gray-600 mt-2">
              Create and automate complex workflows to suit your needs.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-blue-500 text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Start Automating Today</h2>
        <p className="text-lg mb-8">
          Join thousands of DevOps engineers who rely on our platform to simplify their workflows.
        </p>
        <button className="px-8 py-3 bg-white text-blue-500 font-semibold rounded hover:bg-gray-200">
          Sign Up Now
        </button>
      </div>
     <Footer/>
    </div>
  );
}
