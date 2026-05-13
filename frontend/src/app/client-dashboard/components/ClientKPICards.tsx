import React from 'react';
import { ClipboardList, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

interface ClientKPICardsProps {
  totalJobs: number;
  activeJobs: number;
  completedJobs: number;
  criticalJobs: number;
}

export default function ClientKPICards({ totalJobs, activeJobs, completedJobs, criticalJobs }: ClientKPICardsProps) {
  const cards = [
    {
      key: 'kpi-total',
      label: 'Total Jobs',
      value: totalJobs,
      icon: ClipboardList,
      bg: 'var(--secondary)',
      color: 'var(--primary)',
      iconBg: 'rgba(27,58,107,0.1)',
      sub: 'All time requests',
    },
    {
      key: 'kpi-active',
      label: 'Active Jobs',
      value: activeJobs,
      icon: Clock,
      bg: 'var(--status-inprogress-bg)',
      color: 'var(--status-inprogress)',
      iconBg: 'rgba(59,130,246,0.12)',
      sub: 'Pending or in progress',
    },
    {
      key: 'kpi-completed',
      label: 'Completed',
      value: completedJobs,
      icon: CheckCircle,
      bg: 'var(--status-completed-bg)',
      color: 'var(--status-completed)',
      iconBg: 'rgba(16,185,129,0.12)',
      sub: 'Resolved & verified',
    },
    {
      key: 'kpi-critical',
      label: 'Critical',
      value: criticalJobs,
      icon: AlertTriangle,
      bg: 'var(--status-pending-bg)',
      color: 'var(--status-pending)',
      iconBg: 'rgba(245,158,11,0.12)',
      sub: 'Needs urgent attention',
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {cards.map(card => (
        <div
          key={card.key}
          className="rounded-xl p-4 border"
          style={{ backgroundColor: card.bg, borderColor: 'var(--border)' }}
        >
          <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
            style={{ backgroundColor: card.iconBg }}>
            <card.icon size={16} style={{ color: card.color }} />
          </div>
          <p className="text-2xl font-bold font-tabular" style={{ color: card.color }}>{card.value}</p>
          <p className="text-[11px] font-semibold mt-0.5 leading-tight" style={{ color: card.color }}>{card.label}</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">{card.sub}</p>
        </div>
      ))}
    </div>
  );
}
