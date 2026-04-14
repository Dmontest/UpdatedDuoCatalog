import { useState } from 'react';
import type { ReactNode } from 'react';
import {
  ShieldCheckIcon,
  KeyIcon,
  CloudIcon,
  EyeIcon,
  ArrowSquareOutIcon,
  PlusCircleIcon,
  MagnifyingGlassIcon,
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
import { catalogItems, CATEGORY_LABELS } from '../data/integrations';

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

const ciscoApps: CiscoApp[] = [
  {
    id: 'scc',
    name: 'Security Cloud Control',
    abbr: 'SCC',
    description:
      'Unified security policy management and automated threat response across your entire Cisco security portfolio.',
    category: 'Security Management',
    userCount: '1,240',
    isActive: true,
    icon: <ShieldCheckIcon size={28} weight="duotone" />,
  },
  {
    id: 'duo',
    name: 'Cisco Duo',
    abbr: 'DUO',
    description:
      'Zero-trust multi-factor authentication and secure access for every user, device, and application.',
    category: 'Identity & Access',
    userCount: '3,800',
    isActive: true,
    icon: <KeyIcon size={28} weight="duotone" />,
  },
  {
    id: 'sse',
    name: 'Secure Service Edge',
    abbr: 'SSE',
    description:
      'Cloud-delivered network security combining ZTNA, CASB, SWG, and firewall-as-a-service in one unified platform.',
    category: 'Network Security',
    userCount: '875',
    isActive: true,
    icon: <CloudIcon size={28} weight="duotone" />,
  },
  {
    id: 'cii',
    name: 'Cloud Identity Intelligence',
    abbr: 'CII',
    description:
      'AI-powered identity threat detection and risky user behavior analytics across your cloud environment.',
    category: 'Identity Intelligence',
    userCount: '620',
    isActive: false,
    icon: <EyeIcon size={28} weight="duotone" />,
  },
];

type AppFilter = 'all' | 'cisco' | 'third-party';

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

export function AppHubPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<AppFilter>('all');

  const allApps: UnifiedApp[] = [
    ...ciscoApps.map((app) => ({
      id: app.id,
      name: app.name,
      vendor: 'Cisco',
      description: app.description,
      category: app.category,
      logoInitials: app.abbr,
      logoColor: null,
      type: 'cisco' as const,
      isActive: app.isActive,
    })),
    ...catalogItems.map((item) => ({
      id: item.id,
      name: item.name,
      vendor: item.vendor,
      description: item.description,
      category: CATEGORY_LABELS[item.category],
      logoInitials: item.logoInitials,
      logoColor: item.logoColor,
      type: 'third-party' as const,
      isActive: item.isAdded,
    })),
  ];

  const filteredApps = allApps.filter((app) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      app.name.toLowerCase().includes(q) ||
      app.vendor.toLowerCase().includes(q) ||
      app.category.toLowerCase().includes(q);
    const matchesFilter =
      activeFilter === 'all' ||
      (activeFilter === 'cisco' && app.type === 'cisco') ||
      (activeFilter === 'third-party' && app.type === 'third-party');
    return matchesSearch && matchesFilter;
  });

  const ciscoCount = allApps.filter((a) => a.type === 'cisco').length;
  const thirdPartyCount = allApps.filter((a) => a.type === 'third-party').length;

  return (
    <CDSFlex direction="vertical" gap={32} margin={24}>
      {/* Page header */}
      <CDSFlex direction="vertical" gap={6}>
        <CDSHeading size="primary">Application Hub</CDSHeading>
        <CDSText color="light">
          Discover and launch your Cisco and third-party applications from one place.
        </CDSText>
      </CDSFlex>

      {/* ── Cisco Applications ─────────────────────────────────── */}
      <CDSFlex direction="vertical" gap={16}>
        <CDSFlex direction="vertical" gap={4}>
          <CDSFlex align="center" gap={8}>
            <CDSHeading size="section">Cisco Applications</CDSHeading>
            <CDSTag sentiment="info" size="sm">
              {ciscoApps.length} apps
            </CDSTag>
          </CDSFlex>
          <CDSText color="light">Your licensed Cisco platform products.</CDSText>
        </CDSFlex>

        {/* Featured Cisco cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 16,
          }}
        >
          {ciscoApps.map((app) => (
            <CDSCard
              key={app.id}
              aria-label={`${app.name} application`}
              status="info"
              style={{ minHeight: 200 }}
            >
              <CDSFlex direction="vertical" gap={16} style={{ height: '100%' }}>
                {/* Icon + name header */}
                <CDSFlex gap={12} align="center">
                  <CDSFlex
                    align="center"
                    style={{
                      justifyContent: 'center',
                      width: 52,
                      height: 52,
                      borderRadius: 12,
                      background: 'var(--interact-bg-subtle-default)',
                      flexShrink: 0,
                      color: 'var(--interact-icon-default)',
                    }}
                  >
                    {app.icon}
                  </CDSFlex>
                  <CDSFlex direction="vertical" gap={2}>
                    <CDSFlex align="center" gap={6}>
                      <CDSHeading size="sub-section">{app.name}</CDSHeading>
                      <CDSTag sentiment="info" size="sm">
                        Cisco
                      </CDSTag>
                    </CDSFlex>
                    <CDSText size="xs" color="light">
                      {app.category}
                    </CDSText>
                  </CDSFlex>
                </CDSFlex>

                {/* Description */}
                <CDSText color="light" style={{ flex: 1, lineHeight: 1.5 }}>
                  {app.description}
                </CDSText>

                {/* Status + action */}
                <CDSFlex
                  align="center"
                  style={{ justifyContent: 'space-between' }}
                >
                  <CDSFlex align="center" gap={6}>
                    <CDSStatusIcon
                      size={14}
                      status={app.isActive ? 'positive' : 'neutral'}
                    />
                    <CDSText size="xs" color="light">
                      {app.isActive ? `${app.userCount} active users` : 'Not active'}
                    </CDSText>
                  </CDSFlex>
                  <CDSButton
                    size="sm"
                    variant="secondary"
                    rightIcon={<ArrowSquareOutIcon size={14} weight="bold" />}
                  >
                    Open
                  </CDSButton>
                </CDSFlex>
              </CDSFlex>
            </CDSCard>
          ))}
        </div>
      </CDSFlex>

      <CDSDivider aria-hidden="true" />

      {/* ── All Applications ───────────────────────────────────── */}
      <CDSFlex direction="vertical" gap={16}>
        <CDSFlex direction="vertical" gap={4}>
          <CDSHeading size="section">All Applications</CDSHeading>
          <CDSText color="light">
            Browse all Cisco and third-party applications available to your organization.
          </CDSText>
        </CDSFlex>

        {/* Search + filter bar */}
        <CDSFlex gap={12} align="center" wrap="wrap">
          <CDSFlex style={{ flex: 1, minWidth: 240 }}>
            <CDSTextInput
              placeholder="Search by name, vendor, or category…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              clearable
              prefix={<MagnifyingGlassIcon size={16} />}
            />
          </CDSFlex>

          <CDSFlex gap={6} align="center">
            <CDSText size="xs" color="light">
              Filter:
            </CDSText>
            <CDSButton
              size="sm"
              variant={activeFilter === 'all' ? 'secondary' : 'tertiary'}
              onClick={() => setActiveFilter('all')}
            >
              All ({allApps.length})
            </CDSButton>
            <CDSButton
              size="sm"
              variant={activeFilter === 'cisco' ? 'secondary' : 'tertiary'}
              onClick={() => setActiveFilter('cisco')}
            >
              Cisco ({ciscoCount})
            </CDSButton>
            <CDSButton
              size="sm"
              variant={activeFilter === 'third-party' ? 'secondary' : 'tertiary'}
              onClick={() => setActiveFilter('third-party')}
            >
              Third-Party ({thirdPartyCount})
            </CDSButton>
          </CDSFlex>
        </CDSFlex>

        {/* Results count */}
        <CDSText size="xs" color="light">
          Showing {filteredApps.length} of {allApps.length} applications
        </CDSText>

        {/* All apps grid */}
        {filteredApps.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
              gap: 16,
            }}
          >
            {filteredApps.map((app) => (
              <CDSCard
                key={`all-${app.id}`}
                aria-label={app.name}
              >
                <CDSFlex direction="vertical" gap={12} style={{ height: '100%' }}>
                  {/* Logo + name */}
                  <CDSFlex gap={10} align="center">
                    <CDSFlex
                      align="center"
                      style={{
                        justifyContent: 'center',
                        width: 40,
                        height: 40,
                        borderRadius: 8,
                        background: app.logoColor ?? 'var(--interact-bg-default)',
                        flexShrink: 0,
                      }}
                    >
                      <CDSText
                        weight="semi-bold"
                        style={{ color: '#ffffff', fontSize: '12px', lineHeight: 1 }}
                      >
                        {app.logoInitials}
                      </CDSText>
                    </CDSFlex>
                    <CDSFlex direction="vertical" gap={2} style={{ flex: 1, minWidth: 0 }}>
                      <CDSHeading size="sub-section">{app.name}</CDSHeading>
                      <CDSText size="xs" color="light">
                        {app.vendor}
                      </CDSText>
                    </CDSFlex>
                  </CDSFlex>

                  {/* Type + category tags */}
                  <CDSFlex gap={6} wrap="wrap">
                    <CDSTag
                      sentiment={app.type === 'cisco' ? 'info' : 'neutral'}
                      size="sm"
                    >
                      {app.type === 'cisco' ? 'Cisco' : 'Third-Party'}
                    </CDSTag>
                    <CDSTag sentiment="neutral" size="sm">
                      {app.category}
                    </CDSTag>
                  </CDSFlex>

                  {/* Description (capped to 2 lines via maxHeight) */}
                  <CDSText
                    size="xs"
                    color="light"
                    style={{
                      flex: 1,
                      overflow: 'hidden',
                      maxHeight: '2.6em',
                      lineHeight: '1.3em',
                    }}
                  >
                    {app.description}
                  </CDSText>

                  {/* Status + action */}
                  <CDSFlex align="center" style={{ justifyContent: 'space-between' }}>
                    <CDSFlex align="center" gap={4}>
                      <CDSStatusIcon
                        size={12}
                        status={app.isActive ? 'positive' : 'neutral'}
                      />
                      <CDSText size="xs" color="light">
                        {app.isActive ? 'Active' : 'Not connected'}
                      </CDSText>
                    </CDSFlex>
                    <CDSButton
                      size="sm"
                      variant={app.isActive ? 'secondary' : 'primary'}
                      icon={
                        app.isActive ? undefined : (
                          <PlusCircleIcon size={14} weight="bold" />
                        )
                      }
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
            style={{ padding: '48px 0', textAlign: 'center' }}
          >
            <CDSHeading size="sub-section">No applications found</CDSHeading>
            <CDSText color="light">Try adjusting your search or filter.</CDSText>
            <CDSButton
              variant="secondary"
              onClick={() => {
                setSearchQuery('');
                setActiveFilter('all');
              }}
            >
              Clear filters
            </CDSButton>
          </CDSFlex>
        )}
      </CDSFlex>

      <CDSFooter brandName="Cisco Systems, Inc." />
    </CDSFlex>
  );
}
