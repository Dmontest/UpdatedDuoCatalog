# cds-react-search

Search allows users to find different types of content by entering keywords to narrow down the scope of content. It should be assistive, immediate, and accurate.

> [Design Guidelines](https://magnetic.cisco.com/0a43ab5cd/p/65e1cc-search)

## Installation

NPM: `npm i @ciscodesignsystems/cds-react-search`

Yarn: `yarn add @ciscodesignsystems/cds-react-search`

## Styling and Theme Installation

You will also need to install the styling and needed theme files.

NPM: `npm i @ciscodesignsystems/cds-magnetic-theme-web`

Yarn: `yarn add @ciscodesignsystems/cds-magnetic-theme-web`

Then import the following into your app's css:

```css
@import '@ciscodesignsystems/cds-magnetic-theme-web/css/dist/token-theme-light-variables.css';
@import '@ciscodesignsystems/cds-react-search/index.css';
```

## Dependencies

### Required

These dependencies must be met in your product:

- [react](https://www.npmjs.com/package/react) >=16.14.0
- [react-dom](https://www.npmjs.com/package/react-dom) >=16.14.0
- @ciscodesignsystems/cds-component-utilities
- @ciscodesignsystems/cds-react-text-input
- @ciscodesignsystems/cds-react-empty-state
- @ciscodesignsystems/cds-react-divider
- @ciscodesignsystems/cds-react-text

### Optional

Optional dependencies will vary depending on your product needs, but may include the following components:

- @floating-ui/react
- @phosphor-icons/react

## Usage

Items are an object with a label and a description

```ts
type Item = {
  /**
   * This is the searchable label for the item
   */
  label: string;
  /**
   * The description for the item
   */
  description: string;
};
const items: Item[] = [
  { label: 'Option 1', description: '1' },
  { label: 'Option 2', description: '2' },
  { label: 'Option 3', description: '3' },
  { label: 'Option 4', description: '4' },
  { label: 'Option 5', description: '5' },
  { label: 'Option 6', description: '6' },
  { label: 'Option 7', description: '7' },
];
```

CDSSearchItemCategory is an object with a label and items array

```ts
type CDSSearchItemCategory = {
  /**
   * The name of the category
   */
  label: string;
  /**
   * The items that belong to this category
   */
  items: Item[];
};

const itemsWithCategory: CDSSearchItemCategory[] = [
  {
    label: 'category1',
    items: [
      { label: 'Option 1', description: '1' },
      { label: 'Option 1.1', description: '1.1' },
      { label: 'Option 1.2', description: '1.2' },
    ],
  },
  {
    label: 'category2',
    items: [
      { label: 'Option 2', description: '2' },
      { label: 'Option 2.1', description: '2.1' },
    ],
  },
  {
    label: 'category3',
    items: [{ label: 'Option 3', description: '3' }],
  },
  {
    label: 'category4',
    items: [{ label: 'Option 4', description: '4' }],
  },
  {
    label: 'category5',
    items: [{ label: 'Option 5', description: '5' }],
  },
];
```

```tsx
<CDSSearch.Simple {...args} items={items} />
```

## CDSSearchInterface Props

| Name        | Description                                                                         | Required | Default |
| ----------- | ----------------------------------------------------------------------------------- | -------- | ------- |
| label       | The label for search input                                                          | No       |         |
| value       | The default value for search                                                        | No       |         |
| size        | The size of search input and autocomplete                                           | No       | 'md'    |
| customWidth | Width of the search for subcomponents (autocomplete & global search panel) to match | No       | false   |
| onClear     | Function to execute when entered text is clear                                      | No       |         |
| onChange    | When Text-Input value is change                                                     | No       | false   |

## CDSSimpleSearch Autocomplete Props (Extends from CDSSearchInterface)

| Name                             | Description                                                    | Required | Default           |
| -------------------------------- | -------------------------------------------------------------- | -------- | ----------------- |
| items                            | Array of items user will search through                        | Yes      |                   |
| maxShownOptions                  | Max number of items shown in dropdown                          | No       | 6                 |
| minimumCharactersForAutocomplete | Minimum amount of characters to initiate autocomplete dropdown | No       | 2                 |
| isAutocompleteOpen               | Boolean to allow autocomplete to open                          | No       | true              |
| defaultValue                     | defaultValue for the input                                     | No       |                   |
| onSelect                         | Boolean to allow autocomplete to open                          | No       | {() => void};     |
| onToggle                         | Called when autocomplete is toggled open/closed.               | No       | {(bool) => void}; |
| ariaLabel                        | Aria label for the text input                                  | No       | undefined         |
