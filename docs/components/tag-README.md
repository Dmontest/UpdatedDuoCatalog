# cds-react-tag

Used to categorize or mark by dimension or property.

> [Design Guidelines](https://magnetic.cisco.com/0a43ab5cd/p/716124-tag)

## Installation

NPM: `npm i @ciscodesignsystems/cds-react-tag`

Yarn: `yarn add @ciscodesignsystems/cds-react-tag`

## Styling and Theme Installation

You will also need to install the styling and needed theme files.

NPM: `npm i @ciscodesignsystems/cds-magnetic-theme-web`

Yarn: `yarn add @ciscodesignsystems/cds-magnetic-theme-web`

Then import the following into your app's css:

```css
@import '@ciscodesignsystems/cds-magnetic-theme-web/css/dist/token-theme-light-variables.css';
@import '@ciscodesignsystems/cds-react-tag/index.css';
```

## Dependencies

### Required

These dependencies must be met in your product:

- [react](https://www.npmjs.com/package/react) >=16.14.0
- [react-dom](https://www.npmjs.com/package/react-dom) >=16.14.0
- @ciscodesignsystems/cds-react-icons
- @ciscodesignsystems/cds-react-checkbox
- @ciscodesignsystems/cds-react-popover
- @ciscodesignsystems/cds-component-types
- @ciscodesignsystems/cds-react-tooltip
- @ciscodesignsystems/cds-component-utilities

### Optional

Optional dependencies will vary depending on your product needs, but may include the following components:

- @phosphor-icons/react

## Usage

```tsx
export const Component = () => {
  return (
    <CDSFlex direction="vertical" gap="sm">
      <CDSTag size="lg" icon={<AndroidLogo />}>
        Hi there!
      </CDSTag>
      <CDSTag.Colored color="accentE">Color Tag</CDSTag.Colored>
      <CDSTag.Binary label="Active" />
      <CDSTag.Binary label="Inactive" active={false} />
      <CDSTag.Selectable selected={true}>Selectable Tag</CDSTag.Selectable>
      <CDSTag.Overflow tagCount={2}>
        <CDSTag>Tag 1</CDSTag>
        <CDSTag>Tag 2</CDSTag>
        <CDSTag>Tag 3</CDSTag>
        <CDSTag>Tag 4</CDSTag>
        <CDSTag>Tag 5</CDSTag>
      </CDSTag.Overflow>
    </CDSFlex>
  );
};
```

## Props

### CDSTag

| Name       | Description                                                                                                                                                                                                    | Required | Default        |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | -------------- |
| dashed     | Select whether the tag should have dashed border.                                                                                                                                                              | no       | false          |
| icon       | For adding icon along with text.                                                                                                                                                                               | no       |                |
| onClose    | Function to execute when close tag button is clicked.                                                                                                                                                          | no       |                |
| closeLabel | String label for the close button's aria-label.                                                                                                                                                                | no       | 'Close Button' |
| size       | Selects size of tag from predetermined list.                                                                                                                                                                   | no       | 'md'           |
| wrap       | Wrap text based on available width.                                                                                                                                                                            | no       | true           |
| textAlign  | Aligns text inside the tag.                                                                                                                                                                                    | no       | 'center'       |
| status     | Select tag status from predetermined list.                                                                                                                                                                     | no       |                |
| truncated  | Controls whether the tag is truncated. Can be boolean or number. If set to true, will be truncated after 5 characters. If a number is provided, it specifies the maximum length of the text before truncation. | no       | false          |

### CDSTag.Colored

| Name      | Description                                                                                                                                                                                                    | Required | Default   |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------- |
| size      | Selects size of tag from predetermined list.                                                                                                                                                                   | no       | 'md'      |
| color     | For selecting the color variant of the tag.                                                                                                                                                                    | no       | 'accentA' |
| children  | Property to add tag content.                                                                                                                                                                                   | yes      |           |
| truncated | Controls whether the tag is truncated. Can be boolean or number. If set to true, will be truncated after 5 characters. If a number is provided, it specifies the maximum length of the text before truncation. | no       | false     |
| variant   | Determines the tone of the color token                                                                                                                                                                         | no       | 'primary' |
| onClose   | Callback function triggered when the tag close button is clicked.                                                                                                                                              | no       |           |
| icon      | Optional icon element displayed before the tag text.                                                                                                                                                           | no       |           |

### CDSTag.Binary

| Name   | Description                                               | Required | Default |
| ------ | --------------------------------------------------------- | -------- | ------- |
| active | Determine the state of the binary tag. True means active. | no       | true    |
| label  | The label of the binary tag.                              | no       |         |
| size   | The size of the binary tag.                               | no       | md      |

### CDSTag.Selectable

| Name      | Description                                                                                                                                                                                                    | Required | Default |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------- |
| children  | Property to add tag content.                                                                                                                                                                                   | yes      |         |
| size      | Selects size of tag from predetermined list.                                                                                                                                                                   | no       | 'md'    |
| selected  | Decides whether the tag is selected.                                                                                                                                                                           | no       | false   |
| wrap      | Wrap text based on available width.                                                                                                                                                                            | no       | true    |
| icon      | For adding icon along with text.                                                                                                                                                                               | no       |         |
| truncated | Controls whether the tag is truncated. Can be boolean or number. If set to true, will be truncated after 5 characters. If a number is provided, it specifies the maximum length of the text before truncation. | no       | false   |

### CDSTag.Overflow

| Name     | Description                                                                                                                                                                         | Required | Default |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------- |
| children | Property to add tag list. (list of CDSTag or CDSTag.Selectable)                                                                                                                     | yes      |         |
| tagCount | After this count, the rest of the tag list will be displayed in the overflow container. The prop value should be greater than `zero` and less than the count of the total tag list. | no       | 3       |
