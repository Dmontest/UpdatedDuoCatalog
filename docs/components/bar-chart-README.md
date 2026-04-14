# cds-react-bar-chart

Bar graphs use vertical or horizontal bars to display numerical comparisons between categories.

> [Design Guidelines](https://magnetic.cisco.com/0a43ab5cd/p/281fa5-data-visualizations/t/45d767)

## Installation

NPM: `npm i @ciscodesignsystems/cds-react-bar-chart`

Yarn: `yarn add @ciscodesignsystems/cds-react-bar-chart`

## Styling and Theme Installation

You will also need to install the styling and needed theme files.

NPM: `npm i @ciscodesignsystems/cds-magnetic-theme-web`

Yarn: `yarn add @ciscodesignsystems/cds-magnetic-theme-web`

Then import the following into your app's css:

```css
@import '@ciscodesignsystems/cds-magnetic-theme-web/css/dist/token-theme-light-variables.css';
```

## Dependencies

### Required

These dependencies must be met in your product:

- [react](https://www.npmjs.com/package/react) >=16.14.0
- [react-dom](https://www.npmjs.com/package/react-dom) >=16.14.0
- @ciscodesignsystems/cds-component-types
- @ciscodesignsystems/cds-component-utilities

## Usage

```tsx
export const Component = () => {
  const data = [
    {
      country: 'AD',
      'hot dog': 101,
      burger: 29,
      sandwich: 86,
      kebab: 113,
      fries: 167,
      donut: 93,
    },
    {
      country: 'AE',
      'hot dog': 170,
      burger: 178,
      sandwich: 199,
      kebab: 195,
      fries: 115,
      donut: 22,
    },
    {
      country: 'AF',
      'hot dog': 58,
      burger: 156,
      sandwich: 100,
      kebab: 34,
      fries: 75,
      donut: 151,
    },
  ];

  const keys = ['hot dog', 'burger', 'sandwich', 'kebab', 'fries', 'donut'];

  <CDSBarChart
    {...args}
    axes={{
      yAxis: {
        values: [0, 50, 100, 150, 200],
      },
      xAxis: {
        values: [0, 50, 100, 150, 200],
      },
    }}
    data={data}
    colorBy="country"
    colors={['#f6f5ffff', '#e0dcfaff', '#c8c1f5ff', '#b1a8f0ff', '#9c90e8ff', '#887be3ff']}
    patternIds={['No Motion', 'Closed']}
    keys={keys}
  />;
};
```

### If fluid = `true`

If fluid is true, you need to provide width and height to the parent container of the bar chart.

```tsx
export const Component = () => {
  <div style={{ width: '100%', height: '400px' }}>
    <CDSBarChart
      {...args}
      data={data}
      colorBy="country"
      patternIds={['Incomplete']}
      keys={keys}
      fluid={true}
    />
  </div>;
};
```

### With Custom Tooltip

```tsx
export const Component = () => {
  <CDSBarChart
    {...args}
    data={data}
    colorBy="country"
    patternIds={['Incomplete']}
    keys={keys}
    tooltip={({ id, value, color }) => (
      <div
        style={{
          padding: 12,
          color,
          background: '#222222',
          borderRadius: 4,
          textAlign: 'center',
        }}>
        <span>Look, I am a custom tooltip :)</span>
        <br />
        <strong>
          {id}: {value}
        </strong>
      </div>
    )}
  />;
};
```

## Props

| Name          | Description                                                                                                                                                               | Required | Default        |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | -------------- |
| axes          | Bar Axis configuration object                                                                                                                                             | no       |                |
| baseline      | Where to draw a baseline on the y-axis                                                                                                                                    | no       |                |
| horizontal    | A Flag to change bar chart's layout                                                                                                                                       | no       |                |
| keys          | Key in the data object to use as bars                                                                                                                                     | no       |                |
| layout        | Layout of the bar graph                                                                                                                                                   | no       |                |
| legends       | Configurable Legends object                                                                                                                                               | no       |                |
| patternIds    | IDs of data points requiring diagonal pattern fills                                                                                                                       | no       | ['Incomplete'] |
| progress      | Progress percentage to fill                                                                                                                                               | no       |                |
| fluid         | Determine whether the graph is fluid or not. Provide width and height to the parent container when setting fluid = true                                                   | no       | false          |
| width         | Width of Chart in px                                                                                                                                                      | no       | 350            |
| height        | Height of Chart in px                                                                                                                                                     | no       | 200            |
| fontSize      | Define the font size of the x and y axis texts                                                                                                                            | no       | 10             |
| reverse       | Reverse the y axis                                                                                                                                                        | no       |                |
| gridX         | Whether to show the X grid                                                                                                                                                | no       | false          |
| gridY         | Whether to show the Y grid                                                                                                                                                | no       | true           |
| data          | Dataset for Bar Chart                                                                                                                                                     | yes      | -              |
| colors        | Colors for Bar Chart                                                                                                                                                      | no       | -              |
| baseline      | Value to use to draw a dotted baseline                                                                                                                                    | no       | 0              |
| labelPosition | Position of the label                                                                                                                                                     | no       | `'middle'`     |
| tooltip       | Custom tooltip component. An optional component allowing complete tooltip customisation, it must return a valid HTML element and will receive the bar data as a property. | no       |                |

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
