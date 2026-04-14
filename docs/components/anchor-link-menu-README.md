# cds-react-anchor-link-menu

The anchor link menu provides quick and easier navigation across long-form page content spanning a single page or tab.

> [Design Guidelines](https://magnetic.cisco.com/0a43ab5cd/p/751768-anchor-link-menu)

## Installation

NPM: `npm i @ciscodesignsystems/cds-react-anchor-link-menu`

Yarn: `yarn add @ciscodesignsystems/cds-react-anchor-link-menu`

## Styling and Theme Installation

You will also need to install the styling and needed theme files.

NPM: `npm i @ciscodesignsystems/cds-magnetic-theme-web`

Yarn: `yarn add @ciscodesignsystems/cds-magnetic-theme-web`

Then import the following into your app's css:

```css
@import '@ciscodesignsystems/cds-magnetic-theme-web/css/dist/token-theme-light-variables.css';
@import '@ciscodesignsystems/cds-react-anchor-link-menu/index.css';
```

## Dependencies

### Required

These dependencies must be met in your product:

- [react](https://www.npmjs.com/package/react) >=16.14.0
- [react-dom](https://www.npmjs.com/package/react-dom) >=16.14.0
- @ciscodesignsystems/cds-component-utilities

### Optional

Optional dependencies will vary depending on your product needs, but may include the following components:

- @phosphor-icons/react

## Usage

### Default

```tsx
export const Component = () => {
  return (
    <CDSAnchorLinkMenu>
      <CDSAnchorLinkMenu.Panel>
        <CDSAnchorLinkMenu.Item href="#" label="Item 1" />
        <CDSAnchorLinkMenu.Item href="#" label="Item 2">
          <CDSAnchorLinkMenu.Group>
            <CDSAnchorLinkMenu.Item href="#" label="Item 2a" level={2} />
            <CDSAnchorLinkMenu.Item href="#" label="Item 2b" level={2} />
          </CDSAnchorLinkMenu.Group>
        </CDSAnchorLinkMenu.Item>
        <CDSAnchorLinkMenu.Item href="#" label="Item 3">
          <CDSAnchorLinkMenu.Group>
            <CDSAnchorLinkMenu.Item href="#" label="Item 3a" level={2} />
            <CDSAnchorLinkMenu.Item href="#" label="Item 3b" level={2} />
          </CDSAnchorLinkMenu.Group>
        </CDSAnchorLinkMenu.Item>
      </CDSAnchorLinkMenu.Panel>
    </CDSAnchorLinkMenu>
  );
};
```

### Floating

```tsx
export const Component = () => {
  return (
    <div style={{ height: '300px' }}>
      <CDSAnchorLinkMenu floating icon={<ListBullets weight="bold" size={16} />} label="Contents">
        <CDSAnchorLinkMenu.Panel>
          <CDSAnchorLinkMenu.Item href="#" label="Item 1" />
          <CDSAnchorLinkMenu.Item href="#" label="Item 2">
            <CDSAnchorLinkMenu.Group>
              <CDSAnchorLinkMenu.Item href="#" label="Item 2a" level={2} />
              <CDSAnchorLinkMenu.Item href="#" label="Item 2b" level={2} />
            </CDSAnchorLinkMenu.Group>
          </CDSAnchorLinkMenu.Item>
          <CDSAnchorLinkMenu.Item href="#" label="Item 3">
            <CDSAnchorLinkMenu.Group>
              <CDSAnchorLinkMenu.Item href="#" label="Item 3a" level={2} />
              <CDSAnchorLinkMenu.Item href="#" label="Item 3b" level={2} />
            </CDSAnchorLinkMenu.Group>
          </CDSAnchorLinkMenu.Item>
        </CDSAnchorLinkMenu.Panel>
      </CDSAnchorLinkMenu>
    </div>
  );
};
```

## Props

### CDSAnchorLinkMenu

| Name       | Description                                                                | Required | Default     |
| ---------- | -------------------------------------------------------------------------- | -------- | ----------- |
| `children` | Restricts child to only be a `CDSAnchorLinkMenuPanelProps` component.      | yes      |             |
| `floating` | Renders a floating menu; requires an `icon` and a `label` for button text. | no       | `false`     |
| `icon`     | Renders an icon on the left side of the floating button.                   | no       | `undefined` |
| `label`    | Label for the floating button.                                             | no       | `undefined` |
| `position` | Sets the sticky position of the floating button (`top` or `bottom`).       | no       | `top`       |
| `size`     | Sets the size of the button. Accepts `sm` or `md`. Defaults to `md`.       | no       | `md`        |

### CDSAnchorLinkMenu.Item

| Name       | Description                                                             | Required | Default     |
| ---------- | ----------------------------------------------------------------------- | -------- | ----------- |
| `children` | Restricts type of children to one or more `CDSAnchorLinkMenuItemProps`. | no       | `undefined` |
| `href`     | Defines the URL that the item anchor should navigate to.                | yes      |             |
| `label`    | Defines the text that will be displayed for an item.                    | yes      |             |
| `level`    | Defines the level of an item as a subsection.                           | no       | `1`         |
