# cds-react-view-switcher

View switchers allow users to switch between alternate views of the same content. Only one content section is shown at a time.

> [Design Guidelines](https://magnetic.cisco.com/0a43ab5cd/p/817d93-view-switcher)

## Installation

NPM: `npm i @ciscodesignsystems/cds-react-view-switcher`

Yarn: `yarn add @ciscodesignsystems/cds-react-view-switcher`

## Styling and Theme Installation

You will also need to install the styling and needed theme files.

NPM: `npm i @ciscodesignsystems/cds-magnetic-theme-web`

Yarn: `yarn add @ciscodesignsystems/cds-magnetic-theme-web`

Then import the following into your app's css:

```css
@import '@ciscodesignsystems/cds-magnetic-theme-web/css/dist/token-theme-light-variables.css';
@import '@ciscodesignsystems/cds-react-view-switcher/index.css';
```

## Dependencies

### Required

These dependencies must be met in your product:

- [react](https://www.npmjs.com/package/react) >=16.14.0
- [react-dom](https://www.npmjs.com/package/react-dom) >=16.14.0
- @ciscodesignsystems/cds-component-types
- @ciscodesignsystems/cds-component-utilities

### Optional

Optional dependencies will vary depending on your product needs, but may include the following components:

- @phosphor-icons/react

## Usage

```tsx
<CDSViewSwitcher
  onChange={onOptionChangeHandler}
  options={['Option 1', 'Option 2', 'Option 3']}
  value={selectedOption}
/>
```

```tsx
<CDSViewSwitcher
  onChange={onOptionChangeHandler}
  options={[
    {
      label: 'Option 1',
      value: 'Option 1',
    },
    {
      disabled: true,
      label: 'Option 2',
      value: 'Option 2',
    },
    {
      label: 'Option 3',
      value: 'Option 3',
    },
  ]}
  value={selectedOption}
/>
```

## Props

| Name                 | Type                                 | Description                                             |
| -------------------- | ------------------------------------ | ------------------------------------------------------- |
| disabled?            | boolean                              | Add View Switcher in disabled state                     |
| fullWidth?           | boolean                              | Expand the bounds of View Switcher to aquire full width |
| onChange&nbsp;&nbsp; | (value: string) => void              | Function to receive changes on the option selection     |
| options              | ViewSwitcherOptionType[]&nbsp;&nbsp; | View Switcher Options                                   |
| size?                | string                               | Size of the View Switcher component, 'sm' or 'md'       |
| value                | string                               | Apply selection to the View Switcher                    |
