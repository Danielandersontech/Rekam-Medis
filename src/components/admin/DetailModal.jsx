import React from 'react';

export default function DetailModal({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  actions 
}) {
  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box w-11/12 max-w-4xl">
        <h3 className="font-bold text-lg mb-4">{title}</h3>
        
        <div className="space-y-6">
          {children}
        </div>
        
        <div className="modal-action">
          <button className="btn" onClick={onClose}>
            Tutup
          </button>
          {actions}
        </div>
      </div>
    </div>
  );
}