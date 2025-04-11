import React from "react";

interface ServerProps {
  name: string;
  ip: string;
  type: string;
  metrics: string;
  SSH: string;
  alerting: string;
}

const ShowServer: React.FC<ServerProps> = ({ name, ip, type, metrics, SSH, alerting }) => {
  return (
    <div className="bg-white shadow-lg p-6 rounded-lg w-[250px] hover:bg-gray-200 transition">
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <p className="text-gray-600 mb-2">
        <strong>IP:</strong> {ip}
      </p>
      <p className="text-gray-600 mb-2">
        <strong>Type:</strong> {type}
      </p>
      <p className="text-gray-600 mb-2">
        <strong>Metrics:</strong> {metrics}
      </p>
      <p className="text-gray-600 mb-2">
        <strong>Alerting:</strong> {alerting}
      </p>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        onClick={() => navigator.clipboard.writeText(SSH)}
      >
        Copy SSH Key
      </button>
    </div>
  );
};

export default ShowServer;
