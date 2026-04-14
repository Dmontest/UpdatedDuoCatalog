# cds-react-button

Buttons communicate action and direct intent. Users select a choice and take action on it in the single
press of a button. Icons that can be pressed are also considered buttons.

> [Design Guidelines](https://magnetic.cisco.com/0a43ab5cd/p/56608b-button)

## Installation

NPM: `npm i @ciscodesignsystems/cds-react-button`

Yarn: `yarn add @ciscodesignsystems/cds-react-button`

## Styling and Theme Installation

You will also need to install the styling and needed theme files.

NPM: `npm i @ciscodesignsystems/cds-magnetic-theme-web`

Yarn: `yarn add @ciscodesignsystems/cds-magnetic-theme-web`

Then import the following into your app's css:

```css
@import '@ciscodesignsystems/cds-magnetic-theme-web/css/dist/token-theme-light-variables.css';
@import '@ciscodesignsystems/cds-react-button/index.css';
```

## Dependencies

### Required

These dependencies must be met in your product:

- [react](https://www.npmjs.com/package/react) >=16.14.0
- [react-dom](https://www.npmjs.com/package/react-dom) >=16.14.0
- @ciscodesignsystems/cds-component-types
- @ciscodesignsystems/cds-component-utilities
- @ciscodesignsystems/cds-react-spinner

### Optional

Optional dependencies will vary depending on your product needs, but may include the following components:

- @ciscodesignsystems/cds-react-icons
- @ciscodesignsystems/cds-react-dropdown (required for CDSButton.Split)
- phosphor-icons

## Theming

### Primary

Primary buttons indicate a main action. They are focal actions, and so only one primary button should be used in one section of a page, card, or visual grouping.

### Secondary

Secondary buttons are used for actions of lesser importance, for options, or for infrequently used actions.

### Tertiary (text button)

Tertiary buttons are of lesser importance than secondary buttons. They provide further visual hierarchy in interfaces that are action dense.

### Primary destructive

Primary destruction buttons have the same focal importance as primary buttons. The destructive button style indicates that a button’s actions are risky, such as deletion, authorization, or configurations that would be difficult (or not possible) to change once set.

### Secondary destructive

Secondary destructive buttons are of lesser importance, just as secondary buttons are, but using their actions hold risk.

### Icon-only

Icon-only buttons represent actions with icons instead of text. If the icon is common and well understood, you can use an icon-only button without a text label.

By default, icon-only buttons use tertiary button styles.
Remember that you still need to provide accessibility screen reader text descriptions for icon-only buttons.
Before you use only an icon on a button, make sure what the icon represents is clear and that users can understand the action being performed without a label.

### Floating

Please review [Floating Button documentation](https://magnetic.cisco.com/0a43ab5cd/p/56608b-buttons/t/9c140e9df3) on usage and interactions as it has a peculiar use case.

## Usage

### Single Button

```tsx
<CDSButton variant="primary">Button</CDSButton>
```

### Multiple Buttons

If you need to show multiple buttons on the same line, use a button group to ensure that they have correct spacing.

```tsx
<CDSButton.Group>
  <CDSButton variant="primary">First</CDSButton>
  <CDSButton variant="secondary">Seconds</CDSButton>
</CDSButton.Group>
```

### Floating Button

Default size is Medium but Small is available.

```tsx
<CDSButton.Floating floatingIcon={<ArrowUp size={16} weight="bold" />} size="sm">
  Navigate
</CDSButton.Floating>
```

### Split Button

```tsx
<CDSButton.Split>
  <CDSButton.Split.MainButton>Download</CDSButton.Split.MainButton>
  <CDSDropdown trigger={<CDSButton.Split.Dropdown aria-label="Download options" />}>
    <CDSDropdown.Item label="Download as PDF" />
    <CDSDropdown.Item label="Download as CSV" />
  </CDSDropdown>
</CDSButton.Split>
```

## Props

This component inherits the props from HTMLButtonElement. Overrides and custom props are listed below.

| Name        | Description                                                                                         | Type                                        | Required | Default    |
| ----------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------- | -------- | ---------- |
| as          | The "as" prop allows user to replace rendered HTML elements in a Button component from the outside. | HTMLElement                                 | no       | button     |
| variant     | The variant of the button to render                                                                 | 'primary', 'secondary', 'tertiary', 'ghost' | no       | primary    |
| sentiment   | The sentiment of the button to render                                                               | 'negative', 'interact', 'inverse'           | no       | interact   |
| destructive | The destructive button flag that indicates that a button’s actions are risky                        | boolean                                     | no       | false      |
| size        | The size of the button to render                                                                    | 'sm'                                        | no       | 'md'       |
| block       | Display the button in a full-width block                                                            | boolean                                     | no       | false      |
| icon        | An icon that will be rendered on the left side of the button                                        | ReactElement                                | no       |            |
| rightIcon   | An icon that will be rendered on the right side of the button                                       | ReactElement                                | no       |            |
| loading     | Disables the button and shows a loading spinner in the left icon slot                               | boolean                                     | no       | false      |
| type        | The `type` attribute specifies the type of button.                                                  | string                                      | no       | `"button"` |

## Floating Button Props Only

This component inherits the props from HTMLButtonElement. Overrides and custom props are listed below.

| Name         | Description                                     | Type         | Required | Default |
| ------------ | ----------------------------------------------- | ------------ | -------- | ------- |
| floatingIcon | Icon for floating button when label is hidden   | ReactElement | yes      | null    |
| Position     | Position of button: top or bottom               | string       | no       | no      |
| offsetMargin | Offset to prevent floating collision of banners | number       | no       | 0       |
