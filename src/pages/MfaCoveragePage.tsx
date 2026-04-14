import { useState, useMemo } from 'react';
import type { ColumnDef, SortingState } from '@tanstack/react-table';
import {
  ShieldCheckIcon,
  ShieldIcon,
  WarningIcon,
  KeyIcon,
  MagnifyingGlassIcon,
  CheckCircleIcon,
} from '@phosphor-icons/react';
import { CDSFlex } from '@ciscodesignsystems/cds-react-flex';
import { CDSHeading } from '@ciscodesignsystems/cds-react-heading';
import { CDSText } from '@ciscodesignsystems/cds-react-text';
import { CDSCard } from '@ciscodesignsystems/cds-react-card';
import { CDSTag } from '@ciscodesignsystems/cds-react-tag';
import { CDSButton } from '@ciscodesignsystems/cds-react-button';
import { CDSDivider } from '@ciscodesignsystems/cds-react-divider';
import { CDSFooter } from '@ciscodesignsystems/cds-react-footer';
import { CDSStatusIcon } from '@ciscodesignsystems/cds-react-icons';
import { CDSTextInput } from '@ciscodesignsystems/cds-react-text-input';
import { CDSSelect } from '@ciscodesignsystems/cds-react-select';
import { CDSTable } from '@ciscodesignsystems/cds-react-table';
import { CDSDrawer } from '@ciscodesignsystems/cds-react-drawer';

// ── Types ─────────────────────────────────────────────────────────────────────

type DuoStatus = 'protected' | 'partial' | 'none';
type RiskLevel = 'critical' | 'high' | 'medium' | 'low';
type IntegrationType = 'firewall' | 'cloud' | 'siem' | 'identity' | 'endpoint';

type SccIntegration = {
  id: string;
  name: string;
  vendor: string;
  type: IntegrationType;
  connectedAt: string;
  duoStatus: DuoStatus;
  riskLevel: RiskLevel;
  duoAppLinked: boolean;
  duoAppName: string | null;
  mfaPolicy: string | null;
  lastAuthEvent: string | null;
  finding: string;
};

// ── Label + sentiment maps ────────────────────────────────────────────────────

const TYPE_LABELS: Record<IntegrationType, string> = {
  firewall: 'Firewall',
  cloud: 'Cloud Environment',
  siem: 'SIEM',
  identity: 'Identity Provider',
  endpoint: 'Endpoint Security',
};

const DUO_STATUS_LABELS: Record<DuoStatus, string> = {
  protected: 'Protected',
  partial: 'Partial',
  none: 'None',
};

const DUO_STATUS_SENTIMENT: Record<DuoStatus, 'positive' | 'warning' | 'negative'> = {
  protected: 'positive',
  partial: 'warning',
  none: 'negative',
};

const RISK_LABELS: Record<RiskLevel, string> = {
  critical: 'Critical',
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};

const RISK_SENTIMENT: Record<RiskLevel, 'negative' | 'warning' | 'neutral' | 'positive'> = {
  critical: 'negative',
  high: 'warning',
  medium: 'neutral',
  low: 'positive',
};

// ── Vendor logo helpers ───────────────────────────────────────────────────────

const VENDOR_COLORS: Record<string, string> = {
  Cisco: '#049fd9',
  'Palo Alto Networks': '#fa582d',
  Fortinet: '#ee3124',
  Amazon: '#ff9900',
  Microsoft: '#00a4ef',
  Google: '#4285f4',
  Splunk: '#65a637',
  IBM: '#1f70c1',
  Okta: '#007dc1',
  CrowdStrike: '#e0393d',
};

function getVendorColor(vendor: string): string {
  return VENDOR_COLORS[vendor] ?? '#6b7280';
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 3)
    .toUpperCase();
}

// ── Static mock data ──────────────────────────────────────────────────────────

