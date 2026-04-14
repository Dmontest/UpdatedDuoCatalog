export type PlatformKey = 'scc' | 'duo' | 'sse' | 'cii';
export type IntegrationStatus = 'connected' | 'connecting' | 'failed' | 'disabled';
export type IntegrationSource = 'scc' | 'duo';
export type IntegrationCategory = 'siem' | 'identity' | 'endpoint' | 'network' | 'cloud' | 'ticketing';

export type PlatformHealth = {
  status: IntegrationStatus;
  lastSynced?: string;
  errorMessage?: string;
  errorCount?: number;
};

export type Integration = {
  id: string;
  name: string;
  vendor: string;
  category: IntegrationCategory;
  source: IntegrationSource;
  description: string;
  logoInitials: string;
  logoColor: string;
  platforms: Partial<Record<PlatformKey, PlatformHealth>>;
  addedAt: string;
};

export type CatalogItem = {
  id: string;
  name: string;
  vendor: string;
  category: IntegrationCategory;
  source: IntegrationSource;
  description: string;
  logoInitials: string;
  logoColor: string;
  compatiblePlatforms: PlatformKey[];
  isAdded: boolean;
  prerequisites?: string[];
};

export const PLATFORM_LABELS: Record<PlatformKey, string> = {
  scc: 'SCC',
  duo: 'DUO',
  sse: 'SSE',
  cii: 'CII',
};

export const CATEGORY_LABELS: Record<IntegrationCategory, string> = {
  siem: 'SIEM',
  identity: 'Identity',
  endpoint: 'Endpoint',
  network: 'Network',
  cloud: 'Cloud',
  ticketing: 'Ticketing',
};

export const STATUS_LABELS: Record<IntegrationStatus, string> = {
  connected: 'Connected',
  connecting: 'Connecting',
  failed: 'Failed',
  disabled: 'Disabled',
};

export function getOverallStatus(integration: Integration): IntegrationStatus {
  const statuses = Object.values(integration.platforms).map((p) => p.status);
  if (statuses.some((s) => s === 'failed')) return 'failed';
  if (statuses.some((s) => s === 'connecting')) return 'connecting';
  if (statuses.every((s) => s === 'disabled')) return 'disabled';
  return 'connected';
}

export function getLastSyncDisplay(integration: Integration): string {
  const platforms = Object.values(integration.platforms);
  if (platforms.every((p) => p.status === 'disabled')) return 'Disabled';
  if (platforms.some((p) => p.status === 'connecting')) return 'Syncing...';
  const synced = platforms.filter((p) => p.lastSynced).map((p) => p.lastSynced!);
  return synced[0] ?? '—';
}

export const activeIntegrations: Integration[] = [
  {
    id: 'splunk-siem',
    name: 'Splunk SIEM',
    vendor: 'Splunk',
    category: 'siem',
    source: 'duo',
    description: 'Security Information and Event Management for log aggregation and threat detection.',
    logoInitials: 'SP',
    logoColor: '#FF6B35',
    platforms: {
      scc: { status: 'connected', lastSynced: '2 min ago' },
      duo: { status: 'connected', lastSynced: '2 min ago' },
      cii: { status: 'failed', lastSynced: '1 hr ago', errorMessage: 'Connection timeout after 30s', errorCount: 3 },
    },
    addedAt: '2026-03-12',
  },
  {
    id: 'okta-idp',
    name: 'Okta Identity',
    vendor: 'Okta',
    category: 'identity',
    source: 'scc',
    description: 'Cloud-based identity provider with SSO, MFA and lifecycle management.',
    logoInitials: 'OK',
    logoColor: '#007DC1',
    platforms: {
      scc: { status: 'connected', lastSynced: '5 min ago' },
      duo: { status: 'connecting' },
      sse: { status: 'connected', lastSynced: '5 min ago' },
    },
    addedAt: '2026-02-28',
  },
  {
    id: 'crowdstrike',
    name: 'CrowdStrike Falcon',
    vendor: 'CrowdStrike',
    category: 'endpoint',
    source: 'scc',
    description: 'Endpoint detection and response with AI-powered threat intelligence.',
    logoInitials: 'CS',
    logoColor: '#E0312F',
    platforms: {
      scc: { status: 'disabled' },
    },
    addedAt: '2026-01-15',
  },
  {
    id: 'palo-prisma',
    name: 'Palo Alto Prisma',
    vendor: 'Palo Alto Networks',
    category: 'network',
    source: 'duo',
    description: 'Cloud-native network security platform for secure access and threat prevention.',
    logoInitials: 'PA',
    logoColor: '#FA582D',
    platforms: {
      scc: { status: 'connected', lastSynced: '1 min ago' },
      sse: { status: 'connected', lastSynced: '1 min ago' },
      cii: { status: 'connected', lastSynced: '3 min ago' },
    },
    addedAt: '2026-02-01',
  },
  {
    id: 'servicenow',
    name: 'ServiceNow ITSM',
    vendor: 'ServiceNow',
    category: 'ticketing',
    source: 'scc',
    description: 'IT service management platform for incident, change and problem tracking.',
    logoInitials: 'SN',
    logoColor: '#62D84E',
    platforms: {
      scc: { status: 'connected', lastSynced: '10 min ago' },
      duo: { status: 'connected', lastSynced: '10 min ago' },
    },
    addedAt: '2026-03-05',
  },
  {
    id: 'azure-ad',
    name: 'Microsoft Entra ID',
    vendor: 'Microsoft',
    category: 'identity',
    source: 'duo',
    description: 'Azure Active Directory for enterprise identity and access management.',
    logoInitials: 'MS',
    logoColor: '#0078D4',
    platforms: {
      scc: { status: 'connected', lastSynced: '3 min ago' },
      duo: { status: 'connected', lastSynced: '3 min ago' },
      sse: { status: 'connected', lastSynced: '3 min ago' },
    },
    addedAt: '2026-01-20',
  },
  {
    id: 'datadog',
    name: 'Datadog',
    vendor: 'Datadog',
    category: 'siem',
    source: 'duo',
    description: 'Cloud monitoring and security analytics platform.',
    logoInitials: 'DD',
    logoColor: '#632CA6',
    platforms: {
      scc: { status: 'failed', lastSynced: '2 hr ago', errorMessage: 'API key expired — re-authentication required', errorCount: 8 },
      duo: { status: 'failed', lastSynced: '2 hr ago', errorMessage: 'API key expired', errorCount: 8 },
    },
    addedAt: '2026-02-14',
  },
  {
    id: 'aws-security-hub',
    name: 'AWS Security Hub',
    vendor: 'Amazon Web Services',
    category: 'cloud',
    source: 'scc',
    description: 'Centralized cloud security posture management for AWS environments.',
    logoInitials: 'AW',
    logoColor: '#FF9900',
    platforms: {
      scc: { status: 'connected', lastSynced: '8 min ago' },
      cii: { status: 'connecting' },
    },
    addedAt: '2026-03-20',
  },
  {
    id: 'zscaler',
    name: 'Zscaler ZIA',
    vendor: 'Zscaler',
    category: 'network',
    source: 'duo',
    description: 'Zero trust network access with cloud-delivered security.',
    logoInitials: 'ZS',
    logoColor: '#00A1E4',
    platforms: {
      scc: { status: 'connected', lastSynced: '4 min ago' },
      sse: { status: 'connected', lastSynced: '4 min ago' },
    },
    addedAt: '2026-02-22',
  },
];

