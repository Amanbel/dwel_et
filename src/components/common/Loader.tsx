import React from 'react';

export const Loader: React.FC<{ fullPage?: boolean }> = ({ fullPage = false }) => {
  const spinner = (
    <div className="flex flex-col items-center justify-center space-y-md">
      <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
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
