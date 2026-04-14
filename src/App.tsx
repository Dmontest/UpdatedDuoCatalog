import { useState } from 'react';
import type React from 'react';
import {
  BellIcon,
  GearSixIcon,
  UserIcon,
  UsersIcon,
} from '@phosphor-icons/react';
import { CDSButton } from '@ciscodesignsystems/cds-react-button';
import { CDSFlex } from '@ciscodesignsystems/cds-react-flex';
import {
  CDSHeader,
  CDSCustomMenuRoot,
  CDSCustomMenuItem,
  CDSTenantMenuRoot,
  CDSTenantMenuRow,
  CDSTenantMenuDivider,
} from '@ciscodesignsystems/cds-react-header';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomMenuRoot = CDSCustomMenuRoot as React.ComponentType<any>;
import { CiscoLogo } from '@ciscodesignsystems/cds-react-icons';
import { CDSNav } from '@ciscodesignsystems/cds-react-nav';
import { CDSThemeProvider } from '@ciscodesignsystems/cds-react-theme-provider';
import { HomePage } from './pages/HomePage';
import { DashboardPage } from './pages/DashboardPage';
import { IntegrationsListPage } from './pages/IntegrationsListPage';
import { IntegrationsCatalogPage } from './pages/IntegrationsCatalogPage';
import { AppHubPage } from './pages/AppHubPage';
import { AppHubAltPage } from './pages/AppHubAltPage';
import { WorkspacePage } from './pages/WorkspacePage';
import { MfaCoveragePage } from './pages/MfaCoveragePage';

type ThemeOption = {
  label: string;
  theme: 'light' | 'dark' | 'classic-light' | 'classic-dark';
  brand: 'magnetic' | 'magnetic-blue';
};

const themeOptions: ThemeOption[] = [
  { label: 'Magnetic Light', theme: 'light', brand: 'magnetic' },
  { label: 'Magnetic Dark', theme: 'dark', brand: 'magnetic' },
  { label: 'Magnetic Classic Light', theme: 'classic-light', brand: 'magnetic' },
  { label: 'Magnetic Classic Dark', theme: 'classic-dark', brand: 'magnetic' },
  { label: 'Blue Light', theme: 'light', brand: 'magnetic-blue' },
  { label: 'Blue Dark', theme: 'dark', brand: 'magnetic-blue' },
  { label: 'Blue Classic Light', theme: 'classic-light', brand: 'magnetic-blue' },
  { label: 'Blue Classic Dark', theme: 'classic-dark', brand: 'magnetic-blue' },
];

