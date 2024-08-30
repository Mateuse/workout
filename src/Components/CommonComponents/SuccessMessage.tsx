import React from 'react';

interface SuccessProps {
    message: string;
    styles?: string; // Optional prop for custom styling
}

const SuccessMessage: React.FC<SuccessProps> = ({ message, styles }) => {
    return (
        <div className={`bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative ${styles}`} role="alert">
            <strong className="font-bold">Success: </strong>
            <span className="block sm:inline">{message}</span>
        </div>
    );
};

export default SuccessMessage;
