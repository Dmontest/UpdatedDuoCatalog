export type Device = {
  id: string;
  hostname: string;
  ipAddress: string;
  platform: string;
  status: 'healthy' | 'warning' | 'critical' | 'offline';
  cpuUsage: number;
  memoryUsage: number;
  lastSeen: string;
  site: string;
};

export const devices: Device[] = [
  { id: 'DEV-001', hostname: 'core-sw-01', ipAddress: '10.0.1.1', platform: 'Catalyst 9300', status: 'healthy', cpuUsage: 23, memoryUsage: 45, lastSeen: '2 min ago', site: 'San Jose HQ' },
  { id: 'DEV-002', hostname: 'core-sw-02', ipAddress: '10.0.1.2', platform: 'Catalyst 9300', status: 'healthy', cpuUsage: 18, memoryUsage: 52, lastSeen: '1 min ago', site: 'San Jose HQ' },
  { id: 'DEV-003', hostname: 'dist-sw-01', ipAddress: '10.0.2.1', platform: 'Catalyst 9200', status: 'warning', cpuUsage: 78, memoryUsage: 81, lastSeen: '5 min ago', site: 'San Jose HQ' },
  { id: 'DEV-004', hostname: 'access-sw-01', ipAddress: '10.0.3.1', platform: 'Catalyst 9100', status: 'healthy', cpuUsage: 12, memoryUsage: 34, lastSeen: '1 min ago', site: 'Austin DC' },
  { id: 'DEV-005', hostname: 'access-sw-02', ipAddress: '10.0.3.2', platform: 'Catalyst 9100', status: 'critical', cpuUsage: 95, memoryUsage: 92, lastSeen: '15 min ago', site: 'Austin DC' },
  { id: 'DEV-006', hostname: 'fw-01', ipAddress: '10.0.0.1', platform: 'Firepower 2100', status: 'healthy', cpuUsage: 34, memoryUsage: 56, lastSeen: '1 min ago', site: 'Austin DC' },
  { id: 'DEV-007', hostname: 'wlc-01', ipAddress: '10.0.4.1', platform: 'Catalyst 9800', status: 'healthy', cpuUsage: 41, memoryUsage: 63, lastSeen: '3 min ago', site: 'RTP Office' },
  { id: 'DEV-008', hostname: 'router-01', ipAddress: '10.0.5.1', platform: 'ISR 4431', status: 'offline', cpuUsage: 0, memoryUsage: 0, lastSeen: '2 hours ago', site: 'RTP Office' },
  { id: 'DEV-009', hostname: 'ap-01', ipAddress: '10.0.6.1', platform: 'Aironet 9120', status: 'healthy', cpuUsage: 15, memoryUsage: 28, lastSeen: '1 min ago', site: 'London Office' },
  { id: 'DEV-010', hostname: 'ap-02', ipAddress: '10.0.6.2', platform: 'Aironet 9120', status: 'healthy', cpuUsage: 22, memoryUsage: 31, lastSeen: '2 min ago', site: 'London Office' },
  { id: 'DEV-011', hostname: 'core-rtr-01', ipAddress: '10.0.7.1', platform: 'ASR 1001-X', status: 'warning', cpuUsage: 67, memoryUsage: 73, lastSeen: '4 min ago', site: 'London Office' },
  { id: 'DEV-012', hostname: 'vpn-gw-01', ipAddress: '10.0.8.1', platform: 'ASA 5516', status: 'healthy', cpuUsage: 29, memoryUsage: 44, lastSeen: '1 min ago', site: 'San Jose HQ' },
];

export const trafficData = [
  {
    id: 'Inbound',
    color: 'hsl(197, 70%, 50%)',
    data: [
      { x: '00:00', y: 120 },
      { x: '04:00', y: 85 },
      { x: '08:00', y: 240 },
      { x: '12:00', y: 380 },
      { x: '16:00', y: 420 },
      { x: '20:00', y: 290 },
      { x: '24:00', y: 150 },
    ],
  },
  {
    id: 'Outbound',
    color: 'hsl(110, 70%, 50%)',
    data: [
      { x: '00:00', y: 95 },
      { x: '04:00', y: 62 },
      { x: '08:00', y: 190 },
      { x: '12:00', y: 310 },
      { x: '16:00', y: 350 },
      { x: '20:00', y: 230 },
      { x: '24:00', y: 110 },
    ],
  },
];
