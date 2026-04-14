# cds-react-checkbox

Used for selecting multiple values from several options. Do not use when the user should only select one option, use Radio button instead. If checking the box enacts an immediate result, use Toggle instead.

> [Design Guidelines](https://magnetic.cisco.com/0a43ab5cd/p/71e3ca-checkbox-)

## Installation

NPM: `npm i @ciscodesignsystems/cds-react-checkbox`

Yarn: `yarn add @ciscodesignsystems/cds-react-checkbox`

## Styling and Theme Installation

You will also need to install the styling and needed theme files.

NPM: `npm i @ciscodesignsystems/cds-magnetic-theme-web`

Yarn: `yarn add @ciscodesignsystems/cds-magnetic-theme-web`

Then import the following into your app's css:

```css
@import '@ciscodesignsystems/cds-magnetic-theme-web/css/dist/token-theme-light-variables.css';
@import '@ciscodesignsystems/cds-react-checkbox/index.css';
```

## Dependencies

### Required

These dependencies must be met in your product:

- [react](https://www.npmjs.com/package/react) >=16.14.0
- [react-dom](https://www.npmjs.com/package/react-dom) >=16.14.0
- @ciscodesignsystems/cds-component-utilities

## Usage

```tsx
export const Component = (args) => {
  const [checked, setChecked] = useState(false);
  return (
    <CDSCheckbox
      checked={checked}
      onChange={(event) => {
        setChecked((prev) => !prev);
      }}>
      Checkbox
    </CDSCheckbox>
  );
};
```

## Props

This component inherits props from HTMLInputElement. Overrides and custom props are:

| Name          | Description                                                                                                             | Default |
| ------------- | ----------------------------------------------------------------------------------------------------------------------- | ------- |
| size          | Size of the checkbox. Acceptable values are `sm` and `md`.                                                              | `md`    |
| indeterminate | Determines if the `CDSCheckbox` should be rendered in its indeterminate state. Acceptable values are `true` or `false`. | `false` |
