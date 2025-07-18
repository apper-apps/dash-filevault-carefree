import React from "react";

const Loading = ({ type = "files" }) => {
  const renderFileCardSkeleton = () => (
    <div className="card p-6 space-y-4 animate-pulse">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gradient-to-br from-neutral-200 to-neutral-300 rounded-lg animate-pulse"></div>
        <div className="flex-1 space-y-3">
          <div className="h-4 bg-gradient-to-r from-neutral-200 to-neutral-300 rounded animate-pulse w-3/4"></div>
          <div className="h-3 bg-gradient-to-r from-neutral-200 to-neutral-300 rounded animate-pulse w-1/2"></div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 bg-gradient-to-r from-neutral-200 to-neutral-300 rounded animate-pulse w-full"></div>
        <div className="h-3 bg-gradient-to-r from-neutral-200 to-neutral-300 rounded animate-pulse w-2/3"></div>
      </div>
    </div>
  );

  const renderListSkeleton = () => (
    <div className="space-y-3">
      {[...Array(8)].map((_, index) => (
        <div 
          key={index} 
          className="flex items-center space-x-4 p-4 bg-white rounded-lg border border-neutral-200 animate-pulse"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="w-6 h-6 bg-gradient-to-br from-neutral-200 to-neutral-300 rounded animate-pulse"></div>
          <div className="flex-1 h-4 bg-gradient-to-r from-neutral-200 to-neutral-300 rounded animate-pulse"></div>
          <div className="w-20 h-4 bg-gradient-to-r from-neutral-200 to-neutral-300 rounded animate-pulse"></div>
          <div className="w-24 h-4 bg-gradient-to-r from-neutral-200 to-neutral-300 rounded animate-pulse"></div>
        </div>
      ))}
    </div>
  );

  const renderSidebarSkeleton = () => (
    <div className="space-y-2">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="flex items-center space-x-2 p-2">
          <div className="w-4 h-4 bg-neutral-200 rounded animate-pulse"></div>
          <div className="h-4 bg-neutral-200 rounded animate-pulse flex-1"></div>
        </div>
      ))}
    </div>
  );

if (type === "grid") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {[...Array(12)].map((_, index) => (
          <div 
            key={index}
            style={{ animationDelay: `${index * 0.05}s` }}
            className="opacity-0 animate-pulse"
          >
            {renderFileCardSkeleton()}
          </div>
        ))}
      </div>
    );
  }

  if (type === "list") {
    return renderListSkeleton();
  }

  if (type === "sidebar") {
    return renderSidebarSkeleton();
  }

  // Default files loading
// Default files loading
  return (
    <div className="space-y-6">
    <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {[...Array(8)].map((_, index) => <div
            key={index}
            style={{
                animationDelay: `${index * 0.1}s`
            }}
            className="opacity-0 animate-pulse">
            {renderFileCardSkeleton()}
        </div>)}
    </div></div>
  );
};

export default Loading;