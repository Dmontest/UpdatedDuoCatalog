# cds-react-tooltip

A simple text-only popup that provides a tip or an explanation of an object or information. For more complex needs, refer to popovers.

> [Design Guidelines](https://magnetic.cisco.com/0a43ab5cd/p/5009c2-tooltip)

## Installation

NPM: `npm i @ciscodesignsystems/cds-react-tooltip`

Yarn: `yarn add @ciscodesignsystems/cds-react-tooltip`

## Styling and Theme Installation

You will also need to install the styling and needed theme files.

NPM: `npm i @ciscodesignsystems/cds-magnetic-theme-web`

Yarn: `yarn add @ciscodesignsystems/cds-magnetic-theme-web`

Then import the following into your app's css:

```css
@import '@ciscodesignsystems/cds-magnetic-theme-web/css/dist/token-theme-light-variables.css';
@import '@ciscodesignsystems/cds-react-tooltip/index.css';
```

## Dependencies

### Required

These dependencies must be met in your product:

- [react](https://www.npmjs.com/package/react) >=16.14.0
- [react-dom](https://www.npmjs.com/package/react-dom) >=16.14.0
- @ciscodesignsystems/cds-react-popover
- @ciscodesignsystems/cds-component-utilities

### Optional

Optional dependencies will vary depending on your product needs, but may include the following components:

- @phosphor-icons/react

## Usage

```tsx
export const Component = () => {
  return (
    <CDSTooltip title="Tooltip Content">
      <MapPin size={48} />
    </CDSTooltip>
  );
};
```

## Props

| Name                                | Description                                                                                                                                                | Required | Default   |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------- |
| title                               | To add tooltip content.                                                                                                                                    | yes      | -         |
| placement                           | To define the placement of tooltip.                                                                                                                        | no       | top       |
| variant                             | To define tooltip type (map, feature-highlight, default).                                                                                                  | no       | 'default' |
| autoPlacement                       | Enables the fallback “no space” strategy. Ensures the preferred placement is kept unless there is no space left.                                           | no       | true      |
| showArrow                           | To display arrow between element and tooltip window.                                                                                                       | no       | true      |
| disabled                            | Disables the hover (mouseevents) on children element.                                                                                                      | no       | false     |
| open                                | To open/close the tooltip.                                                                                                                                 | no       |           |
| setOpen                             | This setter method is to maintain the open/close state of tooltip.                                                                                         | no       |           |
| offset                              | To maintain gap between element and tooltip window.                                                                                                        | no       | 10        |
| root                                | Optionally specifies the root node, the portal container will be appended to.                                                                              | no       | null      |
| preserveTabOrder                    | This will preserve the tab order context based on the React tree instead of the DOM tree.                                                                  | no       | true      |
| updateOnAnimationFrame              | Whether to update the position of the floating element on every animation frame if required. While optimized for performance, it should be used sparingly. | no       | false     |
| hasInteractionDismissReferencePress | Set the referencePress for useDismiss event in useInteraction (set true if using popover/tooltip for complex table headers)                                | no       | false     |
| hasInteractionHoverMove             | Allows tooltip to move with the hover (set false if using popover/tooltip for complex table headers)                                                       | no       | true      |
