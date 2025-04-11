"use client";

import React, { useEffect, useState } from "react";
import ProtectedRoute from "../../Created Components/AuthGuard/Authguard";
import Navbar from "../../Created Components/Navbar/page";
import Footer from "../../Created Components/Footer/page";
import Workflow from "../../Created Components/ShowWorkflow/page";
import CICD from "../../Created Components/ShowCICD/page";
import Server from "../../Created Components/ShowServer/page";
import axios from "axios";

interface WorkflowProps {
  _id: string;
  name: string;
  url: string;
  branch: string;
  buildscript: string;
  testscript: string;
  deploymentscript: string;
  createdAt: string;
  updatedAt: string;
}

interface ServerProps {
  _id: string;
  name: string;
  ip: string;
  type: string;
  metrics: string;
  SSH: string;
  alerting: string;
  createdAt: string;
  updatedAt: string;
}

interface CICDProps {
  _id: string;
  name: string;
  url: string;
  branch: string;
  buildscript: string;
  testscript: string;
  deploymentscript: string;
  createdAt: string;
  updatedAt: string;
}

const DashPage: React.FC = () => {
  const [CICDArr, setCICDArr] = useState<CICDProps[]>([]);
  const [ServerArr, setServerArr] = useState<ServerProps[]>([]);
  const [WorkflowArr, setWorkflowArr] = useState<WorkflowProps[]>([]);

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cicdRes, workflowRes] = await Promise.all([
          axios.get("http://localhost:3000/Backend/Routes/GetCICD"),
          axios.get("http://localhost:3000/Backend/Routes/GetWorkflow"),
        ]);
        setCICDArr(cicdRes.data.cicd);
        setWorkflowArr(workflowRes.data.workflow);
        console.log(CICDArr,WorkflowArr)
      } catch (error:any) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <ProtectedRoute>
      <div className="bg-gray-100 min-h-screen">
        <Navbar />
        <div className="container mx-auto py-8 px-6">
          <h1 className="text-4xl font-bold text-center mb-8">Dashboard</h1>

          {/* Dashboard Sections */}
          <div className=" gap-8 flex flex-col">
            

            {/* 🔹 CI/CD Pipelines Section */}
            <div className="bg-white p-6 shadow-lg rounded-lg">
              <h2 className="text-2xl font-semibold mb-4 ">🛠️ CI/CD Pipelines</h2>
              <div className="space-y-4 flex flex-row">
                {CICDArr.map((pipeline) => (
                  <CICD key={pipeline._id} name={pipeline.name} status={pipeline.branch} url={pipeline.url} />
                ))}
              </div>
            </div>

            {/* 🔹 Workflows Section */}
            <div className="bg-white p-6 shadow-lg rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">📂 Workflows</h2>
              <div className="space-y-4 flex flex-row gap-4">
                {WorkflowArr.map((workflow) => (
                  <Workflow key={workflow._id} name={workflow.name} Branch={workflow.branch} onView={() => console.log("Workflow clicked")} />
                ))}
              </div>
            </div>

          </div>
        </div>
        <Footer/>
      </div>
    </ProtectedRoute>
  );
};

export default DashPage;
