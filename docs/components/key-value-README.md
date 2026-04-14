# cds-react-key-value

Key-value pairs are frequently used to display a set of information within a relevant context on the details page.

> [Design Guidelines](https://magnetic.cisco.com/0a43ab5cd/p/31cdc6-key-value-pairs/b/417681)

## Installation

NPM: `npm i @ciscodesignsystems/cds-react-key-value`

Yarn: `yarn add @ciscodesignsystems/cds-react-key-value`

## Styling and Theme Installation

You will also need to install the styling and needed theme files.

NPM: `npm i @ciscodesignsystems/cds-magnetic-theme-web`

Yarn: `yarn add @ciscodesignsystems/cds-magnetic-theme-web`

Then import the following into your app's css:

```css
@import '@ciscodesignsystems/cds-magnetic-theme-web/css/dist/token-theme-light-variables.css';
@import '@ciscodesignsystems/cds-react-key-value/index.css';
```

## Dependencies

### Required

These dependencies must be met in your product:

- [react](https://www.npmjs.com/package/react) >=16.14.0
- [react-dom](https://www.npmjs.com/package/react-dom) >=16.14.0
- @ciscodesignsystems/cds-component-utilities

## Usage

```tsx
const pairs = [
  ['Key one', 'Value one'],
  ['Key two', 'Value two'],
  ['Key three', 'Value three'],
  // Can be ReactNode as well
  [<span style={{ color: 'red' }}>---</span>, <button>Submit</button>],
];

<CDSKeyValue pairs={pairs} size={'sm'} placement={'beside'} />;
```

## Props

| Name       | Description                                          | Required | Default |
| ---------- | ---------------------------------------------------- | -------- | ------- |
| pairs      | An array of key value pairs.                         | yes      |         |
| alignment  | Determines the alignment for the key value pairs.    | no       | left    |
| placement  | Determines the placement for the key value pairs.    | no       | above   |
| size       | Determines the size of key value pairs.              | no       | md      |
| gapBetween | Determines the size gap between the key value pairs. | no       | 16      |
| gapWithin  | Determines the size gap between the key and value.   | no       | 24      |
