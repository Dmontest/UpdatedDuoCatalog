# cds-react-drawer

A drawer is a panel that’s typically used to supplement page content or allow the user to complete tasks in context to the page.

> [Design Guidelines](https://magnetic.cisco.com/0a43ab5cd/p/5094d3-drawer)

## Installation

NPM: `npm i @ciscodesignsystems/cds-react-drawer`

Yarn: `yarn add @ciscodesignsystems/cds-react-drawer`

## Styling and Theme Installation

You will also need to install the styling and needed theme files.

NPM: `npm i @ciscodesignsystems/cds-magnetic-theme-web`

Yarn: `yarn add @ciscodesignsystems/cds-magnetic-theme-web`

Then import the following into your app's css:

```css
@import '@ciscodesignsystems/cds-magnetic-theme-web/css/dist/token-theme-light-variables.css';
@import '@ciscodesignsystems/cds-react-drawer/index.css';
```

## Dependencies

### Required

These dependencies must be met in your product:

- [react](https://www.npmjs.com/package/react) >=16.14.0
- [react-dom](https://www.npmjs.com/package/react-dom) >=16.14.0
- @ciscodesignsystems/cds-react-flex
- @ciscodesignsystems/cds-component-types
- @ciscodesignsystems/cds-component-utilities

### Optional

Optional dependencies will vary depending on your product needs, but may include the following components:

- @ciscodesignsystems/cds-react-button
- @phosphor-icons/react
- framer-motion

## Usage

```tsx
<CDSDrawer isOpen={true}>
  <CDSDrawer.Heading>Drawer Header</CDSDrawer.Heading>
  <CDSDrawer.Content>
    <p>Drawer Content</p>
  </CDSDrawer.Content>
  <CDSDrawer.Footer>
    <CDSButton variant="tertiary">Cancel</CDSButton>
    <CDSButton variant="primary">Action</CDSButton>
  </CDSDrawer.Footer>
</CDSDrawer>
```

## Props

| Name             | Description                                                                              | Required | Default |
| ---------------- | ---------------------------------------------------------------------------------------- | -------- | ------- |
| affectsLayout    | To push the page content aside                                                           | no       | false   |
| isOpen           | Open state for the drawer                                                                | no       | false   |
| onClose          | Function that will be called while closing the drawer                                    | yes      |         |
| onOpen           | Function that will be called while opening the drawer                                    | no       |         |
| showStickyButton | To show/hide the drawer sticky button                                                    | no       | false   |
| size             | Size of the drawer to display                                                            | no       | sm      |
| preserveTabOrder | This will preserve the tab order context based on the React tree instead of the DOM tree | no       | true    |
| root             | Optionally specifies the root node the portal container will be appended to              | no       | null    |
| openBelowHeader  | Defines if the drawer should open with margin top equal to the CDSHeader height.         | no       | false   |
| isDismissible    | Closes the drawer when the user clicks outside of it.                                    | no       | false   |
| triggerRef       | Ref to the trigger element that opens/closes the drawer.                                 | no       | null    |
