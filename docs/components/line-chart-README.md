# cds-react-line-chart

Line graphs plot data points by connecting each data point with a line segment, ordering the data in a selected interval or timespan. This allows a user to understand trends. Multiple lines on the same graph allow for comparison of several factors against each other in the same interval or timespan.

> [Design Guidelines](https://magnetic.cisco.com/0a43ab5cd/p/281fa5-data-visualizations/t/253844)

## Installation

NPM: `npm i @ciscodesignsystems/cds-react-line-chart`

Yarn: `yarn add @ciscodesignsystems/cds-react-line-chart`

## Styling and Theme Installation

You will also need to install the styling and needed theme files.

NPM: `npm i @ciscodesignsystems/cds-magnetic-theme-web`

Yarn: `yarn add @ciscodesignsystems/cds-magnetic-theme-web`

Then import the following into your app's css:

```css
@import '@ciscodesignsystems/cds-magnetic-theme-web/css/dist/token-theme-light-variables.css';
@import '@ciscodesignsystems/cds-react-line-chart/index.css';
```

## Dependencies

### Required

These dependencies must be met in your product:

- [react](https://www.npmjs.com/package/react) >=16.14.0
- [react-dom](https://www.npmjs.com/package/react-dom) >=16.14.0
- @ciscodesignsystems/cds-component-types
- @ciscodesignsystems/cds-component-utilities

## Usage

### Basic Example

```tsx
<CDSLineChart
  axes={{
    xAxis: {
      tickValues: 6,
    },
    yAxis: {
      tickValues: 6,
    },
  }}
  colors={['#c7edb4ff']}
  data={[
    {
      color: 'hsl(317, 50%, 60%)',
      data: [
        {
          x: 'plane',
          y: 100,
        },
        {
          x: 'helicopter',
          y: 80,
        },
        {
          x: 'boat',
          y: 103,
        },
        {
          x: 'train',
          y: 32,
        },
        {
          x: 'subway',
          y: 283,
        },
        {
          x: 'bus',
          y: 182,
        },
        {
          x: 'car',
          y: 129,
        },
        {
          x: 'moto',
          y: 76,
        },
        {
          x: 'bicycle',
          y: 30,
        },
        {
          x: 'horse',
          y: 7,
        },
        {
          x: 'skateboard',
          y: 89,
        },
        {
          x: 'others',
          y: 274,
        },
      ],
      id: 'us',
    },
  ]}
  fluid
  legends={[
    {
      anchor: 'top-right',
      direction: 'row',
      itemDirection: 'left-to-right',
      itemHeight: 20,
      itemTextColor: '#777',
      itemWidth: 80,
      itemsSpacing: 30,
      justify: false,
      symbolShape: () => {},
      symbolSize: 10,
      symbolSpacing: 15,
      toggleSerie: true,
      translateX: 100,
      translateY: -50,
    },
  ]}
  theme={{
    margin: {
      bottom: 50,
      left: 60,
      right: 110,
      top: 50,
    },
  }}
  debugSlices={false}
  xScale={{ type: 'point' }}
  yScale={{
    type: 'linear',
    min: 'auto',
    max: 'auto',
    stacked: false,
    reverse: false,
  }}
  pointSize={6}
  pointColor={{ from: 'color' }}
  pointBorderWidth={2}
  pointBorderColor={{ from: 'serieColor' }}
  enablePointLabel={false}
  pointLabel="yFormatted"
  areaOpacity={0.2}
  areaBlendMode="normal"
  debugMesh={false}
  enableCrosshair={true}
  curve="linear"
  role="img"
  enablePoints={false}
  isInteractive={true}
/>
```

### With Custom Tooltip

```tsx
import { type PointTooltipProps } from '@nivo/line';
import type { CDSLineChartCustomTooltipProps } from '@ciscodesignsystems/cds-component-types';

const CustomTooltip = ({ duration = 0, color, data, serieId }: CDSLineChartCustomTooltipProps) => {
  return (
    <div className="custom-tooltip">
      {!!duration && <div className="date">{getDateTime(data.x as number)}</div>}
      <div className="tooltip-content">
        <div className="point-icon" style={{ backgroundColor: color }}></div>
        <div className="tooltip-data">
          {serieId} - {data.yFormatted}
        </div>
      </div>
    </div>
  );
};

<CDSLineChart
  tooltip={(point: PointTooltipProps) => (
    <CustomTooltip
      duration={5}
      color={point.point.color}
      data={point.point.data}
      serieId={point.point.serieId}
    />
  )}
/>;
```

### With Custom Slice Tooltip

```tsx
import { type Point } from '@nivo/line';
import { type SliceTooltipProps } from '@nivo/line';

const CustomSliceTooltip = ({ points }: { points: Point[] }) => (
  <div className={cx(styles, 'slices')}>
    {points.map((point) => (
      <Fragment key={point.id}>
        <div className='custom-tooltip'>
          <div className='tooltip-content'>
            <div
              className='point-icon'}
              style={{ backgroundColor: point.color }}></div>
            <div className='tooltip-data'>
              <p>Serie ID: {point.serieId}</p>
              <p>X Formatted: {point.data.xFormatted}</p>
              <p>Y Formatted: {point.data.yFormatted}</p>
              {point.data.yStacked !== undefined && <p>Y Stacked: {point.data.yStacked}</p>}
              {point.serieId} - {point.data.yFormatted}
            </div>
          </div>
        </div>
      </Fragment>
    ))}
  </div>
);

<CDSLineChart
  sliceTooltip= {({ slice }: SliceTooltipProps) => (
    <CustomSliceTooltip points={slice.points} />
  )}
/>
```

## Props

| Name                   | Description                                                                                                                | Required | Default   |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------- | -------- | --------- |
| axes                   | Configurable Axes object                                                                                                   | no       |           |
| data                   | Datasets for line chart                                                                                                    | yes      |           |
| colorLineBelowBaseline | Provides highlighting different line segments                                                                              | no       | false     |
| fill                   | Fill the area between either the line and the baseline, or the line and the bottom of the chart.                           | no       | false     |
| dashed                 | Whether to show every other line on the chart as a dashed line                                                             | no       | false     |
| baseline               | Value to use to draw a dotted baseline                                                                                     | no       | 0         |
| legends                | Configurable Legends object                                                                                                | no       |           |
| theme                  | Customizable chart theme.                                                                                                  | no       |           |
| colors                 | Color for the chart line                                                                                                   | no       |           |
| fluid                  | Determine whether the graph is fluid or not                                                                                | no       | true      |
| lineWidth              | Width of the lines in px.                                                                                                  | no       | 1         |
| patternIds             | IDs of data points requiring diagonal pattern fills                                                                        | no       |           |
| fontSize               | Size of font in axis labels                                                                                                | no       | 12        |
| gridX                  | Whether to show the X grid                                                                                                 | no       | true      |
| gridY                  | Whether to show the Y grid                                                                                                 | no       | true      |
| height                 | Height of chart in px                                                                                                      | no       | 200       |
| width                  | Width of chart in px                                                                                                       | no       | 200       |
| duration               | Sets the context for the chart's advanced x-axis labeling. Including this will give you a secondary grid of interval dates | no       |           |
| isInteractive          | Whether the line chart is interactive, can be used to enable/disable tooltip                                               | yes      |           |
| tooltip                | Customizes the tooltip for individual data points.                                                                         | no       |           |
| sliceTooltip           | Customizes the tooltip for slices of data.                                                                                 | no       |           |
| debugSlices            | Enables or disables debug mode for slice visualization                                                                     | yes      |           |
| yScale                 | Set yAxis type and size. Y scale configuration                                                                             | yes      |           |
| enablePoints           | Determines whether points are enabled on the chart                                                                         | yes      |           |
| pointSize              | Specifies the size of points on the chart                                                                                  | yes      |           |
| pointColor             | Defines the color of points on the chart                                                                                   | yes      |           |
| pointBorderWidth       | Specifies the border width of points on the chart                                                                          | yes      |           |
| pointBorderColor       | Defines the border color of points on the chart                                                                            | yes      |           |
| enablePointLabel       | Enables or disables point labels on the chart                                                                              | yes      |           |
| pointLabel             | Specifies the format of point labels on the chart                                                                          | yes      |           |
| areaOpacity            | Sets the opacity of the area under the line                                                                                | yes      |           |
| areaBlendMode          | Specifies the blend mode for the area under the line                                                                       | yes      |           |
| debugMesh              | Enables or disables debug mode for mesh visualization                                                                      | yes      |           |
| enableCrosshair        | Enables or disables the crosshair                                                                                          | yes      |           |
| curve                  | Specifies the curve interpolation type for the lines                                                                       | yes      |           |
| role                   | Defines the ARIA role for the chart                                                                                        | yes      |           |
| pointSymbol            | Optional render function to draw custom point shapes                                                                       | no       | undefined |
| maxLines               | Limits the maximum number of lines rendered on the chart                                                                   | no       | 10        |

## Limitation

When duration is enable, the date and time shown in the graph will based on your timezone. For localization, only en-us is supported.

## Known Issues

The following are known issues and may affect your use of this component.

- [JEST: SyntaxError: Unexpected token 'export'](https://cisco-sbg.atlassian.net/browse/MAGX-1041)
- Steps to resolve this have been documented in the `MIGRATION.md` file
- Vulnerability in d3/color: In order to resolve it add the below code snippet in your main `package.json` or `yarn file`:

```js
{
  // ... rest of package.json
  "overrides": {
    "d3-scale-chromatic": "^3.0.0",
    "d3-interpolate": "^3.0.1"
  }
}
```
