import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-myBrown"></div>
      <p className="mt-4 text-lg font-medium text-myBrown">Recipes Loading...</p>
    </div>
  );
};

export default LoadingSpinner;