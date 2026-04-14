import { useState, useMemo } from 'react';
import {
  ArrowLeftIcon,
  CheckCircleIcon,
  PlusIcon,
  ShieldCheckIcon,
  WarningIcon,
} from '@phosphor-icons/react';
import { CDSButton } from '@ciscodesignsystems/cds-react-button';
import { CDSCard } from '@ciscodesignsystems/cds-react-card';
import { CDSCheckbox } from '@ciscodesignsystems/cds-react-checkbox';
import { CDSDrawer } from '@ciscodesignsystems/cds-react-drawer';
import { CDSDivider } from '@ciscodesignsystems/cds-react-divider';
import { CDSFlex } from '@ciscodesignsystems/cds-react-flex';
import { CDSFooter } from '@ciscodesignsystems/cds-react-footer';
import { CDSHeading } from '@ciscodesignsystems/cds-react-heading';
import { CDSStatusIcon } from '@ciscodesignsystems/cds-react-icons';
import { CDSSelect } from '@ciscodesignsystems/cds-react-select';
import { CDSStepper } from '@ciscodesignsystems/cds-react-stepper';
import { CDSSpinner } from '@ciscodesignsystems/cds-react-spinner';
import { CDSTag } from '@ciscodesignsystems/cds-react-tag';
import { CDSText } from '@ciscodesignsystems/cds-react-text';
import { CDSTextInput } from '@ciscodesignsystems/cds-react-text-input';
import {
  catalogItems,
  CATEGORY_LABELS,
  PLATFORM_LABELS,
  type CatalogItem,
  type PlatformKey,
} from '../data/integrations';

type Props = {
  onNavigateToList: () => void;
};

type ConnectState = 'idle' | 'connecting' | 'connected' | 'failed';
type ConnectStatusMap = Partial<Record<PlatformKey, ConnectState>>;

const categoryOptions = Object.entries(CATEGORY_LABELS).map(([value, label]) => ({ label, value }));
const sourceOptions = [
  { label: 'SCC Native', value: 'scc' },
  { label: 'via DUO', value: 'duo' },
];

const LogoBadge = ({ initials, color, size = 40 }: { initials: string; color: string; size?: number }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: 10,
      background: color,
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <CDSText size="p3" style={{ color: 'white', fontWeight: 700, letterSpacing: 0.5 }}>
      {initials}
    </CDSText>
  </div>
);

// ─── Catalog Card ─────────────────────────────────────────────────────────────

const CatalogCard = ({
  item,
  isAdded,
  onAdd,
  onViewDetails,
}: {
  item: CatalogItem;
  isAdded: boolean;
  onAdd: (item: CatalogItem) => void;
  onViewDetails: (item: CatalogItem) => void;
}) => (
  <CDSCard style={{ flex: '1 1 280px', maxWidth: 360, display: 'flex', flexDirection: 'column' }}>
    <CDSFlex direction="vertical" grow gap="md">
      {/* Header row */}
      <CDSFlex justify="space-between" align="flex-start">
        <LogoBadge initials={item.logoInitials} color={item.logoColor} />
        <CDSFlex gap="xs">
          <CDSTag size="sm" status="info">
            {CATEGORY_LABELS[item.category]}
          </CDSTag>
          {item.source === 'duo' && (
            <CDSTag size="sm" status="info">
              via DUO
            </CDSTag>
          )}
        </CDSFlex>
      </CDSFlex>

      {/* Name + vendor */}
      <CDSFlex direction="vertical" gap={2}>
        <CDSText weight="semi-bold">{item.name}</CDSText>
        <CDSText size="p4" color="light">{item.vendor}</CDSText>
      </CDSFlex>

      {/* Description */}
      <CDSText size="p4" color="light" style={{ flexGrow: 1, lineHeight: 1.5 }}>
        {item.description}
      </CDSText>

      {/* Compatible platforms */}
      <CDSFlex gap="xs" wrap>
        {item.compatiblePlatforms.map((p) => (
          <CDSTag key={p} size="sm" status="info">
            {PLATFORM_LABELS[p]}
          </CDSTag>
        ))}
      </CDSFlex>

      <CDSDivider />

      {/* Actions */}
      <CDSFlex justify="space-between" align="center">
        <CDSButton variant="tertiary" size="sm" onClick={() => onViewDetails(item)}>
          Details
        </CDSButton>
        {isAdded ? (
          <CDSFlex gap="xs" align="center">
            <CheckCircleIcon size={16} weight="bold" color="var(--positive-icon-default)" />
            <CDSText size="p4" style={{ color: 'var(--positive-text-default)' }}>
              Added
            </CDSText>
          </CDSFlex>
        ) : (
          <CDSButton size="sm" onClick={() => onAdd(item)}>
            <PlusIcon size={14} weight="bold" /> Add
          </CDSButton>
        )}
      </CDSFlex>
    </CDSFlex>
  </CDSCard>
);

