# cds-react-collapse

A collapse is a content area or set of content areas that reveal or hide content to save space or shift the focus.

> [Design Guidelines](https://magnetic.cisco.com/0a43ab5cd/p/380960-collapse)

## Installation

NPM: `npm i @ciscodesignsystems/cds-react-collapse`

Yarn: `yarn add @ciscodesignsystems/cds-react-collapse`

## Styling and Theme Installation

You will also need to install the styling and needed theme files.

NPM: `npm i @ciscodesignsystems/cds-magnetic-theme-web`

Yarn: `yarn add @ciscodesignsystems/cds-magnetic-theme-web`

Then import the following into your app's css:

```css
@import '@ciscodesignsystems/cds-magnetic-theme-web/css/dist/token-theme-light-variables.css';
@import '@ciscodesignsystems/cds-react-collapse/index.css';
```

## Dependencies

### Required

These dependencies must be met in your product:

- [react](https://www.npmjs.com/package/react) >=16.14.0
- [react-dom](https://www.npmjs.com/package/react-dom) >=16.14.0
- @ciscodesignsystems/cds-react-flex
- @ciscodesignsystems/cds-component-utilities

### Optional

Optional dependencies will vary depending on your product needs, but may include the following components:

- @phosphor-icons/react

## Usage

### Uncontrolled

```tsx
<CDSCollapse.Group>
  <CDSCollapse defaultOpen={false} kind="stacked">
    <CDSCollapse.Heading>Click me</CDSCollapse.Heading>
    <CDSCollapse.Panel>Panel</CDSCollapse.Panel>
  </CDSCollapse>
</CDSCollapse.Group>
```

### Controlled

```tsx
const Component = () => {
  const [open, setOpen] = useState<boolean>(true);
  return (
    <CDSCollapse.Group>
      <CDSCollapse onChange={() => setOpen((prev) => !prev)} open={open} kind="stacked">
        <CDSCollapse.Heading>Click me</CDSCollapse.Heading>
        <CDSCollapse.Panel>Panel</CDSCollapse.Panel>
      </CDSCollapse>
    </CDSCollapse.Group>
  );
};
```

## Props

| Name        | Description                                                                  | Required | Default   |
| ----------- | ---------------------------------------------------------------------------- | -------- | --------- |
| icon        | Optional property to override/hide the default arrow.                        | no       |           |
| kind        | Optional property to modify the style of the collapse.                       | no       | 'stacked' |
| onChange    | Function that will be called when the collapse is toggled                    | no       |           |
| open        | Open state for the collapse. Cannot be used with `defaultOpen`.              | no       |           |
| defaultOpen | Default state for the collapse. Cannot be used with `open`.                  | no       |           |
| size        | Optional property which allows the fine tuning of collapse internal density. | no       | 'md'      |
