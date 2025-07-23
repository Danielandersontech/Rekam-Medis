import React from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({ 
  searchTerm, 
  onSearchChange, 
  placeholder = "Cari data...",
  filters 
}) {
  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="form-control flex-1">
            <div className="input-group">
              <input
                type="text"
                placeholder={placeholder}
                className="input input-bordered w-full"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
              />
              <button className="btn btn-square">
                <Search className="h-5 w-5" />
              </button>
            </div>
          </div>
          {filters}
        </div>
      </div>
    </div>
  );
}