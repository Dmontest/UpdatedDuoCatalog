# cds-react-select

A select lets users select one or more items from a list.

> [Design Guidelines](https://magnetic.cisco.com/0a43ab5cd/p/42131c-select)

## Installation

NPM: `npm i @ciscodesignsystems/cds-react-select`

Yarn: `yarn add @ciscodesignsystems/cds-react-select`

## Styling and Theme Installation

You will also need to install the styling and needed theme files.

NPM: `npm i @ciscodesignsystems/cds-magnetic-theme-web`

Yarn: `yarn add @ciscodesignsystems/cds-magnetic-theme-web`

Then import the following into your app's css:

```css
@import '@ciscodesignsystems/cds-magnetic-theme-web/css/dist/token-theme-light-variables.css';
@import '@ciscodesignsystems/cds-react-select/index.css';
```

## Dependencies

### Required

These dependencies must be met in your product:

- [react](https://www.npmjs.com/package/react) >=16.14.0
- [react-dom](https://www.npmjs.com/package/react-dom) >=16.14.0
- @floating-ui/react
- @ciscodesignsystems/cds-react-breadcrumb
- @ciscodesignsystems/cds-react-checkbox
- @ciscodesignsystems/cds-react-flex
- @ciscodesignsystems/cds-react-label
- @ciscodesignsystems/cds-react-empty-state
- @ciscodesignsystems/cds-react-spinner
- @ciscodesignsystems/cds-react-tooltip
- @ciscodesignsystems/cds-react-tag
- @ciscodesignsystems/cds-component-utilities

## Usage

```tsx
<CDSSelect
  clearable
  label="Label"
  onChange={(value) => {}}
  options={[
    {
      label: 'Option 1',
      value: '1',
    },
    {
      label: 'Option 2',
      value: '2',
    },
    {
      label: 'Option 3',
      value: '3',
    },
  ]}
  placeholder="Select an option"
/>
```

## Props

| Name                          | Description                                                                                                                                                                                                                                                  | Required | Default                                                                                                                                      |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| label                         | The form label                                                                                                                                                                                                                                               |          | `undefined`                                                                                                                                  |
| labelAlignment                | Allows to set the alignment of the label                                                                                                                                                                                                                     |          | `top`                                                                                                                                        |
| placeholder                   | The select placeholder                                                                                                                                                                                                                                       |          | `undefined`                                                                                                                                  |
| required                      | The select required                                                                                                                                                                                                                                          |          | `false`                                                                                                                                      |
| optional                      | An optional label for the select. Accepts string.                                                                                                                                                                                                            |          | `undefined`                                                                                                                                  |
| options                       | The select options                                                                                                                                                                                                                                           |          | `[]`                                                                                                                                         |
| error                         | The select error state                                                                                                                                                                                                                                       |          | `false`                                                                                                                                      |
| errorMessage                  | The select error state message                                                                                                                                                                                                                               |          | 'You must select an option.'                                                                                                                 |
| infoMessage                   | The select info icon message                                                                                                                                                                                                                                 |          | `undefined`                                                                                                                                  |
| emptyStateMessage             | The select no filtered data message. The use of emptyStateMessage in the `CDSSelect` component is deprecated and will be removed in a future release of CDS in order to align terminology between design and engineering. Use locale instead.                |          | 'No matches found'                                                                                                                           |
| multiple                      | The selectable options                                                                                                                                                                                                                                       |          | `false`                                                                                                                                      |
| withSearch                    | Display text input for filtered options                                                                                                                                                                                                                      |          | `false`                                                                                                                                      |
| withTags                      | Display tags for selected items                                                                                                                                                                                                                              |          | `false`                                                                                                                                      |
| withTypeahead                 | Display text input search for options                                                                                                                                                                                                                        |          | `false`                                                                                                                                      |
| withSelectAll                 | Enables a "Select all" option for selecting/de-selecting all option items                                                                                                                                                                                    |          | `false`                                                                                                                                      |
| withSelectionLimit            | When a `number` is provided it enables a "Selection Limited" option that only allows the number of items selected.                                                                                                                                           |          | `undefined`                                                                                                                                  |
| name                          | The name for the select                                                                                                                                                                                                                                      |          | `undefined`                                                                                                                                  |
| clearable                     | Display button to clear values (Note: Multi-select has this enabled by default)                                                                                                                                                                              |          | `false`                                                                                                                                      |
| disabled                      | Whether disabled select                                                                                                                                                                                                                                      |          | `false`                                                                                                                                      |
| size                          | The size of the select                                                                                                                                                                                                                                       |          | `md`                                                                                                                                         |
| tabindex                      | The tabindex for the select                                                                                                                                                                                                                                  |          | `undefined`                                                                                                                                  |
| value                         | The default value for the select                                                                                                                                                                                                                             |          |                                                                                                                                              |
| onBlur                        | Event fires when blur                                                                                                                                                                                                                                        |          | `undefined`                                                                                                                                  |
| onToggle                      | Event fires when toggle                                                                                                                                                                                                                                      |          | `undefined`                                                                                                                                  |
| onChange                      | Event fires when change                                                                                                                                                                                                                                      |          | `undefined`                                                                                                                                  |
| onClear                       | Event fires when cleared                                                                                                                                                                                                                                     |          | `undefined`                                                                                                                                  |
| onRemove                      | Event fires when tag removed                                                                                                                                                                                                                                 |          | `undefined`                                                                                                                                  |
| withTruncatedTags             | Controls whether the tag is truncated                                                                                                                                                                                                                        |          | `false`                                                                                                                                      |
| customMenuWidth               | Sets a custom width for the options menu                                                                                                                                                                                                                     |          | `undefined`                                                                                                                                  |
| customMenuHeight              | Sets a custom height for the options menu                                                                                                                                                                                                                    |          | `undefined`                                                                                                                                  |
| id                            | selects the node with the id if it exists, or create it and append it to the specified root (by default document.body).                                                                                                                                      |          | `undefined`                                                                                                                                  |
| withCheck                     | Adds a check mark next to the selected options. (Note: This is default in single select mode)                                                                                                                                                                |          | `false`                                                                                                                                      |
| labelId                       | Specify a custom id for the label.                                                                                                                                                                                                                           |          | `undefined`                                                                                                                                  |
| ariaLabels                    | Custom aria-labels for various action elements.<br>Note : The use of arialLabels in the `CDSSelect` component is deprecated and will be removed in a future release of CDS in order to align terminology between design and engineering. Use locale instead. |          | <pre><code lang="json>{<br> clearLabel: `Clear ${label}`,<br> toggleLabel: `Toggle ${label}`,<br> removeTagLabel: `Remove`<br>}</code></pre> |
| locale                        | localization for select component                                                                                                                                                                                                                            |          |                                                                                                                                              |
| isLoading                     | Displays a loading spinner within the options menu when true                                                                                                                                                                                                 | no       | `false`                                                                                                                                      |
| loadingLabel                  | The label text displayed beneath the loading spinner.The use of loadingLabel in the `CDSSelect` component is deprecated and will be removed in a future release of CDS in order to align terminology between design and engineering. Use locale instead.     | no       | `'Loading matches'`                                                                                                                          |
| tagTooltipHidden              | The option to hide the tag tooltip                                                                                                                                                                                                                           |          | `false`                                                                                                                                      |
| enableTagTooltipAutoplacement | The option to enable auto placement for the tag tooltip                                                                                                                                                                                                      |          | `true`                                                                                                                                       |
| tagTooltipPlacement           | The option to set the tag tooltip's placement position (ie. top, bottom, left, right)                                                                                                                                                                        |          | `undefined`                                                                                                                                  |
| labelTooltipPlacement         | The option to set the label tooltip's placement position (ie. top, bottom, left, right)                                                                                                                                                                      |          | `undefined`                                                                                                                                  |
| withErrorInline               | Displays error message and icon inline.                                                                                                                                                                                                                      |          | `undefined`                                                                                                                                  |
| withTruncatedLabels           | Truncates labels.                                                                                                                                                                                                                                            |          | `false`                                                                                                                                      |
| withCascade                   | Enables cascading child option menus.                                                                                                                                                                                                                        |          | `false`                                                                                                                                      |
| withCascadeFooter             | Enables cascade footer breadcrumbs.                                                                                                                                                                                                                          |          | `false`                                                                                                                                      |
| tagFormatter                  | Enables customization of the display value for selected option tag.                                                                                                                                                                                          |          | `undefined`                                                                                                                                  |
| renderTagCountPopover         | A custom render function for the popover content that displays the count of selected items.                                                                                                                                                                  |          | `undefined`                                                                                                                                  |

## CDSOption Props

| Name         | Description                                                                                                     | Required | Default     |
| ------------ | --------------------------------------------------------------------------------------------------------------- | -------- | ----------- |
| label        | The option label                                                                                                |          | `undefined` |
| value        | The option value                                                                                                |          | `undefined` |
| icon         | An optional icon for the option                                                                                 |          | `undefined` |
| divider      | Whether to show a divider for the option                                                                        |          | `false`     |
| suggestion   | A suggestion for the option in typeahead. **This is an internal prop, used by the typeahead mechanism.**        |          | `undefined` |
| selected     | The option selected state                                                                                       |          | `false`     |
| disabled     | The option disabled state                                                                                       |          | `false`     |
| tooltip      | The option tooltip object is passed to `CDSToolTip` and displayed when in a disabled state                      |          | `undefined` |
| attrs        | Custom HTML attributes to add to option element. (`role`, `onClick`, `onKeyDown`, `tabIndex`) will not override |          | `undefined` |
| optionTestId | Test id for select option                                                                                       |          | `undefined` |

## CDSOption Group Props

| Name     | Description                                      | Required | Default     |
| -------- | ------------------------------------------------ | -------- | ----------- |
| label    | The label for the options group                  | yes      |             |
| options  | The options to be displayed in the options group | yes      |             |
| selected | The selected state for the options group         | no       | `undefined` |
| disabled | The disabled state for the options group         | no       | `undefined` |

## Localization

The CDSSelect component supports a locale object for customizing labels and accessibility texts. By default, it uses a fallback mechanism where any values passed in locale will override the default locale.

For the following usage of CDSSelect with no locale overrides:

<CDSSelect locale={{ selectAllLabel: 'Select all items'}} />

The default locale would be:

```json
{
  "clearLabel": "Clear",
  "toggleLabel": "Toggle",
  "removeTagLabel": "Remove",
  "selectAllLabel": "Select all",
  "selectionLimitLabel": "Up to ${limit} selections",
  "selectionLimitReachedLabel": "Max selections reached",
  "loadingLabel": "Loading matches"
}
```

You do not need to provide a locale, as defaults are automatically applied.
You can override any of the default labels by passing a locale prop. For example:

```tsx
<CDSSelect
  options={[{ label: 'Option 1', value: '1' }]}
  locale={{ clearLabel: 'RESET', selectAllLabel: 'Select Everything' }}
/>
```

In this case:
clearLabel becomes "RESET"
selectAllLabel becomes "Select Everything"
All other labels fall back to their default values.
This fallback approach ensures that the component is always accessible and localizable without requiring full locale definitions.

## Imperative Handle (Ref Methods)

The `CDSSelect` component exposes an imperative handle for programmatic control. You can use a ref to access several utility methods for state management, menu control, and value retrieval.

### Ref Type

The `CDSSelectHandle` type is exported from the select component and includes all available imperative methods:

```tsx
import type { CDSSelectHandle } from '@ciscodesignsystems/cds-react-select';

type CDSSelectHandle = HTMLDivElement & {
  reset: () => void;
  clear: () => void;
  focus: () => void;
  blur: () => void;
  open: () => void;
  close: () => void;
  getSelectedValues: () => (string | number)[];
};
```

Since `CDSSelectHandle` extends `HTMLDivElement`, all native DOM methods (like `scrollIntoView()`, `getBoundingClientRect()`, etc.) are also available on the ref. Note that `focus()` and `blur()` are overridden to focus the select control instead of the wrapper div.

### reset()

Resets the select component to its original state (as if freshly mounted). This method clears all selected options, resets the input value, restores the original options list, closes the menu, and clears any search filters.

```tsx
import { useRef } from 'react';
import { CDSSelect } from '@ciscodesignsystems/cds-react-select';
import type { CDSSelectHandle } from '@ciscodesignsystems/cds-react-select';

function MyComponent() {
  const selectRef = useRef<CDSSelectHandle | null>(null);

  return (
    <>
      <CDSSelect
        ref={selectRef}
        options={[
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
          { label: 'Option 3', value: '3' },
        ]}
        multiple
        clearable
      />
      <button onClick={() => selectRef.current?.reset()}>Reset Select</button>
    </>
  );
}
```

**What reset() does:**

- Clears all selected options
- Restores the original options list
- Resets the input/search value to empty
- Closes the options menu
- Clears any applied search filters

### clear()

Clears all selected options without resetting other state. Unlike `reset()`, this keeps the current options and input intact.

**Usage Example:**

```tsx
selectRef.current?.clear();
```

### open()

Programmatically opens the dropdown menu.

**Usage Example:**

```tsx
selectRef.current?.open();
```

### close()

Programmatically closes the dropdown menu.

**Usage Example:**

````tsx
selectRef.current?.close();
### focus()

Focuses the select control. This method overrides the native `HTMLDivElement.focus()` to focus the actual interactive control element instead of the wrapper div.

**Usage Example:**

```tsx
selectRef.current?.focus();
````

### blur()

Blurs the select control. This method overrides the native `HTMLDivElement.blur()` to blur the actual interactive control element.

**Usage Example:**

```tsx
selectRef.current?.blur();
```

````

### getSelectedValues()

Returns an array of currently selected option values. This is useful for reading the component state imperatively.

**Usage Example:**

```tsx
const selectedValues = selectRef.current?.getSelectedValues();
console.log(selectedValues); // ['1', '2', '3']
````

### Native DOM Methods

Since the ref extends `HTMLDivElement`, other native DOM methods are also available:

```tsx
// DOM methods
selectRef.current?.scrollIntoView();
selectRef.current?.classList.add('custom-class');

// Get measurements
const rect = selectRef.current?.getBoundingClientRect();
**Note:** `focus()` and `blur()` are overridden to focus the select control instead of the wrapper div.

```

**Complete Example:**

```tsx
import { useRef } from 'react';
import { CDSSelect } from '@ciscodesignsystems/cds-react-select';
import type { CDSSelectHandle } from '@ciscodesignsystems/cds-react-select';

function FilterPanel() {
  const selectRef = useRef<CDSSelectHandle | null>(null);

  const handleApplyFilters = () => {
    const values = selectRef.current?.getSelectedValues();
    console.log('Applying filters:', values);
    // Send values to API
  };

  const handleClearFilters = () => {
    selectRef.current?.clear();
  };

  const handleResetAll = () => {
    selectRef.current?.reset();
  };

  return (
    <>
      <CDSSelect
        ref={selectRef}
        options={[
          { label: 'Active', value: 'active' },
          { label: 'Inactive', value: 'inactive' },
          { label: 'Pending', value: 'pending' },
        ]}
        multiple
        label="Status"
      />
      <button onClick={handleApplyFilters}>Apply Filters</button>
      <button onClick={handleClearFilters}>Clear</button>
      <button onClick={handleResetAll}>Reset All</button>
    </>
  );
}
```

- `reset()` - Resets component to original state. Clears selections, restores options, closes menu, clears input
- `clear()` - Clears selections without full reset. Useful for partial state management
- `open()` / `close()` - Menu control methods. Programmatic dropdown menu management
- `focus()` / `blur()` - Focus management. Accessibility-friendly focus control
- `getSelectedValues()` - Value retrieval. Returns array of currently selected values
