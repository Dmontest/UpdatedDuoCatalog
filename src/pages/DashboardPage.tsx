import { useState } from 'react';
import type React from 'react';
import { CDSButton } from '@ciscodesignsystems/cds-react-button';
import { CDSCard } from '@ciscodesignsystems/cds-react-card';
import { CDSContainer } from '@ciscodesignsystems/cds-react-container';
import { CDSFlex } from '@ciscodesignsystems/cds-react-flex';
import { CDSFooter } from '@ciscodesignsystems/cds-react-footer';
import { CDSHeading } from '@ciscodesignsystems/cds-react-heading';
import { CDSStatusIcon } from '@ciscodesignsystems/cds-react-icons';
import { CDSLineChart } from '@ciscodesignsystems/cds-react-line-chart';
import { CDSTab } from '@ciscodesignsystems/cds-react-tab';
import { CDSTable } from '@ciscodesignsystems/cds-react-table';
import type { ColumnDef } from '@tanstack/react-table';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DeviceTable = CDSTable as React.ComponentType<any> & { FilterBar: typeof CDSTable.FilterBar };
import { CDSTag } from '@ciscodesignsystems/cds-react-tag';
import { CDSText } from '@ciscodesignsystems/cds-react-text';
import { devices, trafficData } from '../data';
import type { Device } from '../data';

const statusToSentiment = (status: Device['status']) => {
  switch (status) {
    case 'healthy': return 'positive' as const;
    case 'warning': return 'warning' as const;
    case 'critical': return 'negative' as const;
    case 'offline': return 'dormant' as const;
  }
};

const columns: ColumnDef<Device>[] = [
  { accessorKey: 'hostname', header: 'Hostname', id: 'hostname', meta: { align: 'left' } },
  { accessorKey: 'ipAddress', header: 'IP Address', id: 'ipAddress', meta: { align: 'left', dataType: 'networking' } },
  { accessorKey: 'platform', header: 'Platform', id: 'platform', meta: { align: 'left' } },
  {
    accessorKey: 'status',
    header: 'Status',
    id: 'status',
    meta: { align: 'left' },
    cell: (info) => {
      const status = info.getValue() as Device['status'];
      return (
        <CDSTag size="sm" status={statusToSentiment(status)}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </CDSTag>
      );
    },
  },
  { accessorKey: 'cpuUsage', header: 'CPU %', id: 'cpuUsage', meta: { align: 'right' } },
  { accessorKey: 'memoryUsage', header: 'Memory %', id: 'memoryUsage', meta: { align: 'right' } },
  { accessorKey: 'site', header: 'Site', id: 'site', meta: { align: 'left' } },
  { accessorKey: 'lastSeen', header: 'Last Seen', id: 'lastSeen', meta: { align: 'left' }, enableSorting: false },
];

