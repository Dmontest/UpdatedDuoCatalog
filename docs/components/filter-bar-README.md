# cds-react-filter-bar

Filter Bar allow users to search for or filter through data within a displayed dataset, helping them find what they're looking for and find available options within specific parameters. Product teams can determine the filter control options to be used based on the use case and how to best intuitively narrow down the data.

> [Design Guidelines](https://magnetic.cisco.com/0a43ab5cd/p/0343bf-filters)

## Installation

NPM: `npm i @ciscodesignsystems/cds-react-filter-bar`

Yarn: `yarn add @ciscodesignsystems/cds-react-filter-bar`

## Styling and Theme Installation

You will also need to install the styling and needed theme files.

NPM: `npm i @ciscodesignsystems/cds-magnetic-theme-web`

Yarn: `yarn add @ciscodesignsystems/cds-magnetic-theme-web`

Then import the following into your app's css:

```css
@import '@ciscodesignsystems/cds-magnetic-theme-web/css/dist/token-theme-light-variables.css';
@import '@ciscodesignsystems/cds-react-filter-bar/index.css';
```

## Dependencies

### Required

These dependencies must be met in your product:

- [react](https://www.npmjs.com/package/react) >=16.14.0
- [react-dom](https://www.npmjs.com/package/react-dom) >=16.14.0
- @ciscodesignsystems/cds-component-utilities
- @ciscodesignsystems/cds-react-button
- @ciscodesignsystems/cds-react-flex
- @ciscodesignsystems/cds-react-search
- @ciscodesignsystems/cds-react-text

### Optional

Optional dependencies will vary depending on your product needs, but may include the following components:

- @phosphor-icons/react

## Usage

### CDSFilterBar

```tsx
export const Component = () => {

  const status = [
    { value: 'disconnected', label: 'Disconnected' },
    { value: 'alerting', label: 'Alerting' },
    { value: 'connected', label: 'Connected' },
    { value: 'dormant', label: 'Dormant' },
  ];

  const additionalFilters = (
    <CDSCheckbox checked={checked} size='md'>
      Gateway
    </CDSCheckbox>
  );

  const additionalComponents = (
    <CDSButton variant="secondary" size='md'>
      Download
    </CDSButton>
  );

  <CDSFilterBar
    additionalComponents={additionalComponents}
    additionalFilters={additionalFilters}
    onFilterOverflowClick={openDrawer}
    onFiltersResetClick={handleClear}
    showResetButton={true}>
    <CDSSelect
      size='md'
      placeholder="Status"
      options={status}
    />
  </CDSFilterBar>
  <CDSDrawer isOpen={isDrawerOpen} onClose={closeDrawer}>
    <CDSFlex direction="vertical" gap={4}>
      <CDSDrawer.Heading>Filters</CDSDrawer.Heading>
      <CDSText color="light">Optional descriptor goes here.</CDSText>
    </CDSFlex>
    <CDSDrawer.Content>
      <CDSSelect
        size={args.size}
        placeholder="Status"
        options={status}
      />
      <CDSDivider />
      <CDSFlex direction="vertical" gap={12}>
        <CDSText weight="bold">Gateway</CDSText>
        <CDSCheckbox checked={checked}>
          Gateway
        </CDSCheckbox>
      </CDSFlex>
    </CDSDrawer.Content>
    <CDSDrawer.Footer>
      <CDSButton.Group>
        <CDSButton variant="tertiary" onClick={closeDrawer}>
          Cancel
        </CDSButton>
        <CDSButton variant="primary" onClick={closeDrawer}>
          Action
        </CDSButton>
      </CDSButton.Group>
    </CDSDrawer.Footer>
  </CDSDrawer>
};
```

### CDSFilterBar.AppliedFilters

```tsx
const categories = [
  { id: 'status', label: 'Status', values: ['Connected', 'Alerting'] },
  { id: 'location', label: 'Location', values: ['Dallas'] },
  { id: 'toggle', label: 'Toggle', values: ['Enabled'] },
];

export const AppliedFiltersExample = () => {
  const handleRemoveFilter = (categoryId: string, value: string) => {
    console.log('Removed', value, 'from', categoryId);
  };

  const handleClearCategory = (categoryId: string) => {
    console.log('Cleared category', categoryId);
  };

  return (
    <CDSFilterBar.AppliedFilters
      categories={categories}
      totalCount={categories.reduce((acc, c) => acc + c.values.length, 0)}
      onRemoveFilter={handleRemoveFilter}
      onClearCategory={handleClearCategory}
    />
  );
};
```

## Props

### CDSFilterBar

| Name                      | Description                                                                                        | Required | Default     |
| ------------------------- | -------------------------------------------------------------------------------------------------- | -------- | ----------- |
| children                  | children within the filter bar will auto-collapse to fit within the Filter Bar container.          | no       | undefined   |
| searchItems               | Data structure user wants to search through. Array of categories, each with an array of items.     | yes      |             |
| searchWidth               | Width of the search                                                                                | no       | 240         |
| additionalFilters         | additionalFilters will always remain visible within the filter bar.                                | no       |             |
| additionalComponents      | additionalComponents are elements intended to support additional components to the filtered items. | no       |             |
| onFilterOverflowClick     | onFilterOverflowClick is a callback function that will run when the Filters button is clicked.     | no       |             |
| onFiltersResetClick       | onFiltersResetClick is a callback function that will run when the reset button is clicked.         | no       |             |
| results                   | results is the number of results the filter bar should display.                                    | no       |             |
| showSearch                | showSearch is a boolean value for Search Component to show or hide it.                             | no       | true        |
| showResetButton           | showResetButton is a boolean to enable or disable the reset button.                                | no       | false       |
| size                      | size determines the size of the filter bar.                                                        | no       | 'md'        |
| filterButtonText          | filterButtonText is a string that represents the text shown on the filter button.                  | no       | 'Filters'   |
| resetAllButtonText        | resetAllButtonText is a string that represents the text shown on the "Reset All" button.           | no       | 'Reset all' |
| searchPlaceholderText     | searchPlaceholderText is a string that represents the placeholder text for the search input field. | no       | 'Search'    |
| searchValue               | Value of the search input field.                                                                   | no       |             |
| onSearchValueChange       | Called when select an option or input value change.                                                | no       |             |
| resultsLabelText          | resultsLabelText is a string that represents the text shown next to the results count.             | no       |             |
| onSearchClear             | Called when the search input is cleared.                                                           | no       |             |
| onSearchSelect            | Called when a search item is selected.                                                             | no       |             |
| searchEnableFloatingPanel | Called when a search item is selected.                                                             | no       |             |
| onBlur                    | Called when the search input loses focus.                                                          | no       |             |

### CDSFilterBar.AppliedFilters

| Name            | Type                                        | Description                                                                     | Required | Default |
| --------------- | ------------------------------------------- | ------------------------------------------------------------------------------- | -------- | ------- |
| categories      | CDSAppliedFilterCategory[]                  | Array of categories to display. Each category includes id, label, and values.   | yes      | —       |
| totalCount      | number                                      | Total number of applied filters to display in the tag.                          | no       | 0       |
| onRemoveFilter  | (categoryId: string, value: string) => void | Callback when a specific filter value is removed. Receives (categoryId, value). | no       | —       |
| onClearCategory | (categoryId: string) => void                | Callback when a category is cleared. Receives (categoryId).                     | no       | —       |

### CDSFilterBarAppliedFiltersCategory

| Name   | Type     | Description                                |
| ------ | -------- | ------------------------------------------ |
| id     | string   | Unique identifier for the category         |
| label  | string   | Display label of the category              |
| values | string[] | Array of selected values for that category |
