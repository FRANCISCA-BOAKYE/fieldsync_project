// BACKEND INTEGRATION POINT: Replace all mock data with GraphQL queries/mutations via Apollo Client
// GraphQL endpoint: process.env.NEXT_PUBLIC_GRAPHQL_URL
// Auth: JWT token in Authorization header

export type JobStatus = 'Pending' | 'In Progress' | 'Completed' | 'Verified';
export type UserRole = 'Admin' | 'Technician' | 'Client';
export type Priority = 'Critical' | 'High' | 'Medium' | 'Low';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  jobCount?: number;
}

export interface AuditEntry {
  id: string;
  status: JobStatus;
  triggeredBy: string;
  triggeredByRole: UserRole;
  timestamp: string;
  note?: string;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  locationDetail: string;
  contactName: string;
  contactPhone: string;
  status: JobStatus;
  priority: Priority;
  assignedTechnician: User;
  client: User;
  createdAt: string;
  updatedAt: string;
  completionPhoto?: string;
  auditLog: AuditEntry[];
  category: string;
}

export interface Notification {
  id: string;
  message: string;
  jobId: string;
  jobTitle: string;
  read: boolean;
  createdAt: string;
  type: 'status_change' | 'assignment' | 'verification';
}

export const TECHNICIANS: User[] = [
{ id: 'tech-001', name: 'Kwame Asante', email: 'k.asante@swiftfix.gh', role: 'Technician', phone: '+233 24 456 7890', jobCount: 7 },
{ id: 'tech-002', name: 'Abena Owusu', email: 'a.owusu@swiftfix.gh', role: 'Technician', phone: '+233 20 234 5678', jobCount: 5 },
{ id: 'tech-003', name: 'Kofi Mensah', email: 'k.mensah@swiftfix.gh', role: 'Technician', phone: '+233 27 876 5432', jobCount: 9 },
{ id: 'tech-004', name: 'Ama Boateng', email: 'a.boateng@swiftfix.gh', role: 'Technician', phone: '+233 24 321 9876', jobCount: 4 },
{ id: 'tech-005', name: 'Yaw Darko', email: 'y.darko@swiftfix.gh', role: 'Technician', phone: '+233 20 567 3210', jobCount: 6 },
{ id: 'tech-006', name: 'Akosua Frimpong', email: 'a.frimpong@swiftfix.gh', role: 'Technician', phone: '+233 27 432 1098', jobCount: 3 },
{ id: 'tech-007', name: 'Nana Adjei', email: 'n.adjei@swiftfix.gh', role: 'Technician', phone: '+233 24 789 0123', jobCount: 8 },
{ id: 'tech-008', name: 'Efua Acheampong', email: 'e.acheampong@swiftfix.gh', role: 'Technician', phone: '+233 20 654 3210', jobCount: 5 }];


export const CLIENTS: User[] = [
{ id: 'client-001', name: 'Accra Mall Ltd.', email: 'facilities@accramall.com', role: 'Client', phone: '+233 30 274 5000' },
{ id: 'client-002', name: 'Trasacco Valley Estate', email: 'mgt@trasacco.com', role: 'Client', phone: '+233 30 289 3400' },
{ id: 'client-003', name: 'Meridian Office Park', email: 'ops@meridiangh.com', role: 'Client', phone: '+233 30 277 1100' },
{ id: 'client-004', name: 'GoldCoast Towers', email: 'admin@goldcoasttowers.gh', role: 'Client', phone: '+233 30 266 9900' },
{ id: 'client-005', name: 'Kumasi Industrial Hub', email: 'facility@kumasi-hub.gh', role: 'Client', phone: '+233 32 202 4567' },
{ id: 'client-006', name: 'Cantonments City Apts', email: 'mgmt@cantcity.gh', role: 'Client', phone: '+233 30 278 2200' }];


