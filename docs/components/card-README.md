# cds-react-card

Cards are visual containers used to group information.

> [Design Guidelines](https://magnetic.cisco.com/0a43ab5cd/p/60f4a1-card/b/97571f)

## Installation

NPM: `npm i @ciscodesignsystems/cds-react-card`

Yarn: `yarn add @ciscodesignsystems/cds-react-card`

## Styling and Theme Installation

You will also need to install the styling and needed theme files.

NPM: `npm i @ciscodesignsystems/cds-magnetic-theme-web`

Yarn: `yarn add @ciscodesignsystems/cds-magnetic-theme-web`

Then import the following into your app's css:

```css
@import '@ciscodesignsystems/cds-magnetic-theme-web/css/dist/token-theme-light-variables.css';
@import '@ciscodesignsystems/cds-react-card/index.css';
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
  return (
    <CDSCard>
      <!-- Add card content here -->
    </CDSCard>
  );
};
```

## Props

This component inherits props from HTMLDivElement. Overrides and custom props are:

| Name        | Description                                                                                                                                                                                                                                                        | Default |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| status      | Provides accent options for the `Card` component. Acceptable values are `base`, `info`, `positive`, `warning`, `negative`, `dormant`, `excellent`, `in-progress`, `low-warning` and `severe-warning`. This only applies to `dynamic` cards (aka, not interactive). | `base`  |
| interactive | Whether the card is interactive or not.                                                                                                                                                                                                                            | `false` |
| disabled    | Whether to apply disabled styles (decreased opacity).                                                                                                                                                                                                              | `false` |
| selected    | Allows for the `Card` selection state, useful when in a list of interactible cards.                                                                                                                                                                                | `false` |
