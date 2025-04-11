import React from 'react';

interface WorkflowProps {
    name: string;       // Workflow name
    Branch: string; // Short description
    onView: () => void; // Function to handle button click
}

const Workflow: React.FC<WorkflowProps> = ({ name, Branch, onView }) => {
    return (
        <div className="bg-white shadow-lg p-6 rounded-lg w-[250px] h-[175px] hover:bg-gray-200">
            <h3 className="text-xl font-semibold mb-2">{name}</h3>
            <p className="text-gray-600 mb-4">{Branch}</p>
            <button 
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                onClick={onView}
            >
                View Workflow
            </button>
        </div>
    );
};

export default Workflow;