export const MOCK_JOBS: Job[] = [
{
  id: 'job-001',
  title: 'HVAC Unit Failure — Level 3',
  description: 'Central air conditioning unit on Level 3 has completely stopped functioning. Offices are overheating and tenants are complaining. Requires immediate inspection and repair.',
  location: 'Accra Mall Ltd., Spintex Road',
  locationDetail: 'Level 3, Zone B, Unit 3B-14',
  contactName: 'Ernest Kwarteng',
  contactPhone: '+233 24 501 2345',
  status: 'In Progress',
  priority: 'Critical',
  assignedTechnician: TECHNICIANS[2],
  client: CLIENTS[0],
  createdAt: '2026-05-08T08:15:00Z',
  updatedAt: '2026-05-09T09:30:00Z',
  category: 'HVAC',
  auditLog: [
  { id: 'audit-001a', status: 'Pending', triggeredBy: 'Adjoa Mensah', triggeredByRole: 'Admin', timestamp: '2026-05-08T08:15:00Z', note: 'Job created and assigned to Kofi Mensah' },
  { id: 'audit-001b', status: 'In Progress', triggeredBy: 'Kofi Mensah', triggeredByRole: 'Technician', timestamp: '2026-05-09T09:30:00Z', note: 'On site — unit disassembled, awaiting replacement parts' }]

},
{
  id: 'job-002',
  title: 'Electrical Panel Inspection',
  description: 'Scheduled annual inspection of main electrical distribution panel. Check for overloaded circuits, loose connections, and compliance with current safety codes.',
  location: 'Trasacco Valley Estate, East Legon',
  locationDetail: 'Basement Level, Electrical Room B-01',
  contactName: 'Priscilla Danso',
  contactPhone: '+233 20 613 4567',
  status: 'Pending',
  priority: 'High',
  assignedTechnician: TECHNICIANS[0],
  client: CLIENTS[1],
  createdAt: '2026-05-09T07:00:00Z',
  updatedAt: '2026-05-09T07:00:00Z',
  category: 'Electrical',
  auditLog: [
  { id: 'audit-002a', status: 'Pending', triggeredBy: 'Adjoa Mensah', triggeredByRole: 'Admin', timestamp: '2026-05-09T07:00:00Z', note: 'Scheduled inspection — assigned to Kwame Asante' }]

},
{
  id: 'job-003',
  title: 'Lobby Plumbing Leak',
  description: 'Visible water leak from ceiling pipe in main lobby. Water pooling on the floor poses a slip hazard. Requires immediate containment and pipe repair.',
  location: 'Meridian Office Park, Airport City',
  locationDetail: 'Ground Floor, Main Lobby Entrance',
  contactName: 'Selorm Agbenyega',
  contactPhone: '+233 27 701 8900',
  status: 'Completed',
  priority: 'Critical',
  assignedTechnician: TECHNICIANS[1],
  client: CLIENTS[2],
  createdAt: '2026-05-07T11:20:00Z',
  updatedAt: '2026-05-09T14:45:00Z',
  category: 'Plumbing',
  completionPhoto: "https://images.unsplash.com/photo-1472459815671-18d3d2b92f88",
  auditLog: [
  { id: 'audit-003a', status: 'Pending', triggeredBy: 'Adjoa Mensah', triggeredByRole: 'Admin', timestamp: '2026-05-07T11:20:00Z' },
  { id: 'audit-003b', status: 'In Progress', triggeredBy: 'Abena Owusu', triggeredByRole: 'Technician', timestamp: '2026-05-08T09:00:00Z', note: 'Pipe section isolated, repair underway' },
  { id: 'audit-003c', status: 'Completed', triggeredBy: 'Abena Owusu', triggeredByRole: 'Technician', timestamp: '2026-05-09T14:45:00Z', note: 'Pipe replaced, area cleaned and dried. Photo attached.' }]

},
{
  id: 'job-004',
  title: 'Fire Suppression System Test',
  description: 'Quarterly test of fire suppression sprinkler system across all floors. Verify pressure, check for blockages, and confirm alarm integration.',
  location: 'GoldCoast Towers, Ridge',
  locationDetail: 'All Floors — coordinated with building security',
  contactName: 'Mawuli Tetteh',
  contactPhone: '+233 30 266 9901',
  status: 'Verified',
  priority: 'High',
  assignedTechnician: TECHNICIANS[6],
  client: CLIENTS[3],
  createdAt: '2026-05-05T09:00:00Z',
  updatedAt: '2026-05-08T16:00:00Z',
  category: 'Fire Safety',
  auditLog: [
  { id: 'audit-004a', status: 'Pending', triggeredBy: 'Adjoa Mensah', triggeredByRole: 'Admin', timestamp: '2026-05-05T09:00:00Z' },
  { id: 'audit-004b', status: 'In Progress', triggeredBy: 'Nana Adjei', triggeredByRole: 'Technician', timestamp: '2026-05-06T08:30:00Z' },
  { id: 'audit-004c', status: 'Completed', triggeredBy: 'Nana Adjei', triggeredByRole: 'Technician', timestamp: '2026-05-07T17:00:00Z', note: 'All systems functional. Report attached.' },
  { id: 'audit-004d', status: 'Verified', triggeredBy: 'Adjoa Mensah', triggeredByRole: 'Admin', timestamp: '2026-05-08T16:00:00Z', note: 'Verified against compliance report. Closed.' }]

},
{
  id: 'job-005',
  title: 'Generator Maintenance Service',
  description: 'Routine 500-hour service on the 200KVA standby generator. Oil change, filter replacement, battery check, and load test required.',
  location: 'Kumasi Industrial Hub, Suame',
  locationDetail: 'Generator Room, External Block C',
  contactName: 'Kwabena Oti',
  contactPhone: '+233 32 202 4568',
  status: 'In Progress',
  priority: 'Medium',
  assignedTechnician: TECHNICIANS[4],
  client: CLIENTS[4],
  createdAt: '2026-05-08T13:00:00Z',
  updatedAt: '2026-05-09T08:00:00Z',
  category: 'Mechanical',
  auditLog: [
  { id: 'audit-005a', status: 'Pending', triggeredBy: 'Adjoa Mensah', triggeredByRole: 'Admin', timestamp: '2026-05-08T13:00:00Z' },
  { id: 'audit-005b', status: 'In Progress', triggeredBy: 'Yaw Darko', triggeredByRole: 'Technician', timestamp: '2026-05-09T08:00:00Z', note: 'Service commenced. Oil drained, filters changed.' }]

},
{
  id: 'job-006',
  title: 'Lift Maintenance — Tower B',
  description: 'Monthly preventive maintenance on passenger lifts in Tower B. Lubrication, cable inspection, emergency phone test, and safety certification renewal.',
  location: 'Cantonments City Apts, Cantonments',
  locationDetail: 'Tower B, Lift Machine Room, Roof Level',
  contactName: 'Esi Quartey',
  contactPhone: '+233 30 278 2201',
  status: 'Pending',
  priority: 'High',
  assignedTechnician: TECHNICIANS[3],
  client: CLIENTS[5],
  createdAt: '2026-05-09T10:30:00Z',
  updatedAt: '2026-05-09T10:30:00Z',
  category: 'Mechanical',
  auditLog: [
  { id: 'audit-006a', status: 'Pending', triggeredBy: 'Adjoa Mensah', triggeredByRole: 'Admin', timestamp: '2026-05-09T10:30:00Z' }]

},
{
  id: 'job-007',
  title: 'Roof Waterproofing Assessment',
  description: 'Inspect roof membrane integrity following recent rains. Identify any breaches causing internal water ingress on the top floor.',
  location: 'Accra Mall Ltd., Spintex Road',
  locationDetail: 'Roof Level, Section A and B',
  contactName: 'Ernest Kwarteng',
  contactPhone: '+233 24 501 2345',
  status: 'Pending',
  priority: 'Medium',
  assignedTechnician: TECHNICIANS[5],
  client: CLIENTS[0],
  createdAt: '2026-05-09T11:00:00Z',
  updatedAt: '2026-05-09T11:00:00Z',
  category: 'Civil',
  auditLog: [
  { id: 'audit-007a', status: 'Pending', triggeredBy: 'Adjoa Mensah', triggeredByRole: 'Admin', timestamp: '2026-05-09T11:00:00Z' }]

},
{
  id: 'job-008',
  title: 'CCTV System Fault',
  description: 'Cameras on floors 4–6 have gone offline. Security team has no coverage. Requires urgent diagnosis and restoration of network feed.',
  location: 'Trasacco Valley Estate, East Legon',
  locationDetail: 'Floors 4, 5, and 6 — Camera Hub Room, Floor 4',
  contactName: 'Priscilla Danso',
  contactPhone: '+233 20 613 4567',
  status: 'Completed',
  priority: 'High',
  assignedTechnician: TECHNICIANS[0],
  client: CLIENTS[1],
  createdAt: '2026-05-06T15:00:00Z',
  updatedAt: '2026-05-09T12:00:00Z',
  category: 'Security',
  auditLog: [
  { id: 'audit-008a', status: 'Pending', triggeredBy: 'Adjoa Mensah', triggeredByRole: 'Admin', timestamp: '2026-05-06T15:00:00Z' },
  { id: 'audit-008b', status: 'In Progress', triggeredBy: 'Kwame Asante', triggeredByRole: 'Technician', timestamp: '2026-05-07T09:00:00Z' },
  { id: 'audit-008c', status: 'Completed', triggeredBy: 'Kwame Asante', triggeredByRole: 'Technician', timestamp: '2026-05-09T12:00:00Z', note: 'Network switch replaced. All cameras restored.' }]

},
{
  id: 'job-009',
  title: 'Parking Lot Lighting Upgrade',
  description: 'Replace 24 sodium vapour floodlights with LED equivalents in the east parking lot. Includes wiring upgrade and timer control installation.',
  location: 'Meridian Office Park, Airport City',
  locationDetail: 'East Parking Lot — Zones E1 through E8',
  contactName: 'Selorm Agbenyega',
  contactPhone: '+233 27 701 8900',
  status: 'Verified',
  priority: 'Low',
  assignedTechnician: TECHNICIANS[7],
  client: CLIENTS[2],
  createdAt: '2026-05-01T09:00:00Z',
  updatedAt: '2026-05-07T11:00:00Z',
  category: 'Electrical',
  auditLog: [
  { id: 'audit-009a', status: 'Pending', triggeredBy: 'Adjoa Mensah', triggeredByRole: 'Admin', timestamp: '2026-05-01T09:00:00Z' },
  { id: 'audit-009b', status: 'In Progress', triggeredBy: 'Efua Acheampong', triggeredByRole: 'Technician', timestamp: '2026-05-03T08:00:00Z' },
  { id: 'audit-009c', status: 'Completed', triggeredBy: 'Efua Acheampong', triggeredByRole: 'Technician', timestamp: '2026-05-06T18:00:00Z' },
  { id: 'audit-009d', status: 'Verified', triggeredBy: 'Adjoa Mensah', triggeredByRole: 'Admin', timestamp: '2026-05-07T11:00:00Z' }]

},
{
  id: 'job-010',
  title: 'Water Tank Cleaning',
  description: 'Scheduled biannual cleaning and disinfection of rooftop water storage tanks. Drain, scrub, disinfect, and refill. Water quality test required.',
  location: 'GoldCoast Towers, Ridge',
  locationDetail: 'Roof Level, Tank Room',
  contactName: 'Mawuli Tetteh',
  contactPhone: '+233 30 266 9901',
  status: 'In Progress',
  priority: 'Medium',
  assignedTechnician: TECHNICIANS[6],
  client: CLIENTS[3],
  createdAt: '2026-05-09T06:00:00Z',
  updatedAt: '2026-05-09T10:00:00Z',
  category: 'Plumbing',
  auditLog: [
  { id: 'audit-010a', status: 'Pending', triggeredBy: 'Adjoa Mensah', triggeredByRole: 'Admin', timestamp: '2026-05-09T06:00:00Z' },
  { id: 'audit-010b', status: 'In Progress', triggeredBy: 'Nana Adjei', triggeredByRole: 'Technician', timestamp: '2026-05-09T10:00:00Z' }]

},
{
  id: 'job-011',
  title: 'Intercom System Repair',
  description: 'Intercom units on floors 2 and 3 are producing static noise and dropping calls. Residents are frustrated. Requires board-level diagnosis.',
  location: 'Cantonments City Apts, Cantonments',
  locationDetail: 'Floors 2–3, Intercom Panel Rooms',
  contactName: 'Esi Quartey',
  contactPhone: '+233 30 278 2201',
  status: 'Pending',
  priority: 'Medium',
  assignedTechnician: TECHNICIANS[3],
  client: CLIENTS[5],
  createdAt: '2026-05-09T14:00:00Z',
  updatedAt: '2026-05-09T14:00:00Z',
  category: 'Security',
  auditLog: [
  { id: 'audit-011a', status: 'Pending', triggeredBy: 'Adjoa Mensah', triggeredByRole: 'Admin', timestamp: '2026-05-09T14:00:00Z' }]

},
{
  id: 'job-012',
  title: 'AC Filter Replacement — All Units',
  description: 'Replace air filters across all 32 split AC units in the office block. Filters are past service interval causing reduced airflow and higher energy consumption.',
  location: 'Kumasi Industrial Hub, Suame',
  locationDetail: 'Office Block, All Floors',
  contactName: 'Kwabena Oti',
  contactPhone: '+233 32 202 4568',
  status: 'Completed',
  priority: 'Low',
  assignedTechnician: TECHNICIANS[4],
  client: CLIENTS[4],
  createdAt: '2026-05-04T08:00:00Z',
  updatedAt: '2026-05-08T15:00:00Z',
  category: 'HVAC',
  auditLog: [
  { id: 'audit-012a', status: 'Pending', triggeredBy: 'Adjoa Mensah', triggeredByRole: 'Admin', timestamp: '2026-05-04T08:00:00Z' },
  { id: 'audit-012b', status: 'In Progress', triggeredBy: 'Yaw Darko', triggeredByRole: 'Technician', timestamp: '2026-05-06T09:00:00Z' },
  { id: 'audit-012c', status: 'Completed', triggeredBy: 'Yaw Darko', triggeredByRole: 'Technician', timestamp: '2026-05-08T15:00:00Z', note: 'All 32 units serviced. Filters replaced.' }]

}];


