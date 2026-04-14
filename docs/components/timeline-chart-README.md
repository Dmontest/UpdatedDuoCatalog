# cds-react-timeline-chart

Timeline charts are a type of horizontal bar chart specifically designed to visualize sequences of events over a period of time. They are particularly useful for displaying time-related data in a clear and linear fashion, making it easy to track progress, identify patterns, and understand the temporal relationships between events.

> [Design Guidelines](https://magnetic.cisco.com/0a43ab5cd/p/39326b-data-visualizations)

## Installation

NPM: `npm i @ciscodesignsystems/cds-react-timeline-chart`

Yarn: `yarn add @ciscodesignsystems/cds-react-timeline-chart`

## Styling and Theme Installation

You will also need to install the styling and needed theme files.

NPM: `npm i @ciscodesignsystems/cds-magnetic-theme-web`

Yarn: `yarn add @ciscodesignsystems/cds-magnetic-theme-web`

Then import the following into your app's css:

```css
@import '@ciscodesignsystems/cds-magnetic-theme-web/css/dist/token-theme-light-variables.css';
@import '@ciscodesignsystems/cds-react-timeline-chart/index.css';
```

## Dependencies

### Required

These dependencies must be met in your product:

- [react](https://www.npmjs.com/package/react) >=16.14.0
- [react-dom](https://www.npmjs.com/package/react-dom) >=16.14.0
- @ciscodesignsystems/cds-component-utilities
- @ciscodesignsystems/cds-component-types
- @ciscodesignsystems/cds-react-flex
- @ciscodesignsystems/cds-react-legend
- @ciscodesignsystems/cds-react-text

## Usage

### Default Timeline Chart

```tsx
export const Component = () => {
  const timelineChartData: CDSTimelineChartDatum[] = [
    {
      timestamp: 154606132364,
      status: "connected",
      id: 1,
    },
    {
      timestamp: 154606862364,
      status: "connected",
      id: 2,
    },
    {
      timestamp: 154607960289,
      status: "disconnected",
      id: 3,
    },
    {
      timestamp: 154608973587,
      status: "active",
      id: 4,
    },
  ]

  <CDSTimelineChart
    data={timelineChartData}
    height={20}
    isInteractive
    label="Connections"
    margin={{ left: 120 }}
    tooltip={Tooltip}
    width={900}
  />
};
```

### Timeline Chart With Custom Tooltip

```tsx

const dateFormat = {
  format: (t: string | number | Date) =>
    new Intl.DateTimeFormat('us', {
      month: '2-digit',
      day: '2-digit',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    }).format(Number(t)),
};

const Tooltip = ({ color, data, range }: CDSBulletTooltipProps): ReactElement => (
  <div
    style={{
      background: '#ffffff',
      borderRadius: '6px',
      padding: '4px',
      boxShadow: '0px 4px 12px 0px rgba(0, 0, 0, 0.18)',
    }}>
    {data ? (
      <CDSLegend.Item
        color={color}
        kind="square"
        label={
          <CDSFlex gap="xs">
            <CDSText style={{ textTransform: 'capitalize' }} weight="bold">
              {data}:
            </CDSText>
            <CDSText>
              {range && dateFormat.format(range.v0)} to{' '}
              {range && dateFormat.format(range.v1 || 0)}
            </CDSText>
          </CDSFlex>
        }
      />
    ) : (
      <CDSFlex gap="xs">
        <CDSText>{'No data to display'}</CDSText>
      </CDSFlex>
    )}
  </div>
);

  const timelineChartData: CDSTimelineChartDatum[] = [
    {
      timestamp: 154606132364,
      status: "connected",
      id: 1,
    },
    {
      timestamp: 154606862364,
      status: "connected",
      id: 2,
    },
    {
      timestamp: 154607960289,
      status: "disconnected",
      id: 3,
    },
    {
      timestamp: 154608973587,
      status: "active",
      id: 4,
    },
  ]

  <CDSTimelineChart
    data={timelineChartData}
    height={20}
    isInteractive
    label="Connections"
    margin={{ left: 120 }}
    width={900}
    tooltip={Tooltip}
  />

```

> `t` in the dateFormat.format(t) function refers to the timestamp value that will be formatted into a human-readable date and time string. It can be a `string`, `number`, or `Date` type and represents the point in time that needs to be formatted using the `Intl.DateTimeFormat API`. The format function uses this value to convert the timestamp into a specific date and time format, including month, day, hour, minute, and second.

## Props

| Name                   | Description                                                                                                      | Required | Default |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------- | -------- | ------- |
| compact                | Sets common default props on the chart for use in small spaces                                                   | no       |         |
| data                   | The data for the chart                                                                                           | yes      |         |
| fluid                  | Sets the chart to scale to the width of its container. This container will require a height to render the chart. | no       | false   |
| fluidMaxWidth          | Sets a max width for fluid charts. The parent container will need a height to render the chart.                  | no       | 200     |
| height                 | The height of the chart                                                                                          | no       | 120     |
| isInteractive          | Enables chart interactions                                                                                       | no       | false   |
| isInteractiveWhenEmpty | Sets interactive charts to non-interactive when their data is an empty array                                     | no       | true    |
| label                  | Text label to display to the left of the timeline                                                                | no       |         |
| patternIds             | IDs of data fields to use for patterned rendering. Currently not supported                                       | no       |         |
| width                  | The width of non-fluid charts                                                                                    | no       | 900     |
| xAxis                  | Boolean to display the x-axis for the timeline                                                                   | no       | true    |
