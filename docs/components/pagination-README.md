# cds-react-pagination

Pagination divides large sets of data into separate pages providing quick access to all pages while at times indicating that more pages exist. Pagination is placed at its respective contents bottom right.

> [Design Guidelines](https://zeroheight.com/0a43ab5cd/p/30ac3c-pagination)

## Installation

NPM: `npm i @ciscodesignsystems/cds-react-pagination`

Yarn: `yarn add @ciscodesignsystems/cds-react-pagination`

## Styling and Theme Installation

You will also need to install the styling and needed theme files.

NPM: `npm i @ciscodesignsystems/cds-magnetic-theme-web`

Yarn: `yarn add @ciscodesignsystems/cds-magnetic-theme-web`

Then import the following into your app's css:

```css
@import '@ciscodesignsystems/cds-magnetic-theme-web/css/dist/token-theme-light-variables.css';
@import '@ciscodesignsystems/cds-react-pagination/index.css';
```

## Dependencies

### Required

- [react](https://www.npmjs.com/package/react) >=16.14.0
- [react-dom](https://www.npmjs.com/package/react-dom) >=16.14.0
- @ciscodesignsystems/cds-component-utilities
- @ciscodesignsystems/cds-react-button
- @ciscodesignsystems/cds-react-flex
- @ciscodesignsystems/cds-react-select

### Optional

Optional dependencies will vary depending on your product needs, but may include the following components:

- @phosphor-icons/react

## Usage

### NonNumberedPagination

```tsx
export const Component = () => {
  const totalRecords = 2038;
  const rowsPerPage = 30;
  const lastPage = Math.ceil(totalRecords / rowsPerPage);

  const onPageClickHandler = (page: string) => {
    console.log(`Page clicked: ${page}`);
  };

  const onRowsPerPageChangeHandler = (value?: number) => {
    console.log(`Rows per page changed to: ${value}`);
  };

  return (
    <CDSContainer style={{ width: 'fit-content' }}>
      <CDSPagination currentPage={1} rows={totalRecords}>
        <CDSFlex>
          <CDSPagination.Options
            options={[
              { value: '10', label: '10' },
              { value: '20', label: '20' },
              { value: '30', label: '30' },
              { value: '50', label: '50' },
              { value: '100', label: '100' },
            ]}
            totalRows={totalRecords}
            onRowsPerPageChange={onRowsPerPageChangeHandler}
          />
          <CDSPagination.Controls
            isNumerical={false}
            disabled={undefined}
            onPageClick={onPageClickHandler}
          />
        </CDSFlex>
      </CDSPagination>
    </CDSContainer>
  );
};
```

### NumberedPagination

```tsx
export const Component = () => {
  const totalRecords = 2038;

  const onPageClickHandler = (page: string) => {
    console.log(`Navigated to page: ${page}`);
  };

  const onRowsPerPageChangeHandler = () => {
    console.log('Rows per page changed, reset to page 1.');
  };

  return (
    <CDSContainer style={{ width: 'fit-content' }}>
      <CDSPagination currentPage={68} rows={totalRecords}>
        <CDSFlex>
          <CDSPagination.Options
            options={[
              { value: '10', label: '10' },
              { value: '20', label: '20' },
              { value: '30', label: '30' },
              { value: '50', label: '50' },
              { value: '100', label: '100' },
            ]}
            totalRows={totalRecords}
            onRowsPerPageChange={onRowsPerPageChangeHandler}
          />
          <CDSPagination.Controls onPageClick={onPageClickHandler} />
        </CDSFlex>
      </CDSPagination>
    </CDSContainer>
  );
};
```

## Props

### CDSPagination

| Name               | Description                                                 | Required | Default     |
| ------------------ | ----------------------------------------------------------- | -------- | ----------- |
| currentPage        | The current page that is shown on the pagination component. | no       | `undefined` |
| defaultRowsPerPage | The default rows per page.                                  | no       | `undefined` |
| rows               | The total number of rows or items.                          | no       | `undefined` |

### CDSPagination.Options

| Name                | Description                                                                                           | Required | Default                 |
| ------------------- | ----------------------------------------------------------------------------------------------------- | -------- | ----------------------- |
| locale              | A locale object with strings used in options component, see [Localization](#localization) for details | no       |                         |
| totalRows           | Total number of rows available.                                                                       | no       | `undefined`             |
| onRowsPerPageChange | Callback triggered when rows per page selection changes.                                              | no       | `undefined`             |
| options             | Dropdown options for rows per page selector.                                                          | no       | `[10, 20, 30, 50, 100]` |

### CDSPagination.Controls

| Name            | Description                                              | Required | Default     |
| --------------- | -------------------------------------------------------- | -------- | ----------- |
| isNumerical     | Defines when to use the numerical/non-numerical buttons. | no       | `true`      |
| onPageClick     | A callback for when the page button is clicked.          | yes      |             |
| disabledActions | Disables the non-numerical pagination controls.          | no       | `undefined` |

## Localization

The locale by default uses a fallback mechanism in which only the values passed to it would override from a default locale object used for the component. For the following usage of `CDSPagination.Options` with no overrides:

```tsx
<CDSPagination.Options />
```

The locale for the `CDSPagination.Options` component would look like:

```json
{
  "rowsPerPageText": "Rows per page",
  "prepositionOfText": "of"
}
```

By default, locale is not required. The overrides are merged based on the locale definition. By providing the following locale override:

```tsx
<CDSPagination.Options locale={{ prepositionOfText: 'OF' }} />
```
