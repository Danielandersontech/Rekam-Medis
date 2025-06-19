import React from 'react';

export default function FormModal({ 
  isOpen, 
  onClose, 
  title, 
  onSubmit, 
  children, 
  submitText = "Simpan",
  isLoading = false 
}) {
  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box w-11/12 max-w-4xl">
        <h3 className="font-bold text-lg mb-4">{title}</h3>
        
        <form onSubmit={onSubmit} className="space-y-4">
          {children}
          
          <div className="modal-action">
            <button type="button" className="btn" onClick={onClose} disabled={isLoading}>
              Batal
            </button>
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? "Menyimpan..." : submitText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}