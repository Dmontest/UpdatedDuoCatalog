# cds-react-label

Labels are used to display the text along with information (e.g optional, required, info tooltip).

## Installation

NPM: `npm i @ciscodesignsystems/cds-react-label`

Yarn: `yarn add @ciscodesignsystems/cds-react-label`

## Styling and Theme Installation

You will also need to install the styling and needed theme files.

NPM: `npm i @ciscodesignsystems/cds-magnetic-theme-web`

Yarn: `yarn add @ciscodesignsystems/cds-magnetic-theme-web`

Then import the following into your app's css:

```css
@import '@ciscodesignsystems/cds-magnetic-theme-web/css/dist/token-theme-light-variables.css';
@import '@ciscodesignsystems/cds-react-label/index.css';
```

## Dependencies

### Required

These dependencies must be met in your product:

- [react](https://www.npmjs.com/package/react) >=16.14.0
- [react-dom](https://www.npmjs.com/package/react-dom) >=16.14.0
- @ciscodesignsystems/cds-react-flex
- @ciscodesignsystems/cds-react-text
- @ciscodesignsystems/cds-react-tooltip
- @ciscodesignsystems/cds-component-utilities

### Optional

Optional dependencies will vary depending on your product needs, but may include the following components:

- @phosphor-icons/react

## Usage

```tsx
export const Component = () => {
  return <CDSLabel>Label Text</CDSLabel>;
};
```

## Props

| Name             | Description                                                                                       | Required | Default |
| ---------------- | ------------------------------------------------------------------------------------------------- | -------- | ------- |
| disabled         | To disable Label component on hover.                                                              | no       | false   |
| required         | Display '\*' mark to the label field description.                                                 | no       | false   |
| infoMessage      | Tooltip text to display with info icon and hover combination.                                     | no       |         |
| optional         | Display optional text to the label field description. If a string is provided, that will be shown | no       | false   |
| required         | Display '\*' mark to the label field description.                                                 | no       | false   |
| size             | Size of the label text. Possible values: 'sm', 'md', 'lg'.                                        | no       | 'md'    |
| tooltipPlacement | Set Tooltip display position.                                                                     | no       | 'top'   |

- If both `optional` and `required` prop is true then `required` prop takes precedence.
- Label component extends Text component, all props text props can be used for Label.
