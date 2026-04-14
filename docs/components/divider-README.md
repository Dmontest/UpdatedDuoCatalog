# cds-react-divider

Dividers are used to break up sections vertically or to separate mutually exclusive list items, within a section.

## Installation

NPM: `npm i @ciscodesignsystems/cds-react-divider`

Yarn: `yarn add @ciscodesignsystems/cds-react-divider`

## Styling and Theme Installation

You will also need to install the styling and needed theme files.

NPM: `npm i @ciscodesignsystems/cds-magnetic-theme-web`

Yarn: `yarn add @ciscodesignsystems/cds-magnetic-theme-web`

Then import the following into your app's css:

```css
@import '@ciscodesignsystems/cds-magnetic-theme-web/css/dist/token-theme-light-variables.css';
@import '@ciscodesignsystems/cds-react-divider/index.css';
```

## Dependencies

### Required

These dependencies must be met in your product:

- [react](https://www.npmjs.com/package/react) >=16.14.0
- [react-dom](https://www.npmjs.com/package/react-dom) >=16.14.0
- @ciscodesignsystems/cds-component-types
- @ciscodesignsystems/cds-component-utilities

### Optional

Optional dependencies will vary depending on your product needs, but may include the following components:

- @ciscodesignsystems/cds-react-flex

## Usage

```tsx
export const Component = () => {
  <CDSDivider direction="horizontal" prominence="default" size="md" />;
};
```

## Props

| Name       | Description                                                                   | Required | Default      |
| ---------- | ----------------------------------------------------------------------------- | -------- | ------------ |
| direction  | Determines the direction of the Divider. Accepts `horizontal` and `vertical`. | no       | 'horizontal' |
| size       | Determines the size of the Divider. Accepts `xs`, `sm`, `md`, `lg` and `xl`.  | no       | 'md'         |
| prominence | Determines the neutral shade of the Divider. Accepts `default` and `strong`.  | no       | 'default'    |
| as         | Polymorphic prop that renders the HTML element passed.                        | no       | 'div'        |
