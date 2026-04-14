# cds-react-numeral

Magnetic uses large numeral headings to display data dynamically and programmatically. All large numeral styles use bold Sharp Sans.

> [Design Guidelines](https://magnetic.cisco.com/0a43ab5cd/p/4119aa-typography/t/76bd68)
>
> For **Content Design** and **UX writing best practices** visit [Foundations - Content Design - Magnetic Design System](https://magnetic.cisco.com/0a43ab5cd/p/583e31-content-design).

## Installation

NPM: `npm i @ciscodesignsystems/cds-react-numeral`

Yarn: `yarn add @ciscodesignsystems/cds-react-numeral`

## Styling and Theme Installation

You will also need to install the styling and needed theme files.

NPM: `npm i @ciscodesignsystems/cds-magnetic-theme-web`

Yarn: `yarn add @ciscodesignsystems/cds-magnetic-theme-web`

Then import the following into your app's css:

```css
@import '@ciscodesignsystems/cds-magnetic-theme-web/css/dist/token-theme-light-variables.css';
@import '@ciscodesignsystems/cds-react-numeral/index.css';
```

## Dependencies

### Required

These dependencies must be met in your product:

- [react](https://www.npmjs.com/package/react) >=16.14.0
- [react-dom](https://www.npmjs.com/package/react-dom) >=16.14.0
- @ciscodesignsystems/cds-component-utilities
- @ciscodesignsystems/cds-component-types

## Usage

```tsx
export const Component = () => {
  <Numeral size="n1" value="100" unit="kbps" />;
};
```

## Props

| Name  | Description                                  | Required | Default |
| ----- | -------------------------------------------- | -------- | ------- |
| size  | Controls the font size for the Numeral text. | no       | `'n3'`  |
| value | The numeral value to be displayed.           | yes      |         |
| unit  | An optional unit to describe the numeral.    | no       |         |