export const TECHNICIAN_JOBS = MOCK_JOBS.filter((j) => j.assignedTechnician.id === 'tech-003');

export const MOCK_NOTIFICATIONS: Notification[] = [
{ id: 'notif-001', message: 'Job "HVAC Unit Failure — Level 3" is now In Progress', jobId: 'job-001', jobTitle: 'HVAC Unit Failure — Level 3', read: false, createdAt: '2026-05-09T09:30:00Z', type: 'status_change' },
{ id: 'notif-002', message: 'Job "Lobby Plumbing Leak" has been marked Completed', jobId: 'job-003', jobTitle: 'Lobby Plumbing Leak', read: false, createdAt: '2026-05-09T14:45:00Z', type: 'status_change' },
{ id: 'notif-003', message: 'Job "CCTV System Fault" has been marked Completed', jobId: 'job-008', jobTitle: 'CCTV System Fault', read: true, createdAt: '2026-05-09T12:00:00Z', type: 'status_change' },
{ id: 'notif-004', message: 'New job "Roof Waterproofing Assessment" assigned to your site', jobId: 'job-007', jobTitle: 'Roof Waterproofing Assessment', read: true, createdAt: '2026-05-09T11:00:00Z', type: 'assignment' }];


export const JOB_TREND_DATA = [
{ date: '25 Apr', created: 4, completed: 2, verified: 1 },
{ date: '26 Apr', created: 6, completed: 3, verified: 2 },
{ date: '27 Apr', created: 3, completed: 5, verified: 3 },
{ date: '28 Apr', created: 7, completed: 2, verified: 1 },
{ date: '29 Apr', created: 5, completed: 4, verified: 3 },
{ date: '30 Apr', created: 2, completed: 6, verified: 4 },
{ date: '01 May', created: 8, completed: 3, verified: 2 },
{ date: '02 May', created: 4, completed: 5, verified: 3 },
{ date: '03 May', created: 6, completed: 4, verified: 4 },
{ date: '04 May', created: 9, completed: 2, verified: 1 },
{ date: '05 May', created: 5, completed: 7, verified: 5 },
{ date: '06 May', created: 3, completed: 4, verified: 3 },
{ date: '07 May', created: 7, completed: 5, verified: 4 },
{ date: '08 May', created: 11, completed: 3, verified: 2 },
{ date: '09 May', created: 8, completed: 6, verified: 3 }];


