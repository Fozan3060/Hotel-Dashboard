import React from 'react';

const SettingsSkeletonLoader:React.FC = () => {
  return (
    <div className="pt-5">
      <div className="max-w-md mx-auto sm:ml-36 w-80 sm:w-full p-6 bg-white rounded-2xl shadow-lg">
        <div className="h-8 w-32 bg-gray-200 animate-pulse rounded mb-6" />

        <div className="space-y-4">
          {[1, 2, 3].map((_, idx) => (
            <div key={idx}>
              <div className="h-5 w-40 bg-gray-200 animate-pulse rounded mb-2" />
              <div className="h-10 w-full bg-gray-200 animate-pulse rounded-xl" />
            </div>
          ))}

          <div className="h-10 w-full bg-gray-300 animate-pulse rounded-xl mt-4" />
        </div>
      </div>
    </div>
  );
};

export default SettingsSkeletonLoader;
