# cds-react-transfer

Transfer allows users to move items from one list to another. It is useful when a user needs to select multiple items from a large data set. Lists under 15 options should consider using Multi-Select component.

> [Design Guidelines](https://magnetic.cisco.com/0a43ab5cd/p/22d810-transfer)

## Installation

NPM: `npm i @ciscodesignsystems/cds-react-transfer`

Yarn: `yarn add @ciscodesignsystems/cds-react-transfer`

## Styling and Theme Installation

You will also need to install the styling and needed theme files.

NPM: `npm i @ciscodesignsystems/cds-magnetic-theme-web`

Yarn: `yarn add @ciscodesignsystems/cds-magnetic-theme-web`

Then import the following into your app's css:

```css
@import '@ciscodesignsystems/cds-magnetic-theme-web/css/dist/token-theme-light-variables.css';
@import '@ciscodesignsystems/cds-react-transfer/index.css';
```

## Dependencies

### Required

These dependencies must be met in your product:

- [react](https://www.npmjs.com/package/react) >=16.14.0
- [react-dom](https://www.npmjs.com/package/react-dom) >=16.14.0
- @ciscodesignsystems/cds-component-types
- @ciscodesignsystems/cds-react-button
- @ciscodesignsystems/cds-react-checkbox
- @ciscodesignsystems/cds-react-collapse
- @ciscodesignsystems/cds-react-dropdown
- @ciscodesignsystems/cds-react-empty-state
- @ciscodesignsystems/cds-react-flex
- @ciscodesignsystems/cds-react-text-input
- @ciscodesignsystems/cds-component-utilities

## Usage

### Transfer List - Uncontrolled

```tsx
export const Component = () => {
  const initialListData: CDSTransferListData = new Map([
    ['key1', 'Option 1'],
    ['key2', 'Option 2'],
    ['key3', 'Option 3'],
    ['key4', 'Option 4'],
    ['key5', 'Option 5'],
    ['key6', 'Option 6'],
    ['key7', 'Option 7'],
  ]);
  const { onKeysChange, onTransfer, sourceData, sourceKeys, targetData, targetKeys } =
    useTransferList({
      initialSourceData: initialListData,
    });
  return (
    <CDSTransfer
      initialData={initialListData}
      onKeysChange={onKeysChange}
      onTransfer={onTransfer}
      sourceData={sourceData}
      sourceKeys={sourceKeys}
      targetData={targetData}
      targetKeys={targetKeys}
    />
  );
};
```

### Transfer List - Controlled

```tsx
export const Component = () => {
  const listData: CDSTransferListData = new Map([
    ['key1', 'Option 1'],
    ['key2', 'Option 2'],
    ['key3', 'Option 3'],
    ['key4', 'Option 4'],
    ['key5', 'Option 5'],
    ['key6', 'Option 6'],
    ['key7', 'Option 7'],
  ]);

  const newlistData: CDSTransferListData = new Map([
    ['newkey1', 'New Option 1'],
    ['newkey2', 'New Option 2'],
    ['newkey3', 'New Option 3'],
  ]);

  const [listInput, setListInput] = useState(listData);
  const [sourceListInput, setSourceListInput] = useState(listData);
  const [targetListInput, setTargetListInput] = useState({});

  const updateListData = () => {
    setListInput(newListData);
    setSourceListInput(newListData);
    setTargetListInput({});
  };

  const { onKeysChange, onTransfer, sourceData, sourceKeys, targetData, targetKeys } =
    useTransferList({
      initialSourceData: sourceListInput,
      initialTargeteData: targetListInput,
      sourceData: sourceListInput,
      setSourceData: setSourceListInput,
      targetData: targetListInput,
      setTargetData: setTargetListInput,
    });

  return (
    <CDSFlex direction="vertical" gap="md">
      <CDSFlex justify="flex-end">
        <CDSButton onClick={updateListData}>Update Transfer Input</CDSButton>
      </CDSFlex>
      <CDSTransfer
        initialData={listInput}
        onKeysChange={onKeysChange}
        onTransfer={onTransfer}
        sourceData={sourceData}
        sourceKeys={sourceKeys}
        targetData={targetData}
        targetKeys={targetKeys}
        preserveOrder
      />
    </CDSFlex>
  );
};
```

Note : While using `preserveOrder`,
`initialData` passed to the `<CDSTransfer>` is the source of truth for maintaining sorting order.
Hence while using Controlled version of Transfer List, primary list should be passed as `initialData` and sourceData and targetData should always be subset of that primary list.

### Transfer Tree - Uncontrolled

```tsx
export const Component = () => {
  const treeData = {
    key1: { label: 'Option 1' },
    key2: { label: 'Option 2' },
    keyA: {
      label: 'This is Category A',
      values: {
        key3: { label: 'Option 3' },
        key4: { label: 'Option 4' },
        key5: { label: 'Option 5' },
      },
    },
  };
  const { onKeysChange, onTransfer, sourceData, sourceKeys, targetData, targetKeys } =
    useTransferTree({
      initialSourceData: treeData,
    });

  return (
    <CDSTransfer.Tree
      initialData={treeData}
      onKeysChange={onKeysChange}
      onTransfer={onTransfer}
      sourceData={sourceData}
      sourceKeys={sourceKeys}
      targetData={targetData}
      targetKeys={targetKeys}
    />
  );
};
```

### Transfer Tree - Controlled

```tsx
export const Component = () => {
  const treeData = {
    key1: { label: 'Option 1' },
    key2: { label: 'Option 2' },
    keyA: {
      label: 'This is Category A',
      values: {
        key3: { label: 'Option 3' },
        key4: { label: 'Option 4' },
        key5: { label: 'Option 5' },
      },
    },
  };

  const newTreeData = {
    newkey2: { label: 'New Option 2' },
    newkeyA: {
      label: 'New - This is Category A',
      values: {
        newkey5: { label: 'New Option 5' },
        newkey3: { label: 'New Option 3' },
      },
    },
  };

  const [treeInput, setTreeInput] = useState(treeData);
  const [sourceTreeInput, setSourceTreeInput] = useState(treeData);
  const [targetTreeInput, setTargetTreeInput] = useState({});

  const updateTreeData = () => {
    setTreeInput(newTreeData);
    setSourceTreeInput(newTreeData);
    setTargetTreeInput({});
  };

  const { onKeysChange, onTransfer, sourceData, sourceKeys, targetData, targetKeys } =
    useTransferTree({
      initialSourceData: sourceTreeInput,
      initialTargeteData: targetTreeInput,
      sourceData: sourceTreeInput,
      setSourceData: setSourceTreeInput,
      targetData: targetTreeInput,
      setTargetData: setTargetTreeInput,
    });

  return (
    <CDSFlex direction="vertical" gap="md">
      <CDSFlex justify="flex-end">
        <CDSButton onClick={updateTreeData}>Update Transfer Input</CDSButton>
      </CDSFlex>
      <CDSTransfer.Tree
        initialData={treeInput}
        onKeysChange={onKeysChange}
        onTransfer={onTransfer}
        sourceData={sourceData}
        sourceKeys={sourceKeys}
        targetData={targetData}
        targetKeys={targetKeys}
        preserveOrder
      />
    </CDSFlex>
  );
};
```

Note : While using `preserveOrder`,
`initialData` passed to the `<CDSTransfer.Tree>` is the source of truth for maintaining sorting order.
Hence while using Controlled version of Transfer Tree, primary tree data should be passed as `initialData` and sourceData and targetData should always be subset of that primary tree data.

## Props

#### Transfer List

| Name                       | Description                                                                                                                                                                                   | Required | Default |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------- |
| initialData                | Initial data input.                                                                                                                                                                           | yes      |         |
| onKeysChange               | A callback function that is executed when the keys are selected along with the side source/target.                                                                                            | yes      |         |
| onTransfer                 | A callback function that is executed when the transfer between source/target columns is completed                                                                                             | yes      |         |
| sourceData                 | Used for setting the source data. The elements that are part of this array will be present the left column. Except the elements whose keys are included in targetKeys prop                    | yes      |         |
| sourceKeys                 | A set of keys of elements that are listed on the left column                                                                                                                                  | yes      |         |
| targetData                 | Used for setting the target data. The elements that are part of this array will be present the right column. Except the elements whose keys are included in sourceKeys prop                   | yes      |         |
| targetKeys                 | A set of keys of elements that are listed on the right column                                                                                                                                 | yes      |         |
| preserveOrder              | Default behaviour of Transfer List component is to follow alphabetical sequencing. This boolean prop can be used for the purpose of keeping sequnce of the component consumer provided input. | no       | false   |
| sourceSearchInputAriaLabel | Aria label for source input                                                                                                                                                                   | no       |         |
| targetSearchInputAriaLabel | Aria label for target input                                                                                                                                                                   | no       |         |
| locale.                    | A locale object with strings used in the trabsfer component, see [Localization](#localization) for details                                                                                    | no       |         |

#### Transfer Tree

| Name                       | Description                                                                                                                                                                                   | Required | Default |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------- |
| initialData                | Initial data input.                                                                                                                                                                           | yes      |         |
| onKeysChange               | A callback function that is executed when the keys are selected along with the side source/target.                                                                                            | yes      |         |
| onTransfer                 | A callback function that is executed when the transfer between source/target columns is completed                                                                                             | yes      |         |
| sourceData                 | Used for setting the source data. The elements that are part of this array will be present the left column. Except the elements whose keys are included in targetKeys prop                    | yes      |         |
| sourceKeys                 | A set of keys of elements that are listed on the left column                                                                                                                                  | yes      |         |
| targetData                 | Used for setting the target data. The elements that are part of this array will be present the right column. Except the elements whose keys are included in sourceKeys prop                   | yes      |         |
| targetKeys                 | A set of keys of elements that are listed on the right column                                                                                                                                 | yes      |         |
| preserveOrder              | Default behaviour of Transfer Tree component is to follow alphabetical sequencing. This boolean prop can be used for the purpose of keeping sequnce of the component consumer provided input. | no       | false   |
| sourceSearchInputAriaLabel | Aria label for source input                                                                                                                                                                   | no       |         |
| targetSearchInputAriaLabel | Aria label for target input                                                                                                                                                                   | no       |         |

## Localization

The locale by default uses a fallback mechanism in which only the values passed to it would override from a default locale object used for the component. For the following usage of `CDSTransfer` with no overrides:

```tsx
<CDSTransfer
  initialData={new Map()}
  onKeysChange={() => {}}
  onTransfer={() => {}}
  sourceData={new Map()}
  sourceKeys={new Set()}
  targetData={new Map()}
  targetKeys={new Set()}
/>
```

The locale for the `CDSTransfer` component would look like:

```json
{
  "availableItemLabel": "available",
  "availableItemsLabel": "available",
  "selectedItemLabel": "selected",
  "selectedItemsLabel": "selected",
  "noMatchesFound": "No matches found",
  "noItemsAvailable": "No items available",
  "noItemsSelected": "No items selected"
}
```

By default, locale is not required. The overrides are merged based on the locale definition. By providing the following locale override:

```tsx
<CDSTransfer
  initialData={data}
  onKeysChange={onKeysChange}
  onTransfer={onTransfer}
  sourceData={data}
  sourceKeys={new Set()}
  targetData={new Map()}
  targetKeys={new Set()}
  locale={{
    availableItemLabel: 'available item',
    availableItemsLabel: 'available items',
    selectedItemLabel: 'selected item',
    selectedItemsLabel: 'selected items',
    noItemsAvailable: 'No Items Found',
    noItemsSelected: 'Nothing Selected',
  }}
/>
```

### CDSTransferLocale Type

These are the available string overrides for the `CDSTransfer` locale object.

| Name                | Description                                              | Required |
| ------------------- | -------------------------------------------------------- | -------- |
| availableItemLabel  | Label for the number of available item                   | no       |
| availableItemsLabel | Label for the number of available items                  | no       |
| selectedItemLabel   | Label for the number of selected item                    | no       |
| selectedItemsLabel  | Label for the number of selected items                   | no       |
| noMatchesFound      | Message shown when search yields no results              | no       |
| noItemsAvailable    | Message shown when the source list has no items          | no       |
| noItemsSelected     | Message shown when the target list has no selected items | no       |

##### Limitation

Default Ordering of the Transfer component elements follows alphabetical sequencing. This is by english locale only.
