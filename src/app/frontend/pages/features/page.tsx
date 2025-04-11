"use client"

import React from 'react'
import Footer from '../../Created Components/Footer/page';
import Navbar from '../../Created Components/Navbar/page';
import ProtectedRoute from '../../Created Components/AuthGuard/Authguard';
import Link from 'next/link';

interface Props {}

function FeaturePage(props: Props) {
    const {} = props

        return (
            <ProtectedRoute>
              <div>
                {/* Navbar */}
                <Navbar />
        
                {/* Dashboard Section */}
                <div className="bg-gray-100 min-h-screen py-10">
                  <div className="container mx-auto px-6">
                    <h1 className="text-4xl font-bold text-center mb-8">
                      SwiftOps Features
                    </h1>
        
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
                   
        
                      {/* CI/CD Automation Card */}
                      <div className="bg-white shadow-lg p-6 rounded-lg">
                        <h2 className="text-2xl font-semibold mb-4">CI/CD Automation</h2>
                        <p className="text-gray-600 mb-4">
                          Automate your builds, tests, and deployments with our integrated CI/CD pipeline.
                        </p>
                        <div className="h-48 bg-gray-200 rounded-lg mb-4">
                          {/* Placeholder for a CI/CD status widget */}
                          <img src="/images/th.jpg" alt="CI/CD" className="mx-auto mb-6 w-80 h-auto" />
                        </div>
                        <Link href="/frontend/pages/CICD" className='mx-2 p-1'>
                        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" >
                          Configure Pipeline
                        </button>
                        </Link>
                      </div>
        
                      {/* Customizable Workflows Card */}
                      <div className="bg-white shadow-lg p-6 rounded-lg">
                        <h2 className="text-2xl font-semibold mb-4">Customizable Workflows</h2>
                        <p className="text-gray-600 mb-4">
                          Design and automate workflows tailored to your DevOps needs.Never Worry about lost Configuration.
                        </p>
                        <div className="h-48 bg-gray-200 rounded-lg mb-4">
                          {/* Placeholder for a workflow management widget */}
                          <img src="/images/th(2).jpg" alt="Workflow" className="mx-auto mb-6 w-80 h-auto" />
                        </div>
                        <Link href="/frontend/pages/CustomWorkflow" className='mx-2 p-1'>
                        <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
                          Create Workflow
                        </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
        
                {/* Footer */}
                <Footer />
              </div>
            </ProtectedRoute>
          );
    
}

export default FeaturePage
