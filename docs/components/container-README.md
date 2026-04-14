# cds-react-container

Container UI component is used to group content and actions into logical sections or buckets to form a clear layout and structure of a page.

> [Design Guidelines](https://magnetic.cisco.com/0a43ab5cd/p/60f4a1-card/b/918302)

## Installation

NPM: `npm i @ciscodesignsystems/cds-react-container`

Yarn: `yarn add @ciscodesignsystems/cds-react-container`

## Styling and Theme Installation

You will also need to install the styling and needed theme files.

NPM: `npm i @ciscodesignsystems/cds-magnetic-theme-web`

Yarn: `yarn add @ciscodesignsystems/cds-magnetic-theme-web`

Then import the following into your app's css:

```css
@import '@ciscodesignsystems/cds-magnetic-theme-web/css/dist/token-theme-light-variables.css';
@import '@ciscodesignsystems/cds-react-container/index.css';
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
  <CDSFlex direction="vertical" gap="md">
    <CDSContainer>
      <h1>Hi, I am a container</h1>
    </CDSContainer>
    <CDSContainer margin={[4, 8, 12, 16]}>
      <h1>Hi, I am a container with added margin</h1>
    </CDSContainer>
  </CDSFlex>;
};
```

## Props

| Name       | Description                                         | Required | Default     |
| ---------- | --------------------------------------------------- | -------- | ----------- |
| background | Handles adding a background image to the container. | no       | `undefined` |
| margin     | Provides access to add margin to the container.     | no       | 0           |
