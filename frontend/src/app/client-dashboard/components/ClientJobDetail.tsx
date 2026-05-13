'use client';
import React from 'react';
import { Job, formatDate, timeAgo } from '@/lib/mockData';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { X, MapPin, Phone, Wrench, Calendar, Clock, CheckCircle, FileText } from 'lucide-react';

interface ClientJobDetailProps {
  job: Job;
  onClose: () => void;
}

const PRIORITY_COLORS: Record<string, string> = {
  Critical: '#DC2626',
  High: '#F59E0B',
  Medium: '#3B82F6',
  Low: '#6B7280',
};

const STATUS_ICONS: Record<string, React.ElementType> = {
  Pending: Clock,
  'In Progress': Wrench,
  Completed: CheckCircle,
  Verified: CheckCircle,
};

export default function ClientJobDetail({ job, onClose }: ClientJobDetailProps) {
  const StatusIcon = STATUS_ICONS[job.status] || Clock;

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-card border-b border-border px-6 py-4 flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono text-muted-foreground">{job.id.toUpperCase()}</span>
            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
              style={{ backgroundColor: `${PRIORITY_COLORS[job.priority]}15`, color: PRIORITY_COLORS[job.priority] }}>
              {job.priority}
            </span>
          </div>
          <h2 className="text-base font-semibold text-foreground leading-snug">{job.title}</h2>
        </div>
        <button onClick={onClose} className="btn-ghost h-8 w-8 p-0 shrink-0" aria-label="Close">
          <X size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin px-6 py-5 space-y-5">
        {/* Status banner */}
        <div className="flex items-center gap-3 p-4 rounded-xl border"
          style={{ backgroundColor: 'var(--secondary)', borderColor: 'var(--border)' }}>
          <div className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'var(--accent)', opacity: 0.15 }}>
            <StatusIcon size={18} style={{ color: 'var(--accent)' }} />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Current Status</p>
            <div className="mt-0.5"><StatusBadge status={job.status} /></div>
          </div>
          <div className="ml-auto text-right">
            <p className="text-xs text-muted-foreground">Last updated</p>
            <p className="text-xs font-semibold text-foreground mt-0.5">{timeAgo(job.updatedAt)}</p>
          </div>
        </div>

        {/* Description */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <FileText size={13} className="text-muted-foreground" />
            <p className="text-xs font-semibold text-foreground uppercase tracking-wide">Description</p>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{job.description}</p>
        </div>

        {/* Location */}
        <div className="p-4 rounded-xl border" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--secondary)' }}>
          <div className="flex items-center gap-2 mb-3">
            <MapPin size={13} style={{ color: 'var(--accent)' }} />
            <p className="text-xs font-semibold text-foreground uppercase tracking-wide">Location</p>
          </div>
          <p className="text-sm font-medium text-foreground">{job.location}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{job.locationDetail}</p>
          <div className="mt-3 pt-3 border-t border-border flex items-center gap-2">
            <Phone size={12} className="text-muted-foreground" />
            <p className="text-xs text-muted-foreground">Site contact: <span className="font-medium text-foreground">{job.contactName}</span> · {job.contactPhone}</p>
          </div>
        </div>

        {/* Assigned Technician */}
        <div className="p-4 rounded-xl border" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--secondary)' }}>
          <div className="flex items-center gap-2 mb-3">
            <Wrench size={13} style={{ color: 'var(--accent)' }} />
            <p className="text-xs font-semibold text-foreground uppercase tracking-wide">Assigned Technician</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
              style={{ backgroundColor: 'var(--primary)' }}>
              {job.assignedTechnician.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{job.assignedTechnician.name}</p>
              <p className="text-xs text-muted-foreground">{job.assignedTechnician.email}</p>
            </div>
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-xl border" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--secondary)' }}>
            <div className="flex items-center gap-1.5 mb-1">
              <Calendar size={11} className="text-muted-foreground" />
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">Raised</p>
            </div>
            <p className="text-xs font-semibold text-foreground">{formatDate(job.createdAt)}</p>
          </div>
          <div className="p-3 rounded-xl border" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--secondary)' }}>
            <div className="flex items-center gap-1.5 mb-1">
              <Clock size={11} className="text-muted-foreground" />
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">Updated</p>
            </div>
            <p className="text-xs font-semibold text-foreground">{formatDate(job.updatedAt)}</p>
          </div>
        </div>

        {/* Activity timeline */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Clock size={13} className="text-muted-foreground" />
            <p className="text-xs font-semibold text-foreground uppercase tracking-wide">Activity Timeline</p>
          </div>
          <div className="space-y-3">
            {[...job.auditLog].reverse().map((entry, idx) => (
              <div key={entry.id} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                    style={{ backgroundColor: idx === 0 ? 'var(--accent)' : 'var(--border)' }} />
                  {idx < job.auditLog.length - 1 && (
                    <div className="w-px flex-1 mt-1" style={{ backgroundColor: 'var(--border)' }} />
                  )}
                </div>
                <div className="pb-3 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <StatusBadge status={entry.status} />
                    <span className="text-[10px] text-muted-foreground">{timeAgo(entry.timestamp)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    by <span className="font-medium text-foreground">{entry.triggeredBy}</span>
                    <span className="ml-1 text-[10px] px-1 py-0.5 rounded"
                      style={{ backgroundColor: 'var(--secondary)', color: 'var(--muted-foreground)' }}>
                      {entry.triggeredByRole}
                    </span>
                  </p>
                  {entry.note && (
                    <p className="text-xs text-muted-foreground mt-1 italic">&ldquo;{entry.note}&rdquo;</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
