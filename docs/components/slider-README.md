# cds-react-slider

Sliders allow a user to select a value in a range. It consists of a horizontal bar (a range track) and one or two selection node icons. The range track implies the continuum of values, numeric or relative, that a user can select among.

> [Design Guidelines](https://magnetic.cisco.com/0a43ab5cd/p/88ea6a-slider)

## Installation

NPM: `npm i @ciscodesignsystems/cds-react-slider`

Yarn: `yarn add @ciscodesignsystems/cds-react-slider`

## Styling and Theme Installation

You will also need to install the styling and needed theme files.

NPM: `npm i @ciscodesignsystems/cds-magnetic-theme-web`

Yarn: `yarn add @ciscodesignsystems/cds-magnetic-theme-web`

Then import the following into your app's css:

```css
@import '@ciscodesignsystems/cds-magnetic-theme-web/css/dist/token-theme-light-variables.css';
@import '@ciscodesignsystems/cds-react-slider/index.css';
```

## Dependencies

### Required

These dependencies must be met in your product:

- [react](https://www.npmjs.com/package/react) >=16.14.0
- [react-dom](https://www.npmjs.com/package/react-dom) >=16.14.0
- @ciscodesignsystems/cds-react-tooltip
- @ciscodesignsystems/cds-component-types
- @ciscodesignsystems/cds-component-utilities

### Optional

Optional dependencies will vary depending on your product needs, but may include the following components:

- @ciscodesignsystems/cds-react-flex

## Usage

```tsx
export const Component = () => {
  <CDSFlex direction="vertical" gap="md">
    <h3>Basic</h3>
    <CDSSlider value={42} />
    <h3>Range</h3>
    <CDSSlider value={[42, 69]} range />
  </CDSFlex>;
};
```

## Props

| Name             | Description                                                                                                      | Required | Default |
| ---------------- | ---------------------------------------------------------------------------------------------------------------- | -------- | ------- |
| min              | The minimum value the slider can slide to                                                                        | no       | 0       |
| max              | The maximum value the slider can slide to                                                                        | no       | 100     |
| value            | The value of slider. When range is false, use number, otherwise, use [number, number]                            | yes      | -       |
| disabled         | If true, the slider will not be interact-able                                                                    | no       | false   |
| stepSize         | The granularity of the slider which can step through values. Must greater than 0, and be divided by (max - min). | no       | 1       |
| tickSize         | The tick mark interval of the slider. Must greater than 0, and be divided by (max - min).                        | no       | 5       |
| showTicks        | Whether to show tick marks on slider                                                                             | no       | false   |
| showTickLabels   | Whether to show slider value labels                                                                              | no       | false   |
| range            | Dual thumb mode                                                                                                  | no       | false   |
| showTooltip      | If true, Tooltip will show on hover always, or it will not show anyway, even if dragging or hovering             | no       | false   |
| tooltipPlacement | Set Tooltip display position                                                                                     | no       | 'top'   |
| onChange         | Callback function that is fired when the user changes the slider's value                                         | no       |         |
| steps            | To define uneven steps of the slider which can step through values, must be in closed interval [min, max]        | no       |         |
| ticks            | Custom Tick marks of the slider, must be in closed interval [min, max]                                           | no       |         |
| tipFormatter     | Slider will pass its value to tipFormatter, and display its return string in Tooltip                             | no       |         |
| draggableTrack   | Enables the range track draggable functionality, after that click on the segment will be invalid                 | no       | false   |
| handleAriaLabel  | Label value will be passed to the slider button for accessibility                                                | no       |         |
