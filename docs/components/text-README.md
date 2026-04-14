# cds-react-text

Text component that adheres to Magnetic design guidelines.

> [Design Guidelines](https://magnetic.cisco.com/0a43ab5cd/p/4119aa-typography/b/46ab8c)
>
> For **Content Design** and **UX writing best practices** visit [Foundations - Content Design - Magnetic Design System](https://magnetic.cisco.com/0a43ab5cd/p/583e31-content-design).

## Installation

NPM: `npm i @ciscodesignsystems/cds-react-text`

Yarn: `yarn add @ciscodesignsystems/cds-react-text`

## Styling and Theme Installation

You will also need to install the styling and needed theme files.

NPM: `npm i @ciscodesignsystems/cds-magnetic-theme-web`

Yarn: `yarn add @ciscodesignsystems/cds-magnetic-theme-web`

Then import the following into your app's css:

```css
@import '@ciscodesignsystems/cds-magnetic-theme-web/css/dist/token-theme-light-variables.css';
@import '@ciscodesignsystems/cds-react-text/index.css';
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
  return (
    <>
      <CDSText color="regular">This is the regular color.</CDSText>
      <CDSText color="light">This is the light color.</CDSText>
      <CDSText color="blue">This is the blue color.</CDSText>
      <CDSText weight="regular">This is the regular weight.</CDSText>
      <CDSText weight="semi-bold">This is the semi-bold weight.</CDSText>
      <CDSText weight="bold">This is the bold weight.</CDSText>
    </>
  );
};
```

## Props

| Name      | Description                                                                                                                                                                                                                                                                                                                                                                             | Required | Default |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------- |
| align     | Aligns the text to the left, right, or center. sets the textAlign css property.                                                                                                                                                                                                                                                                                                         | no       | left    |
| as        | The "as" prop allows user to replace rendered HTML elements in a Text component from the outside.                                                                                                                                                                                                                                                                                       | no       | p       |
| color     | Sets the color of the text. Accepts `"regular"` and `"light"` presets or any string that gets mapped directly to the CSS `color` attribute.                                                                                                                                                                                                                                             | no       | regular |
| compact   | Removes any padding added by the tags CSS, `<p>` in particular.                                                                                                                                                                                                                                                                                                                         | no       | false   |
| ellipsis  | Truncate text using ellipsis.                                                                                                                                                                                                                                                                                                                                                           | no       | false   |
| monospace | Should the font face be monospace                                                                                                                                                                                                                                                                                                                                                       | no       | false   |
| size      | Size of the text. Accepts `p1`, `p2`, `p3`, `p4`, `xxxs`, `xxs`, `xs`, `sm`. <br>Note : The use of t-shirt sizes in the `CDSText` component is deprecated and will be removed in a future release of CDS in order to align terminology between design and engineering. Please use p1 through p4 as they appear in your Figma designs in the inspector tab under the Typography section. | no       | p3      |
| weight    | The font-weight of the text. Accepts regular, semi-bold, bold.                                                                                                                                                                                                                                                                                                                          | no       | regular |
| width     | Width of the text.                                                                                                                                                                                                                                                                                                                                                                      | no       |         |
