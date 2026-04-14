# cds-react-tree-view

A Tree View displays hierarchical information in a structured list view that represents the hierarchy and relationship of the information.

## Installation

NPM: `npm i @ciscodesignsystems/cds-react-tree-view`

Yarn: `yarn add @ciscodesignsystems/cds-react-tree-view`

## Styling and Theme Installation

You will also need to install the styling and needed theme files.

NPM: `npm i @ciscodesignsystems/cds-magnetic-theme-web`

Yarn: `yarn add @ciscodesignsystems/cds-magnetic-theme-web`

Then import the following into your app's css:

```css
@import '@ciscodesignsystems/cds-magnetic-theme-web/css/dist/token-theme-light-variables.css';
@import '@ciscodesignsystems/cds-react-tree-view/index.css';
```

## Dependencies

### Required

These dependencies must be met in your product:

- [react](https://www.npmjs.com/package/react) >=16.14.0
- [react-dom](https://www.npmjs.com/package/react-dom) >=16.14.0
- @ciscodesignsystems/cds-component-utilities
- @ciscodesignsystems/cds-react-checkbox

## Usage

```tsx
export const Component = () => {
  interface MockTreeViewItem {
    id: string;
    title: string;
    textValue?: string;
    count?: number;
    items?: MockTreeViewItem[];
  }

  const items: MockTreeViewItem[] = [
    {
      id: '1',
      title: 'Documents',
      textValue: 'Documents',
      count: 23,
      items: [
        {
          id: '11',
          title: 'Project',
          textValue: 'Project',
          count: 3,
          items: [
            {
              id: '111',
              title: 'Weekday Report',
              textValue: 'Weekday Report',
              items: [
                {
                  id: '1111',
                  title: 'Monday Report',
                  textValue: 'Monday Report',
                },
              ],
            },
            {
              id: '112',
              title: 'Weekend Report',
              textValue: 'Weekend Report',
              count: 11,
            },
          ],
        },
      ],
    },
    {
      id: '2',
      title: 'Photos',
      textValue: 'Photos',
      count: 456,
      items: [
        {
          id: '21',
          title: 'Image 1',
          textValue: 'Image 1',
          items: [{ id: '211', title: 'Image 1.1' }],
        },
        { id: '22', title: 'Image 2', textValue: 'Image 2', count: 999 },
      ],
    },
  ];

  const renderTreeItem = (item: MockTreeViewItem): ReactNode | null => (
    <CDSTreeView.Item>
      <CDSTreeView.Item.Title>{item.title}</CDSTreeView.Item.Title>
      {!!item.count && (
        <CDSTreeView.Item.Anchor>
          <CDSTag>{item.count}</CDSTag>
        </CDSTreeView.Item.Anchor>
      )}
    </CDSTreeView.Item>
  );

  return <CDSTreeView items={items} renderTreeItem={renderTreeItem} aria-label="Tree View Demo" />;
};
```

## Props

### CDSTreeViewProps<T>

| Name                | Description                                                                                                  | Required | Default   |
| ------------------- | ------------------------------------------------------------------------------------------------------------ | -------- | --------- |
| items               | Item objects in the Tree View collection.                                                                    | Yes      | -         |
| renderTreeItem      | Function to render each item in the tree.                                                                    | Yes      | -         |
| locale              | A locale object with strings used in the onboarding component, see [Localization](#localization) for details | no       |           |
| variant             | The variant of the TreeView component.                                                                       | No       | 'default' |
| query               | Text to search and filter through Tree View items.                                                           | No       | -         |
| defaultSelectedKeys | The initial selected keys in the collection (uncontrolled)                                                   | No       | -         |
| disabledKeys        | The item keys that are disabled. These items cannot be selected, but can be expanded                         | No       | -         |
| onItemStateChange   | Callback function to handle state change for individual item.                                                | No       | -         |

### CDSTreeViewItemProps<T>

A CDSTreeView Item is a generic type. It depends on your requirement of the tree view item.  
It is important to note that an `id` property is required for each item because it serves as a unique identifier for the iterable list of items, enabling the TreeView to efficiently manage and track individual items.
You can also provide additional, optional props that are listed below.

| Name      | Description                                                        | Required | Default |
| --------- | ------------------------------------------------------------------ | -------- | ------- |
| id        | Unique identifier for the TreeView item.                           | Yes      | -       |
| items     | Nested items within the TreeView item.                             | No       | -       |
| textValue | Required for Search. A textual representation of the item's value. | No       | -       |
| tooltip   | The tooltip to display for the TreeView item.                      | No       | -       |

### Search

Tree View supports search and filtering of Tree View Items. When filtered based on the `query` prop, the Tree View updates to display the Tree View Items that contain matching text in their `textValue` prop and their parents. The Tree View expands accordingly to show the filtered items.

To use search functionality, pass the `query` prop with the string value. Because a Tree View Item allows free projection of custom content, the `textValue` prop string value is used to filter the item.
You can use the **CDSTreeView.Item.Title** component to render the title of the Tree View Item. The Tree View internally passes the search context to the Title component and highlights the characters that match the `query` value.

## Localization

The locale by default uses a fallback mechanism in which only the values passed to it would override from a default locale object used for the component. For the following usage of `CDSTreeViewProps` with no overrides:

An over-ride locale for the `CDSTreeViewProps` component would look like:

```json
{
  "emptyStateMessage": "No items matched."
}
```

By default, locale is not required. The overrides are merged based on the locale definition.
These are the available string overrides for `CDSTreeViewLocale` locale object.

| Name              | Description                                                     | Required |
| ----------------- | --------------------------------------------------------------- | -------- |
| emptyStateMessage | String to override text shown when no search results are found. | no       |

## React Aria Tree Support

CDSTreeView provides users with a way to navigate nested hierarchical information, with support for keyboard navigation and selection. `CDSTreeView` extends from React Aria's `Tree` component. Additional info can be found [here](https://react-spectrum.adobe.com/react-aria/Tree.html)

### Tree Props

| Name                   | Description                                                                                             | Required | Default       |
| ---------------------- | ------------------------------------------------------------------------------------------------------- | -------- | ------------- |
| selectionBehavior      | How multiple selection should behave in the tree.                                                       | No       | —             |
| renderEmptyState       | Provides content to display when there are no items in the list.                                        | No       | —             |
| disabledBehavior       | Whether `disabledKeys` applies to all interactions, or only selection.                                  | No       | `'selection'` |
| items                  | Item objects in the collection.                                                                         | No       | —             |
| disabledKeys           | The item keys that are disabled. These items cannot be selected, focused, or otherwise interacted with. | No       | —             |
| selectionMode          | The type of selection that is allowed in the collection.                                                | No       | —             |
| disallowEmptySelection | Whether the collection allows empty selection.                                                          | No       | —             |
| selectedKeys           | The currently selected keys in the collection (controlled).                                             | No       | —             |
| defaultSelectedKeys    | The initial selected keys in the collection (uncontrolled).                                             | No       | —             |
| children               | The contents of the collection.                                                                         | No       | —             |
| dependencies           | Values that should invalidate the item cache when using dynamic collections.                            | No       | —             |
| className              | The CSS `className` for the element.                                                                    | No       | —             |
| style                  | The inline style for the element.                                                                       | No       | —             |
| expandedKeys           | The currently expanded keys in the collection (controlled).                                             | No       | —             |
| defaultExpandedKeys    | The initial expanded keys in the collection (uncontrolled).                                             | No       | —             |
