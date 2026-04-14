# cds-react-tab

Use tabs to navigate easily between content that is related but can be viewed independently within a page.

> [Design Guidelines](https://magnetic.cisco.com/0a43ab5cd/p/89dccd-tab/b/54b046)

## Installation

NPM: `npm i @ciscodesignsystems/cds-react-tab`

Yarn: `yarn add @ciscodesignsystems/cds-react-tab`

## Styling and Theme Installation

You will also need to install the styling and needed theme files.

NPM: `npm i @ciscodesignsystems/cds-magnetic-theme-web`

Yarn: `yarn add @ciscodesignsystems/cds-magnetic-theme-web`

Then import the following into your app's css:

```css
@import '@ciscodesignsystems/cds-magnetic-theme-web/css/dist/token-theme-light-variables.css';
@import '@ciscodesignsystems/cds-react-tab/index.css';
```

## Dependencies

### Required

These dependencies must be met in your product:

- [react](https://www.npmjs.com/package/react) >=16.14.0
- [react-dom](https://www.npmjs.com/package/react-dom) >=16.14.0
- @ciscodesignsystems/cds-component-types
- @ciscodesignsystems/cds-component-utilities
- @ciscodesignsystems/cds-react-tooltip

### Optional

Optional dependencies will vary depending on your product needs, but may include the following components:

- @phosphor-icons/react

## Usage

### Horizontal Tab

```tsx
export const Horizontal = () => {
  <CDSTab variant="primary">
    <CDSTab.Link href="#/" selected>
      Selected
    </CDSTab.Link>
    <CDSTab.Link href="#/">Unselected</CDSTab.Link>
    <CDSTab.Link href="#/">Hover</CDSTab.Link>
    <CDSTab.Link disabled>Disabled</CDSTab.Link>
  </CDSTab>;
};
```

If your application requires the link to be a different element, you can pass in an `as` prop to modify the component rendered.

```tsx
export const HorizontalWithReactRouter = () => {
  <CDSTab {...args}>
    <CDSTab.Link as={Link} to="/Tab1" selected>
      Tab 1
    </CDSTab.Link>
    <CDSTab.Link as={Link} to="/Tab2">
      Tab 2
    </CDSTab.Link>
    <CDSTab.Link as={Link} to="/Tab3">
      Tab 3
    </CDSTab.Link>
    <CDSTab.Link target="_self" disabled>
      Tab 4
    </CDSTab.Link>
  </CDSTab>;
};
```

If your application requires to change the tooltip's placement

```tsx
export const withTooltip = () => {
  <CDSTab variant="primary">
    <CDSTab.Link
      href="#/"
      suffix={<CDSTooltip
        title="Contextual help for this tab."
        placement='right'
        />}
      selected
    >
      Selected
    </CDSTab.Link>
    <CDSTab.Link
      href="#/"
      suffix={<CDSTooltip
        title="Contextual help for this tab."
        placement='left'
      >}
    >
      Unselected
    </CDSTab.Link>
  </CDSTab>;
};
```

### Vertical Tab

```tsx
export const Vertical = () => {
  <CDSTab orientation="vertical">
    <CDSTab.Link href="#/" selected>
      Selected
    </CDSTab.Link>
    <CDSTab.Link href="#/">Unselected</CDSTab.Link>
    <CDSTab.Link href="#/">Hover</CDSTab.Link>
    <CDSTab.Link disabled>Disabled</CDSTab.Link>
  </CDSTab>;
};
```

If your application requires the link to be a different element, you can pass in an `as` prop to modify the component rendered.

```tsx
export const VerticalWithReactRouter = () => {
  <CDSTab orientation="vertical" {...args}>
    <CDSTab.Link as={Link} to="/Tab1" selected>
      Tab 1
    </CDSTab.Link>
    <CDSTab.Link as={Link} to="/Tab2">
      Tab 2
    </CDSTab.Link>
    <CDSTab.Link as={Link} to="/Tab3">
      Tab 3
    </CDSTab.Link>
    <CDSTab.Link disabled>Tab 4</CDSTab.Link>
  </CDSTab>;
};
```

If your application requires to change the tooltip's placement

```tsx
export const withTooltip = () => {
  <CDSTab variant="primary">
    <CDSTab.Link
      href="#/"
      suffix={<CDSTooltip
        title="Contextual help for this tab."
        placement='right'
        />}
      selected
    >
      Selected
    </CDSTab.Link>
    <CDSTab.Link
      href="#/"
      suffix={<CDSTooltip
        title="Contextual help for this tab."
        placement='left'
      >}
    >
      Unselected
    </CDSTab.Link>
  </CDSTab>;
};
```

### Tab Group

```tsx
export const TabGroup = () => {
  <CDSTab orientation="vertical">
    <CDSTab.Group label="Collapsible Group 1" collapsible defaultExpanded>
      <CDSTab.Link href="#/" target="_self" selected>
        Child Tab 1
      </CDSTab.Link>
      <CDSTab.Link href="#/" target="_self">
        Child Tab 2
      </CDSTab.Link>
    </CDSTab.Group>
    <CDSTab.Group label="Collapsible Group 2" collapsible defaultExpanded={false}>
      <CDSTab.Link href="#/" target="_self">
        Nested Child A
      </CDSTab.Link>
      <CDSTab.Link href="#/" target="_self">
        Nested Child B
      </CDSTab.Link>
    </CDSTab.Group>
  </CDSTab>;
};
```

## Props

### CDSTab

| Name        | Description                                                        | Required | Default    |
| ----------- | ------------------------------------------------------------------ | -------- | ---------- |
| variant     | Determines the kind of Tab. Vertical Tabs doesn't have any variant | no       | primary    |
| orientation | Determines the orientation of Tab                                  | no       | horizontal |

### CDSTab.Link

| Name             | Description                                             | Required | Default |
| ---------------- | ------------------------------------------------------- | -------- | ------- |
| children         | Items to display underneath the tab                     | no       |         |
| disabled         | Check if the tab is disabled or not                     | no       |         |
| prefix           | Items to display before the tab                         | no       |         |
| selected         | Check if tab is selected or not                         | no       |         |
| suffix           | Items to display after the tab                          | no       |         |
| onClose          | Close event handler to close the tab                    | no       |         |
| as               | Polymorphic prop that renders the HTML component passed | no       | `a`     |
| tooltipPlacement | Property to define the placement of tooltip             | no       | `right` |

### CDSTab.Group

| Name            | Description                              | Required | Default     |
| --------------- | ---------------------------------------- | -------- | ----------- |
| label           | Label for the group                      | yes      |             |
| collapsible     | Whether the group is collapsible         | no       | `false`     |
| defaultExpanded | Initial expanded state                   | no       | `true`      |
| children        | The tab items to render inside the group | no       | `undefined` |
