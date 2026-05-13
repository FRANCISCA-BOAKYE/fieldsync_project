import AppLayout from '@/components/AppLayout';
import ClientDashboardContent from './components/ClientDashboardContent';

export default function ClientDashboardPage() {
  return (
    <AppLayout role="Client" userName="Accra Mall Ltd." userEmail="facilities@accramall.com">
      <ClientDashboardContent />
    </AppLayout>
  );
}
