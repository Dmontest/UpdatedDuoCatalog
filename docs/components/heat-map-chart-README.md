# cds-react-heat-map-chart

Heatmaps aid in cross-examination of multivariate data visually. Heatmaps are good for showing variance across multiple variables, revealing patterns, displaying whether any variables are similar to each other, and detecting if correlations exist in between them.

> [Design Guidelines](https://magnetic.cisco.com/0a43ab5cd/p/281fa5-data-visualizations/t/48187a)

## Installation

NPM: `npm i @ciscodesignsystems/cds-react-heat-map-chart`

Yarn: `yarn add @ciscodesignsystems/cds-react-heat-map-chart`

## Styling and Theme Installation

You will also need to install the styling and needed theme files.

NPM: `npm i @ciscodesignsystems/cds-magnetic-theme-web`

Yarn: `yarn add @ciscodesignsystems/cds-magnetic-theme-web`

Then import the following into your app's css:

```css
@import '@ciscodesignsystems/cds-magnetic-theme-web/css/dist/token-theme-light-variables.css';
@import '@ciscodesignsystems/cds-react-heat-map-chart/index.css';
```

## Dependencies

### Required

These dependencies must be met in your product:

- [react](https://www.npmjs.com/package/react) >=16.14.0
- [react-dom](https://www.npmjs.com/package/react-dom) >=16.14.0
- @ciscodesignsystems/cds-component-utilities

## Usage

```tsx
const heatMapData = [
  {
    id: 'June 22',
    data: [
      {
        x: '12:00 AM',
        y: 0,
      },
      {
        x: '2:00 AM',
        y: 0,
      },
      {
        x: '4:00 AM',
        y: 10,
      },
    ],
  },
  {
    id: 'June 23',
    data: [
      {
        x: '12:00 AM',
        y: 1,
      },
      {
        x: '2:00 AM',
        y: 4,
      },
      {
        x: '4:00 AM',
        y: 2,
      },
    ],
  },
];

const normalizedData = heatMapData.map((hm) => ({
  ...hm,
  data: hm.data.map((d) => ({ ...d, x: d.x })),
}));

const args = {
  gridX: false,
  gridY: false,
  fluid: false,
  height: 340,
  width: 940,
  axisTop: null,
  motionConfig: 'default',
  axes: {
    xAxis: {
      tickValues: 6,
      fontSize: 14,
    },
    yAxis: {
      tickValues: 3,
      fontSize: 14,
    },
  },
  data: { normalizedData },
  isInteractive: true,
  theme: {
    margin: {
      top: 0,
      left: 60,
      bottom: 30,
      right: 140,
    },
  },
};

<CDSHeatMapChart {...args} />;
```

## Props

| Name            | Description                                                                                              | Required | Default                                                     |
| --------------- | -------------------------------------------------------------------------------------------------------- | -------- | ----------------------------------------------------------- | --- |
| activeOpacity   | Active Opacity                                                                                           | no       | 1                                                           |
| animate         | Enable/disable transitions.                                                                              | no       | true                                                        |
| annotations     | Annotations for nodes.                                                                                   | no       | []                                                          |
| ariaLabel       | Main element aria-label.                                                                                 | no       | ""                                                          |
| ariaLabelledBy  | Main element aria-labelledby.                                                                            | no       | ""                                                          |
| ariaDescribedBy | Main element aria-describedby.                                                                           | no       | ""                                                          |
| axes            | Configurable Axes object                                                                                 | no       | {}                                                          |
| axisBottom      | Bottom axis configuration.                                                                               | no       | {}                                                          |
| axisLeft        | Left axis configuration.                                                                                 | no       | {}                                                          |
| axisRight       | Right axis configuration.                                                                                | no       | {}                                                          |
| axisTop         | Top axis configuration.                                                                                  | no       | {}                                                          |
| borderColor     | InheritedColorConfig<ComputedCell>                                                                       | no       | '#ffffffff'                                                 |
| borderRadius    | Border Radius                                                                                            | no       | 0                                                           |
| borderWidth     | Border Width                                                                                             | no       | 2                                                           |
| canvas          | Whether to render the chart as a element. Defaults to false, rendering in SVG                            | no       | false                                                       |
| cellComponent   | 'rect' / 'circle' / 'CellComponent'                                                                      | no       | 'rect'                                                      |
| classname       | Class Name                                                                                               | no       | ""                                                          |
| colors          | ContinuousColorScaleConfig / ((datum) => string)                                                         | no       | { type: 'quantize', colors: [...heat10Colors], steps: 10, } |
| data            | Chart data. HeatMapSerie<Datum, ExtraProps>[]                                                            | yes      |                                                             |
| emptyColor      | Color to use for cells not having a value.                                                               | no       | '#ffffffff'                                                 |
| enableGridX     | Enable/disable x grid.                                                                                   | no       | false                                                       |
| enableGridY     | Enable/disable y grid.                                                                                   | no       | false                                                       |
| enableLabels    | Enable Labels                                                                                            | no       | false                                                       |
| fluid           | Enable Fluid Heatmap                                                                                     | no       | false                                                       |     |
| forceSquare     | Force square cells (width = height), please note that padding is ignored.                                | no       | false                                                       |
| fontSize        | Size of font in axis labels                                                                              | no       | 12                                                          |
| gridX           | Whether to show the X grid                                                                               | no       | false                                                       |
| gridY           | Whether to show the Y grid                                                                               | no       | false                                                       |
| height          | Chart height in px.                                                                                      | no       | 340                                                         |
| hoverTarget     | Defines hover behavior.                                                                                  | no       | 'cell'                                                      |
| inactiveOpacity | Inactive Opacity                                                                                         | no       | 1                                                           |
| isInteractive   | Enable/disable interactivity.                                                                            | no       | true                                                        |
| label           | Define what to use as a label.                                                                           | no       | 'formattedValue'                                            |
| labelTextColor  | Label Text Color                                                                                         | no       | {}                                                          |
| layers          | Defines the order of layers and add custom layers, please use the appropriate variant for custom layers. | no       | ['grid', 'axes', 'cells', 'legends', 'annotations']         |
| legends         | Please note that legends are ignored when using a custom function for colors.                            | no       | {}                                                          |
| margin          | Chart margin.                                                                                            | no       | {}                                                          |
| motionConfig    | Motion config for react-spring, either a preset or a custom configuration.                               | no       | 'gentle'                                                    |
| onClick         | (cell: ComputedCell, event: MouseEvent) => void                                                          | no       | {}                                                          |
| onMouseEnter    | (cell: ComputedCell, event: MouseEvent) => void                                                          | no       | {}                                                          |
| onMouseLeave    | (cell: ComputedCell, event: MouseEvent) => void                                                          | no       | {}                                                          |
| onMouseMove     | (cell: ComputedCell, event: MouseEvent) => void                                                          | no       | {}                                                          |
| opacity         | Opacity                                                                                                  | no       | 1                                                           |
| renderWrapper   | Render Wrapper                                                                                           | no       | false                                                       |
| role            | Main element role attribute.                                                                             | no       | ""                                                          |
| sizeVariation   | Optionally make the size of the cells vary depending on their value.                                     | no       | false                                                       |
| theme           | Define style for common elements such as labels, axes…                                                   | no       | {}                                                          |
| tooltip         | Custom tooltip component.                                                                                | no       | {}                                                          |
| valueFormat     | Optional formatter for values.                                                                           | no       | {}                                                          |
| width           | Chart width in px.                                                                                       | no       | 940                                                         |
| xInnerPadding   | xInnerPadding                                                                                            | no       | 0                                                           |
| xOuterPadding   | xOuterPadding                                                                                            | no       | 0                                                           |
| xOuterPadding   | xOuterPadding                                                                                            | no       | 0                                                           |
| yOuterPadding   | yOuterPadding                                                                                            | no       | 0                                                           |

Note : CDSHeatMapChart uses Nivo Heatmap. Please refer [@nivo/heatmap](https://nivo.rocks/heatmap/) for more details related to Nivo Heatmap props.

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
