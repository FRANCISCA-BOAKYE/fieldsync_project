'use client';
import React from 'react';
import { Job, formatDate } from '@/lib/mockData';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { MapPin, Calendar, Wrench, ChevronRight, AlertTriangle } from 'lucide-react';

interface ClientJobListProps {
  jobs: Job[];
  selectedJobId?: string;
  onSelectJob: (job: Job) => void;
}

const PRIORITY_COLORS: Record<string, string> = {
  Critical: '#DC2626',
  High: '#F59E0B',
  Medium: '#3B82F6',
  Low: '#6B7280',
};

export default function ClientJobList({ jobs, selectedJobId, onSelectJob }: ClientJobListProps) {
  if (jobs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-sm">No jobs found for your account.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-foreground">Your Service Requests</h3>
        <span className="text-xs text-muted-foreground">{jobs.length} jobs</span>
      </div>
      {jobs.map(job => (
        <button
          key={job.id}
          onClick={() => onSelectJob(job)}
          className={`w-full text-left rounded-xl border p-4 transition-all hover:shadow-sm ${
            selectedJobId === job.id
              ? 'border-accent bg-accent/5' :'border-border bg-card hover:border-accent/40'
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                {job.priority === 'Critical' && (
                  <AlertTriangle size={12} style={{ color: PRIORITY_COLORS.Critical }} className="shrink-0" />
                )}
                <p className="text-sm font-semibold text-foreground truncate">{job.title}</p>
              </div>
              <div className="flex items-center gap-1.5 mb-2">
                <MapPin size={11} className="text-muted-foreground shrink-0" />
                <p className="text-[11px] text-muted-foreground truncate">{job.locationDetail}</p>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge status={job.status} />
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                  style={{ backgroundColor: `${PRIORITY_COLORS[job.priority]}15`, color: PRIORITY_COLORS[job.priority] }}>
                  {job.priority}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2 shrink-0">
              <ChevronRight size={14} className="text-muted-foreground" />
              <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <Calendar size={10} />
                <span>{formatDate(job.createdAt).split(' ')[0]}</span>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <Wrench size={10} />
                <span className="truncate max-w-[80px]">{job.assignedTechnician.name.split(' ')[0]}</span>
              </div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
