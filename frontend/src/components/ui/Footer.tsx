import React from 'react';

const FooterComponent = () => {
  return (
    <footer className="h-12 flex items-center justify-center text-xs text-gray-500 bg-slate-100 border-t">
      © {new Date().getFullYear()} PatientPortal · All rights reserved
    </footer>
  );
};

const Footer = React.memo(FooterComponent);
Footer.displayName = 'Footer';

export default Footer;