export const catalogItems: CatalogItem[] = [
  ...activeIntegrations.map((i) => ({
    id: i.id,
    name: i.name,
    vendor: i.vendor,
    category: i.category,
    source: i.source,
    description: i.description,
    logoInitials: i.logoInitials,
    logoColor: i.logoColor,
    compatiblePlatforms: Object.keys(i.platforms) as PlatformKey[],
    isAdded: true,
  })),
  {
    id: 'elastic-siem',
    name: 'Elastic Security',
    vendor: 'Elastic',
    category: 'siem',
    source: 'duo',
    description: 'Open source SIEM and endpoint security powered by Elasticsearch.',
    logoInitials: 'EL',
    logoColor: '#00BFB3',
    compatiblePlatforms: ['scc', 'duo', 'cii'],
    isAdded: false,
    prerequisites: ['Elasticsearch cluster v8+', 'API key with read access'],
  },
  {
    id: 'ping-identity',
    name: 'Ping Identity',
    vendor: 'Ping Identity',
    category: 'identity',
    source: 'duo',
    description: 'Enterprise identity platform for SSO, MFA and API security.',
    logoInitials: 'PI',
    logoColor: '#EC1C24',
    compatiblePlatforms: ['scc', 'duo', 'sse'],
    isAdded: false,
    prerequisites: ['PingOne account', 'Admin API access'],
  },
  {
    id: 'sentinelone',
    name: 'SentinelOne',
    vendor: 'SentinelOne',
    category: 'endpoint',
    source: 'scc',
    description: 'AI-powered endpoint protection, detection and response platform.',
    logoInitials: 'S1',
    logoColor: '#4B21A4',
    compatiblePlatforms: ['scc', 'cii'],
    isAdded: false,
    prerequisites: ['SentinelOne Singularity platform access'],
  },
  {
    id: 'google-workspace',
    name: 'Google Workspace',
    vendor: 'Google',
    category: 'identity',
    source: 'duo',
    description: 'Cloud-based productivity suite with identity and security management.',
    logoInitials: 'GW',
    logoColor: '#4285F4',
    compatiblePlatforms: ['scc', 'duo'],
    isAdded: false,
    prerequisites: ['Google Workspace Admin account', 'OAuth 2.0 credentials'],
  },
  {
    id: 'qualys',
    name: 'Qualys VMDR',
    vendor: 'Qualys',
    category: 'cloud',
    source: 'scc',
    description: 'Vulnerability management, detection and response for hybrid environments.',
    logoInitials: 'QL',
    logoColor: '#ED1C24',
    compatiblePlatforms: ['scc', 'cii'],
    isAdded: false,
    prerequisites: ['Qualys subscription', 'API credentials'],
  },
  {
    id: 'sumo-logic',
    name: 'Sumo Logic',
    vendor: 'Sumo Logic',
    category: 'siem',
    source: 'duo',
    description: 'Cloud-native security analytics and log management platform.',
    logoInitials: 'SL',
    logoColor: '#000099',
    compatiblePlatforms: ['scc', 'duo', 'cii'],
    isAdded: false,
    prerequisites: ['Sumo Logic account', 'Collector API key'],
  },
];