// ─── Add Integration Wizard ───────────────────────────────────────────────────

const AddIntegrationWizard = ({
  item,
  onComplete,
  onCancel,
}: {
  item: CatalogItem;
  onComplete: () => void;
  onCancel: () => void;
}) => {
  const [stepperExpanded, setStepperExpanded] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPlatforms, setSelectedPlatforms] = useState<PlatformKey[]>(item.compatiblePlatforms);
  const [apiKey, setApiKey] = useState('');
  const [apiEndpoint, setApiEndpoint] = useState('');
  const [connectStatus, setConnectStatus] = useState<ConnectStatusMap>({});

  const steps = [
    { title: 'Platforms', description: 'Select target platforms' },
    { title: 'Auth', description: 'Enter credentials' },
    { title: 'Review', description: 'Confirm setup' },
    { title: 'Connect', description: 'Connecting platforms' },
  ];

  const allResolved =
    currentStep === 4 &&
    selectedPlatforms.length > 0 &&
    selectedPlatforms.every((p) => connectStatus[p] === 'connected' || connectStatus[p] === 'failed');

  const togglePlatform = (platform: PlatformKey) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform) ? prev.filter((p) => p !== platform) : [...prev, platform]
    );
  };

  const handlePrimaryAction = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
      return;
    }
    if (currentStep === 3) {
      // Start connecting simulation
      setCurrentStep(4);
      const initial: ConnectStatusMap = {};
      selectedPlatforms.forEach((p) => { initial[p] = 'idle'; });
      setConnectStatus(initial);

      let delay = 400;
      selectedPlatforms.forEach((platform) => {
        const startDelay = delay;
        setTimeout(() => setConnectStatus((prev) => ({ ...prev, [platform]: 'connecting' })), startDelay);
        setTimeout(() => setConnectStatus((prev) => ({ ...prev, [platform]: 'connected' })), startDelay + 1400);
        delay += 1600;
      });
      return;
    }
    if (currentStep === 4 && allResolved) {
      onComplete();
    }
  };

  const handleBack = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const primaryCta =
    currentStep === 3
      ? 'Connect'
      : currentStep === 4
      ? allResolved
        ? 'Done'
        : 'Connecting...'
      : 'Next';

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <CDSFlex direction="vertical" gap={24}>
            <CDSFlex direction="vertical" gap={8}>
              <CDSHeading size="sub-section">Select Platforms</CDSHeading>
              <CDSText color="light">
                Choose which platforms this integration will connect to. SCC is always included as the source of truth.
              </CDSText>
            </CDSFlex>
            <CDSFlex direction="vertical" gap={12}>
              {item.compatiblePlatforms.map((platform) => (
                <CDSCard key={platform} style={{ padding: '12px 16px' }}>
                  <CDSFlex gap="md" align="center">
                    <CDSCheckbox
                      id={`platform-${platform}`}
                      checked={selectedPlatforms.includes(platform)}
                      onChange={() => togglePlatform(platform)}
                    >
                      <CDSFlex direction="vertical" gap={2}>
                        <CDSText weight="semi-bold">{PLATFORM_LABELS[platform]}</CDSText>
                        <CDSText size="p4" color="light">
                          {platform === 'scc' && 'Security Cloud Control — source of truth'}
                          {platform === 'duo' && 'DUO Identity & Access platform'}
                          {platform === 'sse' && 'Secure Access SSE'}
                          {platform === 'cii' && 'Cisco Intelligence Infrastructure'}
                        </CDSText>
                      </CDSFlex>
                    </CDSCheckbox>
                  </CDSFlex>
                </CDSCard>
              ))}
            </CDSFlex>
            {selectedPlatforms.length === 0 && (
              <CDSFlex gap="xs" align="center">
                <WarningIcon size={14} weight="bold" color="var(--warning-icon-default)" />
                <CDSText size="p4" style={{ color: 'var(--warning-text-default)' }}>
                  Select at least one platform to continue.
                </CDSText>
              </CDSFlex>
            )}
          </CDSFlex>
        );

      case 2:
        return (
          <CDSFlex direction="vertical" gap={24}>
            <CDSFlex direction="vertical" gap={8}>
              <CDSHeading size="sub-section">Credentials</CDSHeading>
              <CDSText color="light">
                Enter the API credentials for {item.name}. These are stored securely in SCC and pushed to selected platforms.
              </CDSText>
            </CDSFlex>
            <CDSFlex direction="vertical" gap={16}>
              <CDSTextInput
                label="API Key"
                placeholder="Enter your API key..."
                value={apiKey}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setApiKey(e.target.value)}
                type="password"
              />
              <CDSTextInput
                label="API Endpoint"
                placeholder="https://your-instance.example.com"
                value={apiEndpoint}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setApiEndpoint(e.target.value)}
              />
            </CDSFlex>
            {item.prerequisites && item.prerequisites.length > 0 && (
              <CDSCard style={{ background: 'var(--base-bg-weak-default)' }}>
                <CDSFlex direction="vertical" gap={8}>
                  <CDSText size="p4" weight="semi-bold">Prerequisites</CDSText>
                  {item.prerequisites.map((req, i) => (
                    <CDSFlex key={i} gap="xs" align="center">
                      <CDSText size="p4" color="light">• {req}</CDSText>
                    </CDSFlex>
                  ))}
                </CDSFlex>
              </CDSCard>
            )}
          </CDSFlex>
        );

      case 3:
        return (
          <CDSFlex direction="vertical" gap={24}>
            <CDSFlex direction="vertical" gap={8}>
              <CDSHeading size="sub-section">Review & Connect</CDSHeading>
              <CDSText color="light">
                Review your configuration before connecting. SCC will push settings to each selected platform.
              </CDSText>
            </CDSFlex>
            <CDSFlex direction="vertical" gap={12}>
              <CDSCard>
                <CDSFlex direction="vertical" gap={12}>
                  <CDSFlex gap="sm" align="center">
                    <LogoBadge initials={item.logoInitials} color={item.logoColor} size={32} />
                    <CDSFlex direction="vertical" gap={2}>
                      <CDSText weight="semi-bold">{item.name}</CDSText>
                      <CDSText size="p4" color="light">{item.vendor}</CDSText>
                    </CDSFlex>
                  </CDSFlex>
                  <CDSDivider />
                  <CDSFlex direction="vertical" gap={6}>
                    <CDSText size="p4" weight="semi-bold">Connecting to:</CDSText>
                    <CDSFlex gap="xs" wrap>
                      {selectedPlatforms.map((p) => (
                        <CDSTag key={p} size="sm" status="info">
                          {PLATFORM_LABELS[p]}
                        </CDSTag>
                      ))}
                    </CDSFlex>
                  </CDSFlex>
                  <CDSFlex direction="vertical" gap={6}>
                    <CDSText size="p4" weight="semi-bold">API Key</CDSText>
                    <CDSText size="p4" color="light">
                      {apiKey ? '••••••••' + apiKey.slice(-4) : 'Not set'}
                    </CDSText>
                  </CDSFlex>
                  {apiEndpoint && (
                    <CDSFlex direction="vertical" gap={6}>
                      <CDSText size="p4" weight="semi-bold">Endpoint</CDSText>
                      <CDSText size="p4" color="light">{apiEndpoint}</CDSText>
                    </CDSFlex>
                  )}
                </CDSFlex>
              </CDSCard>
              <CDSCard style={{ background: 'var(--base-bg-weak-default)' }}>
                <CDSFlex gap="xs" align="flex-start">
                  <ShieldCheckIcon size={16} weight="bold" color="var(--positive-icon-default)" />
                  <CDSText size="p4" color="light">
                    Settings marked as auto-sync will propagate to all selected platforms immediately. Manual-push settings can be configured after connection.
                  </CDSText>
                </CDSFlex>
              </CDSCard>
            </CDSFlex>
          </CDSFlex>
        );

      case 4:
        return (
          <CDSFlex direction="vertical" gap={24}>
            <CDSFlex direction="vertical" gap={8}>
              <CDSHeading size="sub-section">
                {allResolved ? 'Connection Complete' : `Connecting ${item.name}...`}
              </CDSHeading>
              <CDSText color="light">
                {allResolved
                  ? 'All platforms have been configured. Your integration is now active in SCC.'
                  : 'Establishing connections to selected platforms. This usually takes under 60 seconds.'}
              </CDSText>
            </CDSFlex>

            <CDSFlex direction="vertical" gap={12}>
              {selectedPlatforms.map((platform) => {
                const state = connectStatus[platform] ?? 'idle';
                return (
                  <CDSCard key={platform}>
                    <CDSFlex justify="space-between" align="center">
                      <CDSFlex gap="sm" align="center">
                        <CDSFlex
                          style={{ width: 32, height: 32 }}
                          align="center"
                          justify="center"
                        >
                          {state === 'idle' && (
                            <CDSStatusIcon size={18} status="dormant" hasBackground />
                          )}
                          {state === 'connecting' && <CDSSpinner size="sm" />}
                          {state === 'connected' && (
                            <CDSStatusIcon size={18} status="positive" hasBackground />
                          )}
                          {state === 'failed' && (
                            <CDSStatusIcon size={18} status="negative" hasBackground />
                          )}
                        </CDSFlex>
                        <CDSFlex direction="vertical" gap={2}>
                          <CDSText weight="semi-bold">{PLATFORM_LABELS[platform]}</CDSText>
                          <CDSText size="p4" color="light">
                            {state === 'idle' && 'Waiting...'}
                            {state === 'connecting' && 'Authenticating...'}
                            {state === 'connected' && 'Connected'}
                            {state === 'failed' && 'Failed to connect'}
                          </CDSText>
                        </CDSFlex>
                      </CDSFlex>
                      {state === 'connected' && (
                        <CDSTag size="sm" status="positive">Connected</CDSTag>
                      )}
                      {state === 'failed' && (
                        <CDSTag size="sm" status="negative">Failed</CDSTag>
                      )}
                    </CDSFlex>
                  </CDSCard>
                );
              })}
            </CDSFlex>
          </CDSFlex>
        );

      default:
        return null;
    }
  };

  return (
    <CDSFlex direction="vertical" gap={24} margin={24}>
      {/* Back nav */}
      <CDSFlex align="center" gap="sm">
        <CDSButton variant="tertiary" size="sm" onClick={onCancel}>
          <ArrowLeftIcon size={14} weight="bold" /> Back to Catalog
        </CDSButton>
      </CDSFlex>

      {/* Wizard header */}
      <CDSFlex direction="vertical" gap={4}>
        <CDSFlex gap="sm" align="center">
          <LogoBadge initials={item.logoInitials} color={item.logoColor} size={32} />
          <CDSHeading size="primary">Add {item.name}</CDSHeading>
        </CDSFlex>
        <CDSText color="light">
          Configure and connect this integration to SCC and your selected platforms.
        </CDSText>
      </CDSFlex>

      {/* Stepper */}
      <div style={{ minWidth: 700 }}>
        <CDSStepper>
          <CDSStepper.LeftPanel
            isExpanded={stepperExpanded}
            onCollapse={() => setStepperExpanded(false)}
            onExpand={() => setStepperExpanded(true)}
          >
            {steps.map((step, i) => (
              <CDSStepper.Step
                key={i}
                stepNumber={i + 1}
                title={step.title}
                description={step.description}
                active={currentStep === i + 1}
                completed={currentStep > i + 1}
                expanded={stepperExpanded}
                onClick={currentStep > i + 1 && i + 1 < 4 ? () => setCurrentStep(i + 1) : undefined}
              >
                {step.title}
              </CDSStepper.Step>
            ))}
          </CDSStepper.LeftPanel>

          <CDSStepper.RightPanel
            primaryAction={handlePrimaryAction}
            secondaryAction={onCancel}
            tertiaryAction={currentStep > 1 && currentStep < 4 ? handleBack : undefined}
            isTertiaryActionAvailable={currentStep > 1 && currentStep < 4}
            primaryCta={primaryCta}
            secondaryCta="Cancel"
            tertiaryCta="Back"
          >
            {renderStepContent()}
          </CDSStepper.RightPanel>
        </CDSStepper>
      </div>
    </CDSFlex>
  );
};

