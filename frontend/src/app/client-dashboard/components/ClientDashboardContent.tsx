'use client';
import React, { useState } from 'react';
import ClientKPICards from './ClientKPICards';
import ClientJobList from './ClientJobList';
import ClientJobDetail from './ClientJobDetail';
import { ToastContainer, useToast } from '@/components/ui/Toast';
import { MOCK_JOBS, Job } from '@/lib/mockData';
import { RefreshCw } from 'lucide-react';

// BACKEND INTEGRATION POINT: Replace with GraphQL query getJobsByClient(clientId: $id)
// Filter by authenticated client's ID from JWT

const CLIENT_JOBS = MOCK_JOBS.filter(j => j.client.id === 'client-001');

export default function ClientDashboardContent() {
  const [jobs] = useState<Job[]>(CLIENT_JOBS);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toasts, addToast, dismissToast } = useToast();

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => { setIsRefreshing(false); addToast('Jobs refreshed', 'info'); }, 700);
  };

  const totalJobs = jobs.length;
  const activeJobs = jobs.filter(j => j.status === 'Pending' || j.status === 'In Progress').length;
  const completedJobs = jobs.filter(j => j.status === 'Completed' || j.status === 'Verified').length;
  const criticalJobs = jobs.filter(j => j.priority === 'Critical').length;

  return (
    <div className="flex flex-col h-full">
      {/* Page Header */}
      <header className="bg-card border-b border-border px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-20">
        <div>
          <h1 className="text-xl font-semibold text-foreground">My Service Requests</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Accra Mall Ltd. · SwiftFix Client Portal</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="live-indicator">
            <span className="live-dot" />
            Live
          </div>
          <button onClick={handleRefresh} disabled={isRefreshing} className="btn-ghost h-8 px-3 text-xs" aria-label="Refresh">
            <RefreshCw size={13} className={isRefreshing ? 'animate-spin' : ''} />
          </button>
        </div>
      </header>

      <div className="flex flex-1 min-h-0">
        {/* Left panel: KPIs + Job list */}
        <div className={`flex flex-col overflow-y-auto scrollbar-thin transition-all duration-300 ${selectedJob ? 'hidden md:flex md:w-80 lg:w-96 shrink-0 border-r border-border' : 'flex-1'}`}>
          <div className="px-4 sm:px-6 py-5 space-y-5">
            <ClientKPICards
              totalJobs={totalJobs}
              activeJobs={activeJobs}
              completedJobs={completedJobs}
              criticalJobs={criticalJobs}
            />
            <ClientJobList
              jobs={jobs}
              selectedJobId={selectedJob?.id}
              onSelectJob={setSelectedJob}
            />
          </div>
        </div>

        {/* Right panel: Job Detail */}
        {selectedJob && (
          <div className="flex-1 overflow-y-auto scrollbar-thin">
            <ClientJobDetail
              job={selectedJob}
              onClose={() => setSelectedJob(null)}
            />
          </div>
        )}
      </div>

      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
