import React from "react";

const Loading = ({ type = "files" }) => {
  const renderFileCardSkeleton = () => (
    <div className="card p-4 space-y-3">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-neutral-200 rounded animate-pulse"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-neutral-200 rounded animate-pulse w-3/4"></div>
          <div className="h-3 bg-neutral-200 rounded animate-pulse w-1/2"></div>
        </div>
      </div>
    </div>
  );

  const renderListSkeleton = () => (
    <div className="space-y-2">
      {[...Array(8)].map((_, index) => (
        <div key={index} className="flex items-center space-x-4 p-3 bg-white rounded-lg border border-neutral-200">
          <div className="w-6 h-6 bg-neutral-200 rounded animate-pulse"></div>
          <div className="flex-1 h-4 bg-neutral-200 rounded animate-pulse"></div>
          <div className="w-20 h-4 bg-neutral-200 rounded animate-pulse"></div>
          <div className="w-24 h-4 bg-neutral-200 rounded animate-pulse"></div>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[...Array(12)].map((_, index) => (
          <div key={index}>{renderFileCardSkeleton()}</div>
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
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[...Array(8)].map((_, index) => (
          <div key={index}>{renderFileCardSkeleton()}</div>
        ))}
      </div>
    </div>
  );
};

export default Loading;