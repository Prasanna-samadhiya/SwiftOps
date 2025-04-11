"use client";

import React, { useState } from 'react';
import Navbar from '../../Created Components/Navbar/page';
import Footer from '../../Created Components/Footer/page';

interface Props {}

function AboutPage(props: Props) {
    const {} = props;

    // State to manage the active tab
    const [activeTab, setActiveTab] = useState('monitoring');

    return (
        <div>
            {/* Navbar */}
            <Navbar />

            {/* Tab Navigation */}
            <div className="bg-gray-100 py-4">
                <div className="container mx-auto px-10 text-center">
                    <div className="inline-flex">
                        <button
                            className={`px-6 py-3 text-lg font-semibold border-b-4 ${
                                activeTab === 'monitoring' ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-500'
                            }`}
                            onClick={() => setActiveTab('monitoring')}
                        >
                            Server Monitoring
                        </button>
                        <button
                            className={`px-6 py-3 text-lg font-semibold border-b-4 ${
                                activeTab === 'ci_cd' ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-500'
                            }`}
                            onClick={() => setActiveTab('ci_cd')}
                        >
                            CI/CD Automation
                        </button>
                        <button
                            className={`px-6 py-3 text-lg font-semibold border-b-4 ${
                                activeTab === 'workflow' ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-500'
                            }`}
                            onClick={() => setActiveTab('workflow')}
                        >
                            Customizable Workflows
                        </button>
                    </div>
                </div>
            </div>

            {/* Tab Content */}
            <div className="container mx-auto px-10 py-4">
                {activeTab === 'monitoring' && (
                    <div className="text-center">
                        <h2 className="text-4xl font-bold mb-4">Server Monitoring</h2>
                        <p className="text-lg text-gray-600 mb-6">
                            Our platform provides comprehensive real-time monitoring for your servers and infrastructure. We offer customizable dashboards, alerts, and performance metrics to ensure that you always know the status of your systems.
                        </p>
                        <img src="/images/th(1).jpg" alt="Monitoring" className="mx-auto mb-6 w-80 h-auto" />
                        <ul className="list-disc text-left mx-auto text-gray-600 max-w-xl">
                            <li>Real-time monitoring of system performance and health</li>
                            <li>Custom alerts for any critical issues</li>
                            <li>Comprehensive logging and data analysis</li>
                            <li>Integration with popular monitoring tools like Prometheus and Grafana</li>
                        </ul>
                    </div>
                )}

                {activeTab === 'ci_cd' && (
                    <div className="text-center">
                        <h2 className="text-4xl font-bold mb-4">CI/CD Automation</h2>
                        <p className="text-lg text-gray-600 mb-6">
                            Our CI/CD automation allows developers to push code changes and deploy applications seamlessly. By integrating with major CI/CD tools, we enable continuous integration, delivery, and deployment in a fast, automated pipeline.
                        </p>
                        <img src="/images/th.jpg" alt="CI/CD" className="mx-auto mb-6 w-80 h-auto" />
                        <ul className="list-disc text-left mx-auto text-gray-600 max-w-xl">
                            <li>Automated builds and tests</li>
                            <li>Continuous delivery and deployment</li>
                            <li>Version control integration (Git, GitHub, GitLab)</li>
                            <li>Fast and reliable delivery pipelines</li>
                        </ul>
                    </div>
                )}

                {activeTab === 'workflow' && (
                    <div className="text-center">
                        <h2 className="text-4xl font-bold mb-4">Customizable Workflows</h2>
                        <p className="text-lg text-gray-600 mb-6">
                            Our platform offers customizable workflows that allow DevOps teams to design, automate, and optimize processes tailored to their unique needs. From deployment strategies to environment configurations, everything can be automated.
                        </p>
                        <img src="/images/th(2).jpg" alt="Workflow" className="mx-auto mb-6 w-80 h-auto" />
                        <ul className="list-disc text-left mx-auto text-gray-600 max-w-xl">
                            <li>Customizable workflows for different environments</li>
                            <li>Drag-and-drop pipeline configuration</li>
                            <li>Automation for repetitive tasks</li>
                            <li>End-to-end process visibility</li>
                        </ul>
                    </div>
                )}
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}

export default AboutPage;