const sccIntegrations: SccIntegration[] = [
  {
    id: 'asa-1',
    name: 'Cisco ASA Firewall',
    vendor: 'Cisco',
    type: 'firewall',
    connectedAt: 'Jan 12, 2024',
    duoStatus: 'protected',
    riskLevel: 'high',
    duoAppLinked: true,
    duoAppName: 'SCC-ASA-Admin',
    mfaPolicy: 'Require MFA for all admin access',
    lastAuthEvent: '2 hours ago',
    finding: 'All administrative access is protected by Duo MFA. No action required.',
  },
  {
    id: 'paloalto-1',
    name: 'Palo Alto NGFW',
    vendor: 'Palo Alto Networks',
    type: 'firewall',
    connectedAt: 'Mar 5, 2024',
    duoStatus: 'partial',
    riskLevel: 'critical',
    duoAppLinked: true,
    duoAppName: 'SCC-PAN-Admin',
    mfaPolicy: 'MFA for read-only users only',
    lastAuthEvent: '45 minutes ago',
    finding:
      'Admin users bypass MFA due to an incomplete policy scope. Privileged access is exposed — an attacker with admin credentials can operate without a second factor.',
  },
  {
    id: 'fortinet-1',
    name: 'FortiGate Firewall',
    vendor: 'Fortinet',
    type: 'firewall',
    connectedAt: 'May 20, 2024',
    duoStatus: 'none',
    riskLevel: 'critical',
    duoAppLinked: false,
    duoAppName: null,
    mfaPolicy: null,
    lastAuthEvent: 'Yesterday',
    finding:
      'No MFA is enforced on this firewall. Admin access relies solely on username and password, creating a high-risk attack vector for credential-based breaches.',
  },
  {
    id: 'aws-1',
    name: 'AWS Management Console',
    vendor: 'Amazon',
    type: 'cloud',
    connectedAt: 'Feb 10, 2024',
    duoStatus: 'protected',
    riskLevel: 'medium',
    duoAppLinked: true,
    duoAppName: 'SCC-AWS-IAM',
    mfaPolicy: 'Adaptive MFA — all roles',
    lastAuthEvent: '1 hour ago',
    finding:
      'AWS IAM access is fully protected with adaptive Duo MFA across all roles. No action required.',
  },
  {
    id: 'azure-1',
    name: 'Azure Active Directory',
    vendor: 'Microsoft',
    type: 'cloud',
    connectedAt: 'Jan 30, 2024',
    duoStatus: 'partial',
    riskLevel: 'high',
    duoAppLinked: true,
    duoAppName: 'SCC-Azure-AD',
    mfaPolicy: 'MFA for privileged accounts only',
    lastAuthEvent: '3 hours ago',
    finding:
      'Standard user accounts access Azure AD without MFA enforcement. Lateral movement risk is elevated when any standard credential is compromised.',
  },
  {
    id: 'gcp-1',
    name: 'Google Cloud Platform',
    vendor: 'Google',
    type: 'cloud',
    connectedAt: 'Jun 1, 2024',
    duoStatus: 'none',
    riskLevel: 'high',
    duoAppLinked: false,
    duoAppName: null,
    mfaPolicy: null,
    lastAuthEvent: '6 hours ago',
    finding:
      'No Duo application is linked to this GCP integration. Cloud infrastructure admin access operates without any MFA protection.',
  },
  {
    id: 'splunk-1',
    name: 'Splunk Enterprise',
    vendor: 'Splunk',
    type: 'siem',
    connectedAt: 'Apr 15, 2024',
    duoStatus: 'none',
    riskLevel: 'critical',
    duoAppLinked: false,
    duoAppName: null,
    mfaPolicy: null,
    lastAuthEvent: '12 hours ago',
    finding:
      'Splunk admin access is completely unprotected. An attacker with stolen credentials can access all security logs and tamper with audit trails undetected.',
  },
  {
    id: 'qradar-1',
    name: 'IBM QRadar',
    vendor: 'IBM',
    type: 'siem',
    connectedAt: 'Mar 22, 2024',
    duoStatus: 'protected',
    riskLevel: 'medium',
    duoAppLinked: true,
    duoAppName: 'SCC-QRadar',
    mfaPolicy: 'MFA for all analysts and admins',
    lastAuthEvent: '30 minutes ago',
    finding:
      'QRadar access is fully protected across all analyst and admin roles. No action required.',
  },
  {
    id: 'sentinel-1',
    name: 'Microsoft Sentinel',
    vendor: 'Microsoft',
    type: 'siem',
    connectedAt: 'May 5, 2024',
    duoStatus: 'partial',
    riskLevel: 'high',
    duoAppLinked: true,
    duoAppName: 'SCC-Sentinel',
    mfaPolicy: 'MFA during business hours only',
    lastAuthEvent: '2 hours ago',
    finding:
      'Off-hours access to Sentinel bypasses MFA enforcement. This gap is most dangerous during incident response windows when after-hours access is most frequent.',
  },
  {
    id: 'ad-1',
    name: 'Active Directory',
    vendor: 'Microsoft',
    type: 'identity',
    connectedAt: 'Dec 10, 2023',
    duoStatus: 'protected',
    riskLevel: 'medium',
    duoAppLinked: true,
    duoAppName: 'SCC-AD-Auth',
    mfaPolicy: 'Enforce MFA — all domain accounts',
    lastAuthEvent: '5 minutes ago',
    finding:
      'Active Directory is fully protected with broad Duo MFA coverage across all domain accounts. No action required.',
  },
  {
    id: 'okta-1',
    name: 'Okta Identity',
    vendor: 'Okta',
    type: 'identity',
    connectedAt: 'Feb 28, 2024',
    duoStatus: 'protected',
    riskLevel: 'low',
    duoAppLinked: true,
    duoAppName: 'SCC-Okta',
    mfaPolicy: 'Duo as secondary MFA factor',
    lastAuthEvent: '1 hour ago',
    finding:
      'Okta integration is fully protected with Duo layered as a secondary MFA factor. No action required.',
  },
  {
    id: 'crowdstrike-1',
    name: 'CrowdStrike Falcon',
    vendor: 'CrowdStrike',
    type: 'endpoint',
    connectedAt: 'Apr 2, 2024',
    duoStatus: 'none',
    riskLevel: 'high',
    duoAppLinked: false,
    duoAppName: null,
    mfaPolicy: null,
    lastAuthEvent: '4 hours ago',
    finding:
      'Console access to CrowdStrike is not MFA-protected. Security event data and automated response actions could be compromised by an attacker with valid credentials.',
  },
  {
    id: 'defender-1',
    name: 'Microsoft Defender',
    vendor: 'Microsoft',
    type: 'endpoint',
    connectedAt: 'Mar 15, 2024',
    duoStatus: 'partial',
    riskLevel: 'medium',
    duoAppLinked: true,
    duoAppName: 'SCC-Defender',
    mfaPolicy: 'MFA for security operators only',
    lastAuthEvent: '2 hours ago',
    finding:
      'Endpoint response actions can be triggered by analysts without MFA. Expanding the policy scope to all user roles would close this coverage gap.',
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

export function MfaCoveragePage() {
  const [selectedIntegration, setSelectedIntegration] = useState<SccIntegration | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<DuoStatus | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);

  function openDrawer(integration: SccIntegration) {
    setSelectedIntegration(integration);
    setDrawerOpen(true);
  }

  // ── Summary counts ──────────────────────────────────────────────────────
  const protectedCount = sccIntegrations.filter((i) => i.duoStatus === 'protected').length;
  const partialCount = sccIntegrations.filter((i) => i.duoStatus === 'partial').length;
  const noneCount = sccIntegrations.filter((i) => i.duoStatus === 'none').length;
  const criticalCount = sccIntegrations.filter((i) => i.riskLevel === 'critical').length;

  // ── Type options for CDSSelect ──────────────────────────────────────────
  const typeOptions = useMemo(
    () =>
      (Object.entries(TYPE_LABELS) as [IntegrationType, string][]).map(([value, label]) => ({
        label,
        value,
      })),
    [],
  );

  // ── Filtered data ───────────────────────────────────────────────────────
  const filteredData = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return sccIntegrations.filter((i) => {
      const matchesSearch =
        !q ||
        i.name.toLowerCase().includes(q) ||
        i.vendor.toLowerCase().includes(q) ||
        TYPE_LABELS[i.type].toLowerCase().includes(q);
      const matchesType = !typeFilter || i.type === typeFilter;
      const matchesStatus = !statusFilter || i.duoStatus === statusFilter;
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [searchQuery, typeFilter, statusFilter]);

  // ── Table columns ───────────────────────────────────────────────────────
  const columns = useMemo<ColumnDef<SccIntegration>[]>(
    () => [
      {
        id: 'name',
        header: 'Integration',
        accessorKey: 'name',
        enableSorting: true,
        cell: (info) => (
          <CDSFlex gap={10} align="center">
            <CDSFlex
              align="center"
              style={{
                justifyContent: 'center',
                width: 36,
                height: 36,
                borderRadius: 8,
                background: getVendorColor(info.row.original.vendor),
                flexShrink: 0,
              }}
            >
              <CDSText
                weight="semi-bold"
                style={{ color: '#ffffff', fontSize: '11px', lineHeight: 1 }}
              >
                {getInitials(info.row.original.name)}
              </CDSText>
            </CDSFlex>
            <CDSFlex direction="vertical" gap={1}>
              <CDSText>{info.getValue() as string}</CDSText>
              <CDSText size="xs" color="light">
                {info.row.original.vendor}
              </CDSText>
            </CDSFlex>
          </CDSFlex>
        ),
      },
      {
        id: 'type',
        header: 'Type',
        accessorKey: 'type',
        enableSorting: true,
        cell: (info) => (
          <CDSTag sentiment="neutral" size="sm">
            {TYPE_LABELS[info.getValue() as IntegrationType]}
          </CDSTag>
        ),
      },
      {
        id: 'duoStatus',
        header: 'DUO Status',
        accessorKey: 'duoStatus',
        enableSorting: true,
        cell: (info) => {
          const s = info.getValue() as DuoStatus;
          return (
            <CDSFlex align="center" gap={6}>
              <CDSStatusIcon size={12} status={s === 'protected' ? 'positive' : s === 'partial' ? 'warning' : 'negative'} />
              <CDSTag sentiment={DUO_STATUS_SENTIMENT[s]} size="sm">
                {DUO_STATUS_LABELS[s]}
              </CDSTag>
            </CDSFlex>
          );
        },
      },
      {
        id: 'riskLevel',
        header: 'Risk Level',
        accessorKey: 'riskLevel',
        enableSorting: true,
        cell: (info) => {
          const r = info.getValue() as RiskLevel;
          return (
            <CDSTag sentiment={RISK_SENTIMENT[r]} size="sm">
              {RISK_LABELS[r]}
            </CDSTag>
          );
        },
      },
      {
        id: 'action',
        header: '',
        cell: (info) => {
          const { duoStatus } = info.row.original;
          return (
            <CDSButton
              size="sm"
              variant={duoStatus === 'none' ? 'primary' : 'secondary'}
              icon={duoStatus === 'none' ? <KeyIcon size={13} weight="bold" /> : undefined}
              onClick={(e) => {
                e.stopPropagation();
                openDrawer(info.row.original);
              }}
            >
              {duoStatus === 'none'
                ? 'Enable Protection'
                : duoStatus === 'partial'
                ? 'View Issues'
                : 'View Details'}
            </CDSButton>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const activeFiltersCount = [typeFilter, statusFilter, searchQuery].filter(Boolean).length;

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <CDSFlex direction="vertical" gap={24} margin={24}>
      {/* ── Page header ──────────────────────────────────────────────────── */}
      <CDSFlex direction="vertical" gap={6}>
        <CDSFlex align="center" gap={10}>
          <CDSHeading size="primary">MFA Coverage</CDSHeading>
          <CDSTag sentiment="info" size="sm">SCC Integrations</CDSTag>
        </CDSFlex>
        <CDSText color="light">
          Duo MFA protection status across all integrations connected to Security Cloud Control.
          Identify gaps and remediate directly from this view.
        </CDSText>
      </CDSFlex>

      {/* ── Summary health cards ─────────────────────────────────────────── */}
      <CDSFlex gap={16} wrap="wrap">

        {/* Total */}
        <CDSCard
          aria-label="All integrations"
          interactive
          selected={statusFilter === null && !typeFilter && !searchQuery}
          style={{ flex: '1 1 220px', cursor: 'pointer' }}
          onClick={() => {
            setStatusFilter(null);
            setTypeFilter(null);
            setSearchQuery('');
          }}
        >
          <CDSFlex direction="vertical" grow gap="sm">
            <CDSFlex direction="vertical" as="header">
              <CDSFlex gap="xxs" align="center">
                <CDSHeading size="section">All Integrations</CDSHeading>
                <div style={{ flex: 1 }} />
                <ShieldCheckIcon
                  size={32}
                  style={{ color: 'var(--interact-icon-weak-default)' }}
                />
              </CDSFlex>
            </CDSFlex>
            <CDSFlex gap="sm">
              <CDSFlex
                direction="vertical"
                style={{ background: 'var(--base-bg-default)', flex: 1, padding: 10, borderRadius: 8 }}
              >
                <CDSHeading size="lg">{sccIntegrations.length}</CDSHeading>
                <CDSFlex gap="xxs" align="center">
                  <CDSText weight="semi-bold">Connected</CDSText>
                  <CDSStatusIcon size={18} status="neutral" />
                </CDSFlex>
              </CDSFlex>
              <CDSFlex
                direction="vertical"
                style={{ background: 'var(--base-bg-default)', flex: 1, padding: 10, borderRadius: 8 }}
              >
                <CDSHeading size="lg">{criticalCount}</CDSHeading>
                <CDSFlex gap="xxs" align="center">
                  <CDSText weight="semi-bold">Critical Risk</CDSText>
                  <CDSStatusIcon size={18} status="negative" />
                </CDSFlex>
              </CDSFlex>
            </CDSFlex>
          </CDSFlex>
        </CDSCard>

        {/* Protected */}
        <CDSCard
          aria-label="DUO protected integrations"
          interactive
          selected={statusFilter === 'protected'}
          status={statusFilter === 'protected' ? 'positive' : undefined}
          style={{ flex: '1 1 220px', cursor: 'pointer' }}
          onClick={() => setStatusFilter((prev) => (prev === 'protected' ? null : 'protected'))}
        >
          <CDSFlex direction="vertical" grow gap="sm">
            <CDSFlex direction="vertical" as="header">
              <CDSFlex gap="xxs" align="center">
                <CDSHeading size="section">DUO Protected</CDSHeading>
                <div style={{ flex: 1 }} />
                <ShieldCheckIcon
                  size={32}
                  style={{ color: 'var(--positive-icon-default)' }}
                />
              </CDSFlex>
            </CDSFlex>
            <CDSFlex gap="sm">
              <CDSFlex
                direction="vertical"
                style={{ background: 'var(--base-bg-default)', flex: 1, padding: 10, borderRadius: 8 }}
              >
                <CDSHeading size="lg">{protectedCount}</CDSHeading>
                <CDSFlex gap="xxs" align="center">
                  <CDSText weight="semi-bold">Protected</CDSText>
                  <CDSStatusIcon size={18} status="positive" />
                </CDSFlex>
              </CDSFlex>
              <CDSFlex
                direction="vertical"
                style={{ background: 'var(--base-bg-default)', flex: 1, padding: 10, borderRadius: 8 }}
              >
                <CDSHeading size="lg">{partialCount}</CDSHeading>
                <CDSFlex gap="xxs" align="center">
                  <CDSText weight="semi-bold">Partial</CDSText>
                  <CDSStatusIcon size={18} status="warning" />
                </CDSFlex>
              </CDSFlex>
            </CDSFlex>
          </CDSFlex>
        </CDSCard>

        {/* No MFA Coverage */}
        <CDSCard
          aria-label="Integrations with no MFA coverage"
          interactive
          selected={statusFilter === 'none'}
          status={noneCount > 0 ? 'negative' : undefined}
          style={{ flex: '1 1 220px', cursor: 'pointer' }}
          onClick={() => setStatusFilter((prev) => (prev === 'none' ? null : 'none'))}
        >
          <CDSFlex direction="vertical" grow gap="sm">
            <CDSFlex direction="vertical" as="header">
              <CDSFlex gap="xxs" align="center">
                <CDSHeading size="section">No MFA Coverage</CDSHeading>
                <div style={{ flex: 1 }} />
                <ShieldIcon
                  size={32}
                  style={{
                    color: noneCount > 0
                      ? 'var(--negative-icon-default)'
                      : 'var(--interact-icon-weak-default)',
                  }}
                />
              </CDSFlex>
            </CDSFlex>
            <CDSFlex gap="sm">
              <CDSFlex
                direction="vertical"
                style={{ background: 'var(--base-bg-default)', flex: 1, padding: 10, borderRadius: 8 }}
              >
                <CDSHeading size="lg">{noneCount}</CDSHeading>
                <CDSFlex gap="xxs" align="center">
                  <CDSText weight="semi-bold">Unprotected</CDSText>
                  <CDSStatusIcon size={18} status={noneCount > 0 ? 'negative' : 'neutral'} />
                </CDSFlex>
              </CDSFlex>
              <CDSFlex
                direction="vertical"
                style={{ background: 'var(--base-bg-default)', flex: 1, padding: 10, borderRadius: 8 }}
              >
                <CDSHeading size="lg">
                  {sccIntegrations.filter(
                    (i) => i.duoStatus === 'none' && i.riskLevel === 'critical',
                  ).length}
                </CDSHeading>
                <CDSFlex gap="xxs" align="center">
                  <CDSText weight="semi-bold">Critical</CDSText>
                  <CDSStatusIcon size={18} status="negative" />
                </CDSFlex>
              </CDSFlex>
            </CDSFlex>
          </CDSFlex>
        </CDSCard>
      </CDSFlex>

      {/* ── Filter bar + table ────────────────────────────────────────────── */}
      <CDSCard aria-label="Integration coverage table">
        <CDSFlex direction="vertical" gap={14}>

          {/* Filters */}
          <CDSFlex gap={10} align="center" wrap="wrap">
            <CDSFlex style={{ flex: 1, minWidth: 220 }}>
              <CDSTextInput
                placeholder="Search by name, vendor, or type…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                clearable
                prefix={<MagnifyingGlassIcon size={16} />}
              />
            </CDSFlex>
            <div style={{ minWidth: 200 }}>
              <CDSSelect
                options={typeOptions}
                placeholder="All types"
                value={typeFilter}
                onChange={(val) => setTypeFilter(val as string | null)}
                clearable
              />
            </div>
            {activeFiltersCount > 0 && (
              <CDSButton
                size="sm"
                variant="tertiary"
                onClick={() => {
                  setStatusFilter(null);
                  setTypeFilter(null);
                  setSearchQuery('');
                }}
              >
                Clear all filters
              </CDSButton>
            )}
            <CDSText size="xs" color="light" style={{ marginLeft: 'auto' }}>
              {filteredData.length} of {sccIntegrations.length} integrations
            </CDSText>
          </CDSFlex>

          {/* Active filter chips */}
          {(statusFilter || typeFilter) && (
            <CDSFlex gap={6} align="center" wrap="wrap">
              <CDSText size="xs" color="light">Active filters:</CDSText>
              {statusFilter && (
                <CDSTag
                  sentiment={DUO_STATUS_SENTIMENT[statusFilter]}
                  size="sm"
                >
                  Status: {DUO_STATUS_LABELS[statusFilter]}
                </CDSTag>
              )}
              {typeFilter && (
                <CDSTag sentiment="neutral" size="sm">
                  Type: {TYPE_LABELS[typeFilter as IntegrationType]}
                </CDSTag>
              )}
            </CDSFlex>
          )}

          {/* Table */}
          <CDSTable
            columns={columns}
            data={filteredData}
            sorting={sorting}
            onSortingChange={setSorting}
            density="compact"
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onRowClick={(_e: any, row: any) => openDrawer(row.original)}
            emptyStateMessage="No integrations match the current filters."
          />
        </CDSFlex>
      </CDSCard>

      <CDSFooter brandName="Cisco Systems, Inc." />

      {/* ── Detail drawer ─────────────────────────────────────────────────── */}
      <CDSDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        size="md"
        openBelowHeader
      >
        {selectedIntegration && (
          <CDSFlex direction="vertical" gap={20} style={{ padding: 24 }}>

            {/* Integration header */}
            <CDSFlex gap={14} align="center">
              <CDSFlex
                align="center"
                style={{
                  justifyContent: 'center',
                  width: 52,
                  height: 52,
                  borderRadius: 10,
                  background: getVendorColor(selectedIntegration.vendor),
                  flexShrink: 0,
                }}
              >
                <CDSText
                  weight="semi-bold"
                  style={{ color: '#ffffff', fontSize: '14px', lineHeight: 1 }}
                >
                  {getInitials(selectedIntegration.name)}
                </CDSText>
              </CDSFlex>
              <CDSFlex direction="vertical" gap={4} style={{ flex: 1 }}>
                <CDSHeading size="section">{selectedIntegration.name}</CDSHeading>
                <CDSText color="light">{selectedIntegration.vendor}</CDSText>
              </CDSFlex>
              <CDSFlex gap={6}>
                <CDSTag sentiment={DUO_STATUS_SENTIMENT[selectedIntegration.duoStatus]} size="sm">
                  {DUO_STATUS_LABELS[selectedIntegration.duoStatus]}
                </CDSTag>
                <CDSTag sentiment={RISK_SENTIMENT[selectedIntegration.riskLevel]} size="sm">
                  {RISK_LABELS[selectedIntegration.riskLevel]} Risk
                </CDSTag>
              </CDSFlex>
            </CDSFlex>

            <CDSDivider aria-hidden="true" />

            {/* Integration details */}
            <CDSFlex direction="vertical" gap={12}>
              <CDSHeading size="sub-section">Integration Details</CDSHeading>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px 20px',
                }}
              >
                <CDSFlex direction="vertical" gap={4}>
                  <CDSText size="xs" color="light">Type</CDSText>
                  <CDSTag sentiment="neutral" size="sm">
                    {TYPE_LABELS[selectedIntegration.type]}
                  </CDSTag>
                </CDSFlex>
                <CDSFlex direction="vertical" gap={4}>
                  <CDSText size="xs" color="light">Connected to SCC</CDSText>
                  <CDSText size="sm">{selectedIntegration.connectedAt}</CDSText>
                </CDSFlex>
                <CDSFlex direction="vertical" gap={4}>
                  <CDSText size="xs" color="light">DUO Application</CDSText>
                  <CDSText size="sm">
                    {selectedIntegration.duoAppLinked
                      ? selectedIntegration.duoAppName
                      : 'Not linked'}
                  </CDSText>
                </CDSFlex>
                <CDSFlex direction="vertical" gap={4}>
                  <CDSText size="xs" color="light">MFA Policy</CDSText>
                  <CDSText size="sm">
                    {selectedIntegration.mfaPolicy ?? 'None applied'}
                  </CDSText>
                </CDSFlex>
                <CDSFlex direction="vertical" gap={4}>
                  <CDSText size="xs" color="light">Last Auth Event</CDSText>
                  <CDSText size="sm">
                    {selectedIntegration.lastAuthEvent ?? 'No events recorded'}
                  </CDSText>
                </CDSFlex>
              </div>
            </CDSFlex>

            <CDSDivider aria-hidden="true" />

            {/* Security finding */}
            <CDSFlex direction="vertical" gap={10}>
              <CDSHeading size="sub-section">Security Finding</CDSHeading>
              <CDSCard
                aria-label="Security finding detail"
                status={
                  selectedIntegration.duoStatus === 'none'
                    ? 'negative'
                    : selectedIntegration.duoStatus === 'partial'
                    ? 'warning'
                    : 'positive'
                }
              >
                <CDSFlex gap={10} align="flex-start">
                  {selectedIntegration.duoStatus === 'protected' ? (
                    <CheckCircleIcon
                      size={18}
                      weight="bold"
                      style={{ color: 'var(--positive-icon-default)', flexShrink: 0, marginTop: 2 }}
                    />
                  ) : (
                    <WarningIcon
                      size={18}
                      weight="bold"
                      style={{
                        color:
                          selectedIntegration.duoStatus === 'none'
                            ? 'var(--negative-icon-default)'
                            : 'var(--warning-icon-default)',
                        flexShrink: 0,
                        marginTop: 2,
                      }}
                    />
                  )}
                  <CDSText color="light">{selectedIntegration.finding}</CDSText>
                </CDSFlex>
              </CDSCard>
            </CDSFlex>

            {/* Recommended action — only for unprotected or partial */}
            {selectedIntegration.duoStatus !== 'protected' && (
              <>
                <CDSDivider aria-hidden="true" />
                <CDSFlex direction="vertical" gap={12}>
                  <CDSHeading size="sub-section">Recommended Action</CDSHeading>
                  <CDSText color="light">
                    {selectedIntegration.duoStatus === 'none'
                      ? 'Link a Duo application to this integration and apply an MFA policy covering all administrative roles. This will enforce a second factor for every login attempt.'
                      : 'Expand your existing MFA policy scope to cover all user roles and access patterns. Review the current policy and update the exclusion rules to close the coverage gap.'}
                  </CDSText>
                  <CDSFlex gap={8} wrap="wrap">
                    <CDSButton
                      variant="primary"
                      icon={<KeyIcon size={15} weight="bold" />}
                    >
                      Enable DUO Protection
                    </CDSButton>
                    <CDSButton variant="secondary">
                      Open DUO Admin Console
                    </CDSButton>
                  </CDSFlex>
                </CDSFlex>
              </>
            )}
          </CDSFlex>
        )}
      </CDSDrawer>
    </CDSFlex>
  );
}
