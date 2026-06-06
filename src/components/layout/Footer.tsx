import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-sm bg-transparent flex justify-center items-center mt-auto">
      <p className="font-label-sm text-label-sm text-outline">
        DWEL Lab Dashboard v1.0 • © {new Date().getFullYear()}
      </p>
    </footer>
  );
};
export default Footer;
