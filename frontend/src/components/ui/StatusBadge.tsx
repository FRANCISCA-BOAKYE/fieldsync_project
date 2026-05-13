import React from 'react';
import { JobStatus, Priority } from '@/lib/mockData';

interface StatusBadgeProps {
  status: JobStatus;
  size?: 'sm' | 'md';
}

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const cls = size === 'sm' ? 'text-[10px] px-1.5 py-0.5' : 'text-xs px-2.5 py-1';
  const colorMap: Record<JobStatus, string> = {
    'Pending': 'status-pending',
    'In Progress': 'status-inprogress',
    'Completed': 'status-completed',
    'Verified': 'status-verified',
  };
  return (
    <span className={`inline-flex items-center font-semibold rounded-full border ${cls} ${colorMap[status]}`}>
      <span className="w-1.5 h-1.5 rounded-full mr-1.5 shrink-0"
        style={{
          backgroundColor: status === 'Pending' ? 'var(--status-pending)'
            : status === 'In Progress' ? 'var(--status-inprogress)'
            : status === 'Completed' ? 'var(--status-completed)'
            : 'var(--status-verified)'
        }} />
      {status}
    </span>
  );
}

interface PriorityBadgeProps {
  priority: Priority;
  size?: 'sm' | 'md';
}

export function PriorityBadge({ priority, size = 'md' }: PriorityBadgeProps) {
  const cls = size === 'sm' ? 'text-[10px] px-1.5 py-0.5' : 'text-xs px-2 py-0.5';
  const colorMap: Record<Priority, string> = {
    'Critical': 'priority-critical',
    'High': 'priority-high',
    'Medium': 'priority-medium',
    'Low': 'priority-low',
  };
  return (
    <span className={`inline-flex items-center font-semibold rounded border ${cls} ${colorMap[priority]}`}>
      {priority}
    </span>
  );
}