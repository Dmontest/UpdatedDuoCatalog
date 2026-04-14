# cds-react-legend

A legend makes it easier to tell at a glance which series or series items correspond to which pieces of data. In short a legend provides information about the series rendered in the chart.

> [Design Guidelines](https://magnetic.cisco.com/0a43ab5cd/p/281fa5-data-visualizations/t/262886)

## Installation

NPM: `npm i @ciscodesignsystems/cds-react-legend`

Yarn: `yarn add @ciscodesignsystems/cds-react-legend`

## Styling and Theme Installation

You will also need to install the styling and needed theme files.

NPM: `npm i @ciscodesignsystems/cds-magnetic-theme-web`

Yarn: `yarn add @ciscodesignsystems/cds-magnetic-theme-web`

Then import the following into your app's css:

```css
@import '@ciscodesignsystems/cds-magnetic-theme-web/css/dist/token-theme-light-variables.css';
@import '@ciscodesignsystems/cds-react-legend/index.css';
```

## Dependencies

### Required

These dependencies must be met in your product:

- [react](https://www.npmjs.com/package/react) >=16.14.0
- [react-dom](https://www.npmjs.com/package/react-dom) >=16.14.0
- @ciscodesignsystems/cds-react-flex
- @ciscodesignsystems/cds-react-text
- @ciscodesignsystems/cds-component-utilities

## Usage

```tsx
export const Component = () => {
  <CDSLegend
    kind='solid'
    direction='horizontal'
    items={[
      {
        label: 'Dollar',
        color: '#a7adb5ff',
      },
      {
        label: 'Euro',
        color: '#7aa7f5ff',
      },
    ]}
  />
};

export const Component = () => {
  <CDSLegend.Item
    kind='solid'
    color='#049fd9ff'
    label='Legend Item 1'
  />
  <CDSLegend.Item
    kind='solid'
    color='#0d56e2ff'
    label='Legend Item 2'
  />
  <CDSLegend.Item
    kind='solid'
    color='#b180d6ff'
    label='Legend Item 3'
  />
};
```

## Props

### CDSLegend

| Name      | Description                                                      | Required | Default      |
| --------- | ---------------------------------------------------------------- | -------- | ------------ |
| direction | Provides access to vertical or horizontal layout.                | yes      | 'horizontal' |
| items     | An array of data for each legend item.                           | yes      | []           |
| kind      | The style kind of the legend markers (solid, dashed, or square). | yes      | 'solid'      |

### CDSLegend.Item

| Name  | Description                                                      | Required | Default |
| ----- | ---------------------------------------------------------------- | -------- | ------- |
| color | The color for the legend item.                                   | yes      |         |
| index | The index of the legend item.                                    | no       |         |
| kind  | The style kind of the legend markers (solid, dashed, or square). | no       | 'solid' |
| label | The label to display for the legend item.                        | yes      |         |

### CDSLegend.Marker

| Name  | Description                                                      | Required | Default |
| ----- | ---------------------------------------------------------------- | -------- | ------- |
| color | The color for the legend marker.                                 | yes      |         |
| kind  | The style kind of the legend markers (solid, dashed, or square). | no       | 'solid' |

### CDSLegendMarkerData

| Name  | Description                                            | Required | Default |
| ----- | ------------------------------------------------------ | -------- | ------- |
| color | The color associated with the legend marker            | yes      |         |
| label | The label to be displayed alongside the legend marker. | yes      |         |
| key   | Unique key to identify each legend item.               | no       |         |
