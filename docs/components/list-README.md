# cds-react-list

Lists describe a group of elements in relation to each other.

> [Design Guidelines](https://www.figma.com/design/03chsH5sSKnIKj3W3YVcWo/%F0%9F%93%96-Magnetic-Component-Guidelines?node-id=83750-12951&t=F1ROGf4lvszvSuLr-4)

## Installation

NPM: `npm i @ciscodesignsystems/cds-react-list`

Yarn: `yarn add @ciscodesignsystems/cds-react-list`

## Styling and Theme Installation

You will also need to install the styling and needed theme files.

NPM: `npm i @ciscodesignsystems/cds-magnetic-theme-web`

Yarn: `yarn add @ciscodesignsystems/cds-magnetic-theme-web`

Then import the following into your app's css:

```css
@import '@ciscodesignsystems/cds-magnetic-theme-web/css/dist/token-theme-light-variables.css';
@import '@ciscodesignsystems/cds-react-list/index.css';
```

## Dependencies

### Required

These dependencies must be met in your product:

- [react](https://www.npmjs.com/package/react) >=16.14.0
- [react-dom](https://www.npmjs.com/package/react-dom) >=16.14.0
- @ciscodesignsystems/cds-component-types
- @ciscodesignsystems/cds-component-utilities
- @ciscodesignsystems/cds-react-flex
- @ciscodesignsystems/cds-react-text

## Usage

Basic Example:

```tsx
import { CDSList } from '@ciscodesignsystems/cds-react-list';

export const unorderedListComponent = () => (
  <CDSList.Unordered leadIn="This is a list lead-in">
    <CDSList.Item>First item</CDSList.Item>
    <CDSList.Item>Second item</CDSList.Item>
    <CDSList.Item>Third item</CDSList.Item>
  </CDSList.Unordered>
);
```

Nested Lists

```tsx
<CDSList.Unordered spacing="compact" size="p2" leadIn="Compact nested list example">
  <CDSList.Item>
    First level
    <CDSList.Unordered>
      <CDSList.Item>Second level item 1</CDSList.Item>
      <CDSList.Item>Second level item 2</CDSList.Item>
    </CDSList.Unordered>
  </CDSList.Item>
  <CDSList.Item>Second item</CDSList.Item>
  <CDSList.Item>Third item</CDSList.Item>
</CDSList.Unordered>
```

## Props

### `<CDSList.Unordered />`

| Name        | Type                           | Description                                                                                                                                                                                                                                                                                                                                                                             | Required | Default     |
| ----------- | ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ----------- |
| `spacing`   | `'compact' \| 'spacious'`      | Controls the vertical spacing between list items and the lead-in.<br/>• **compact**: Built-in paragraph spacing is **8px**, and list item spacing is **2px**.<br/>• **spacious**: Built-in paragraph spacing is **16px**, and list item spacing is **8px**.                                                                                                                             | No       | `'compact'` |
| `size`      | `'p1' \| 'p2' \| 'p3' \| 'p4'` | Size of the text. Accepts `p1`, `p2`, `p3`, `p4`, `xxxs`, `xxs`, `xs`, `sm`. <br>Note : The use of t-shirt sizes in the `CDSText` component is deprecated and will be removed in a future release of CDS in order to align terminology between design and engineering. Please use p1 through p4 as they appear in your Figma designs in the inspector tab under the Typography section. | No       | `'p3'`      |
| `leadIn`    | `string`                       | The lead-in text displayed before the list. It provides context or describes the list’s content and significance.                                                                                                                                                                                                                                                                       | No       | 'undefined' |
| `className` | `string`                       | Additional class names for custom styling.                                                                                                                                                                                                                                                                                                                                              | No       | —           |

---

### `<CDSList.Ordered />`

| Name        | Type                           | Description                                                                                                                                                                                                                                                                                                                                                                             | Required | Default     |
| ----------- | ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ----------- |
| `spacing`   | `'compact' \| 'spacious'`      | Controls the vertical spacing between list items and the lead-in.<br/>• **compact**: Built-in paragraph spacing is **8px**, and list item spacing is **2px**.<br/>• **spacious**: Built-in paragraph spacing is **16px**, and list item spacing is **8px**.                                                                                                                             | No       | `'compact'` |
| `size`      | `'p1' \| 'p2' \| 'p3' \| 'p4'` | Size of the text. Accepts `p1`, `p2`, `p3`, `p4`, `xxxs`, `xxs`, `xs`, `sm`. <br>Note : The use of t-shirt sizes in the `CDSText` component is deprecated and will be removed in a future release of CDS in order to align terminology between design and engineering. Please use p1 through p4 as they appear in your Figma designs in the inspector tab under the Typography section. | No       | `'p3'`      |
| `leadIn`    | `string`                       | The lead-in text displayed before the list. It provides context or describes the list’s content and significance.                                                                                                                                                                                                                                                                       | No       | `undefined` |
| `className` | `string`                       | Additional class names for custom styling.                                                                                                                                                                                                                                                                                                                                              | No       | —           |

> Nested `<CDSList.Ordered />` components automatically adjust their numbering style (`1.`, `a.`, `i.`) for each level.

---

### `<CDSList.Item />`

| Name        | Type          | Description                                                                                    | Required | Default              |
| ----------- | ------------- | ---------------------------------------------------------------------------------------------- | -------- | -------------------- |
| `className` | `string`      | Additional class names for custom styling.                                                     | No       | —                    |
| `size`      | `CDSTextSize` | Overrides the text size for this list item. Inherits from parent list context if not provided. | No       | parent value or `p3` |
