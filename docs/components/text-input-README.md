# cds-react-text-input

Input fields allow users to input or configure information.

> [Design Guidelines](https://magnetic.cisco.com/0a43ab5cd/p/65f3dd-input-field)

## Installation

NPM: `npm i @ciscodesignsystems/cds-react-text-input`

Yarn: `yarn add @ciscodesignsystems/cds-react-text-input`

## Styling and Theme Installation

You will also need to install the styling and needed theme files.

NPM: `npm i @ciscodesignsystems/cds-magnetic-theme-web`

Yarn: `yarn add @ciscodesignsystems/cds-magnetic-theme-web`

Then import the following into your app's css:

```css
@import '@ciscodesignsystems/cds-magnetic-theme-web/css/dist/token-theme-light-variables.css';
@import '@ciscodesignsystems/cds-react-text-input/index.css';
```

## Dependencies

### Required

These dependencies must be met in your product:

- [react](https://www.npmjs.com/package/react) >=16.14.0
- [react-dom](https://www.npmjs.com/package/react-dom) >=16.14.0
- @ciscodesignsystems/cds-component-types
- @ciscodesignsystems/cds-component-utilities
- @ciscodesignsystems/cds-react-button
- @ciscodesignsystems/cds-react-flex
- @ciscodesignsystems/cds-react-label
- @ciscodesignsystems/cds-react-text

### Optional

Optional dependencies will vary depending on your product needs, but may include the following components:

- @phosphor-icons/react

## Usage

Use a number input field to enter a number within a certain range.

Handlers do not show in “inactive” state.

### CDSTextInput Default

```tsx
<CDSTextInput
  id="my-input-id"
  label="My custom input"
  placeholder="Add text here..."
  size="lg"
  prefix={<AndroidLogo />}
  fixedWidth
/>
```

### CDSTextInput With clear icon

```tsx
<CDSTextInput
  id="my-input-id"
  label="My custom input"
  placeholder="Add text here..."
  size="lg"
  prefix={<AndroidLogo />}
  clearable
  fixedWidth
/>
```

### CDSNumberInput Default

```tsx
<CDSNumberInput
  id="my-number-input-id"
  label="Number input label"
  placeholder="Enter some number"
  size="md"
  value={/* VALUE STATE */}
  onChange={/* ON CHANGE HANDLER */}
/>
```

## Props

### CDSTextInput and CDSNumberInput

| Name             | Description                                                                                                                                            | Required | Default     |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- | ----------- |
| size             | The size of the input. Can use a predetermined size, or the native HTML "size" attribute.                                                              | no       | `md`        |
| sentiment        | The variant of the input to render. (`negative`, `control`)                                                                                            | no       | `control`   |
| invalid          | Displays red border around input field if set to true.                                                                                                 | no       | `false`     |
| prefix           | Renders a ReactNode as prefix.                                                                                                                         | no       | `undefined` |
| suffix           | Renders a ReactNode as suffix.                                                                                                                         | no       | `undefined` |
| label            | An optional label for the textarea. Accepts `string`.                                                                                                  | no       | `undefined` |
| labelAlignment   | Allows to set the alignment of the label. Accepts `string`.                                                                                            | no       | `top`       |
| optional         | If the input is optional (an optional label will be added). If set the string will be used as the optional label. Accepts `string`.                    | no       | `undefined` |
| tooltip          | An optional tooltip do display a description for the field. Accepts `string`.                                                                          | no       | `undefined` |
| fixedWidth       | If set to false, CDSInput will occupy complete width of the parent div.                                                                                | no       | `false`     |
| clearable        | Determines if we want to show the Clear button or not                                                                                                  | no       | `false`     |
| onClear          | Function to execute when entered text is cleared.                                                                                                      | no       | `undefined` |
| onClick          | Callback fired when the input frame is clicked.                                                                                                        | no       | `undefined` |
| showPasswordText | Custom text to display on a button that toggles the password visibility from hidden to shown. This prop is included for internationalization purposes. | no       | `Show`      |
| hidePasswordText | Custom text to display on a button that toggles the password visibility from shown to hidden. This prop is included for internationalization purposes. | no       | `Hide`      |
| contextualHint   | An optional contextual hint for the input                                                                                                              | no       | `undefined` |
| defaultValue     | The default value for the input                                                                                                                        | no       | `undefined` |

## Accessibility

### Label

For the input component, providing a `label` is highly recommended. Every input field should have a label that clearly describes its purpose. A placeholder text is **not** a substitute for a label.

If a visible label is not possible, `aria-label` must be used to provide an accessible name for the input field. If the input field is labeled by an element that is not specified by `CDSTextInput`, you must provide an `aria-labelledby` prop using the id of the labeling element.

### Keyboard

The input field is focusable and operable using keyboard navigation. Use the `Tab` key to land on a non-disabled input field. The input has a visible, sentiment-based focus indicator when it is focused.
