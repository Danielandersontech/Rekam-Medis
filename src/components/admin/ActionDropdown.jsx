import React from 'react';
import { Edit, Trash2, Eye } from 'lucide-react';

export default function ActionDropdown({ onView, onEdit, onDelete, customActions }) {
  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-sm">
        ⋮
      </div>
      <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
        {onView && (
          <li><a onClick={onView}><Eye className="h-4 w-4" />Lihat Detail</a></li>
        )}
        {onEdit && (
          <li><a onClick={onEdit}><Edit className="h-4 w-4" />Edit</a></li>
        )}
        {customActions?.map((action, index) => (
          <li key={index}>
            <a onClick={action.onClick} className={action.className}>
              {action.icon}
              {action.label}
            </a>
          </li>
        ))}
        {onDelete && (
          <li><a onClick={onDelete} className="text-error"><Trash2 className="h-4 w-4" />Hapus</a></li>
        )}
      </ul>
    </div>
  );
}