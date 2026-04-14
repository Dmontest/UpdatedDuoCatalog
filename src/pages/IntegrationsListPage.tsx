import { useState, useMemo } from 'react';
import type React from 'react';
import { ArrowsClockwiseIcon, WarningIcon } from '@phosphor-icons/react';
import { CDSButton } from '@ciscodesignsystems/cds-react-button';
import { CDSCard } from '@ciscodesignsystems/cds-react-card';
import { CDSContainer } from '@ciscodesignsystems/cds-react-container';
import { CDSDrawer } from '@ciscodesignsystems/cds-react-drawer';
import { CDSDivider } from '@ciscodesignsystems/cds-react-divider';
import { CDSFlex } from '@ciscodesignsystems/cds-react-flex';
import { CDSFooter } from '@ciscodesignsystems/cds-react-footer';
import { CDSHeading } from '@ciscodesignsystems/cds-react-heading';
import { CDSStatusIcon } from '@ciscodesignsystems/cds-react-icons';
import { CDSTable } from '@ciscodesignsystems/cds-react-table';
// React 19 + forwardRef type incompatibility — same workaround as DashboardPage build cache
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const IntegrationTable = CDSTable as React.ComponentType<any> & { FilterBar: typeof CDSTable.FilterBar };
import { CDSTag } from '@ciscodesignsystems/cds-react-tag';
import { CDSText } from '@ciscodesignsystems/cds-react-text';
import { CDSSelect } from '@ciscodesignsystems/cds-react-select';
import type { ColumnDef } from '@tanstack/react-table';
import {
  activeIntegrations,
  getOverallStatus,
  getLastSyncDisplay,
  CATEGORY_LABELS,
  PLATFORM_LABELS,
  STATUS_LABELS,
  type Integration,
  type IntegrationStatus,
  type PlatformKey,
} from '../data/integrations';

type Props = {
  onNavigateToCatalog: () => void;
};

const PLATFORMS: PlatformKey[] = ['scc', 'duo', 'sse', 'cii'];

const statusToIconStatus = (status: IntegrationStatus) => {
  switch (status) {
    case 'connected': return 'positive' as const;
    case 'connecting': return 'in-progress' as const;
    case 'failed': return 'negative' as const;
    case 'disabled': return 'dormant' as const;
  }
};

const statusToTagStatus = (status: IntegrationStatus) => {
  switch (status) {
    case 'connected': return 'positive' as const;
    case 'connecting': return 'in-progress' as const;
    case 'failed': return 'negative' as const;
    case 'disabled': return 'dormant' as const;
  }
};

const LogoBadge = ({ initials, color, size = 36 }: { initials: string; color: string; size?: number }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: 8,
      background: color,
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <CDSText size="p4" style={{ color: 'white', fontWeight: 700, letterSpacing: 0.5 }}>
      {initials}
    </CDSText>
  </div>
);

const PlatformCell = ({ integration, platform }: { integration: Integration; platform: PlatformKey }) => {
  const health = integration.platforms[platform];
  if (!health) {
    return (
      <CDSText size="p4" color="light" style={{ textAlign: 'center', display: 'block' }}>
        —
      </CDSText>
    );
  }
  return (
    <CDSFlex justify="center">
      <CDSStatusIcon size={18} status={statusToIconStatus(health.status)} hasBackground />
    </CDSFlex>
  );
};

const statusOptions = [
  { label: 'Connected', value: 'connected' },
  { label: 'Connecting', value: 'connecting' },
  { label: 'Failed', value: 'failed' },
  { label: 'Disabled', value: 'disabled' },
];

const categoryOptions = Object.entries(CATEGORY_LABELS).map(([value, label]) => ({ label, value }));

const sourceOptions = [
  { label: 'SCC Native', value: 'scc' },
  { label: 'via DUO', value: 'duo' },
];

