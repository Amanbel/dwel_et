import React from 'react';

export const Loader: React.FC<{ fullPage?: boolean }> = ({ fullPage = false }) => {
  const spinner = (
    <div className="flex flex-col items-center justify-center space-y-md rounded-lg border border-outline-variant bg-surface-container-lowest px-xl py-lg shadow-sm">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 border-4 border-primary/15 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-transparent border-t-primary border-r-secondary rounded-full animate-spin"></div>
      </div>
      <p className="font-label-md text-label-md text-on-surface-variant tracking-wider animate-pulse">
        Processing Lab Data...
      </p>
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
        {spinner}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-xl w-full h-full min-h-[200px]">
      {spinner}
    </div>
  );
};
