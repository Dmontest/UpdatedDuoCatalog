# cds-react-skeleton

Skeletons are a low-fidelity representation of content on a page that gives users a preview of what they will see before the content is fully loaded.

> [Design Guidelines](https://magnetic.cisco.com/0a43ab5cd/p/43b10f-progress-and-loading-indicators/b/490eef)

## Installation

NPM: `npm i @ciscodesignsystems/cds-react-skeleton`

Yarn: `yarn add @ciscodesignsystems/cds-react-skeleton`

## Styling and Theme Installation

You will also need to install the styling and needed theme files.

NPM: `npm i @ciscodesignsystems/cds-magnetic-theme-web`

Yarn: `yarn add @ciscodesignsystems/cds-magnetic-theme-web`

Then import the following into your app's css:

```css
@import '@ciscodesignsystems/cds-magnetic-theme-web/css/dist/token-theme-light-variables.css';
@import '@ciscodesignsystems/cds-react-skeleton/index.css';
```

## Dependencies

### Required

These dependencies must be met in your product:

- [react](https://www.npmjs.com/package/react) >=16.14.0
- [react-dom](https://www.npmjs.com/package/react-dom) >=16.14.0
- @ciscodesignsystems/cds-component-utilities

## Usage

```tsx
<CDSSkeleton height="sm" lines={2} shade="dark" />

<CDSSkeleton height="md" lines={3} oblique shade="dark" />

<CDSSkeleton height="lg" lines={4} shade="regular" />

<CDSSkeleton height={72} lines={5} oblique shade="regular" />
```

## Props

| Name    | Description                                                                                                                                                                                                              | Default |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| height  | The size of the skeleton placeholder. sm, md and lg will get your the basic skeletons that are used to indicate loading states of various text elements. If you pass in a number, it becomes the height of the skeleton. | md      |
| lines   | Allows for multiple placeholders to be rendered vertically, mimicking multiple lines of text.                                                                                                                            | 1       |
| oblique | Allows for multiple lines of placeholders to be rendered in a oblique decreasing pattern.                                                                                                                                | false   |
| shade   | Allows for multiple placeholders to be rendered in a particular shade.                                                                                                                                                   | regular |
