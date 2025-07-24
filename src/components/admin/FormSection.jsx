// components/admin/FormSection.jsx
import React from 'react';

const FormSection = ({ title, children, columns = 2, className = '' }) => {
  return (
    <div className={`mb-6 ${className}`}>
      <h3 className="font-semibold text-lg mb-4 text-primary">{title}</h3>
      <div className={`grid grid-cols-1 md:grid-cols-${columns} gap-4`}>
        {children}
      </div>
    </div>
  );
};

export default FormSection;