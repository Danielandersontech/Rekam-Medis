import React from 'react';
import { getStatusBadge } from '../../utils/StatusUtils';

export default function StatusBadge({ status }) {
  return (
    <div className={`badge ${getStatusBadge(status)}`}>
      {status}
    </div>
  );
}