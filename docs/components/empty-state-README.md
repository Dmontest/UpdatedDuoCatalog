# cds-react-empty-state

Empty states appear when there is no data to display to the user.

> [Design Guidelines](https://magnetic.cisco.com/0a43ab5cd/p/848e17-empty-state)

## Installation

NPM: `npm i @ciscodesignsystems/cds-react-empty-state`

Yarn: `yarn add @ciscodesignsystems/cds-react-empty-state`

## Styling and Theme Installation

You will also need to install the styling and needed theme files.

NPM: `npm i @ciscodesignsystems/cds-magnetic-theme-web`

Yarn: `yarn add @ciscodesignsystems/cds-magnetic-theme-web`

Then import the following into your app's css:

```css
@import '@ciscodesignsystems/cds-magnetic-theme-web/css/dist/token-theme-light-variables.css';
@import '@ciscodesignsystems/cds-react-empty-state/index.css';
```

## Dependencies

### Required

These dependencies must be met in your product:

- [react](https://www.npmjs.com/package/react) >=16.14.0
- [react-dom](https://www.npmjs.com/package/react-dom) >=16.14.0
- @ciscodesignsystems/cds-react-icons
- @ciscodesignsystems/cds-component-utilities

## Usage

### Basic box style

```tsx
<CDSEmptyState style={{ height: '22px' }}>
  <CDSEmptyState.Message> Required brief description in one line.</CDSEmptyState.Message>
</CDSEmptyState>
```

### Basic illustrate style

```tsx
<CDSEmptyState>
  <CDSFlex>
    <CDSEmptyState.Illustration aria-labelledby="empty-message-id" variant="positive" />
    <div style={{ textAlign: 'center' }}>
      <CDSEmptyState.Title>Title goes here</CDSEmptyState.Title>
      <CDSEmptyState.Message id="empty-message-id">
        The message in an empty illustration provides information about what kind of data should or
        will appear when data is populated.
      </CDSEmptyState.Message>
      <CDSButton>Optional Button</CDSButton>
    </div>
  </CDSFlex>
</CDSEmptyState>
```

## Props

| Name     | Description                                                | Required | Default |
| -------- | ---------------------------------------------------------- | -------- | ------- |
| children | ReactElement to display empty state illustrate and message | yes      |         |