export const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  const healthyCt = devices.filter((d) => d.status === 'healthy').length;
  const warningCt = devices.filter((d) => d.status === 'warning').length;
  const criticalCt = devices.filter((d) => d.status === 'critical').length;
  const offlineCt = devices.filter((d) => d.status === 'offline').length;

  return (
    <CDSFlex direction="vertical" gap={24} margin={24}>
      <CDSHeading size="primary">Network Dashboard</CDSHeading>

      {/* Status summary cards */}
      <CDSFlex direction="vertical" gap={16}>
        <CDSHeading size="section">Device Health</CDSHeading>
        <CDSFlex gap="md" wrap>
          <CDSCard aria-label="Healthy Devices" style={{ flex: '1 1 200px' }}>
            <CDSFlex direction="vertical" grow gap="sm">
              <CDSFlex direction="vertical" as="header">
                <CDSFlex gap="xxs" align="center">
                  <CDSHeading size="section">Healthy</CDSHeading>
                  <div style={{ flex: 1 }} />
                  <CDSStatusIcon size={20} status="positive" hasBackground />
                </CDSFlex>
              </CDSFlex>
              <CDSFlex gap="xs" align="flex-end">
                <CDSHeading size="lg">{healthyCt}</CDSHeading>
                <CDSText size="p3" color="light">of {devices.length} devices</CDSText>
              </CDSFlex>
            </CDSFlex>
          </CDSCard>

          <CDSCard aria-label="Warning Devices" style={{ flex: '1 1 200px' }}>
            <CDSFlex direction="vertical" grow gap="sm">
              <CDSFlex gap="xxs" align="center">
                <CDSHeading size="section">Warning</CDSHeading>
                <div style={{ flex: 1 }} />
                <CDSStatusIcon size={20} status="warning" hasBackground />
              </CDSFlex>
              <CDSFlex gap="xs" align="flex-end">
                <CDSHeading size="lg">{warningCt}</CDSHeading>
                <CDSText size="p3" color="light">high utilization</CDSText>
              </CDSFlex>
            </CDSFlex>
          </CDSCard>

          <CDSCard aria-label="Critical Devices" style={{ flex: '1 1 200px' }}>
            <CDSFlex direction="vertical" grow gap="sm">
              <CDSFlex gap="xxs" align="center">
                <CDSHeading size="section">Critical</CDSHeading>
                <div style={{ flex: 1 }} />
                <CDSStatusIcon size={20} status="negative" hasBackground />
              </CDSFlex>
              <CDSFlex gap="xs" align="flex-end">
                <CDSHeading size="lg">{criticalCt}</CDSHeading>
                <CDSText size="p3" color="light">needs attention</CDSText>
              </CDSFlex>
            </CDSFlex>
          </CDSCard>

          <CDSCard aria-label="Offline Devices" style={{ flex: '1 1 200px' }}>
            <CDSFlex direction="vertical" grow gap="sm">
              <CDSFlex gap="xxs" align="center">
                <CDSHeading size="section">Offline</CDSHeading>
                <div style={{ flex: 1 }} />
                <CDSStatusIcon size={20} status="dormant" hasBackground />
              </CDSFlex>
              <CDSFlex gap="xs" align="flex-end">
                <CDSHeading size="lg">{offlineCt}</CDSHeading>
                <CDSText size="p3" color="light">unreachable</CDSText>
              </CDSFlex>
            </CDSFlex>
          </CDSCard>
        </CDSFlex>
      </CDSFlex>

      {/* Traffic chart + Site overview */}
      <CDSFlex direction="vertical" gap={16}>
        <CDSHeading size="section">Network Traffic</CDSHeading>
        <CDSFlex gap="md" wrap>
          <CDSCard style={{ flex: '2 1 500px', overflow: 'hidden' }}>
            <CDSFlex direction="vertical" grow gap="sm">
              <CDSHeading size="sub-section">Bandwidth (Mbps)</CDSHeading>
              <div>
                <CDSLineChart
                  data={trafficData}
                  aria-label="Network Traffic Chart"
                  fluidHeight={350}
                  enablePoints={false}
                  enableCrosshair
                  isInteractive
                  curve="monotoneX"
                  role="img"
                  debugSlices={false}
                  debugMesh={false}
                  enableSlices={false}
                  enablePointLabel={false}
                  pointLabel="yFormatted"
                  areaOpacity={0.2}
                  areaBlendMode="normal"
                  pointSize={6}
                  pointColor={{ from: 'color' }}
                  pointBorderWidth={2}
                  pointBorderColor={{ from: 'serieColor' }}
                  lineWidth={2}
                  yScale={{ type: 'linear', min: 0, max: 'auto', stacked: false, reverse: false }}
                  axes={{
                    xAxis: { tickValues: 7, type: 'point' },
                    yAxis: { tickValues: 5 },
                  }}
                  theme={{ margin: { top: 40, right: 30, bottom: 50, left: 50 } }}
                  colors={['#049fd9', '#53a828']}
                  legends={[{
                    anchor: 'top', direction: 'row', itemDirection: 'left-to-right',
                    itemHeight: 20, itemWidth: 80, itemsSpacing: 16, justify: false,
                    symbolShape: 'circle', symbolSize: 10, symbolSpacing: 15,
                    toggleSerie: true, translateX: 0, translateY: -35,
                  }]}
                />
              </div>
            </CDSFlex>
          </CDSCard>

          <CDSCard style={{ flex: '1 1 250px' }}>
            <CDSFlex direction="vertical" grow gap="md">
              <CDSHeading size="sub-section">Site Summary</CDSHeading>
              {['San Jose HQ', 'Austin DC', 'RTP Office', 'London Office'].map((site) => {
                const siteDevices = devices.filter((d) => d.site === site);
                const allHealthy = siteDevices.every((d) => d.status === 'healthy');
                const hasCritical = siteDevices.some((d) => d.status === 'critical' || d.status === 'offline');
                const status = hasCritical ? 'negative' : allHealthy ? 'positive' : 'warning';
                return (
                  <CDSFlex
                    key={site}
                    direction="horizontal"
                    align="center"
                    justify="space-between"
                    style={{ background: 'var(--base-bg-default)', padding: '10px 12px', borderRadius: 8 }}
                  >
                    <CDSFlex direction="vertical" gap={2}>
                      <CDSText weight="semi-bold">{site}</CDSText>
                      <CDSText size="p4" color="light">{siteDevices.length} devices</CDSText>
                    </CDSFlex>
                    <CDSStatusIcon size={18} status={status} hasBackground />
                  </CDSFlex>
                );
              })}
            </CDSFlex>
          </CDSCard>
        </CDSFlex>
      </CDSFlex>

      {/* Devices table */}
      <CDSFlex direction="vertical" gap={16}>
        <CDSFlex justify="space-between" align="center">
          <CDSHeading size="section">Device Inventory</CDSHeading>
          <CDSButton variant="secondary" size="sm">Export</CDSButton>
        </CDSFlex>

        <CDSTab orientation="horizontal">
          <CDSTab.Link selected={activeTab === 0} onClick={(e: React.MouseEvent) => { e.preventDefault(); setActiveTab(0); }} href="#0">
            All Devices
          </CDSTab.Link>
          <CDSTab.Link selected={activeTab === 1} onClick={(e: React.MouseEvent) => { e.preventDefault(); setActiveTab(1); }} href="#0">
            Issues
          </CDSTab.Link>
        </CDSTab>

        <CDSContainer>
          <DeviceTable
            columns={columns}
            data={activeTab === 0 ? devices : devices.filter((d) => d.status !== 'healthy')}
            density="compact"
            pagination
            paginationConfig={{ pageSize: 10, pageSizeOptions: [10, 20, 50], showPageSizeChanger: true }}
          >
            <DeviceTable.FilterBar showSearch searchPlaceholderText="Search devices..." />
          </DeviceTable>
        </CDSContainer>
      </CDSFlex>

      <CDSFooter brandName="Cisco Systems, Inc." />
    </CDSFlex>
  );
};
