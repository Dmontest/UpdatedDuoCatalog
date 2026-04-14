# cds-react-popover

Popovers are an informational contained layer that appear when users hover over, focus on, click on, or tap an element. Unlike a tooltip, that can only contain simple text, they can include longer text, rich content such as images and charts, and interactive elements such as links and buttons.

> [Design Guidelines](https://magnetic.cisco.com/0a43ab5cd/p/727988-popover)

## Installation

NPM: `npm i @ciscodesignsystems/cds-react-popover`

Yarn: `yarn add @ciscodesignsystems/cds-react-popover`

## Styling and Theme Installation

You will also need to install the styling and needed theme files.

NPM: `npm i @ciscodesignsystems/cds-magnetic-theme-web`

Yarn: `yarn add @ciscodesignsystems/cds-magnetic-theme-web`

Then import the following into your app's css:

```css
@import '@ciscodesignsystems/cds-magnetic-theme-web/css/dist/token-theme-light-variables.css';
@import '@ciscodesignsystems/cds-react-popover/index.css';
```

## Dependencies

### Required

These dependencies must be met in your product:

- [react](https://www.npmjs.com/package/react) >=16.14.0
- [react-dom](https://www.npmjs.com/package/react-dom) >=16.14.0
- @ciscodesignsystems/cds-component-utilities

### Optional

Optional dependencies will vary depending on your product needs, but may include the following components:

- @floating-ui/react
- @phosphor-icons/react

## Usage

### Popover displayed on click

```tsx
export const Component = () => {
  const usePopoverInitialState = () => {
    const [open, setOpen] = useState(false);
    const toggleOpen = useCallback(() => setOpen((prev) => !prev), [setOpen]);

    return {
      open,
      setOpen,
      toggleOpen,
    };
  };
  const { setOpen, toggleOpen, open } = usePopoverInitialState();
  return (
    <CDSPopover
      open={open}
      setOpen={setOpen}
      title={
        <p>
          Laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
          voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          <a href="#">OptionalTextLink</a>
        </p>
      }>
      <CDSButton onClick={toggleOpen}>Click here to Open Popover</CDSButton>
    </CDSPopover>
  );
};
```

### Popover displayed on hover

```tsx
export const Component = () => {
  return (
    <CDSPopover
      title={
        <p>
          Laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
          voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          <a href="#">OptionalTextLink</a>
        </p>
      }>
      <MapPin size={48} />
    </CDSPopover>
  );
};
```

### Popover displayed with section seperation

```tsx
export const Component = () => {
  return (
    <CDSPopover
      title={
        <>
          <p>
            Laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
            in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            <a href="#">OptionalTextLink</a>
          </p>
          <CDSPopover.Divider />
          <p> Another section data goes here</p>
        </>
      }>
      <MapPin size={48} />
    </CDSPopover>
  );
};
```

## Props

### CDSPopover

| Name                                | Description                                                                                                                                                | Required | Default |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------- |
| children                            | Child element on which popover displays via click/hover/tap/focus                                                                                          | yes      | -       |
| disabled                            | Disables the hover (mouseevents) on children element                                                                                                       | no       | false   |
| open                                | To open/close the popover                                                                                                                                  | no       |         |
| offset                              | To maintain gap between element and popover window                                                                                                         | no       | 10      |
| placement                           | Defines placement of the popover                                                                                                                           | no       | top     |
| setOpen                             | This setter method is to maintain open/close state                                                                                                         | no       |         |
| showArrow                           | To display arrow between element and popover window.                                                                                                       | no       | true    |
| size                                | To define the size of popover (small, medium, large)                                                                                                       | no       | md      |
| title                               | Add popover content                                                                                                                                        | yes      | -       |
| variant                             | To define popover type (map, feature-highlight, default)                                                                                                   | no       | default |
| autoPlacement                       | Enables the fallback “no space” strategy. Ensures the preferred placement is kept unless there is no space left.                                           | no       | true    |
| root                                | Optionally specifies the root node, the portal container will be appended to.                                                                              | no       | null    |
| preserveTabOrder                    | This will preserve the tab order context based on the React tree instead of the DOM tree.                                                                  | no       | true    |
| updateOnAnimationFrame              | Whether to update the position of the floating element on every animation frame if required. While optimized for performance, it should be used sparingly. | no       | false   |
| initialFocus                        | Set this to focus the element when open, or 1 to use `tabindex` defined in dom.                                                                            | no       | -1      |
| hasInteractionDismissReferencePress | Set the referencePress for useDismiss event in useInteraction (set true if using popover/tooltip for complex table headers)                                | no       | false   |
| hasInteractionHoverMove             | Allows popover to move with the hover (set false if using popover/tooltip for complex table headers)                                                       | no       | true    |
| returnFocus                         | Determines if focus should be returned to the reference element (or if that is not available, the previously focused element).                             | no       | false   |
| dismissible                         | Determines if a tooltip can be dismissed by clicking outside of it or with the `Esc` key                                                                   | no       | true    |
| modal                               | Determines if focus is “modal”, meaning focus is fully trapped inside the floating element and outside content cannot be accessed                          | no       | true    |
| outsideElementsInert                | Determines whether outside elements are inert when modal is enabled. This enables pointer modality without a backdrop.                                     | no       | false   |

### CDSPopover.Divider

No specific props, hr tag attributes can be used.

## Accessibility

The Popover component serves as the tooltip container with the role `tooltip`. The anchor to toggle the tooltip has an `aria-expanded` attribute set to indicate if the contextual popup is expanded or collapsed.

It is recommended that the interactive anchor element be a semantic HTML element like `button` or `a` to ensure that native keyboard interaction is supported and <kbd>Enter</kbd> or <kbd>Space</kbd> can be used to toggle the popover. This also allows the anchor element to be in the Tab order of the page so that a user can navigate to the element using the <kbd>Tab</kbd> or the <kbd>Shift+Tab</kbd> keyset. <a href="https://developer.mozilla.org/en-US/docs/Learn/Accessibility/HTML" target="_blank">Read More</a>.

When the popover is open, the <kbd>Esc</kbd> key can be used to close the popover.

If there are interactive elements in the popover, pressing <kbd>Tab</kbd> to move the focus to the first interactive element inside the popover. The contextual popover also traps the focus to within the popover. Closing the popover releases the focus onto the page.
