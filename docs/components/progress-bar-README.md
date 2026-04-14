# cds-react-progress-bar

Progress and loading indicators are temporary animations used to inform users that a process or action is in progress, providing feedback to users and to improve perceived load time. A Progress Bar visually represents the completion status of a task or process. It shows how much has been completed, and how much is left.

> [Design Guidelines](https://magnetic.cisco.com/0a43ab5cd/p/43b10f-progress-and-loading-indicators/b/329b35)

## Installation

NPM: `npm i @ciscodesignsystems/cds-react-progress-bar`

Yarn: `yarn add @ciscodesignsystems/cds-react-progress-bar`

## Styling and Theme Installation

You will also need to install the styling and needed theme files.

NPM: `npm i @ciscodesignsystems/cds-magnetic-theme-web`

Yarn: `yarn add @ciscodesignsystems/cds-magnetic-theme-web`

Then import the following into your app's css:

```css
@import '@ciscodesignsystems/cds-magnetic-theme-web/css/dist/token-theme-light-variables.css';
@import '@ciscodesignsystems/cds-react-progress-bar/index.css';
```

## Dependencies

### Required

These dependencies must be met in your product:

- [react](https://www.npmjs.com/package/react) >=16.14.0
- [react-dom](https://www.npmjs.com/package/react-dom) >=16.14.0
- @ciscodesignsystems/cds-react-icons
- @ciscodesignsystems/cds-component-utilities

## Usage

```tsx
<CDSProgressBar
  value={100}
  status={'positive'}
  showInfo
  label={'Label'}
  helpText={'Helper text'}
  labelAlignment={'centered'}
/>
```

## Props

This component inherits props from HTMLDivElement. Overrides and custom props are:

| Name           | Description                                                                        | Required | Default     |
| -------------- | ---------------------------------------------------------------------------------- | -------- | ----------- |
| value          | The current completed value.                                                       | no       | `1`         |
| max            | The current max value.                                                             | no       | `100`       |
| showInfo       | Whether to display the progress label and the status icon.                         | no       | `false`     |
| status         | To set the status of the Progress. Accepts `negative`, `positive` and `control`.   | no       | `control`   |
| size           | The size of component. Accepts `sm` and `md`.                                      | no       | `md`        |
| label          | The label for the component.                                                       | no       | `undefined` |
| labelAlignment | The label alignment for the component. Accepts `inline`, `stacked` and `centered`. | no       | `inline`    |
| helpText       | The help text for the component.                                                   | no       | `undefined` |
