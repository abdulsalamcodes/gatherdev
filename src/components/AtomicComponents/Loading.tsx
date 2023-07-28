import React from "react";

const LoadingComponent = () => {
    return (
      <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
        <div className="text-white text-xl font-bold">Loading...</div>
      </div>
    );
};

export default LoadingComponent;
