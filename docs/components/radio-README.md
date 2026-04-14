# cds-react-radio

Radio buttons are used when only one selection is allowed from a group of options.

> [Design Guidelines](https://magnetic.cisco.com/0a43ab5cd/p/81f8d4-radio-button)

## Installation

NPM: `npm i @ciscodesignsystems/cds-react-radio`

Yarn: `yarn add @ciscodesignsystems/cds-react-radio`

## Styling and Theme Installation

You will also need to install the styling and needed theme files.

NPM: `npm i @ciscodesignsystems/cds-magnetic-theme-web`

Yarn: `yarn add @ciscodesignsystems/cds-magnetic-theme-web`

Then import the following into your app's css:

```css
@import '@ciscodesignsystems/cds-magnetic-theme-web/css/dist/token-theme-light-variables.css';
@import '@ciscodesignsystems/cds-react-radio/index.css';
```

## Dependencies

### Required

These dependencies must be met in your product:

- [react](https://www.npmjs.com/package/react) >=16.14.0
- [react-dom](https://www.npmjs.com/package/react-dom) >=16.14.0
- @ciscodesignsystems/cds-component-utilities

## Usage

```tsx
export const options = [
  {
    key: 'one',
    label: 'One',
    value: 'one',
  },
  {
    id: 'two',
    key: 'two',
    label: 'Two',
    value: 'two',
  },
  {
    id: 'three'
    key: 'three',
    label: 'Three',
    value: 'three',
    disabled: true,
  },
  {
    key: 'four',
    label: 'Four',
    value: 'four',
  },
];

export const Component = (args) => {
  const { options } = args;
  return (
    <div>
      <CDSRadio
        className="cds-radio-default"
        direction="vertical"
        size="md"
        disabled
        options={options}
        legend="The current value is"
        value="one"
      />
    </div>
  );
};
```

## Props

### CDSRadio

| Name      | Description                                      | Required | Default    |
| --------- | ------------------------------------------------ | -------- | ---------- |
| classname | The className of the radio to render             | no       |            |
| direction | Provides access to vertical or horizontal layout | no       | `vertical` |
| size      | The size of the radio to render                  | no       | `md`       |
| disabled  | Set Radio to disabled state                      | no       |            |
| legend    | The legend of the radio to render                | no       |            |
| value     | The value of the radio to render                 | no       |            |
| name      | The name of the radio to render                  | no       |            |
| onChange  | Change event handler                             | no       |            |
| options   | Options array having id, key, value and label    | yes      | -          |

### CDSRadioInput

| Name         | Description                                      | Required | Default    |
| ------------ | ------------------------------------------------ | -------- | ---------- |
| id           | The id of the radio input to render              | no       |            |
| checkedValue | Provides the value that is checked               | no       |            |
| description  | The description of the radio input to render     | no       |            |
| direction    | Provides access to vertical or horizontal layout | no       | `vertical` |
| disabled     | Set radio input to disabled state                | no       |            |
| label        | The label of radio input                         | no       |            |
| name         | The name of radio input                          | no       |            |
| onChange     | Change event handler                             | no       |            |
| value        | The value of radio input                         | no       |            |
