# cds-react-pie-chart

A pie chart is a circular statistical graphic which is divided into slices to illustrate numerical proportion.

> [Design Guidelines](https://magnetic.cisco.com/0a43ab5cd/p/281fa5-data-visualizations/t/09e547)

## Installation

NPM: `npm i @ciscodesignsystems/cds-react-pie-chart`

Yarn: `yarn add @ciscodesignsystems/cds-react-pie-chart`

## Styling and Theme Installation

You will also need to install the styling and needed theme files.

NPM: `npm i @ciscodesignsystems/cds-magnetic-theme-web`

Yarn: `yarn add @ciscodesignsystems/cds-magnetic-theme-web`

Then import the following into your app's css:

```css
@import '@ciscodesignsystems/cds-magnetic-theme-web/css/dist/token-theme-light-variables.css';
@import '@ciscodesignsystems/cds-react-pie-chart/index.css';
```

## Dependencies

### Required

These dependencies must be met in your product:

- [react](https://www.npmjs.com/package/react) >=16.14.0
- [react-dom](https://www.npmjs.com/package/react-dom) >=16.14.0
- @nivo/pie
- ramda
- @ciscodesignsystems/cds-component-types
- @ciscodesignsystems/cds-component-utilities

### Optional

Optional dependencies will vary depending on your product needs, but may include the following components:

- @ciscodesignsystems/cds-react-flex
- @ciscodesignsystems/cds-react-popover

## Usage

### PieChart

```tsx
<CDSPieChart
  data={[
    { id: 'Java', value: 60 },
    { id: 'Javascript', value: 70 },
    { id: 'Php', value: 30 },
    { id: 'Go', value: 20 },
  ]}
/>
```

### HealthChart

```tsx
<CDSHealthChart progress={75} />
```

### HealthChart With Custom Tooltip

```tsx
<CDSHealthChart
  progress={65}
  tooltip={(d) => (
    <div
      style={{
        border: '2px solid black',
        backgroundColor: 'white',
        borderRadius: '15px',
        padding: '10px',
        width: '200px',
      }}>
      <strong>{d.datum.id}</strong>
      <hr />
      <span
        style={{
          color: d.datum.color,
          fontWeight: '600',
          fontSize: '14px',
        }}>
        {d.datum.label || d.datum.id}: {d.datum.value}%
      </span>
    </div>
  )}
/>
```

> `d` in the code refers to the data object (or datum) passed into the tooltip function. It contains details about the specific data point associated with the tooltip, including properties like `id`, `label`, `color`, and `value`.

## Props

### PieChart

| Name        | Description                                                       | Required | Default                            |
| ----------- | ----------------------------------------------------------------- | -------- | ---------------------------------- |
| bordered    | Enable/disable border of each slice of the chart                  | no       | false                              |
| colors      | Overrides for default colors. Colors list is order of appearance. | no       | []                                 |
| className   | Styling the chart                                                 | no       |                                    |
| data        | Data for pie chart (piechart data format)                         | yes      |                                    |
| donut       | Sets automatic innerRadius to match designs                       | no       | false                              |
| fluid       | Determine whether the graph is fluid or not                       | no       | false                              |
| fontSize    | Size of font in pie label                                         | no       | 10                                 |
| height      | Height of the chart in px                                         | no       | 200                                |
| margin      | Margin from border to display pie slice                           | no       | {top:0, right:0, bottom:0, left:0} |
| innerRadius | innerRadius to match design (overrides donut default value)       | no       | 0                                  |
| patternIds  | IDs of data points requiring diagonal pattern fills.              | no       | []                                 |
| theme       | Customize the chart (e.g. label color, background)                | no       | {}                                 |
| width       | Width of the chart in px                                          | no       | 350                                |

### HealthChart

| Name             | Description                                           | Required | Default                   |
| ---------------- | ----------------------------------------------------- | -------- | ------------------------- |
| keys             | Display progress keys based on given values           | no       | ['Complete','Incomplete'] |
| patternIds       | IDs of data points requiring diagonal pattern fills.  | no       | ['Incomplete']            |
| progress         | Sets colors and styles based on 0 - 100 progre        | yes      |                           |
| showCentricLabel | Enable/disable the label which is displayed in center | no       | false                     |

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
