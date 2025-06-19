import React from 'react';
import { Plus } from 'lucide-react';

export default function PageHeader({ title, description, buttonText, onButtonClick }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-base-content/70">{description}</p>
      </div>
      <button 
        className="btn btn-primary"
        onClick={onButtonClick}
      >
        <Plus className="h-4 w-4" />
        {buttonText}
      </button>
    </div>
  );
}