export const STATUS_BREAKDOWN_DATA = [
{ name: 'Pending', value: 4, color: '#F59E0B' },
{ name: 'In Progress', value: 3, color: '#3B82F6' },
{ name: 'Completed', value: 3, color: '#10B981' },
{ name: 'Verified', value: 2, color: '#0EA5A0' }];


export const JOBS_PER_TECH_DATA = [
{ name: 'K. Mensah', jobs: 9, completed: 4 },
{ name: 'N. Adjei', jobs: 8, completed: 3 },
{ name: 'K. Asante', jobs: 7, completed: 5 },
{ name: 'Y. Darko', jobs: 6, completed: 4 },
{ name: 'A. Owusu', jobs: 5, completed: 3 },
{ name: 'E. Acheampong', jobs: 5, completed: 4 },
{ name: 'A. Boateng', jobs: 4, completed: 2 },
{ name: 'A. Frimpong', jobs: 3, completed: 2 }];


export const DEMO_CREDENTIALS = [
{ role: 'Admin' as UserRole, email: 'adjoa.mensah@swiftfix.gh', password: 'Admin@SwiftFix2026', name: 'Adjoa Mensah', redirectTo: '/admin-dashboard' },
{ role: 'Technician' as UserRole, email: 'k.mensah@swiftfix.gh', password: 'Tech@SwiftFix2026', name: 'Kofi Mensah', redirectTo: '/technician-dashboard' },
{ role: 'Client' as UserRole, email: 'facilities@accramall.com', password: 'Client@AccraMall26', name: 'Accra Mall Ltd.', redirectTo: '/client-dashboard' }];


export function getStatusColor(status: JobStatus): string {
  switch (status) {
    case 'Pending':return 'status-pending';
    case 'In Progress':return 'status-inprogress';
    case 'Completed':return 'status-completed';
    case 'Verified':return 'status-verified';
    default:return 'status-pending';
  }
}

export function getPriorityColor(priority: Priority): string {
  switch (priority) {
    case 'Critical':return 'priority-critical';
    case 'High':return 'priority-high';
    case 'Medium':return 'priority-medium';
    case 'Low':return 'priority-low';
    default:return 'priority-medium';
  }
}

export function getNextStatus(current: JobStatus): JobStatus | null {
  switch (current) {
    case 'Pending':return 'In Progress';
    case 'In Progress':return 'Completed';
    case 'Completed':return null; // Admin verifies
    case 'Verified':return null;
    default:return null;
  }
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  const hh = String(d.getHours()).padStart(2, '0');
  const min = String(d.getMinutes()).padStart(2, '0');
  return `${dd}/${mm}/${yyyy} ${hh}:${min}`;
}

export function timeAgo(iso: string): string {
  const now = new Date('2026-05-09T21:19:37Z');
  const then = new Date(iso);
  const diffMs = now.getTime() - then.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}