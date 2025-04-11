import React from "react";

interface CICDProps {
  name: string;
  status: string;
  url?: string;
}

const CICD: React.FC<CICDProps> = ({ name, status, url }) => {
  return (
    <div className="bg-white shadow-lg p-6 rounded-lg w-[250px] hover:bg-gray-200 transition">
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <p
        className={`text-gray-600 mb-4 ${
          status === "Successful" ? "text-green-500" : "text-red-500"
        }`}
      >
        Status: {status}
      </p>
      {url && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          View Pipeline
        </a>
      )}
    </div>
  );
};

export default CICD;