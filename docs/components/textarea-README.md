# cds-react-textarea

Textarea allow users to input information.

> [Design Guidelines](https://magnetic.cisco.com/0a43ab5cd/p/65f3dd-input-field/t/679f59)

## Installation

NPM: `npm i @ciscodesignsystems/cds-react-textarea`

Yarn: `yarn add @ciscodesignsystems/cds-react-textarea`

## Styling and Theme Installation

You will also need to install the styling and needed theme files.

NPM: `npm i @ciscodesignsystems/cds-magnetic-theme-web`

Yarn: `yarn add @ciscodesignsystems/cds-magnetic-theme-web`

Then import the following into your app's css:

```css
@import '@ciscodesignsystems/cds-magnetic-theme-web/css/dist/token-theme-light-variables.css';
@import '@ciscodesignsystems/cds-react-textarea/index.css';
```

## Dependencies

### Required

These dependencies must be met in your product:

- [react](https://www.npmjs.com/package/react) >=16.14.0
- [react-dom](https://www.npmjs.com/package/react-dom) >=16.14.0
- @ciscodesignsystems/cds-react-flex
- @ciscodesignsystems/cds-react-tooltip
- @ciscodesignsystems/cds-react-notification
- @ciscodesignsystems/cds-component-utilities

## Usage

```tsx
import { CDSTextArea } from '@ciscodesignsystems/cds-react-textarea';

export const Component = (args) => {
  return <CDSTextArea id="my-textarea" label="My textarea" {...args} />;
};
```

## Props

| Name           | Description                                                                                                                         | Default                                                    |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| size           | Allows to set the size of the `TextArea`. Accepts `sm`, `md`, `lg`.                                                                 | `md`                                                       |
| width          | Allows to set the width of the `TextArea`. Accepts `xs`, `sm`, `md`, `lg`, `xl` and `auto`.                                         | `md`                                                       |
| status         | The type of textarea to render. Accepts `negative` and `default`                                                                    | `default`                                                  |
| label          | An optional label for the textarea. Accepts `string`.                                                                               | `undefined`                                                |
| labelAlignment | Allows to set the alignment of the label                                                                                            | `top`                                                      |
| optional       | If the input is optional (an optional label will be added). If set the string will be used as the optional label. Accepts `string`. | `undefined`                                                |
| tooltip        | An optional tooltip do display a description for the field. Accepts `string`.                                                       | `undefined`                                                |
| limit          | Allows to set a number `limit` which is the max number of characters.                                                               | `undefined`                                                |
| invalidMessage | A custom error message shown when the character limit is exceeded.                                                                  | You've reached the character limit of ${limit} characters. |

## Accessibility

### Label

For the textarea component, providing a `label` is highly recommended. Every textarea field should have a label that clearly describes its purpose. A placeholder text is **not** a substitute for a label.

If a visible label is not possible, `aria-label` must be used to provide an accessible name for the textarea field. If the textarea field is labeled by an element that is not specified by `CDSTextArea`, you must provide an `aria-labelledby` prop using the id of the labeling element.

### Keyboard

The textarea field is focusable and operable using keyboard navigation. Use the `Tab` key to land on a non-disabled textarea field. The input has a visible, sentiment-based focus indicator when it is focused.