// ─── Main Catalog Page ────────────────────────────────────────────────────────

export const IntegrationsCatalogPage = ({ onNavigateToList }: Props) => {
  const [view, setView] = useState<'grid' | 'wizard'>('grid');
  const [wizardItem, setWizardItem] = useState<CatalogItem | null>(null);
  const [addedIds, setAddedIds] = useState<Set<string>>(
    () => new Set(catalogItems.filter((i) => i.isAdded).map((i) => i.id))
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sourceFilter, setSourceFilter] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerItem, setDrawerItem] = useState<CatalogItem | null>(null);

  const filteredItems = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return catalogItems.filter((item) => {
      if (q && !item.name.toLowerCase().includes(q) && !item.vendor.toLowerCase().includes(q) && !item.description.toLowerCase().includes(q)) return false;
      if (categoryFilter && item.category !== categoryFilter) return false;
      if (sourceFilter && item.source !== sourceFilter) return false;
      return true;
    });
  }, [searchQuery, categoryFilter, sourceFilter]);

  const handleAddClick = (item: CatalogItem) => {
    setWizardItem(item);
    setView('wizard');
    setDrawerOpen(false);
  };

  const handleWizardComplete = () => {
    if (wizardItem) setAddedIds((prev) => new Set([...prev, wizardItem.id]));
    setWizardItem(null);
    setView('grid');
  };

  const handleWizardCancel = () => {
    setWizardItem(null);
    setView('grid');
  };

  const openDetails = (item: CatalogItem) => {
    setDrawerItem(item);
    setDrawerOpen(true);
  };

  if (view === 'wizard' && wizardItem) {
    return (
      <AddIntegrationWizard
        item={wizardItem}
        onComplete={handleWizardComplete}
        onCancel={handleWizardCancel}
      />
    );
  }

  const hasFilters = !!(searchQuery || categoryFilter || sourceFilter);

  return (
    <>
      <CDSFlex direction="vertical" gap={24} margin={24}>
        {/* Page header */}
        <CDSFlex justify="space-between" align="flex-start">
          <CDSFlex direction="vertical" gap={4}>
            <CDSHeading size="primary">Integration Catalog</CDSHeading>
            <CDSText color="light">
              Browse and add integrations. SCC-native and DUO catalog integrations are shown together.
            </CDSText>
          </CDSFlex>
          <CDSButton variant="secondary" onClick={onNavigateToList}>
            View All Integrations
          </CDSButton>
        </CDSFlex>

        {/* Filters */}
        <CDSFlex gap="md" align="flex-end" wrap>
          <CDSFlex style={{ flex: '1 1 260px', maxWidth: 360 }}>
            <CDSTextInput
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              placeholder="Search integrations..."
              style={{ width: '100%' }}
            />
          </CDSFlex>
          <CDSFlex direction="vertical" style={{ minWidth: 180 }}>
            <CDSSelect
              placeholder="All Categories"
              options={categoryOptions}
              clearable
              value={categoryFilter || undefined}
              onChange={(v) => setCategoryFilter((v as unknown as string) ?? '')}
              onClear={() => setCategoryFilter('')}
            />
          </CDSFlex>
          <CDSFlex direction="vertical" style={{ minWidth: 160 }}>
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
              onClick={() => { setSearchQuery(''); setCategoryFilter(''); setSourceFilter(''); }}
            >
              Clear
            </CDSButton>
          )}
        </CDSFlex>

        {/* Results count */}
        <CDSText size="p4" color="light">
          {filteredItems.length} integration{filteredItems.length !== 1 ? 's' : ''}
          {hasFilters ? ' matching filters' : ' available'}
          {' · '}
          {addedIds.size} added
        </CDSText>

        {/* Card grid */}
        <CDSFlex gap="md" wrap>
          {filteredItems.map((item) => (
            <CatalogCard
              key={item.id}
              item={item}
              isAdded={addedIds.has(item.id)}
              onAdd={handleAddClick}
              onViewDetails={openDetails}
            />
          ))}
        </CDSFlex>

        {filteredItems.length === 0 && (
          <CDSCard>
            <CDSFlex direction="vertical" align="center" justify="center" gap={12} style={{ padding: 48 }}>
              <CDSHeading size="section">No integrations found</CDSHeading>
              <CDSText color="light">Try adjusting your search or filters.</CDSText>
              <CDSButton
                variant="secondary"
                onClick={() => { setSearchQuery(''); setCategoryFilter(''); setSourceFilter(''); }}
              >
                Clear filters
              </CDSButton>
            </CDSFlex>
          </CDSCard>
        )}

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
        {drawerItem && (
          <>
            <CDSDrawer.Heading>{drawerItem.name}</CDSDrawer.Heading>

            <CDSDrawer.Content>
              <CDSFlex direction="vertical" gap={20}>
                {/* Identity row */}
                <CDSFlex gap="sm" align="center">
                  <LogoBadge initials={drawerItem.logoInitials} color={drawerItem.logoColor} size={44} />
                  <CDSFlex direction="vertical" gap={2} style={{ flex: 1 }}>
                    <CDSText weight="semi-bold">{drawerItem.vendor}</CDSText>
                    <CDSText size="p4" color="light">{CATEGORY_LABELS[drawerItem.category]}</CDSText>
                  </CDSFlex>
                  {drawerItem.source === 'duo' && (
                    <CDSTag size="sm" status="info">via DUO</CDSTag>
                  )}
                </CDSFlex>

                <CDSText style={{ lineHeight: 1.6 }}>{drawerItem.description}</CDSText>

                <CDSDivider />

                <CDSFlex direction="vertical" gap={8}>
                  <CDSText weight="semi-bold">Category</CDSText>
                  <CDSTag size="sm" status="info">{CATEGORY_LABELS[drawerItem.category]}</CDSTag>
                </CDSFlex>

                <CDSFlex direction="vertical" gap={8}>
                  <CDSText weight="semi-bold">Compatible Platforms</CDSText>
                  <CDSFlex gap="xs" wrap>
                    {drawerItem.compatiblePlatforms.map((p) => (
                      <CDSTag key={p} size="sm" status="info">{PLATFORM_LABELS[p]}</CDSTag>
                    ))}
                  </CDSFlex>
                </CDSFlex>

                {drawerItem.source === 'duo' && (
                  <CDSCard style={{ background: 'var(--base-bg-weak-default)' }}>
                    <CDSFlex direction="vertical" gap={6}>
                      <CDSText size="p4" weight="semi-bold">Source: DUO Catalog</CDSText>
                      <CDSText size="p4" color="light">
                        This integration is sourced from the DUO catalog. Once added, it is fully managed and monitored here in SCC.
                      </CDSText>
                    </CDSFlex>
                  </CDSCard>
                )}

                {drawerItem.prerequisites && drawerItem.prerequisites.length > 0 && (
                  <CDSFlex direction="vertical" gap={8}>
                    <CDSText weight="semi-bold">Prerequisites</CDSText>
                    {drawerItem.prerequisites.map((req, i) => (
                      <CDSFlex key={i} gap="xs" align="center">
                        <CDSText size="p4" color="light">• {req}</CDSText>
                      </CDSFlex>
                    ))}
                  </CDSFlex>
                )}
              </CDSFlex>
            </CDSDrawer.Content>

            <CDSDrawer.Footer>
              <CDSButton variant="tertiary" onClick={() => setDrawerOpen(false)}>
                Close
              </CDSButton>
              {addedIds.has(drawerItem.id) ? (
                <CDSFlex gap="xs" align="center">
                  <CheckCircleIcon size={16} weight="bold" color="var(--positive-icon-default)" />
                  <CDSText size="p3" style={{ color: 'var(--positive-text-default)' }}>
                    Already added
                  </CDSText>
                </CDSFlex>
              ) : (
                <CDSButton onClick={() => handleAddClick(drawerItem)}>
                  Add Integration
                </CDSButton>
              )}
            </CDSDrawer.Footer>
          </>
        )}
      </CDSDrawer>
    </>
  );
};
