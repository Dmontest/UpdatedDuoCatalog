# cds-react-breadcrumb

Breadcrumbs are location-based waypoints that show the user where they are in an overall content or process hierarchy.

> [Design Guidelines](https://magnetic.cisco.com/0a43ab5cd/p/632c0b-breadcrumb)

## Installation

NPM: `npm i @ciscodesignsystems/cds-react-breadcrumb`

Yarn: `yarn add @ciscodesignsystems/cds-react-breadcrumb`

## Styling and Theme Installation

You will also need to install the styling and needed theme files.

NPM: `npm i @ciscodesignsystems/cds-magnetic-theme-web`

Yarn: `yarn add @ciscodesignsystems/cds-magnetic-theme-web`

Then import the following into your app's css:

```css
@import '@ciscodesignsystems/cds-magnetic-theme-web/css/dist/token-theme-light-variables.css';
@import '@ciscodesignsystems/cds-react-breadcrumb/index.css';
```

### Required

These dependencies must be met in your product:

- [react](https://www.npmjs.com/package/react) >=16.14.0
- [react-dom](https://www.npmjs.com/package/react-dom) >=16.14.0
- @ciscodesignsystems/cds-component-types
- @ciscodesignsystems/cds-component-utilities
- @ciscodesignsystems/cds-react-tooltip

## Usage

```tsx
<CDSFlex direction="vertical" gap={4}>
  <CDSBreadcrumb>
    <CDSBreadcrumb.Link href="#">Level 1</CDSBreadcrumb.Link>
    <CDSBreadcrumb.Link href="#">Level 2</CDSBreadcrumb.Link>
    <CDSBreadcrumb.Link href="#">Level 3</CDSBreadcrumb.Link>
    <CDSBreadcrumb.Link href="#">Level 4</CDSBreadcrumb.Link>
    <CDSBreadcrumb.Link href="#">Level 5</CDSBreadcrumb.Link>
  </CDSBreadcrumb>
</CDSFlex>
```

If your application requires the link to be a different element, you can pass in an `as` prop to modify the component rendered.

```tsx
<CDSFlex direction="vertical" gap={4}>
  <CDSBreadcrumb>
    <CDSBreadcrumb.Link as={CustomLink} href="#" prefetch={false}>
      Level 1
    </CDSBreadcrumb.Link>
    <CDSBreadcrumb.Link as={CustomLink} href="#" prefetch={false}>
      Level 2
    </CDSBreadcrumb.Link>
    <CDSBreadcrumb.Link as={CustomLink} href="#" prefetch={false}>
      Level 3
    </CDSBreadcrumb.Link>
    <CDSBreadcrumb.Link as={CustomLink} href="#" prefetch={false}>
      Level 4
    </CDSBreadcrumb.Link>
    <CDSBreadcrumb.Link as={CustomLink} href="#" prefetch={false}>
      Level 5
    </CDSBreadcrumb.Link>
  </CDSBreadcrumb>
</CDSFlex>
```

## Props

### Breadcrumb.Link

| Name | Description                                             | Default |
| ---- | ------------------------------------------------------- | ------- |
| href | Link to open when clicked (required prop).              | -       |
| as   | Polymorphic prop that renders the HTML component passed | `a`     |
