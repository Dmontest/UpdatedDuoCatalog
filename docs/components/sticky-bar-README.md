# cds-react-sticky-bar

A sticky action bar is a tray attached to the bottom of the view window that
surfaces key actions that are currently out of view at the end of page or drawer content.

> [Design Guidelines](https://magnetic.cisco.com/0a43ab5cd/p/63b269-sticky-action-bar)

## Installation

NPM: `npm i @ciscodesignsystems/cds-react-sticky-bar`

Yarn: `yarn add @ciscodesignsystems/cds-react-sticky-bar`

## Styling and Theme Installation

You will also need to install the styling and needed theme files.

NPM: `npm i @ciscodesignsystems/cds-magnetic-theme-web`

Yarn: `yarn add @ciscodesignsystems/cds-magnetic-theme-web`

Then import the following into your app's css:

```css
@import '@ciscodesignsystems/cds-magnetic-theme-web/css/dist/token-theme-light-variables.css';
@import '@ciscodesignsystems/cds-react-sticky-bar/index.css';
```

## Dependencies

### Required

These dependencies must be met in your product:

- [react](https://www.npmjs.com/package/react) >=16.14.0
- [react-dom](https://www.npmjs.com/package/react-dom) >=16.14.0
- @ciscodesignsystems/cds-component-utilities

## Usage

```tsx
export const Component = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [firstChecked, setFirstChecked] = useState<boolean>(false);
  const [secondChecked, setSecondChecked] = useState<boolean>(false);

  const preventStick = !(firstChecked || secondChecked || inputValue);

  return (
    <div>
      <CDSTextInput
        placeholder="Placeholder text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <CDSCheckbox checked={firstChecked} onChange={(e) => setFirstChecked(e.target.checked)}>
        First Checkbox
      </CDSCheckbox>
      <CDSCheckbox checked={secondChecked} onChange={(e) => setSecondChecked(e.target.checked)}>
        Second Checkbox
      </CDSCheckbox>
      <CDSStickyBar preventStick={preventStick}>
        <CDSButton>Action</CDSButton>
        <CDSButton variant="tertiary">Cancel</CDSButton>
      </CDSStickyBar>
    </div>
  );
};
```

## Props

| Name         | Description                                                                                                                                                                  | Default |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| preventStick | Disables the sticky behavior of the sticky bar. For example, it could be disabled on a form until a user modifies a value, then the sticky bar with a 'Save' button appears. | false   |
| observeRef   | Custom HTML Element Ref to watch that dictates if the floating styles are displayed. If the Ref element is not on the screen, the floating styles are applied.               |         |