export const App = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('home');
  const [currentTheme, setCurrentTheme] = useState<ThemeOption>(themeOptions[0]);

  const nav = (key: string) => () => setSelectedMenu(key);

  return (
    <CDSThemeProvider theme={currentTheme.theme} brand={currentTheme.brand}>
      {/* Header */}
      <div style={{ position: 'relative', zIndex: 200 }}>
        <CDSHeader
          sentiment="inverse"
          title="Reference App (Di-Test1)"
          logo={<CiscoLogo size="sm" />}
          logoLink="#"
          logoLinkTarget="_self"
        >
          <CustomMenuRoot icon={<BellIcon size={24} weight="bold" />} aria-label="Notifications">
            <CDSCustomMenuItem>No new notifications</CDSCustomMenuItem>
          </CustomMenuRoot>
          <CustomMenuRoot icon={<GearSixIcon size={24} weight="bold" />} aria-label="Settings">
            {themeOptions.map((opt) => (
              <CDSCustomMenuItem
                key={`${opt.brand}-${opt.theme}`}
                onMouseDown={() => setCurrentTheme(opt)}
                style={{ fontWeight: currentTheme === opt ? 'bold' : 'normal' }}
              >
                {currentTheme === opt ? `\u2713 ${opt.label}` : `\u2003${opt.label}`}
              </CDSCustomMenuItem>
            ))}
          </CustomMenuRoot>
          <CDSTenantMenuRoot sentiment="inverse" switcherType="user" userName="Jane" tenantName="Acme Corp">
            <CDSTenantMenuRow
              leftGutter={<UserIcon color="#707070" weight="regular" size={23} />}
              rightGutter={<CDSButton sentiment="interact" variant="secondary">Logout</CDSButton>}
            >
              <p style={{ margin: 0, textTransform: 'uppercase', fontSize: '12px' }}>Logged in as</p>
              <p style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>Jane Cooper</p>
              <p style={{ margin: 0, fontSize: '14px' }}>jane@acmecorp.com</p>
            </CDSTenantMenuRow>
            <CDSTenantMenuDivider />
            <CDSTenantMenuRow leftGutter={<UsersIcon color="#707070" weight="regular" size={23} />}>
              <p style={{ margin: 0, textTransform: 'uppercase', fontSize: '12px' }}>Organization</p>
              <p style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>Acme Corp</p>
            </CDSTenantMenuRow>
          </CDSTenantMenuRoot>
        </CDSHeader>
      </div>

      {/* Layout: Nav + Content */}
      <div style={{ display: 'grid', gridTemplateColumns: 'min-content 1fr' }}>
        <CDSNav
          isCollapsed={isCollapsed}
          setCollapsed={setIsCollapsed}
          style={{
            position: 'sticky',
            top: '56px',
            height: 'calc(100vh - 56px)',
            overflowY: 'auto',
          }}
        >
          <CDSNav.Item icon="home" isSelected={selectedMenu === 'home'} onClick={nav('home')}>
            Home
          </CDSNav.Item>
          <CDSNav.Item icon="applications" isSelected={selectedMenu === 'app-hub'} onClick={nav('app-hub')}>
            App Hub
          </CDSNav.Item>
          <CDSNav.Item icon="overview" isSelected={selectedMenu === 'app-hub-alt'} onClick={nav('app-hub-alt')}>
            App Hub Alt
          </CDSNav.Item>
          <CDSNav.Item icon="security" isSelected={selectedMenu === 'mfa-coverage'} onClick={nav('mfa-coverage')}>
            MFA Coverage
          </CDSNav.Item>
          <CDSNav.Item icon="workflows" isSelected={selectedMenu === 'workspace'} onClick={nav('workspace')}>
            Workspace
          </CDSNav.Item>
          <CDSNav.Section>
            <CDSNav.Section.Label>Example App</CDSNav.Section.Label>
            <CDSNav.Item icon="monitor" isSelected={selectedMenu === 'dashboard'} onClick={nav('dashboard')}>
              Dashboard
            </CDSNav.Item>
            <CDSNav.Item icon="inventory" isSelected={selectedMenu === 'inventory'} onClick={nav('inventory')}>
              Inventory
            </CDSNav.Item>
            <CDSNav.Item icon="wireless" isSelected={selectedMenu === 'wireless'} onClick={nav('wireless')}>
              Wireless
            </CDSNav.Item>
          </CDSNav.Section>
          <CDSNav.Section>
            <CDSNav.Section.Label>Integrations</CDSNav.Section.Label>
            <CDSNav.Item icon="connect" isSelected={selectedMenu === 'integrations-list'} onClick={nav('integrations-list')}>
              All Integrations
            </CDSNav.Item>
            <CDSNav.Item icon="explore" isSelected={selectedMenu === 'integrations-catalog'} onClick={nav('integrations-catalog')}>
              Catalog
            </CDSNav.Item>
          </CDSNav.Section>
          <CDSNav.Section>
            <CDSNav.Section.Label>Administration</CDSNav.Section.Label>
            <CDSNav.Item icon="sites" isSelected={selectedMenu === 'sites'} onClick={nav('sites')}>
              Sites
            </CDSNav.Item>
            <CDSNav.Item icon="users" isSelected={selectedMenu === 'users'} onClick={nav('users')}>
              Users
            </CDSNav.Item>
            <CDSNav.Item icon="settings" isSelected={selectedMenu === 'settings'} onClick={nav('settings')}>
              Settings
            </CDSNav.Item>
          </CDSNav.Section>
        </CDSNav>

        {/* Page content */}
        <CDSFlex direction="vertical">
          {selectedMenu === 'home' && <HomePage />}
          {selectedMenu === 'app-hub' && <AppHubPage />}
          {selectedMenu === 'app-hub-alt' && <AppHubAltPage />}
          {selectedMenu === 'mfa-coverage' && <MfaCoveragePage />}
          {selectedMenu === 'workspace' && <WorkspacePage />}
          {selectedMenu === 'dashboard' && <DashboardPage />}
          {selectedMenu === 'integrations-list' && (
            <IntegrationsListPage onNavigateToCatalog={() => setSelectedMenu('integrations-catalog')} />
          )}
          {selectedMenu === 'integrations-catalog' && (
            <IntegrationsCatalogPage onNavigateToList={() => setSelectedMenu('integrations-list')} />
          )}
          {!['home', 'app-hub', 'app-hub-alt', 'mfa-coverage', 'workspace', 'dashboard', 'integrations-list', 'integrations-catalog'].includes(selectedMenu) && (
            <CDSFlex direction="vertical" gap={16} margin={24}>
              <CDSFlex direction="vertical" gap={4}>
                <CDSFlex style={{ color: 'var(--base-text-weak-default)', textTransform: 'capitalize' }}>
                </CDSFlex>
              </CDSFlex>
            </CDSFlex>
          )}
        </CDSFlex>
      </div>
    </CDSThemeProvider>
  );
};

export default App;