export const IntegrationsListPage = ({ onNavigateToCatalog }: Props) => {
  const [integrations, setIntegrations] = useState<Integration[]>(activeIntegrations);
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sourceFilter, setSourceFilter] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedIntegration = integrations.find((i) => i.id === selectedId) ?? null;

  const openDrawer = (id: string) => {
    setSelectedId(id);
    setDrawerOpen(true);
  };

  const handleRetry = (id: string) => {
    setIntegrations((prev) =>
      prev.map((integration) => {
        if (integration.id !== id) return integration;
        const updatedPlatforms = { ...integration.platforms };
        for (const key of Object.keys(updatedPlatforms) as PlatformKey[]) {
          if (updatedPlatforms[key]?.status === 'failed') {
            updatedPlatforms[key] = { ...updatedPlatforms[key]!, status: 'connecting' };
          }
        }
        // Simulate reconnect after 3s
        setTimeout(() => {
          setIntegrations((prev2) =>
            prev2.map((i) => {
              if (i.id !== id) return i;
              const resolved = { ...i.platforms };
              for (const key of Object.keys(resolved) as PlatformKey[]) {
                if (resolved[key]?.status === 'connecting') {
                  resolved[key] = { ...resolved[key]!, status: 'connected', lastSynced: 'just now', errorMessage: undefined, errorCount: undefined };
                }
              }
              return { ...i, platforms: resolved };
            })
          );
        }, 3000);
        return { ...integration, platforms: updatedPlatforms };
      })
    );
  };

  const handleEnable = (id: string) => {
    setIntegrations((prev) =>
      prev.map((integration) => {
        if (integration.id !== id) return integration;
        const updatedPlatforms = { ...integration.platforms };
        for (const key of Object.keys(updatedPlatforms) as PlatformKey[]) {
          if (updatedPlatforms[key]?.status === 'disabled') {
            updatedPlatforms[key] = { ...updatedPlatforms[key]!, status: 'connecting' };
          }
        }
        setTimeout(() => {
          setIntegrations((prev2) =>
            prev2.map((i) => {
              if (i.id !== id) return i;
              const resolved = { ...i.platforms };
              for (const key of Object.keys(resolved) as PlatformKey[]) {
                if (resolved[key]?.status === 'connecting') {
                  resolved[key] = { ...resolved[key]!, status: 'connected', lastSynced: 'just now' };
                }
              }
              return { ...i, platforms: resolved };
            })
          );
        }, 3000);
        return { ...integration, platforms: updatedPlatforms };
      })
    );
  };

  const handleDisable = (id: string) => {
    setIntegrations((prev) =>
      prev.map((integration) => {
        if (integration.id !== id) return integration;
        const updatedPlatforms = { ...integration.platforms };
        for (const key of Object.keys(updatedPlatforms) as PlatformKey[]) {
          updatedPlatforms[key] = { ...updatedPlatforms[key]!, status: 'disabled' };
        }
        return { ...integration, platforms: updatedPlatforms };
      })
    );
    setDrawerOpen(false);
  };

  const statCounts = useMemo(() => {
    const counts = { connected: 0, connecting: 0, failed: 0, disabled: 0 };
    integrations.forEach((i) => counts[getOverallStatus(i)]++);
    return counts;
  }, [integrations]);

  const filteredIntegrations = useMemo(() => {
    return integrations.filter((i) => {
      if (statusFilter && getOverallStatus(i) !== statusFilter) return false;
      if (categoryFilter && i.category !== categoryFilter) return false;
      if (sourceFilter && i.source !== sourceFilter) return false;
      return true;
    });
  }, [integrations, statusFilter, categoryFilter, sourceFilter]);

  const hasFilters = !!(statusFilter || categoryFilter || sourceFilter);

  const columns = useMemo<ColumnDef<Integration>[]>(
    () => [
      {
        id: 'name',
        header: 'Integration',
        accessorFn: (row) => row.name,
        meta: { align: 'left' },
        cell: ({ row }) => (
          <CDSFlex gap="sm" align="center">
            <LogoBadge initials={row.original.logoInitials} color={row.original.logoColor} />
            <CDSFlex direction="vertical" gap={2}>
              <CDSText weight="semi-bold" size="p3">{row.original.name}</CDSText>
              <CDSText size="p4" color="light">{row.original.vendor}</CDSText>
            </CDSFlex>
          </CDSFlex>
        ),
      },
      {
        id: 'category',
        header: 'Type',
        accessorFn: (row) => CATEGORY_LABELS[row.category],
        meta: { align: 'left' },
      },
      {
        id: 'source',
        header: 'Source',
        meta: { align: 'left' },
        cell: ({ row }) => (
          <CDSTag size="sm" status={row.original.source === 'scc' ? 'positive' : 'info'}>
            {row.original.source === 'scc' ? 'SCC' : 'via DUO'}
          </CDSTag>
        ),
      },
      ...PLATFORMS.map((platform) => ({
        id: platform,
        header: PLATFORM_LABELS[platform],
        meta: { align: 'center' },
        enableSorting: false,
        cell: ({ row }: { row: { original: Integration } }) => (
          <PlatformCell integration={row.original} platform={platform} />
        ),
      })),
      {
        id: 'lastSync',
        header: 'Last Sync',
        accessorFn: (row) => getLastSyncDisplay(row),
        meta: { align: 'left' },
        enableSorting: false,
      },
      {
        id: 'actions',
        header: '',
        meta: { align: 'right' },
        enableSorting: false,
        cell: ({ row }) => {
          const integration = row.original;
          const statuses = Object.values(integration.platforms).map((p) => p.status);
          const hasFailed = statuses.some((s) => s === 'failed');
          const allDisabled = statuses.every((s) => s === 'disabled');
          const isConnecting = statuses.some((s) => s === 'connecting');

          if (hasFailed) {
            const failedKeys = Object.entries(integration.platforms)
              .filter(([, v]) => v.status === 'failed')
              .map(([k]) => PLATFORM_LABELS[k as PlatformKey]);
            return (
              <CDSButton size="sm" variant="secondary" onClick={() => handleRetry(integration.id)}>
                <ArrowsClockwiseIcon size={14} weight="bold" />
                {' '}Retry {failedKeys.length === 1 ? failedKeys[0] : `${failedKeys.length} platforms`}
              </CDSButton>
            );
          }
          if (allDisabled) {
            return (
              <CDSButton size="sm" variant="secondary" onClick={() => handleEnable(integration.id)}>
                Enable
              </CDSButton>
            );
          }
          if (isConnecting) {
            return <CDSText size="p4" color="light">Connecting...</CDSText>;
          }
          return (
            <CDSButton size="sm" variant="secondary" onClick={() => openDrawer(integration.id)}>
              View
            </CDSButton>
          );
        },
      },
    ],
    [integrations] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const statCards: { label: string; status: IntegrationStatus; iconStatus: 'positive' | 'in-progress' | 'negative' | 'dormant' }[] = [
    { label: 'Connected', status: 'connected', iconStatus: 'positive' },
    { label: 'Connecting', status: 'connecting', iconStatus: 'in-progress' },
    { label: 'Failed', status: 'failed', iconStatus: 'negative' },
    { label: 'Disabled', status: 'disabled', iconStatus: 'dormant' },
  ];

  return (
    <>
      <CDSFlex direction="vertical" gap={24} margin={24}>
        {/* Page header */}
        <CDSFlex justify="space-between" align="center">
          <CDSFlex direction="vertical" gap={4}>
            <CDSHeading size="primary">Integrations</CDSHeading>
            <CDSText color="light">SCC is the single source of truth for all platform integrations.</CDSText>
          </CDSFlex>
          <CDSButton onClick={onNavigateToCatalog}>Add Integration</CDSButton>
        </CDSFlex>

        {/* Stat cards */}
        <CDSFlex gap="md" wrap>
          {statCards.map(({ label, status, iconStatus }) => (
            <CDSCard
              key={status}
              aria-label={`${label} integrations`}
              style={{
                flex: '1 1 160px',
                cursor: 'pointer',
                outline: statusFilter === status ? '2px solid var(--interact-border-default)' : undefined,
              }}
              onClick={() => setStatusFilter(statusFilter === status ? '' : status)}
            >
              <CDSFlex direction="vertical" grow gap="sm">
                <CDSFlex align="center" justify="space-between">
                  <CDSHeading size="section">{label}</CDSHeading>
                  <CDSStatusIcon size={20} status={iconStatus} hasBackground />
                </CDSFlex>
                <CDSHeading size="lg">{statCounts[status]}</CDSHeading>
                <CDSText size="p4" color="light">
                  {statCounts[status] === 1 ? 'integration' : 'integrations'}
                </CDSText>
              </CDSFlex>
            </CDSCard>
          ))}
        </CDSFlex>

        {/* Filters */}
        <CDSFlex gap="md" align="flex-end" wrap>
          <CDSFlex direction="vertical" gap={4} style={{ minWidth: 180 }}>
            <CDSSelect
              placeholder="All Statuses"
              options={statusOptions}
              clearable
              value={statusFilter || undefined}
              onChange={(v) => setStatusFilter((v as unknown as string) ?? '')}
              onClear={() => setStatusFilter('')}
            />
          </CDSFlex>
          <CDSFlex direction="vertical" gap={4} style={{ minWidth: 180 }}>
            <CDSSelect
              placeholder="All Types"
              options={categoryOptions}
              clearable
              value={categoryFilter || undefined}
              onChange={(v) => setCategoryFilter((v as unknown as string) ?? '')}
              onClear={() => setCategoryFilter('')}
            />
          </CDSFlex>
          <CDSFlex direction="vertical" gap={4} style={{ minWidth: 160 }}>
            <CDSSelect
              placeholder="All Sources"
              options={sourceOptions}
              clearable
              value={sourceFilter || undefined}
              onChange={(v) => setSourceFilter((v as unknown as string) ?? '')}
              onClear={() => setSourceFilter('')}
            />
          </CDSFlex>
          {hasFilters && (
            <CDSButton
              variant="tertiary"
              size="sm"
              onClick={() => { setStatusFilter(''); setCategoryFilter(''); setSourceFilter(''); }}
            >
              Clear filters
            </CDSButton>
          )}
        </CDSFlex>

        {/* Table */}
        <CDSContainer>
          <IntegrationTable
            columns={columns}
            data={filteredIntegrations}
            density="compact"
            pagination
            paginationConfig={{ pageSize: 10, pageSizeOptions: [10, 25, 50], showPageSizeChanger: true }}
          >
            <IntegrationTable.FilterBar showSearch searchPlaceholderText="Search integrations..." />
          </IntegrationTable>
        </CDSContainer>

        <CDSFooter brandName="Cisco Systems, Inc." />
      </CDSFlex>

      {/* Detail drawer */}
      <CDSDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        size="md"
        openBelowHeader
        isDismissible
      >
        {selectedIntegration && (
          <>
            <CDSDrawer.Heading>{selectedIntegration.name}</CDSDrawer.Heading>

            <CDSDrawer.Content>
              <CDSFlex direction="vertical" gap={16}>
                {/* Integration identity row */}
                <CDSFlex gap="sm" align="center">
                  <LogoBadge
                    initials={selectedIntegration.logoInitials}
                    color={selectedIntegration.logoColor}
                    size={40}
                  />
                  <CDSFlex direction="vertical" gap={2} style={{ flex: 1 }}>
                    <CDSText weight="semi-bold">{selectedIntegration.vendor}</CDSText>
                    <CDSText size="p4" color="light">
                      {CATEGORY_LABELS[selectedIntegration.category]}
                    </CDSText>
                  </CDSFlex>
                  <CDSTag
                    size="sm"
                    status={selectedIntegration.source === 'scc' ? 'positive' : 'info'}
                  >
                    {selectedIntegration.source === 'scc' ? 'SCC Native' : 'via DUO'}
                  </CDSTag>
                </CDSFlex>

                <CDSText color="light">{selectedIntegration.description}</CDSText>

                <CDSDivider />

                <CDSHeading size="sub-section">Platform Health</CDSHeading>

                {(Object.entries(selectedIntegration.platforms) as [PlatformKey, typeof selectedIntegration.platforms[PlatformKey]][]).map(([key, health]) => {
                  if (!health) return null;
                  return (
                    <CDSFlex key={key} direction="vertical" gap={8}>
                      <CDSFlex justify="space-between" align="center">
                        <CDSFlex gap="sm" align="center">
                          <CDSStatusIcon
                            size={16}
                            status={statusToIconStatus(health.status)}
                            hasBackground
                          />
                          <CDSText weight="semi-bold">{PLATFORM_LABELS[key]}</CDSText>
                        </CDSFlex>
                        <CDSTag size="sm" status={statusToTagStatus(health.status)}>
                          {STATUS_LABELS[health.status]}
                        </CDSTag>
                      </CDSFlex>

                      {health.lastSynced && (
                        <CDSText size="p4" color="light" style={{ paddingLeft: 28 }}>
                          Last synced: {health.lastSynced}
                        </CDSText>
                      )}

                      {health.errorMessage && (
                        <CDSCard
                          style={{
                            background: 'var(--negative-bg-weak-default)',
                            borderColor: 'var(--negative-border-default)',
                            marginLeft: 28,
                          }}
                        >
                          <CDSFlex direction="vertical" gap="xs">
                            <CDSFlex gap="xs" align="center">
                              <WarningIcon size={14} weight="bold" color="var(--negative-icon-default)" />
                              <CDSText size="p4" weight="semi-bold" style={{ color: 'var(--negative-text-default)' }}>
                                Error
                                {health.errorCount && health.errorCount > 1
                                  ? ` · ${health.errorCount}x in last hour`
                                  : ''}
                              </CDSText>
                            </CDSFlex>
                            <CDSText size="p4" color="light">{health.errorMessage}</CDSText>
                            <CDSButton
                              size="sm"
                              variant="secondary"
                              onClick={() => {
                                handleRetry(selectedIntegration.id);
                                setDrawerOpen(false);
                              }}
                            >
                              <ArrowsClockwiseIcon size={14} weight="bold" /> Retry {PLATFORM_LABELS[key]}
                            </CDSButton>
                          </CDSFlex>
                        </CDSCard>
                      )}

                      <CDSDivider />
                    </CDSFlex>
                  );
                })}

                <CDSFlex direction="vertical" gap={4}>
                  <CDSText size="p4" color="light">
                    Category: {CATEGORY_LABELS[selectedIntegration.category]}
                  </CDSText>
                  <CDSText size="p4" color="light">
                    Added: {selectedIntegration.addedAt}
                  </CDSText>
                </CDSFlex>
              </CDSFlex>
            </CDSDrawer.Content>

            <CDSDrawer.Footer>
              <CDSButton
                variant="secondary"
                onClick={() => handleDisable(selectedIntegration.id)}
              >
                Disable
              </CDSButton>
              <CDSButton>Configure</CDSButton>
            </CDSDrawer.Footer>
          </>
        )}
      </CDSDrawer>
    </>
  );
};
