import { useState, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import {
  ShieldCheckIcon,
  KeyIcon,
  CloudIcon,
  EyeIcon,
  ArrowSquareOutIcon,
  PlusCircleIcon,
  MagnifyingGlassIcon,
  LinkIcon,
  WarningIcon,
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
import { CDSTab } from '@ciscodesignsystems/cds-react-tab';
import { CDSSelect } from '@ciscodesignsystems/cds-react-select';
import { CDSTable } from '@ciscodesignsystems/cds-react-table';
import { CDSDrawer } from '@ciscodesignsystems/cds-react-drawer';
import {
  catalogItems,
  activeIntegrations,
  getOverallStatus,
  getLastSyncDisplay,
  CATEGORY_LABELS,
  STATUS_LABELS,
  PLATFORM_LABELS,
  type Integration,
  type PlatformKey,
} from '../data/integrations';

// ── Types ─────────────────────────────────────────────────────────────────────

type CiscoApp = {
  id: string;
  name: string;
  abbr: string;
  description: string;
  category: string;
  userCount: string;
  isActive: boolean;
  icon: ReactNode;
};

type UnifiedApp = {
  id: string;
  name: string;
  vendor: string;
  description: string;
  category: string;
  logoInitials: string;
  logoColor: string | null;
  type: 'cisco' | 'third-party';
  isActive: boolean;
};

// ── Static data ───────────────────────────────────────────────────────────────

const ciscoApps: CiscoApp[] = [
  {
    id: 'scc',
    name: 'Security Cloud Control',
    abbr: 'SCC',
    description: 'Unified security policy management and automated threat response across your Cisco portfolio.',
    category: 'Security Management',
    userCount: '1,240',
    isActive: true,
    icon: <ShieldCheckIcon size={20} weight="duotone" />,
  },
  {
    id: 'duo',
    name: 'Cisco Duo',
    abbr: 'DUO',
    description: 'Zero-trust multi-factor authentication and secure access for every user, device, and application.',
    category: 'Identity & Access',
    userCount: '3,800',
    isActive: true,
    icon: <KeyIcon size={20} weight="duotone" />,
  },
  {
    id: 'sse',
    name: 'Secure Service Edge',
    abbr: 'SSE',
    description: 'Cloud-delivered network security combining ZTNA, CASB, SWG, and firewall-as-a-service.',
    category: 'Network Security',
    userCount: '875',
    isActive: true,
    icon: <CloudIcon size={20} weight="duotone" />,
  },
  {
    id: 'cii',
    name: 'Cloud Identity Intelligence',
    abbr: 'CII',
    description: 'AI-powered identity threat detection and risky user behavior analytics.',
    category: 'Identity Intelligence',
    userCount: '620',
    isActive: false,
    icon: <EyeIcon size={20} weight="duotone" />,
  },
];

// ── Status helpers ────────────────────────────────────────────────────────────

type OverallStatus = ReturnType<typeof getOverallStatus>;

function toTagSentiment(s: string): 'positive' | 'info' | 'negative' | 'neutral' {
  if (s === 'connected') return 'positive';
  if (s === 'connecting') return 'info';
  if (s === 'failed') return 'negative';
  return 'neutral';
}

function toIconStatus(s: string): 'positive' | 'warning' | 'negative' | 'neutral' {
  if (s === 'connected') return 'positive';
  if (s === 'connecting') return 'warning';
  if (s === 'failed') return 'negative';
  return 'neutral';
}

function toCardStatus(s: OverallStatus): 'negative' | 'info' | undefined {
  if (s === 'failed') return 'negative';
  if (s === 'connecting') return 'info';
  return undefined;
}

// ── Component ─────────────────────────────────────────────────────────────────

export function WorkspacePage() {
  // ── View + filter state ─────────────────────────────────────────────────
  const [activeView, setActiveView] = useState<'hub' | 'active'>('hub');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');   // '' = All
  const [showCisco, setShowCisco] = useState(true);
  const [showThirdParty, setShowThirdParty] = useState(true);

  // ── Drawer state ────────────────────────────────────────────────────────
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);

  function openIssueDrawer(integration: Integration) {
    setSelectedIntegration(integration);
    setDrawerOpen(true);
  }

  // ── Toggle logic: at least one must remain selected ─────────────────────
  function toggleCisco() {
    if (showCisco && !showThirdParty) return;
    setShowCisco((v) => !v);
  }
  function toggleThirdParty() {
    if (showThirdParty && !showCisco) return;
    setShowThirdParty((v) => !v);
  }

  // ── Unified app list ────────────────────────────────────────────────────
  const allApps: UnifiedApp[] = useMemo(
    () => [
      ...ciscoApps.map((a) => ({
        id: a.id,
        name: a.name,
        vendor: 'Cisco',
        description: a.description,
        category: a.category,
        logoInitials: a.abbr,
        logoColor: null,
        type: 'cisco' as const,
        isActive: a.isActive,
      })),
      ...catalogItems.map((i) => ({
        id: i.id,
        name: i.name,
        vendor: i.vendor,
        description: i.description,
        category: CATEGORY_LABELS[i.category],
        logoInitials: i.logoInitials,
        logoColor: i.logoColor,
        type: 'third-party' as const,
        isActive: i.isAdded,
      })),
    ],
    [],
  );

  const categoryOptions = useMemo(
    () =>
      Array.from(new Set(allApps.map((a) => a.category)))
        .sort()
        .map((c) => ({ label: c, value: c })),
    [allApps],
  );

  // ── Filtered apps (Hub view) ────────────────────────────────────────────
  const filteredApps = useMemo(
    () =>
      allApps.filter((app) => {
        const q = searchQuery.toLowerCase();
        const matchesSearch =
          !q ||
          app.name.toLowerCase().includes(q) ||
          app.vendor.toLowerCase().includes(q) ||
          app.category.toLowerCase().includes(q);
        const matchesType =
          (showCisco && app.type === 'cisco') ||
          (showThirdParty && app.type === 'third-party');
        const matchesCat = !categoryFilter || app.category === categoryFilter;
        return matchesSearch && matchesType && matchesCat;
      }),
    [allApps, searchQuery, categoryFilter, showCisco, showThirdParty],
  );

  // ── Active view data ────────────────────────────────────────────────────
  const activeCiscoApps = useMemo(() => ciscoApps.filter((a) => a.isActive), []);
  const activeConnections = useMemo(
    () => activeIntegrations.filter((i) => getOverallStatus(i) !== 'disabled'),
    [],
  );
  const connectedCount = activeConnections.filter((i) => getOverallStatus(i) === 'connected').length;
  const connectingCount = activeConnections.filter((i) => getOverallStatus(i) === 'connecting').length;
  const failedCount = activeConnections.filter((i) => getOverallStatus(i) === 'failed').length;
  const totalErrorCount = activeConnections.reduce(
    (sum, i) => sum + Object.values(i.platforms).reduce((s, p) => s + (p.errorCount ?? 0), 0),
    0,
  );
  const activeTotalCount = activeCiscoApps.length + activeConnections.length;

  // ── Table column definitions ────────────────────────────────────────────

  const ciscoTableColumns = useMemo<ColumnDef<CiscoApp>[]>(
    () => [
      {
        id: 'name',
        header: 'Application',
        accessorKey: 'name',
        enableSorting: true,
        cell: (info) => (
          <CDSFlex gap={10} align="center">
            <CDSFlex
              align="center"
              style={{
                justifyContent: 'center',
                width: 32,
                height: 32,
                borderRadius: 6,
                background: 'var(--interact-bg-subtle-default)',
                flexShrink: 0,
                color: 'var(--interact-icon-default)',
              }}
            >
              {info.row.original.icon}
            </CDSFlex>
            <CDSText>{info.getValue() as string}</CDSText>
          </CDSFlex>
        ),
      },
      {
        id: 'category',
        header: 'Category',
        accessorKey: 'category',
        enableSorting: true,
        cell: (info) => (
          <CDSTag sentiment="neutral" size="sm">
            {info.getValue() as string}
          </CDSTag>
        ),
      },
      {
        id: 'status',
        header: 'Status',
        cell: (info) => (
          <CDSFlex align="center" gap={6}>
            <CDSStatusIcon
              size={12}
              status={info.row.original.isActive ? 'positive' : 'neutral'}
            />
            <CDSText size="xs">
              {info.row.original.isActive ? 'Active' : 'Inactive'}
            </CDSText>
          </CDSFlex>
        ),
      },
      {
        id: 'userCount',
        header: 'Active Users',
        accessorKey: 'userCount',
        enableSorting: true,
      },
      {
        id: 'action',
        header: '',
        cell: () => (
          <CDSButton
            size="sm"
            variant="secondary"
            rightIcon={<ArrowSquareOutIcon size={13} weight="bold" />}
          >
            Open
          </CDSButton>
        ),
      },
    ],
    [],
  );

  const integrationColumns = useMemo<ColumnDef<Integration>[]>(
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
                background: info.row.original.logoColor,
                flexShrink: 0,
              }}
            >
              <CDSText
                weight="semi-bold"
                style={{ color: '#ffffff', fontSize: '11px', lineHeight: 1 }}
              >
                {info.row.original.logoInitials}
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
        id: 'category',
        header: 'Category',
        cell: (info) => (
          <CDSTag sentiment="neutral" size="sm">
            {CATEGORY_LABELS[info.row.original.category]}
          </CDSTag>
        ),
      },
      {
        id: 'status',
        header: 'Status',
        cell: (info) => {
          const s = getOverallStatus(info.row.original);
          return (
            <CDSFlex align="center" gap={6}>
              <CDSStatusIcon size={12} status={toIconStatus(s)} />
              <CDSText size="xs">{STATUS_LABELS[s]}</CDSText>
            </CDSFlex>
          );
        },
      },
      {
        id: 'platforms',
        header: 'Platforms',
        cell: (info) => (
          <CDSFlex gap={4} wrap="wrap">
            {(Object.keys(info.row.original.platforms) as PlatformKey[]).map((p) => (
              <CDSTag key={p} sentiment="neutral" size="sm">
                {PLATFORM_LABELS[p]}
              </CDSTag>
            ))}
          </CDSFlex>
        ),
      },
      {
        id: 'lastSync',
        header: 'Last Synced',
        cell: (info) => (
          <CDSText size="xs" color="light">
            {getLastSyncDisplay(info.row.original)}
          </CDSText>
        ),
      },
      {
        id: 'action',
        header: '',
        cell: (info) => {
          const status = getOverallStatus(info.row.original);
          if (status === 'failed') {
            return (
              <CDSButton
                size="sm"
                icon={<WarningIcon size={13} weight="bold" />}
                onClick={() => openIssueDrawer(info.row.original)}
              >
                View Issues
              </CDSButton>
            );
          }
          return (
            <CDSButton size="sm" variant="secondary">
              Manage
            </CDSButton>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  // ── Sorted integrations: connected → connecting → failed ────────────────
  const sortedIntegrations = useMemo(
    () =>
      [...activeConnections].sort((a, b) => {
        const order: Record<string, number> = { connected: 0, connecting: 1, failed: 2, disabled: 3 };
        return order[getOverallStatus(a)] - order[getOverallStatus(b)];
      }),
    [activeConnections],
  );

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <CDSFlex direction="vertical" gap={24} margin={24}>
      {/* ── Page header + tab switcher ──────────────────────────────────── */}
      <CDSFlex direction="vertical" gap={12}>
        <CDSFlex direction="vertical" gap={4}>
          <CDSHeading size="primary">Apps & Integrations</CDSHeading>
          <CDSText color="light">
            Browse, connect, and monitor all Cisco and third-party apps in one place.
          </CDSText>
        </CDSFlex>
        <CDSTab orientation="horizontal">
          <CDSTab.Link
            href="#0"
            selected={activeView === 'hub'}
            onClick={(e) => { e.preventDefault(); setActiveView('hub'); }}
          >
            Hub
          </CDSTab.Link>
          <CDSTab.Link
            href="#0"
            selected={activeView === 'active'}
            onClick={(e) => { e.preventDefault(); setActiveView('active'); }}
          >
            Active ({activeTotalCount})
          </CDSTab.Link>
        </CDSTab>
      </CDSFlex>

      {/* ══════════ HUB VIEW ══════════════════════════════════════════════ */}
      {activeView === 'hub' && (
        <CDSFlex direction="vertical" gap={24}>

          {/* Cisco Apps — horizontal scroll strip ─────────────────────── */}
          <CDSFlex direction="vertical" gap={10}>
            <CDSFlex align="center" gap={8}>
              <CDSHeading size="section">Cisco Applications</CDSHeading>
              <CDSTag sentiment="info" size="sm">{ciscoApps.length} apps</CDSTag>
            </CDSFlex>
            <CDSText size="xs" color="light">
              Your licensed Cisco platform products — scroll right to see all.
            </CDSText>
            <div style={{ overflowX: 'auto', paddingBottom: 6 }}>
              <CDSFlex gap={12} style={{ width: 'max-content' }}>
                {ciscoApps.map((app) => (
                  <CDSCard key={app.id} aria-label={app.name} status="info" style={{ width: 230 }}>
                    <CDSFlex direction="vertical" gap={12}>
                      <CDSFlex gap={10} align="center">
                        <CDSFlex
                          align="center"
                          style={{
                            justifyContent: 'center',
                            width: 40,
                            height: 40,
                            borderRadius: 8,
                            background: 'var(--interact-bg-subtle-default)',
                            flexShrink: 0,
                            color: 'var(--interact-icon-default)',
                          }}
                        >
                          {app.icon}
                        </CDSFlex>
                        <CDSFlex direction="vertical" gap={2} style={{ minWidth: 0 }}>
                          <CDSHeading size="sub-section">{app.name}</CDSHeading>
                          <CDSText size="xs" color="light">{app.category}</CDSText>
                        </CDSFlex>
                      </CDSFlex>
                      <CDSFlex align="center" style={{ justifyContent: 'space-between' }}>
                        <CDSFlex align="center" gap={4}>
                          <CDSStatusIcon size={12} status={app.isActive ? 'positive' : 'neutral'} />
                          <CDSText size="xs" color="light">
                            {app.isActive ? `${app.userCount} users` : 'Inactive'}
                          </CDSText>
                        </CDSFlex>
                        <CDSButton size="sm" variant="secondary" rightIcon={<ArrowSquareOutIcon size={13} weight="bold" />}>
                          Open
                        </CDSButton>
                      </CDSFlex>
                    </CDSFlex>
                  </CDSCard>
                ))}
              </CDSFlex>
            </div>
          </CDSFlex>

          <CDSDivider aria-hidden="true" />

          {/* All Applications & Integrations ──────────────────────────── */}
          <CDSFlex direction="vertical" gap={14}>
            <CDSFlex align="center" gap={8}>
              <CDSHeading size="section">All Applications & Integrations</CDSHeading>
              <CDSTag sentiment="neutral" size="sm">{allApps.length} total</CDSTag>
            </CDSFlex>

            {/* Row 1: search + category select */}
            <CDSFlex gap={10} align="center" wrap="wrap">
              <CDSFlex style={{ flex: 1, minWidth: 200 }}>
                <CDSTextInput
                  placeholder="Search by name, vendor, or category…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  clearable
                  prefix={<MagnifyingGlassIcon size={16} />}
                />
              </CDSFlex>
              <div style={{ minWidth: 200 }}>
                <CDSSelect
                  options={categoryOptions}
                  placeholder="All categories"
                  value={categoryFilter || null}
                  onChange={(val: string | null) => setCategoryFilter(val ?? '')}
                  clearable
                />
              </div>
            </CDSFlex>

            {/* Row 2: Cisco / Third-Party toggles (at least one always active) */}
            <CDSFlex gap={8} align="center">
              <CDSText size="xs" color="light">Show:</CDSText>
              <CDSButton
                size="sm"
                variant={showCisco ? 'secondary' : 'tertiary'}
                onClick={toggleCisco}
              >
                Cisco
              </CDSButton>
              <CDSButton
                size="sm"
                variant={showThirdParty ? 'secondary' : 'tertiary'}
                onClick={toggleThirdParty}
              >
                Third-Party
              </CDSButton>
              <CDSText size="xs" color="light">
                Showing {filteredApps.length} of {allApps.length}
              </CDSText>
            </CDSFlex>

            {/* App grid */}
            {filteredApps.length > 0 ? (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                  gap: 12,
                }}
              >
                {filteredApps.map((app) => (
                  <CDSCard
                    key={`hub-${app.id}`}
                    aria-label={app.name}
                    status={app.type === 'cisco' ? 'info' : undefined}
                  >
                    <CDSFlex direction="vertical" gap={10} style={{ height: '100%' }}>
                      <CDSFlex gap={8} align="center">
                        <CDSFlex
                          align="center"
                          style={{
                            justifyContent: 'center',
                            width: 36,
                            height: 36,
                            borderRadius: 8,
                            background: app.logoColor ?? 'var(--interact-bg-default)',
                            flexShrink: 0,
                          }}
                        >
                          <CDSText
                            weight="semi-bold"
                            style={{ color: '#ffffff', fontSize: '11px', lineHeight: 1 }}
                          >
                            {app.logoInitials}
                          </CDSText>
                        </CDSFlex>
                        <CDSFlex direction="vertical" gap={1} style={{ flex: 1, minWidth: 0 }}>
                          <CDSHeading size="sub-section">{app.name}</CDSHeading>
                          <CDSText size="xs" color="light">{app.vendor}</CDSText>
                        </CDSFlex>
                      </CDSFlex>
                      <CDSFlex gap={4} wrap="wrap">
                        <CDSTag sentiment={app.type === 'cisco' ? 'info' : 'neutral'} size="sm">
                          {app.type === 'cisco' ? 'Cisco' : 'Third-Party'}
                        </CDSTag>
                        <CDSTag sentiment="neutral" size="sm">{app.category}</CDSTag>
                      </CDSFlex>
                      <CDSText
                        size="xs"
                        color="light"
                        style={{ flex: 1, overflow: 'hidden', maxHeight: '2.6em', lineHeight: '1.3em' }}
                      >
                        {app.description}
                      </CDSText>
                      <CDSFlex align="center" style={{ justifyContent: 'space-between' }}>
                        <CDSFlex align="center" gap={4}>
                          <CDSStatusIcon size={11} status={app.isActive ? 'positive' : 'neutral'} />
                          <CDSText size="xs" color="light">
                            {app.isActive ? 'Active' : 'Not connected'}
                          </CDSText>
                        </CDSFlex>
                        <CDSButton
                          size="sm"
                          variant={app.isActive ? 'secondary' : 'primary'}
                          icon={app.isActive ? undefined : <PlusCircleIcon size={13} weight="bold" />}
                        >
                          {app.isActive ? 'Open' : 'Connect'}
                        </CDSButton>
                      </CDSFlex>
                    </CDSFlex>
                  </CDSCard>
                ))}
              </div>
            ) : (
              <CDSFlex
                direction="vertical"
                align="center"
                gap={12}
                style={{ padding: '40px 0', textAlign: 'center' }}
              >
                <CDSHeading size="sub-section">No applications found</CDSHeading>
                <CDSText color="light">Try adjusting your search or filters.</CDSText>
                <CDSButton
                  variant="secondary"
                  onClick={() => {
                    setSearchQuery('');
                    setCategoryFilter('');
                    setShowCisco(true);
                    setShowThirdParty(true);
                  }}
                >
                  Clear filters
                </CDSButton>
              </CDSFlex>
            )}
          </CDSFlex>
        </CDSFlex>
      )}

      {/* ══════════ ACTIVE VIEW ═══════════════════════════════════════════ */}
      {activeView === 'active' && (
        <CDSFlex direction="vertical" gap={24}>

          {/* Summary health cards ──────────────────────────────────────── */}
          <CDSFlex gap={16} wrap="wrap">
            <CDSCard aria-label="Cisco apps status" style={{ flex: 1, minWidth: 220 }}>
              <CDSFlex direction="vertical" grow gap="sm">
                <CDSFlex direction="vertical" as="header">
                  <CDSFlex gap="xxs" align="center">
                    <CDSHeading size="section">Cisco Apps</CDSHeading>
                    <CDSText size="xxs" color="light">{ciscoApps.length} total</CDSText>
                    <div style={{ flex: 1 }} />
                    <ShieldCheckIcon size={32} style={{ color: 'var(--interact-icon-weak-default)' }} />
                  </CDSFlex>
                </CDSFlex>
                <CDSFlex gap="sm">
                  <CDSFlex direction="vertical" style={{ background: 'var(--base-bg-default)', flex: 1, padding: 10, borderRadius: 8 }}>
                    <CDSHeading size="lg">{activeCiscoApps.length}</CDSHeading>
                    <CDSFlex gap="xxs" align="center">
                      <CDSText weight="semi-bold">Active</CDSText>
                      <CDSStatusIcon size={18} status="positive" />
                    </CDSFlex>
                  </CDSFlex>
                  <CDSFlex direction="vertical" style={{ background: 'var(--base-bg-default)', flex: 1, padding: 10, borderRadius: 8 }}>
                    <CDSHeading size="lg">{ciscoApps.length - activeCiscoApps.length}</CDSHeading>
                    <CDSFlex gap="xxs" align="center">
                      <CDSText weight="semi-bold">Inactive</CDSText>
                      <CDSStatusIcon size={18} status="neutral" />
                    </CDSFlex>
                  </CDSFlex>
                </CDSFlex>
              </CDSFlex>
            </CDSCard>

            <CDSCard aria-label="Integration connections status" style={{ flex: 1, minWidth: 220 }}>
              <CDSFlex direction="vertical" grow gap="sm">
                <CDSFlex direction="vertical" as="header">
                  <CDSFlex gap="xxs" align="center">
                    <CDSHeading size="section">Integrations</CDSHeading>
                    <CDSText size="xxs" color="light">{activeIntegrations.length} total</CDSText>
                    <div style={{ flex: 1 }} />
                    <LinkIcon size={32} style={{ color: 'var(--interact-icon-weak-default)' }} />
                  </CDSFlex>
                </CDSFlex>
                <CDSFlex gap="sm">
                  <CDSFlex direction="vertical" style={{ background: 'var(--base-bg-default)', flex: 1, padding: 10, borderRadius: 8 }}>
                    <CDSHeading size="lg">{connectedCount}</CDSHeading>
                    <CDSFlex gap="xxs" align="center">
                      <CDSText weight="semi-bold">Connected</CDSText>
                      <CDSStatusIcon size={18} status="positive" />
                    </CDSFlex>
                  </CDSFlex>
                  <CDSFlex direction="vertical" style={{ background: 'var(--base-bg-default)', flex: 1, padding: 10, borderRadius: 8 }}>
                    <CDSHeading size="lg">{connectingCount}</CDSHeading>
                    <CDSFlex gap="xxs" align="center">
                      <CDSText weight="semi-bold">Syncing</CDSText>
                      <CDSStatusIcon size={18} status="warning" />
                    </CDSFlex>
                  </CDSFlex>
                </CDSFlex>
              </CDSFlex>
            </CDSCard>

            <CDSCard
              aria-label="Issues status"
              style={{ flex: 1, minWidth: 220 }}
              status={failedCount > 0 ? 'negative' : undefined}
            >
              <CDSFlex direction="vertical" grow gap="sm">
                <CDSFlex direction="vertical" as="header">
                  <CDSFlex gap="xxs" align="center">
                    <CDSHeading size="section">Issues</CDSHeading>
                    <CDSText size="xxs" color="light">needs attention</CDSText>
                    <div style={{ flex: 1 }} />
                    <WarningIcon
                      size={32}
                      style={{
                        color: failedCount > 0
                          ? 'var(--negative-icon-default)'
                          : 'var(--interact-icon-weak-default)',
                      }}
                    />
                  </CDSFlex>
                </CDSFlex>
                <CDSFlex gap="sm">
                  <CDSFlex direction="vertical" style={{ background: 'var(--base-bg-default)', flex: 1, padding: 10, borderRadius: 8 }}>
                    <CDSHeading size="lg">{failedCount}</CDSHeading>
                    <CDSFlex gap="xxs" align="center">
                      <CDSText weight="semi-bold">Failed</CDSText>
                      <CDSStatusIcon size={18} status={failedCount > 0 ? 'negative' : 'neutral'} />
                    </CDSFlex>
                  </CDSFlex>
                  <CDSFlex direction="vertical" style={{ background: 'var(--base-bg-default)', flex: 1, padding: 10, borderRadius: 8 }}>
                    <CDSHeading size="lg">{totalErrorCount}</CDSHeading>
                    <CDSFlex gap="xxs" align="center">
                      <CDSText weight="semi-bold">Errors</CDSText>
                      <CDSStatusIcon size={18} status={totalErrorCount > 0 ? 'negative' : 'neutral'} />
                    </CDSFlex>
                  </CDSFlex>
                </CDSFlex>
              </CDSFlex>
            </CDSCard>
          </CDSFlex>

          {/* Active Cisco Apps — table ─────────────────────────────────── */}
          <CDSFlex direction="vertical" gap={10}>
            <CDSFlex align="center" gap={8}>
              <CDSHeading size="section">Active Cisco Apps</CDSHeading>
              <CDSTag sentiment="info" size="sm">{activeCiscoApps.length} active</CDSTag>
            </CDSFlex>
            <CDSTable
              columns={ciscoTableColumns}
              data={activeCiscoApps}
              density="compact"
            />
          </CDSFlex>

          <CDSDivider aria-hidden="true" />

          {/* Connected Integrations — table ────────────────────────────── */}
          <CDSFlex direction="vertical" gap={10}>
            <CDSFlex align="center" gap={8}>
              <CDSHeading size="section">Connected Integrations</CDSHeading>
              <CDSTag sentiment="neutral" size="sm">{activeConnections.length} active</CDSTag>
              {failedCount > 0 && (
                <CDSTag sentiment="negative" size="sm">
                  {failedCount} failed — click View Issues for details
                </CDSTag>
              )}
            </CDSFlex>
            <CDSTable
              columns={integrationColumns}
              data={sortedIntegrations}
              density="compact"
            />
          </CDSFlex>
        </CDSFlex>
      )}

      <CDSFooter brandName="Cisco Systems, Inc." />

      {/* ── Issue details drawer ─────────────────────────────────────────── */}
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
                  background: selectedIntegration.logoColor,
                  flexShrink: 0,
                }}
              >
                <CDSText
                  weight="semi-bold"
                  style={{ color: '#ffffff', fontSize: '14px', lineHeight: 1 }}
                >
                  {selectedIntegration.logoInitials}
                </CDSText>
              </CDSFlex>
              <CDSFlex direction="vertical" gap={4} style={{ flex: 1 }}>
                <CDSHeading size="section">{selectedIntegration.name}</CDSHeading>
                <CDSText color="light">{selectedIntegration.vendor}</CDSText>
              </CDSFlex>
              <CDSTag sentiment="negative" size="sm">Failed</CDSTag>
            </CDSFlex>

            {/* Metadata row */}
            <CDSFlex gap={16} wrap="wrap">
              <CDSFlex direction="vertical" gap={4}>
                <CDSText size="xs" color="light">Data source</CDSText>
                <CDSTag sentiment="info" size="sm">
                  {PLATFORM_LABELS[selectedIntegration.source as PlatformKey]}
                </CDSTag>
              </CDSFlex>
              <CDSFlex direction="vertical" gap={4}>
                <CDSText size="xs" color="light">Category</CDSText>
                <CDSTag sentiment="neutral" size="sm">
                  {CATEGORY_LABELS[selectedIntegration.category]}
                </CDSTag>
              </CDSFlex>
              <CDSFlex direction="vertical" gap={4}>
                <CDSText size="xs" color="light">Added</CDSText>
                <CDSText size="xs">{selectedIntegration.addedAt}</CDSText>
              </CDSFlex>
            </CDSFlex>

            <CDSText color="light">{selectedIntegration.description}</CDSText>

            <CDSDivider aria-hidden="true" />

            {/* Platform-by-platform breakdown */}
            <CDSFlex direction="vertical" gap={12}>
              <CDSHeading size="sub-section">Platform Status</CDSHeading>
              <CDSText size="xs" color="light">
                Status reported by each connected Cisco platform.
              </CDSText>

              {(Object.entries(selectedIntegration.platforms) as [PlatformKey, NonNullable<(typeof selectedIntegration.platforms)[PlatformKey]>][]).map(
                ([platform, health]) => (
                  <CDSCard
                    key={platform}
                    aria-label={`${PLATFORM_LABELS[platform]} platform status`}
                    status={health.status === 'failed' ? 'negative' : toCardStatus(health.status as OverallStatus)}
                  >
                    <CDSFlex direction="vertical" gap={8}>
                      {/* Platform name + status */}
                      <CDSFlex align="center" gap={8}>
                        <CDSTag sentiment="info" size="sm">
                          {PLATFORM_LABELS[platform]}
                        </CDSTag>
                        <CDSFlex align="center" gap={4}>
                          <CDSStatusIcon size={12} status={toIconStatus(health.status)} />
                          <CDSText size="xs" weight="semi-bold">
                            {STATUS_LABELS[health.status]}
                          </CDSText>
                        </CDSFlex>
                        <div style={{ flex: 1 }} />
                        {health.lastSynced && (
                          <CDSText size="xs" color="light">
                            Synced: {health.lastSynced}
                          </CDSText>
                        )}
                      </CDSFlex>

                      {/* Error details */}
                      {health.errorMessage && (
                        <CDSFlex gap={6} align="center">
                          <WarningIcon
                            size={13}
                            style={{ color: 'var(--negative-icon-default)', flexShrink: 0 }}
                          />
                          <CDSText size="xs" color="light">
                            {health.errorMessage}
                            {health.errorCount ? ` — ${health.errorCount} error${health.errorCount > 1 ? 's' : ''}` : ''}
                          </CDSText>
                        </CDSFlex>
                      )}
                    </CDSFlex>
                  </CDSCard>
                ),
              )}
            </CDSFlex>
          </CDSFlex>
        )}
      </CDSDrawer>
    </CDSFlex>
  );
}
