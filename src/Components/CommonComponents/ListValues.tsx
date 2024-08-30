import React from "react";

interface ListValuesProps {
    values: any[];
    title: string;
    remove: (id: number) => void;
}

const ListValues: React.FC<ListValuesProps> = ({ values, title, remove }) => {
    return (
        <div className="flex flex-col w-1/2 p-4 bg-white shadow-md rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">{title}</h3>
            <div className="flex flex-wrap gap-4">
                {values.map((v, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between bg-blue-500 text-white rounded-lg shadow p-2 w-full sm:w-auto"
                    >
                        <span className="mr-2">{v.name}</span>
                        <button
                            className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-700 transition duration-200 ease-in-out"
                            aria-label={`Remove ${v.name}`}
                            onClick={() => remove(index)}
                        >
                            x
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ListValues;
