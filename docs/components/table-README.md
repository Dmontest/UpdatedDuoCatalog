# cds-react-table

Tables are a way to display a collection of data or information in a grid of rows and columns. They organize information in a way that allows users to scan, analyze, compare, filter, sort, and apply actions to large amounts of information providing insights from the data.

> [Design Guidelines](https://magnetic.cisco.com/0a43ab5cd/p/313a90-table)

## Installation

NPM: `npm i @ciscodesignsystems/cds-react-table`

Yarn: `yarn add @ciscodesignsystems/cds-react-table`

## Styling and Theme Installation

You will also need to install the styling and needed theme files.

NPM: `npm i @ciscodesignsystems/cds-magnetic-theme-web`

Yarn: `yarn add @ciscodesignsystems/cds-magnetic-theme-web`

Then import the following into your app's css:

```css
@import '@ciscodesignsystems/cds-magnetic-theme-web/css/dist/token-theme-light-variables.css';
@import '@ciscodesignsystems/cds-react-table/index.css';
```

## Dependencies

### Required

These dependencies must be met in your product:

- [react](https://www.npmjs.com/package/react) >=16.14.0
- [react-dom](https://www.npmjs.com/package/react-dom) >=16.14.0
- @ciscodesignsystems/cds-component-types
- @ciscodesignsystems/cds-component-utilities
- @ciscodesignsystems/cds-react-button
- @ciscodesignsystems/cds-react-checkbox
- @ciscodesignsystems/cds-react-drawer
- @ciscodesignsystems/cds-react-empty-state
- @ciscodesignsystems/cds-react-flex
- @ciscodesignsystems/cds-react-icons
- @ciscodesignsystems/cds-react-select
- @ciscodesignsystems/cds-react-skeleton

### Optional

Optional dependencies will vary depending on your product needs, but may include the following components:

- @ciscodesignsystems/cds-react-tooltip
- @ciscodesignsystems/cds-react-select
- @ciscodesignsystems/cds-react-text-input
- @phosphor-icons/react

## Usage

### Basic Example

```tsx
export const Component = () => {
  const columns = [
    {
      header: 'First Name',
      accessorKey: 'firstName',
    },
    {
      header: 'Last Name',
      accessorKey: 'lastName',
      size: 500,
      meta: {
        align: 'left',
      },
    },
  ];
  const data = [
    {
      firstName: 'Robby',
      lastName: 'Gaythwaite',
    },
    {
      firstName: 'Laureen',
      lastName: 'Dutt',
    },
    {
      firstName: 'Burlie',
      lastName: 'Routley',
    },
  ];
  const [selectedRows, setSelectedRows] = useState<CDSTableSelection>({});
  return (
    <CDSTable
      columns={columns}
      data={people}
      pagination={true}
      sticky={true}
      rowSelection={selectedRows}
      onRowSelectionChange={setSelectedRows}
    />
  );
};
```

### With Filtering

```tsx
export const Component = () => {
  const [liveFilter, setLiveFilter] = useState<boolean>(false);
  const [usageFilter, setUsageFilter] = useState<boolean>(false);
  const [gmailFilter, setGmailFilter] = useState<boolean>(false);
  const [yahooFilter, setYahooFilter] = useState<boolean>(false);
  const [hotmailFilter, setHotmailFilter] = useState<boolean>(false);

  const columnFilters: CDSTableColumnFilters = [
    ...(liveFilter
      ? [
          {
            id: 'live',
            value: liveFilter,
          },
        ]
      : []),
    ...(usageFilter
      ? [
          {
            id: 'usage',
            value: usageFilter,
          },
        ]
      : []),
    ...(gmailFilter || yahooFilter || hotmailFilter
      ? [
          {
            id: 'email',
            value: [
              ...(gmailFilter ? ['gmail.com'] : []),
              ...(yahooFilter ? ['yahoo.com'] : []),
              ...(hotmailFilter ? ['hotmail.com'] : []),
            ],
          },
        ]
      : []),
  ];

  const filterDrawerContent = (
    <div>
      <h3>Email domain</h3>
      <CDSFlex direction="vertical" gap="sm">
        <CDSCheckbox checked={gmailFilter} onChange={(e) => setGmailFilter(e.target.checked)}>
          gmail.com
        </CDSCheckbox>
        <CDSCheckbox checked={yahooFilter} onChange={(e) => setYahooFilter(e.target.checked)}>
          yahoo.com
        </CDSCheckbox>
        <CDSCheckbox checked={hotmailFilter} onChange={(e) => setHotmailFilter(e.target.checked)}>
          hotmail.com
        </CDSCheckbox>
      </CDSFlex>
    </div>
  );

  const keyFilterContent = (
    <>
      <CDSCheckbox checked={liveFilter} onChange={(e) => setLiveFilter(e.target.checked)}>
        Live
      </CDSCheckbox>
      <CDSCheckbox checked={usageFilter} onChange={(e) => setUsageFilter(e.target.checked)}>
        Usage
      </CDSCheckbox>
    </>
  );

  return (
    <CDSTable columns={columns} data={people} columnFilters={columnFilters}>
      <CDSTable.FilterBar
        filterDrawerChildren={filterDrawerContent}
        keyFilterChildren={keyFilterContent}
      />
    </CDSTable>
  );
};
```

By default, the column filters use a case-insensitive string inclusion to perform the filtering. If a different filter function is required, please look at
[@tanstack/react-table Filtering](https://tanstack.com/table/v8/docs/api/features/filters?from=reactTableV7&original=https://github.com/TanStack/table/tree/v7/docs/src/pages/docs/api/useFilters.md)
for more functions. These filter functions can be placed inside the column definitions as so:

```tsx
const columnDef = [
  {
    header: 'Email',
    accessorKey: 'email',
    meta: {
      align: 'left',
    },
    filterFn: 'arrIncludes',
  },
];
```

If the pre-existing filter functions are not adequate, it is possible to pass a function into the `filterFn` key.

```tsx
const columnDef = [
  {
    header: 'Email',
    accessorKey: 'email',
    meta: {
      align: 'left',
    },
    filterFn: (row, columnId, value: string[], addMeta) =>
      value.some((extension) => (row.getValue(columnId) as string).indexOf(extension) > -1),
  },
];
```

### With Column Display Settings

```tsx
export const Component = () => {
  const columnDef = [
    {
      ... // YOUR COLUMN DEFINITION
      meta: {
        // FOR EACH COLUMN, DEFINE THE LABEL TO BE SHOWN
        // IN THE SETTINGS DISPLAY DRAWER
        columnVisibilityFilterLabel: 'THIS COLUMN LABEL',
      },
    },
    ...
  ];
  return (
    <CDSTable
      {...} // YOUR TABLE CONFIGURATION
      enableColumnsDisplaySettings={true}
    />
  );
};

```

### With Expandable Rows

```tsx
export const Component = () => {
  return (
    <CDSTable
      // YOUR TABLE CONFIGURATION
      enableExpanding={true}
      rowExpansionConfig={{
        expandedRowRender: (row: Row<Type>) => {
          return <div>YOUR CUSTOM EXPANDED ROW RENDER</div>;
        },
        getRowCanExpand: (row: Row<Type>) => {
          return YOUR_CUSTOM_CONDITION;
        },
      }}
    />
  );
};
```

## With Column Filtering

```tsx
export const Component = () => {
  return (
    <CDSTable
      // YOUR TABLE CONFIGURATION
      enableColumnFilters={true}
    />
  );
};
```

### ColumnSizing

Column sizing is defined in the column definition. There are 3 accepted props related to column sizing:

- `size`: attempts to satisfy the width but will resize if necessary to prevent horizontal scroll
- `minSize`: sets a hard minimum width for the column
- `maxSize`: sets a hard maximum width for the column

### With Row Drag and Drop

```tsx
export const Component = () => {
  const [data, setData] = useState<YourDataType[]>([]);

  const onReorderRow = useCallback(
    ({
      draggedRowIndex,
      targetRowIndex,
      updatedData,
    }: CDSTableOnReorderRowEvent<YourDataType[]>) => {
      // YOUR LOGIC FOR HANDLING THE UPDATED DATA
      setData(updatedData);
    },
    [setData]
  );

  return (
    <CDSContainer>
      <CDSTable data={data} enableReorderRows={true} onReorderRow={onReorderRow} />
    </CDSContainer>
  );
};
```

## Props

### CDSTable

| Name                          | Description                                                                                                                                                                                                                                                                                                            | Required | Default                                                                                                                                                                                                                                                                                                        |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| columns                       | The columns of the table. For API information see: [TanStack Table ColumnDef](https://tanstack.com/table/v8/docs/guide/column-defs). For details on the `meta` expanded attributes see [CDSTable ColumnDef Meta Extended Attributes](#cdstable-columndef-meta-extended-attributes).                                    | yes      | -                                                                                                                                                                                                                                                                                                              |
| data                          | JSON data of the information to show in the table. If length equals 0, it will show the table in its empty state.                                                                                                                                                                                                      | yes      | -                                                                                                                                                                                                                                                                                                              |
| initialState                  | The initial state of the table. This state will be used when resetting various table states either automatically by the table. For API information see: [TanStack Table Custom Initial State](https://tanstack.com/table/latest/docs/framework/react/guide/table-state#custom-initial-state)                           | no       | {}                                                                                                                                                                                                                                                                                                             |
| density                       | Spacing around the table cells. Values: `"condensed"` \|`"compact"` \| `"comfy"` \| `"spacious"`                                                                                                                                                                                                                       | no       | `"compact"`                                                                                                                                                                                                                                                                                                    |
| sticky                        | Keeps the header of a table in the same place relative to the table while the user scrolls down the page.                                                                                                                                                                                                              | no       | false                                                                                                                                                                                                                                                                                                          |
| pagination                    | Allows a user to see the total number of pages and navigate to a specific page                                                                                                                                                                                                                                         | no       | `false`                                                                                                                                                                                                                                                                                                        |
| paginationConfig              | Allows for configuring the pagination of the table. [CDSTablePaginationConfig API](#cdstablepaginationconfig-api) page                                                                                                                                                                                                 | no       | `{pageSize: 30, showPageSizeChanger: true, pageSizeOptions: [30, 50, 100]}`                                                                                                                                                                                                                                    |
| paginationClassName           | Classname to append onto the pagination container                                                                                                                                                                                                                                                                      | no       | `undefined`                                                                                                                                                                                                                                                                                                    |
| actionBarConfig               | Configuration options for the bulk action bar that appears when items are selected. [CDSTableBulkActionBarConfig API](#cdstablebulkactionbarconfig-api)                                                                                                                                                                | no       | `undefined`                                                                                                                                                                                                                                                                                                    |
| rowSelection                  | JSON object of rows selected. The key is the index of `data` that is selected. The value is `true` if the row is checked. Both `rowSelection` and `onRowSelection` must be configured together or not at all.                                                                                                          | no       | `undefined`                                                                                                                                                                                                                                                                                                    |
| onRowSelectionChange          | Function to update the state of the `rowSelection`. See [Usage](#usage) for examples. Both `rowSelection` and `onRowSelection` must be configured together or not at all.                                                                                                                                              | no       | `{}`                                                                                                                                                                                                                                                                                                           |
| enableColumnsDisplaySettings  | Allows configuration of visible columns.                                                                                                                                                                                                                                                                               | no       | `false`                                                                                                                                                                                                                                                                                                        |
| openSettingsDrawerBelowHeader | Allows for settings drawer to be open below the header.                                                                                                                                                                                                                                                                | no       | `false`                                                                                                                                                                                                                                                                                                        |
| settingsDrawerRoot            | Allows for controlling where the configuration drawer is mounted. It is often used in multiple tables in one page                                                                                                                                                                                                      | no       | Defaults to internal table container                                                                                                                                                                                                                                                                           |
| displaySettingsColumnDef      | Allows for a custom column configuration for the settings column.                                                                                                                                                                                                                                                      | no       | `undefined`                                                                                                                                                                                                                                                                                                    |
| onColumnDisplaySettingsClosed | A callback for when the settings drawer is closed.                                                                                                                                                                                                                                                                     | no       | `undefined`                                                                                                                                                                                                                                                                                                    |
| enableSortColumns             | Allows for columns to be sorted by drag and drop interaction.                                                                                                                                                                                                                                                          | no       | `false`                                                                                                                                                                                                                                                                                                        |
| enableReorderRows             | Allows for rows to be sorted by drag and drop interaction.                                                                                                                                                                                                                                                             | no       | `false`                                                                                                                                                                                                                                                                                                        |
| enableSortingRemoval          | Enables the ability to remove sorting while cycling through the sorting states for a column.                                                                                                                                                                                                                           | no       | `true`                                                                                                                                                                                                                                                                                                         |
| onReorderRow                  | A customized method for sorting rows.                                                                                                                                                                                                                                                                                  | no       | `undefined`                                                                                                                                                                                                                                                                                                    |
| onReorderColumn               | Method that emits an event containing an array of column ids of the new column order                                                                                                                                                                                                                                   | no       | `undefined`                                                                                                                                                                                                                                                                                                    |
| manualPagination              | Enables manual control of pagination for lazy loading. For API information see: [TanStack Table Pagination - Manual Pagination](https://tanstack.com/table/v8/docs/api/features/pagination#manualpagination)                                                                                                           | no       | `false`                                                                                                                                                                                                                                                                                                        |
| onSortingChange               | A callback to sorting the table when using manualPagination.                                                                                                                                                                                                                                                           | no       | `undefined`                                                                                                                                                                                                                                                                                                    |
| loading                       | Shows the loading state for the table                                                                                                                                                                                                                                                                                  | no       | `false`                                                                                                                                                                                                                                                                                                        |
| loadingConfig                 | Configure the number of rows or columns displayed when loading is true. **By default rows will be 10 and columns will be automatically calculated based off the number of visible columns**                                                                                                                            | no       | `undefined`                                                                                                                                                                                                                                                                                                    |
| emptyStateMessage             | The message to display when the table is in its empty state, it overrides the table's default empty state message.                                                                                                                                                                                                     | no       | `'No matches found'`                                                                                                                                                                                                                                                                                           |
| emptyState                    | Optional table Empty State, it overrides the table's default empty state.                                                                                                                                                                                                                                              | no       | `undefined`                                                                                                                                                                                                                                                                                                    |
| enablePinning                 | Enables column pinning feature for the table.                                                                                                                                                                                                                                                                          | no       | `false`                                                                                                                                                                                                                                                                                                        |
| columnPinningState            | The table column state of the pinned columns. For API information see: [TanStack - Column Pinning](https://tanstack.com/table/v8/docs/api/features/column-pinning#state)                                                                                                                                               | no       | `{ left: [], right: [] }`                                                                                                                                                                                                                                                                                      |
| enableExpanding               | Enables row expansion for the table.                                                                                                                                                                                                                                                                                   | no       | `false`                                                                                                                                                                                                                                                                                                        |
| rowExpansionConfig            | The required configuration for the row expansion feature. [CDSTableRowExpansionConfig API](#cdstablerowexpansionconfig-api)                                                                                                                                                                                            | no       | `undefined`                                                                                                                                                                                                                                                                                                    |
| onRowClick                    | An onClick handler for the table row. As a guideline, must only be used when no other clickable elements exist in the entire row.                                                                                                                                                                                      | no       | `undefined`                                                                                                                                                                                                                                                                                                    |
| headerLineClamp               | Specifies the maximum number of visible lines allowed in the table header. If the content exceeds the allowed lines, it will be truncated with an ellipsis. This controls the CSS `line-clamp` property.                                                                                                               | no       | `2`                                                                                                                                                                                                                                                                                                            |
| onColumnVisibilityChange      | Method that emit's a VisibilityState object whenever the visibility of the columns are changed. [Tanstack - Column Visibility APIs](https://tanstack.com/table/latest/docs/api/features/column-visibility#oncolumnvisibilitychange) row.                                                                               | no       | `undefined`                                                                                                                                                                                                                                                                                                    |
| getSubRows                    | A function to retrieve the sub rows for a given parent row. This function is called with the original row data and its index to determine if the row has sub rows and what those sub rows are.                                                                                                                         | no       | `undefined`                                                                                                                                                                                                                                                                                                    |
| enableRowSelection            | Allows disabling of checkboxes without losing accessibility of labels/items/content of row. Please review [enableRowSelection from tanstack](https://tanstack.com/table/latest/docs/framework/react/examples/row-selection). Takes a boolean or row conditional `(row: Row<Person>) => row.original.live`              | no       | `undefined`                                                                                                                                                                                                                                                                                                    |
| sortDescFirst                 | Sorts the table in descending order first when user clicks on a column header. Please review [sortDescFirst API](https://tanstack.com/table/latest/docs/api/features/sorting#sortdescfirst) and [Sorting Direction guide](https://tanstack.com/table/latest/docs/guide/sorting#sorting-direction) from TanStack's docs | no       | `undefined`                                                                                                                                                                                                                                                                                                    |
| locale                        | JSON Object of aria labels to define table elements                                                                                                                                                                                                                                                                    | no       | <pre><code lang="json">{<br> tableSettings: {<br> buttonAriaLabel: 'Table settings',<br> headerText: 'Table settings',<br> densitySectionHeading: 'Table density',<br> columnSectionHeading: 'Column settings',<br> columnSectionDescription: 'Select or deselect to show or hide columns.'<br>}}</code></pre> |
| defaultConfig                 | Define the default table view for different states of the table when the "Reset to default" button in the Setting Drawer is clicked `defaultConfig={{ columnsVisibility: VisibilityState }}`. **`defaultConfig` is REQUIRED to display the "Reset to default" button**                                                 | no       |                                                                                                                                                                                                                                                                                                                |
| enableColumnFilters           | Boolean to enables or disables column filtering                                                                                                                                                                                                                                                                        | no       | `false`                                                                                                                                                                                                                                                                                                        |
| enableColumnResizing          | Boolean to enable or disable column resize                                                                                                                                                                                                                                                                             | no       | `false`                                                                                                                                                                                                                                                                                                        |
| columnResizeMode              | `onChange` allows the column resize to occur during change, `oneEnd` triggers resize after user completes drag action for better performance                                                                                                                                                                           | no       | `onChange`                                                                                                                                                                                                                                                                                                     |
| highlightedRow                | Highlights a specific row for drawer based on the row ID.                                                                                                                                                                                                                                                              | no       | -                                                                                                                                                                                                                                                                                                              |

#### CDSTable ColumnDef Meta Extended Attributes

| Name                        | Description                                                                           | Required | Default     |
| --------------------------- | ------------------------------------------------------------------------------------- | -------- | ----------- |
| align                       | Allows to set the alignment of the column content. Accepts `left`, `right`, `center`. | no       | `left`      |
| columnVisibilityFilterLabel | Allows to set the label for when using `enableColumnsDisplaySettings`.                | no       | `""`        |
| ariaLabel                   | Provides an accessible label for screen readers to describe the column.               | no       | `undefined` |
| actionHeaderAriaLabel       | Provides an accessible label for screen readers to describe the action column header. | no       | `undefined` |
| expanded                    | Defines the content to be displayed when a row is expanded.                           | no       | `undefined` |
| expandFrom                  | Determines whether the expand action should start from this column.                   | no       | `false`     |
| isHidden                    | Controls whether the column is initially hidden.                                      | no       | `false`     |
| isHighlightable             | Enables text highlighting in the table cell.                                          | no       | `false`     |

### CDSTableBulkActionBarConfig API

| Name                | Description                                                                                                                                                   | Required | Default      |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------------ |
| cancelSelectionText | ReactNode to display on the cancel selection button                                                                                                           | no       | `Cancel`     |
| children            | ReactNode to display on the right side of the bulk action bar next to the cancel button. Examples include a destructive remove button and a tag dropdown menu | no       | `undefined`  |
| className           | Classname to append onto the bulk action bar container                                                                                                        | no       | `undefined`  |
| itemsSelectedText   | ReactNode to display next to the number of items selected                                                                                                     | no       | `undefined`  |
| selectAllText       | ReactNode to display on the select all button                                                                                                                 | no       | `Select all` |

### CDSTablePaginationConfig API

| Name                | Description                                                                                                                                                                                                | Required | Default     |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ----------- |
| pageSize            | The current page size.                                                                                                                                                                                     | yes      | -           |
| showPageSizeChanger | Controls when to show the page size changer.                                                                                                                                                               | yes      | -           |
| pageSizeOptions     | The options of page sizes for user to select.                                                                                                                                                              | no       | -           |
| pageIndex           | The current page index, used when `manualPagination` is set to `true`.                                                                                                                                     | no       | `undefined` |
| pageCount           | When `manualPagination` is set to `true`, you must pass page count. For API information see: [Tanstack Table Pagination - pageCount](https://tanstack.com/table/v8/docs/api/features/pagination#pagecount) | no       | `undefined` |
| paginationState     | Controls the table pagination state when `manualPagination` is set to `true`.                                                                                                                              | no       | `undefined` |
| onPaginationChange  | Function to be called when a pagination change has ocurred when `manualPagination` is set to `true`.                                                                                                       | no       | `undefined` |
| getRowId            | Function to uniquely identify a row. This is useful when using selectable rows with manual pagination to ensure items are correctly selected when changing pages.                                          | no       | `undefined` |
| totalRows           | The total number of rows available across all pages when `manualPagination` is set to `true`.                                                                                                              | no       | `undefined` |

### CDSTable.FilterBar

| Name                        | Description                                                                           | Required | Default     |
| --------------------------- | ------------------------------------------------------------------------------------- | -------- | ----------- |
| filterDrawerChildren        | Children to display in the filter drawer                                              | no       | `undefined` |
| filterDrawerFooterChildren  | Children to display in the filter drawer's footer                                     | no       | `undefined` |
| filterDrawerToggleText      | ReactNode to display in the button that toggles the filter drawer                     | no       | `'Filters'` |
| showSearch                  | Toggles the global search textbox on the left of the filter bar                       | no       | `true`      |
| onGlobalSearchChange        | A callback to be executed when search changes when using table with manualPagination. | no       | `undefined` |
| searchPlaceholder           | Placeholder to show in the global search input                                        | no       | `'Search'`  |
| searchValue                 | Global search value                                                                   | no       | `undefined` |
| keyFilterChildren           | ReactNode to display between the global search input and the filter drawer toggle     | no       | `undefined` |
| children                    | ReactNode to display optional actions at the end of FilterBar.                        | no       | `undefined` |
| openFilterDrawerBelowHeader | Allows for the filter drawer to open below the header.                                | no       | `false`     |
| isFilterDrawerOpen          | Toggles the filter drawer to open.                                                    | no       | `false`     |
| onFilterDrawerOpenChange    | Callback fired when the filter drawer open state changes.                             | no       | `undefined` |
| isLoading                   | Disables results for loading case                                                     | no       | `false`     |
| resultsLabelText            | Text adjacent to results number                                                       | no       | `Results`   |
| filterbarOverrideResult     | Results number override for external hooks                                            | no       | `undefined` |
| additionalComponents        | Additional components always visible at the right side of the FilterBar               | no       | `undefined` |

### CDSTableRowExpansionConfig API

| Name              | Description                                                 | Required | Default |
| ----------------- | ----------------------------------------------------------- | -------- | ------- |
| expandedRowRender | A customized render method with access to the row object.   | yes      | -       |
| getRowCanExpand   | A customized method for detecting when a row is expandable. | yes      | -       |

## `defaultConfig`

`defaultConfig` defines the baseline state that will revert to when the user clicks "Reset to default". It is not used to establish the table's initial runtime state. If you want to start the table with certain columns hidden, a custom order, pinning, or a specific density, you must pass those as the props (`columnVisibility`, `columnOrder`, `columnPinning`, `density`, etc.) directly to `CDSTable`.

## Localization

The `locale` prop allows you to customize text and labels throughout the table for internationalization or product-specific customization. It uses a fallback mechanism where only the values you provide will override the default locale object.

### Locale Properties

| Property                                     | Description                                                       | Type                       | Default                                                                      |
| -------------------------------------------- | ----------------------------------------------------------------- | -------------------------- | ---------------------------------------------------------------------------- |
| `tableSettings.buttonAriaLabel`              | Aria label for the table settings button                          | `string`                   | `'Table settings'`                                                           |
| `tableSettings.headerText`                   | Header text in the table settings drawer                          | `string`                   | `'Table settings'`                                                           |
| `tableSettings.densitySectionHeading`        | Heading for the density section in settings drawer                | `string`                   | `'Table density'`                                                            |
| `tableSettings.columnSectionHeading`         | Heading for the column settings section in settings drawer        | `string`                   | `'Column settings'`                                                          |
| `tableSettings.columnSectionDescription`     | Description text for the column settings section                  | `string`                   | `'Select or deselect to show or hide columns. Reorder columns by dragging.'` |
| `tableSelect.disabledCheckboxTooltipMessage` | Function that returns tooltip message for disabled checkboxes     | `(row: RowData) => string` | `(row) => 'Tooltip message for disabled checkbox'`                           |
| `tablePagination.rowsPerPageText`            | Text label for rows per page selector                             | `string`                   | `'Rows per page'`                                                            |
| `tablePagination.prepositionOfText`          | Text between page numbers (e.g., "1 **of** 10")                   | `string`                   | `'of'`                                                                       |
| `tableRow.reorderButtonLabel`                | Function that returns complete aria-label for row reorder button  | `(row: RowData) => string` | `(row) => 'Drag to reorder row ${row.index + 1}'`                            |
| `tableRow.expandButtonLabel`                 | Function that returns complete aria-label for row expand button   | `(row: RowData) => string` | `(row) => 'Expand row ${row.index + 1}'`                                     |
| `tableRow.collapseButtonLabel`               | Function that returns complete aria-label for row collapse button | `(row: RowData) => string` | `(row) => 'Collapse row ${row.index + 1}'`                                   |

### Usage Examples to Override Default

```tsx
<CDSTable
  {...props}
  locale={{
    tableSettings: {
      buttonAriaLabel: 'Configure table',
      headerText: 'Display Settings',
      columnSectionHeading: 'Columns',
      columnSectionDescription: 'Choose which columns to display.',
      densitySectionHeading: 'Row Spacing',
    },
    tablePagination: {
      rowsPerPageText: 'Items per page',
      prepositionOfText: 'of',
    },
    tableSelect: {
      disabledCheckboxTooltipMessage: (row) => `Cannot select ${row.name}`,
    },
    tableRow: {
      reorderButtonLabel: (row) => `Move row ${row.index + 1}`,
      expandButtonLabel: (row) => `Show details for row ${row.index + 1}`,
      collapseButtonLabel: (row) => `Hide details for row ${row.index + 1}`,
    },
  }}
/>
```

## Known Issues

The following are known issues and may affect your use of this component.

- [JEST: SyntaxError: Unexpected token 'export'](https://cisco-sbg.atlassian.net/browse/MAGX-700)
- [JEST: SyntaxError: Unexpected token 'export'](https://cisco-sbg.atlassian.net/browse/MAGX-1005)

## Migrations

This section outlines the required steps to migrate to various versions of the library. Please review carefully, especially for **breaking changes**.

### **v1.5.0**

#### 1. Switching from `phosphor-react` to `@phosphor-icons/react`

As of **version 1.5.0**, we have replaced the dependency on `phosphor-react` with `@phosphor-icons/react`. This ensures better support, modern features, and compatibility with current frameworks.

##### Why the Change?

- The `phosphor-react` package is no longer actively maintained, and `@phosphor-icons/react` offers improved performance and up-to-date features.

##### What Do You Need to Do?

Follow these steps to migrate:

1. **Uninstall the Old Package**  
   Run the following command to remove `phosphor-react` from your project:

   ```bash
   npm uninstall phosphor-react
   ```

2. **Install the New Package**  
   Replace it with `@phosphor-icons/react` by running:

   ```bash
   npm install @phosphor-icons/react
   ```

---

### **v1.6.0**

#### 1. Table Filter Bar: Migration to `CDSTable.FilterBar`

As of **version 1.6.0**, the old table filter bar has been replaced with the `CDSTable.FilterBar` component to improve functionality and support better UX features.

##### Why the Change?

- The new `CDSTable.FilterBar` component introduces a requirement to display the total results, a feature not available in the old filter bar.
- When loading the table, the results may display numbers irrelevant to the current state if not handled properly.

##### What Do You Need to Do?

If you are using the filter bar in your project, update your implementation as follows:

- Add the `isLoading` prop to `CDSTable.FilterBar` to properly handle loading states.

Example:

```tsx
<CDSTable {...rest} loading={loading}>
  <CDSTable.FilterBar
    isLoading={loading}
    showGlobalSearch={true}
    onGlobalSearchChange={(event) => setFilter(event.target.value)}
  />
</CDSTable>
```

#### 2. Table Settings Drawer: "Reset to Default" Button Requires `defaultConfig`

The **Table Settings Drawer** now requires the `defaultConfig` prop to display the "Reset to Default" button. This change is mandatory as of **version 1.6.0**.

##### Why the Change?

- Previously, the "Reset to Default" button only reset `columnVisibility`. However, the Design and UX teams plan to introduce additional customization features (e.g., adjusting spacing, column reordering, column pinning).
- To handle these future enhancements, the `defaultConfig` prop is required to define a baseline default state for table settings.

##### What Do You Need to Do?

- Pass a `defaultConfig` object to the Table Settings Drawer:

```tsx
<CDSTable.SettingsDrawer
  defaultConfig={{
    columnVisibility: /* your default column visibility state */
  }}
/>
```

- In future updates, `defaultConfig` will also support:
  - `columnOrder`
  - `columnPinning`

---

### **v1.7.0**

#### 1. Deprecate `size` prop in favor of `density`

To better align with UX and it's functionality we'll be renaming `size` to `density` and deprecating the `size` prop

##### Why the Change?

- UX guidelines + figma call the values associated with `condensed`, `compact`, `comfy`, and `spacious` as **densities**.
- `density` refers to the spacing of items within element.
- `size` is usually referred to the height and width of elements, so "sizing", refers to the literal size of the element painted to the window.
  - So using "comfy" to describe the size of an element doesn't have a direct correlation to it's height and width, as compared to describing the "comfy" spacing within the bounds of the element.

##### What Changed?

- A new `density` prop has been created
- `size` has been deprecated
  - `size` will be kept for compatibility reasons

##### What Do You Need To Do?

Rename prop `size` to `density`

```tsx
<CDSTable density="comfy" />
```

#### 2. `locale` for table settings drawer is now a property of `locale.tableSettings` and reflects the new functionalities within the drawer

The `locale` prop for the drawer now allows overriding the text for the header, density, and column visibility and has been moved to `locale.tableSettings`. The naming has also been updated to better reflect their purpose and intention within the settings drawer.

##### Why the Change?

- Table Settings Drawer now allows users to modify their table sizing via the table density section, this requires that the text can be overridden for internationalization and other product team customization.
- The new structure organizes all these overridable values making it easier to manage and extend to other parts of the table in the future.
- Previously, the table settings drawer only had one functionality (column visibility), which meant that overridden text within the drawer could be more loose with what product teams could put to explain showing/hiding columns. This change is to follow UX guidelines a bit more closely and align overriding text to it's functionality in the drawer.
- `displaySettingsDrawerHeaderText` and `displaySettingsDrawerHeaderDescription` no longer align with their original intention as "description" specifically was placed above to the column visibility section, but was treated as a generic message that did not need to align with the column visibility section it lived in.
  - Since the description was overridable in such a generic fashion, product teams were allowed to also override the header text as well, and this is not something that UX recommends

##### What Changed?

- Table density is now an additional section within the drawer and also needs the ability to override it's text.
- A new `tableSettings` key has been created in the `locale` prop to organize and centralize all the overridable text in one place.
- `displaySettingsDrawerHeaderDescription` no longer "exists" in regards to it's original name and has been removed in favor of allowing overriding the text of the section handling columns.
- `tableSettingsAriaLabel`, `displaySettingsDrawerHeaderText`, and `displaySettingsDrawerHeaderDescription` have been moved into `locale.tableSettings` and subsequently renamed
  - `tableSettingsAriaLabel` -> `buttonAriaLabel`
  - `displaySettingsDrawerHeaderText` -> `headerText`
  - `displaySettingsDrawerHeaderDescription` -> `columnSectionDescription`

##### What Do You Need to Do?

If you were previously using `locale` to override text within the table settings drawer, like so:

```tsx
<CDSTable
  locale={{
    tableSettingsAriaLabel: 'Table Settings',
    displaySettingsDrawerHeaderText: 'Display Settings',
    displaySettingsDrawerHeaderDescription: 'Adjust how data is displayed.',
  }}
/>
```

You will now need to update it to use the new `tableSettings` property within `locale`:

```tsx
<CDSTable
  locale={{
    tableSettings: {
      buttonAriaLabel: 'Table Settings',
      columnSectionHeading: 'Columns',
      columnSectionDescription: 'Choose which columns to display.',
      densitySectionHeading: 'Density',
      headerText: 'Display Settings',
    },
  }}
/>
```

#### 3. `onColumnDisplaySettingsClosed` now returns an object that returns `columnVisibility` and `size`

The Table Settings Drawer has now been updated to better align with UX designs, which allows users to customize more aspects of the table (i.e. size). `onColumnDisplaySettingsClosed` now returns the values of those settings (and future settings) in an object

##### Why the Change?

- The updated callback now provides more detailed information about the table's settings. Instead of just giving you the column visibility information, it also includes details about the table's size. This makes it easier to manage the table's configuration in your application.

##### What Changed?

Previously, `onColumnDisplaySettingsClosed` only returned the visibility of the columns as a single param. Now, it returns an object with two pieces of information:

1. **`columnVisibility`**: The visibility state of the columns
2. **`size`**: The size of the table (e.g., small, medium, large)

##### What Do You Need to Do?

If you're using `onColumnDisplaySettingsClosed` currently, you'll need to update it to handle the new format. Here's an example of how you can use the updated callback:

```tsx
<CDSTable
  onColumnDisplaySettingsClosed={({ columnVisibility, size }) => {
    console.log('Updated Column Visibility:', columnVisibility);
    console.log('Updated Table Size:', size);
  }}
/>
```
