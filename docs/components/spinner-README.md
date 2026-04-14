# cds-react-spinner

Spinners are used to indicate that a process or action is in progress, but the duration or current progress of the action is unknown (indeterminate).

> [Design Guidelines](https://magnetic.cisco.com/0a43ab5cd/p/43b10f-progress-and-loading-indicators/b/016102)

## Installation

NPM: `npm i @ciscodesignsystems/cds-react-spinner`

Yarn: `yarn add @ciscodesignsystems/cds-react-spinner`

## Styling and Theme Installation

You will also need to install the styling and needed theme files.

NPM: `npm i @ciscodesignsystems/cds-magnetic-theme-web`

Yarn: `yarn add @ciscodesignsystems/cds-magnetic-theme-web`

Then import the following into your app's css:

```css
@import '@ciscodesignsystems/cds-magnetic-theme-web/css/dist/token-theme-light-variables.css';
@import '@ciscodesignsystems/cds-react-spinner/index.css';
```

## Dependencies

### Required

These dependencies must be met in your product:

- [react](https://www.npmjs.com/package/react) >=16.14.0
- [react-dom](https://www.npmjs.com/package/react-dom) >=16.14.0
- @ciscodesignsystems/cds-react-icons
- @ciscodesignsystems/cds-component-types
- @ciscodesignsystems/cds-component-utilities

## Usage

```tsx
<CDSFlex direction="vertical" gap={'sm'}>
  <CDSSpinner size="sm" />
  <CDSSpinner size="lg" />
  <CDSSpinner size="md" margin={4} />
  <CDSSpinner margin={[4, 8, 12, 16]} />
  <CDSSpinner margin={{ bottom: 12, left: 8, right: 4, top: 16 }} />
  <CDSSpinner label="Spinner label" />
</CDSFlex>
```

## Props

| Name           | Description                                                                              | Required | Default  |
| -------------- | ---------------------------------------------------------------------------------------- | -------- | -------- |
| size           | Provides size to the `Spinner` component. Accepts t-shirt sizes (`sm`, `md`, `lg`, `xl`) | no       | "md"     |
| margin         | Provides access to add margin to spinner.                                                | no       | 0        |
| label          | An optional label for the spinner.                                                       | no       | ""       |
| labelPlacement | Placement of the spinner label.                                                          | no       | "bottom" |
