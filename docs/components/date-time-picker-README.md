# cds-react-date-time-picker

A date picker lets a user input or select a date or range of dates.

> [Design Guidelines](https://magnetic.cisco.com/0a43ab5cd/p/64eff0-date-picker)
>
> Date and time pickers are used in forms and as filters to constrain displayed results to a date or date range.

## Installation

NPM: `npm i @ciscodesignsystems/cds-react-date-time-picker`

Yarn: `yarn add @ciscodesignsystems/cds-react-date-time-picker`

## Styling and Theme Installation

You will also need to install the styling and needed theme files.

NPM: `npm i @ciscodesignsystems/cds-magnetic-theme-web`

Yarn: `yarn add @ciscodesignsystems/cds-magnetic-theme-web`

Then import the following into your app's css:

```css
@import '@ciscodesignsystems/cds-magnetic-theme-web/css/dist/token-theme-light-variables.css';
@import '@ciscodesignsystems/cds-react-date-time-picker/index.css';
```

## Dependencies

### Required

These dependencies must be met in your product:

- [react](https://www.npmjs.com/package/react) >=16.14.0
- [react-dom](https://www.npmjs.com/package/react-dom) >=16.14.0
- @ciscodesignsystems/cds-component-utilities
- @ciscodesignsystems/cds-react-flex
- @ciscodesignsystems/cds-react-label
- @ciscodesignsystems/cds-react-icons
- @ciscodesignsystems/cds-react-label
- @ciscodesignsystems/cds-react-text
- @ciscodesignsystems/cds-react-tooltip
- date-fns ^2.30.0

### Optional

Optional dependencies will vary depending on your product needs, but may include the following components:

- @phosphor-icons/react

## Usage

### Date Time Picker

```tsx
import { CDSDateTimePicker } from '@ciscodesignsystems/cds-react-date-time-picker';

<CDSDateTimePicker
  label="Default Value"
  preset={'date'}
  placeholder="Select date"
  onChange={onChange}
  defaultValue={new Date(2023, 5, 5)}
/>;
```

### Date Time Range Picker

```tsx
import { CDSDateTimeRangePicker } from '@ciscodesignsystems/cds-react-date-time-picker';

<CDSDateTimeRangePicker
  label={'Default Value'}
  defaultValue={[new Date(2023, 8, 15), new Date(2023, 8, 18)]}
  placeholder={['Start date', 'End date']}
  onChange={onChange}
/>;
```

### Native Date Time Picker

```tsx
import { CDSNativeDateTimePicker } from '@ciscodesignsystems/cds-react-date-time-picker';

<CDSNativeDateTimePicker
  id={'datepicker'}
  label={'Date Time'}
  type={'datetime-local'}
  onChange={(value) => console.log}
  required
  iconOnlyError
  locale={{
    errorMessage: 'This is an error message',
    infoMessage: 'Choose date',
  }}
/>;
```

## Props

### CDSDateTimePicker

| Name             | Description                                                           | Required | Default |
| ---------------- | --------------------------------------------------------------------- | -------- | ------- |
| value            | The value to set as the date.                                         | no       |         |
| defaultValue     | The default value to set as the date.                                 | no       |         |
| disabled         | To disable the date input.                                            | no       | false   |
| error            | The error message to display.                                         | no       |         |
| format           | Custom format for date. See https://date-fns.org/v2.29.3/docs/format  | no       |         |
| iconOnlyError    | Only show error icon when in error state.                             | no       |         |
| label            | The label to display.                                                 | no       |         |
| labelAlignment   | Allows to set the alignment of the label.                             | no       | `top`   |
| onChange         | A callback function, can be executed when the selected value changes. | no       |         |
| placeholder      | The placeholder string.                                               | no       |         |
| size             | The size of the input.                                                | no       | md      |
| preset           | The preset to picker display.                                         | no       | date    |
| withSeconds      | Enable second selection with time.                                    | no       | false   |
| disabledDate     | Whether to disable select of date.                                    | no       |         |
| disabledTime     | Whether to disable select of time.                                    | no       |         |
| required         | Whether the field is required.                                        | no       | false   |
| optional         | Whether the field is optional.                                        | no       | false   |
| infoMessage      | Tooltip text to display with icon/hover combination.                  | no       |         |
| tooltipPlacement | Set Tooltip display position.                                         | no       | top     |

### CDSNativeDateTimePicker

All native HTML `input` props are spread onto the component including the following:

| Name             | Description                                                                                                                    | Required | Default     |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------ | -------- | ----------- |
| value            | A string representing a date in `YYYY-MM-DD` format.                                                                           | no       | `undefined` |
| type             | A string type of date input. (`date, datetime-local, time, week, month`)                                                       | no       | `date`      |
| min              | The earliest date to accept. Format in `YYYY-MM-DD`.                                                                           | no       | `undefined` |
| max              | The latest date to accept. Format in `YYYY-MM-DD`.                                                                             | no       | `undefined` |
| label            | The label to display for the input.                                                                                            | no       | `undefined` |
| labelAlignment   | Allows to set the alignment of the label.                                                                                      | no       | `top`       |
| disabled         | To disable the input.                                                                                                          | no       | `false`     |
| required         | To show the input field is required with a `*`.                                                                                | no       | `false`     |
| invalid          | To show `invalid` state for input.                                                                                             | no       | `false`     |
| iconOnlyError    | Only show error icon when in `invalid` state.                                                                                  | no       | `false`     |
| size             | The `size` (`sm`, `md`, `auto`) of the input.                                                                                  | no       | `md`        |
| tooltipPlacement | Set Tooltip display position. Accepts the tooltip placements `top`, `left`, `right`, `bottom`.                                 | no       | `top`       |
| onChange         | Callback function invoked when the commits the change explicitly or by selecting a date from a date picker`(newValue: string)` | no       | `undefined` |
| locale           | The strings for the info/error/optional messages                                                                               | no       | `undefined` |

### CDSNativeDateTimePicker Locale

| Name            | Description                                          | Required | Default     |
| --------------- | ---------------------------------------------------- | -------- | ----------- |
| infoMessage     | Tooltip text to display with icon/hover combination. | no       | `undefined` |
| optionalMessage | An optional label for the input. Accepts a string.   | no       | `undefined` |
| errorMessage    | The error message to display in `invalid` state.     | no       | `undefined` |

## Limitations of CDSDateTimePicker

Currently the only supported locale is `EN` as we will have to implement a way for developer to customize the locales for all components.

`date-fns` is an optional peerDependency of `rc-picker` which is used by CDSDateTimePicker and must be installed manually.
