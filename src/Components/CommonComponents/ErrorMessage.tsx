import React from 'react';

interface ErrorProps {
    message: string;
    styles?: string;
}

const ErrorMessage: React.FC<ErrorProps> = ({ message, styles }) => {
    return (
        <div className={`bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative ${styles}`} role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{message}</span>
        </div>
    );
};

export default ErrorMessage;
