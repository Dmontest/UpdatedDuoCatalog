# cds-react-copy-to-clipboard

Copy to Clipboard is a shortcut button, paired with read-only text strings, that allows users to quickly copy values to their clipboard.

> [Design Guidelines](https://magnetic.cisco.com/0a43ab5cd/p/73fcef-copy-to-clipboard/b/211f92)

## Installation

NPM: `npm i @ciscodesignsystems/cds-react-copy-to-clipboard`

Yarn: `yarn add @ciscodesignsystems/cds-react-copy-to-clipboard`

## Styling and Theme Installation

You will also need to install the styling and needed theme files.

NPM: `npm i @ciscodesignsystems/cds-magnetic-theme-web`

Yarn: `yarn add @ciscodesignsystems/cds-magnetic-theme-web`

Then import the following into your app's css:

```css
@import '@ciscodesignsystems/cds-magnetic-theme-web/css/dist/token-theme-light-variables.css';
@import '@ciscodesignsystems/cds-react-copy-to-clipboard/index.css';
```

## Dependencies

### Required

These dependencies must be met in your product:

- [react](https://www.npmjs.com/package/react) >=16.14.0
- [react-dom](https://www.npmjs.com/package/react-dom) >=16.14.0
- @ciscodesignsystems/cds-component-utilities
- @ciscodesignsystems/cds-react-popover
- @ciscodesignsystems/cds-react-icons
- @ciscodesignsystems/cds-react-text
- @ciscodesignsystems/cds-react-tooltip
- @ciscodesignsystems/cds-react-button

### Optional

Optional dependencies will vary depending on your product needs, but may include the following components:

- @phosphor-icons/react

## Usage

### CDSCopyToClipboard

```tsx
export const Component = () => {
  <CDSCopyToClipboard
    label="Email address"
    value="abc123@cisco.com"
    contained={false}
    buttonText="Copy"
    size="md"
    tooltipTitle="Copy to clipboard"
    onClickTooltipTitle="Copied to clipboard"
  />;
};
```

### CDSCopyToClipboardButton

```tsx
export const Component = () => {
  <CDSCopyToClipboardButton
    value="abc123@cisco.com"
    buttonText="Copy"
    size="md"
    tooltipTitle="Copy to clipboard"
    onClickTooltipTitle="Copied to clipboard"
  />;
};
```

### Icon Only

```tsx
export const Component = () => {
  <CDSCopyToClipboardButton
    value=""
    buttonText=""
    size="md"
    tooltipTitle="Copy to clipboard"
    onClickTooltipTitle="Copied to clipboard"
  />;
};
```

## Props

### CDSCopyToClipboard

| Name                | Description                                                                   | Required | Default |
| ------------------- | ----------------------------------------------------------------------------- | -------- | ------- |
| label               | Text label for the component                                                  | yes      |         |
| value               | Text value to be copied                                                       | yes      |         |
| contained           | Whether the copy button is placed within a container or not                   | no       |         |
| buttonText          | Text to display on the button                                                 | no       |         |
| size                | Size variant for the component                                                | no       | `md`    |
| onClick             | Click event handler for the button                                            | no       |         |
| copyFnOverride      | Function to override the default copy functionality                           | no       |         |
| tooltipTitle        | Title text for the tooltip                                                    | no       |         |
| onClickTooltipTitle | Title text for the tooltip shown after clicking the copy button               | no       |         |
| root                | Optionally specifies the root node, the portal container will be appended to. | no       | null    |

### CDSCopyToClipboardButton

| Name                | Description                                                                   | Required | Default |
| ------------------- | ----------------------------------------------------------------------------- | -------- | ------- |
| value               | Text value to be copied                                                       | yes      |         |
| buttonText          | Text to display on the button                                                 | no       |         |
| size                | Size variant for the component                                                | no       | `md`    |
| onClick             | Click event handler for the button                                            | no       |         |
| copyFnOverride      | Function to override the default copy functionality                           | no       |         |
| tooltipTitle        | Title text for the tooltip                                                    | no       |         |
| onClickTooltipTitle | Title text for the tooltip shown after clicking the copy button               | no       |         |
| root                | Optionally specifies the root node, the portal container will be appended to. | no       | null    |
