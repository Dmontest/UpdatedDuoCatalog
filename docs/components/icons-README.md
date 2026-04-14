# cds-react-icons

A set of customized icons.

## Installation

NPM: `npm i @ciscodesignsystems/cds-react-icons`

Yarn: `yarn add @ciscodesignsystems/cds-react-icons`

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
- @phosphor-icons/react

## Usage

```tsx
import { CDSStatusIcon } from '@ciscodesignsystems/cds-react-icons';

export const Component = () => {
  return <CDSStatusIcon status="positive" width={18} height={18} />;
};
```

## Props

### CDSStatusIcon

> Props extended from ComponentPropsWithRef<'svg'>

| Name          | Description                                                                                                                                                                                                               | Required | Default  |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | -------- |
| status        | The status icon to be used. Acceptable values are "negative", "positive", "warning", "active", "disabled", "inactive", "dormant", "in-progress", "excellent", "low-warning", "severe-warning", "allow", "deny" and "info" | yes      |          |
| variation     | A variation for the icon. Acceptable values are "none" and "bordered". Only applies to `info`, `negative`, `positive` and `warning` and **can not** be used when `hasBackground` is set to `true`.                        | no       | `"none"` |
| hasBackground | Controls whether the icon has a status matching background. Applies to all status except: `active`, `inactive`, `allow` and `deny`.                                                                                       | no       | `false`  |

### CiscoIcon

> Props extended from ComponentPropsWithoutRef<'svg'>

| Name | Description                                                                        | Required | Default |
| ---- | ---------------------------------------------------------------------------------- | -------- | ------- |
| size | The size of the icon to render. Acceptable values are "xs", "sm", "md", "lg", "xl" | no       |         |

### CDSLogo

| Name                | Description                                                       | Default |
| ------------------- | ----------------------------------------------------------------- | ------- |
| size                | The size of the logo to render.                                   | sm      |
| primarySentiment    | The sentiment of the logo's primary colored regions to render.    | -       |
| primaryUsage        | The usage of the logo's primary colored regions to render.        | -       |
| primaryProminence   | The prominence of the logo's primary colored regions to render.   | -       |
| secondarySentiment  | The sentiment of the logo's secondary colored regions to render.  | -       |
| secondaryUsage      | The usage of the logo's secondary colored regions to render.      | -       |
| secondaryProminence | The prominence of the logo's secondary colored regions to render. | -       |
| className           | The className of the logo to render.                              | ""      |

### CDSLogoCisco

| Name                | Description                                                       | Default |
| ------------------- | ----------------------------------------------------------------- | ------- |
| size                | The size of the logo to render.                                   | sm      |
| primarySentiment    | The sentiment of the logo's primary colored regions to render.    | -       |
| primaryUsage        | The usage of the logo's primary colored regions to render.        | -       |
| primaryProminence   | The prominence of the logo's primary colored regions to render.   | -       |
| secondarySentiment  | The sentiment of the logo's secondary colored regions to render.  | -       |
| secondaryUsage      | The usage of the logo's secondary colored regions to render.      | -       |
| secondaryProminence | The prominence of the logo's secondary colored regions to render. | -       |
| className           | The className of the logo to render.                              | ""      |
