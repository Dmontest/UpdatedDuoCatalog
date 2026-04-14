# cds-react-heading

Heading UI component can be used to add different types of heading in a page like Primary title (like Page title, modal title, drawer title), Section title, Sub-section title, Smallest title etc.

> [Design Guidelines](https://magnetic.cisco.com/0a43ab5cd/p/4119aa-typography/t/658ee7)
>
> For **Content Design** and **UX writing best practices** visit [Foundations - Content Design - Magnetic Design System](https://magnetic.cisco.com/0a43ab5cd/p/583e31-content-design).

## Installation

NPM: `npm i @ciscodesignsystems/cds-react-heading`

Yarn: `yarn add @ciscodesignsystems/cds-react-heading`

## Styling and Theme Installation

You will also need to install the styling and needed theme files.

NPM: `npm i @ciscodesignsystems/cds-magnetic-theme-web`

Yarn: `yarn add @ciscodesignsystems/cds-magnetic-theme-web`

Then import the following into your app's css:

```css
@import '@ciscodesignsystems/cds-magnetic-theme-web/css/dist/token-theme-light-variables.css';
@import '@ciscodesignsystems/cds-react-heading/index.css';
```

## Dependencies

### Required

These dependencies must be met in your product:

- [react](https://www.npmjs.com/package/react) >=16.14.0
- [react-dom](https://www.npmjs.com/package/react-dom) >=16.14.0
- @ciscodesignsystems/cds-component-types
- @ciscodesignsystems/cds-component-utilities

## Usage

```tsx
export const Component = () => {
  <CDSFlex direction="vertical" gap="xs">
    <CDSHeading size="primary" margin={4}>
      Page Title, Modal title, Drawer title
    </CDSHeading>
    <CDSHeading size="section" margin={[4, 8, 12, 16]}>
      Section title
    </CDSHeading>
    <CDSHeading size="sub-section" margin={{ bottom: 12, left: 8, right: 4, top: 16 }}>
      Sub-section title
    </CDSHeading>
    <CDSHeading size="smallest" margin={[12, 16]}>
      Smallest title
    </CDSHeading>
  </CDSFlex>;
};
```

## Props

| Name   | Description                                                                                                                                                                                                                                            | Required | Default   |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- | --------- |
| size   | Determines the size of the `Heading`. Accepts `xxs`, `xs`, `sm`, `md`, `lg`, `xl`, `primary`, `section`, `sub-section` and `smallest`.                                                                                                                 | no       | 'section' |
| margin | Provides access to add margin to the heading. Accepts type `MarginNumber`, `[MarginNumber]`, `[MarginNumber, MarginNumber]`, `[MarginNumber, MarginNumber, MarginNumber]`, `[MarginNumber, MarginNumber, MarginNumber, MarginNumber]`, `MarginObject`. | no       | 0         |
| as     | Polymorphic prop that renders the HTML element passed. Accepts `h1`, `h2`, `h3` , `h4`                                                                                                                                                                 | no       | 'h2'      |
