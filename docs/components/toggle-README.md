# cds-react-toggle

Toggles let the user immediately switch between two states (on-off, or switching between alternating modes).

> [Design Guidelines](https://magnetic.cisco.com/0a43ab5cd/p/69448f-toggle)

## Installation

NPM: `npm i @ciscodesignsystems/cds-react-toggle`

Yarn: `yarn add @ciscodesignsystems/cds-react-toggle`

## Styling and Theme Installation

You will also need to install the styling and needed theme files.

NPM: `npm i @ciscodesignsystems/cds-magnetic-theme-web`

Yarn: `yarn add @ciscodesignsystems/cds-magnetic-theme-web`

Then import the following into your app's css:

```css
@import '@ciscodesignsystems/cds-magnetic-theme-web/css/dist/token-theme-light-variables.css';
@import '@ciscodesignsystems/cds-react-toggle/index.css';
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
  const [checked, setChecked] = useState(false);
  return (
    <CDSToggle
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
      setChecked={setChecked}>
      Toggle
    </CDSToggle>
  );
};
```

## Props

This component inherits the props from HTMLInputElement. Overrides and custom props are listed below.

| Name       | Description                                                                                              | Default |
| ---------- | -------------------------------------------------------------------------------------------------------- | ------- |
| size       | Size of the toggle to render ('sm', 'md')                                                                | md      |
| setChecked | Set checked callback function in order for the enter keypress to take effect                             |         |
| locale     | A locale object with strings used in the toggle component, see [Localization](#localization) for details |         |

## Localization

The locale by default uses a fallback mechanism in which only the values passed to it would override from a default locale object used for the component. For the following usage of `CDSToggle` with no overrides:

```tsx
<CDSToggle>// HERE GOES THE REST OF YOUR COMPONENT</CDSToggle>
```

The locale for the `CDSToggle` component would look like:

```json
{
  "supplementalText": "",
  "ariaLabel": ""
}
```

By default, locale is not required. The overrides are merged based on the locale definition. By providing the following locale override:

```tsx
<CDSToggle
  locale={{
    supplementalText: 'Velit officia consequat duis enim velit mollit.',
    ariaLabel: 'This is a custom label',
  }}>
  // HERE GOES THE REST OF YOUR COMPONENT
</CDSToggle>
```

The localization mechanism would merge all the defaults, overriding **_ONLY_** the `supplementalText` string, resulting in the following locale object:

```json
{
  "supplementalText": "Velit officia consequat duis enim velit mollit."
}
```
