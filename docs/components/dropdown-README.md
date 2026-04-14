# cds-react-dropdown

A dropdown presents a menu of actions or links in a constrained space that will trigger a process or navigate to a new location.

> [Design Guidelines](https://magnetic.cisco.com/0a43ab5cd/p/321929-dropdown)

## Installation

NPM: `npm i @ciscodesignsystems/cds-react-dropdown`

Yarn: `yarn add @ciscodesignsystems/cds-react-dropdown`

## Styling and Theme Installation

You will also need to install the styling and needed theme files.

NPM: `npm i @ciscodesignsystems/cds-magnetic-theme-web`

Yarn: `yarn add @ciscodesignsystems/cds-magnetic-theme-web`

Then import the following into your app's css:

```css
@import '@ciscodesignsystems/cds-magnetic-theme-web/css/dist/token-theme-light-variables.css';
@import '@ciscodesignsystems/cds-react-dropdown/index.css';
```

## Dependencies

### Required

These dependencies must be met in your product:

- [react](https://www.npmjs.com/package/react) >=16.14.0
- [react-dom](https://www.npmjs.com/package/react-dom) >=16.14.0
- @ciscodesignsystems/cds-react-flex
- @ciscodesignsystems/cds-react-button
- @ciscodesignsystems/cds-component-utilities
- @ciscodesignsystems/cds-component-types

### Optional

Optional dependencies will vary depending on your product needs, but may include the following components:

- @floating-ui/react
- @phosphor-icons/react
- framer-motion

## Usage

### Uncontrolled

```tsx
export const Component = () => {
  // ...
  return (
    <CDSDropdown label="Label" defaultOpen={false}>
      <CDSDropdown.Section label="Section 1" divider={true}>
        <CDSDropdown.Item label="Item 1" />
      </CDSDropdown.Section>
      <CDSDropdown.Section label="Section 2" divider={false}>
        <CDSDropdown.Submenu label="Submenu">
          <CDSDropdown.Item label="Item 1" />
          <CDSDropdown.Item label="Item 2" />
        </CDSDropdown.Submenu>
      </CDSDropdown.Section>
    </CDSDropdown>
  );
};
```

### Controlled

```tsx
export const Component = () => {
  const [open, setOpen] = useState<boolean>(true);
  return (
    <CDSDropdown label="Label" onChange={() => setOpen((prev) => !prev)} open={open}>
      <CDSDropdown.Section label="Section 1" divider={true}>
        <CDSDropdown.Item label="Item 1" />
      </CDSDropdown.Section>
      <CDSDropdown.Section label="Section 2" divider={false}>
        <CDSDropdown.Submenu label="Submenu">
          <CDSDropdown.Item label="Item 1" />
          <CDSDropdown.Item label="Item 2" />
        </CDSDropdown.Submenu>
      </CDSDropdown.Section>
    </CDSDropdown>
  );
};
```

## Props

### CDSDropdown

| Name        | Description                                                                                                           | Required | Default     |
| ----------- | --------------------------------------------------------------------------------------------------------------------- | -------- | ----------- |
| children    | This is where you want to insert `CDSDropdown.`-prefixed contextual components in order to create your dropdown menu. | yes      |             |
| label       | Determines the label that appears on the trigger for the dropdown menu.                                               | no       |             |
| placement   | Determines the floating anchor for the menu.                                                                          | no       | left        |
| size        | Determines the size of trigger, menu, menu label and menu items.                                                      | no       | md          |
| destructive | The destructive button flag that indicates that a button’s actions are risky                                          | no       |             |
| icon        | An icon that will be rendered on the left side of the button                                                          | no       |             |
| variant     | The variant of the dropdown trigger button to render                                                                  | no       |             |
| onChange    | Function that will be called when the dropdown is toggled.                                                            | no       | `undefined` |
| open        | Open state for the dropdown. Cannot be used with `defaultOpen`.                                                       | no       | `undefined` |
| defaultOpen | Default state for the dropdown. Cannot be used with `open`.                                                           | no       | `false`     |

### CDSDropdown.Item

| Name         | Description                                                                   | Required | Default |
| ------------ | ----------------------------------------------------------------------------- | -------- | ------- |
| label        | Determines the label for the CDSDropdown.Item.                                | yes      |         |
| icon         | An icon that will be rendered on the left side of the CDSDropdown.Item.       | no       |         |
| trailingIcon | Place icon on the right side of the CDSDropdown.Item.                         | no       | false   |
| destructive  | The destructive button flag that indicates that a button’s actions are risky. | no       | false   |

### CDSDropdown.Submenu

| Name     | Description                                                                                                               | Required | Default |
| -------- | ------------------------------------------------------------------------------------------------------------------------- | -------- | ------- |
| children | This is where you want to insert `CDSDropdown.`-prefixed contextual components in order to create your dropdown sub-menu. | yes      |         |
| label    | Determines the label for the CDSDropdown.Submenu.                                                                         | yes      |         |

### CDSDropdown.Section

| Name     | Description                                                                                                              | Required | Default |
| -------- | ------------------------------------------------------------------------------------------------------------------------ | -------- | ------- |
| children | This is where you want to insert `CDSDropdown.`-prefixed contextual components in order to create your dropdown section. | yes      |         |
| label    | Determines the label for the CDSDropdown.Section.                                                                        | yes      |         |
| divider  | Controls whether to display or not a line divider after the section.                                                     | no       | false   |
