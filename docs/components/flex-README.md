# cds-react-flex

UI component to add flex design in an application.

## Installation

NPM: `npm i @ciscodesignsystems/cds-react-flex`

Yarn: `yarn add @ciscodesignsystems/cds-react-flex`

## Styling and Theme Installation

You will also need to install the styling and needed theme files.

NPM: `npm i @ciscodesignsystems/cds-magnetic-theme-web`

Yarn: `yarn add @ciscodesignsystems/cds-magnetic-theme-web`

Then import the following into your app's css:

```css
@import '@ciscodesignsystems/cds-magnetic-theme-web/css/dist/token-theme-light-variables.css';
@import '@ciscodesignsystems/cds-react-flex/index.css';
```

## Dependencies

### Required

These dependencies must be met in your product:

- [react](https://www.npmjs.com/package/react) >=16.14.0
- [react-dom](https://www.npmjs.com/package/react-dom) >=16.14.0
- @ciscodesignsystems/cds-component-types
- @ciscodesignsystems/cds-component-utilities

### Optional

Optional dependencies will vary depending on your product needs, but may include the following components:

- @ciscodesignsystems/cds-react-button

## Usage

```tsx
<CDSFlex gap={4} direction="horizontal" reverse={false} margin={12}>
  <CDSButton>Button1</CDSButton>
  <CDSButton>Button2</CDSButton>
</CDSFlex>
```

## Props

| Name      | Description                                                                                 | Required | Default    |
| --------- | ------------------------------------------------------------------------------------------- | -------- | ---------- |
| margin    | Provides access to add margin for children within the container.                            | no       | stretch    |
| align     | Provides access to aligning children within the container.                                  | no       | 0          |
| direction | Provides access to vertical or horizontal layout.                                           | no       | horizontal |
| gap       | Introduces gaps between elements in the component.                                          | no       | 0          |
| grow      | Scales children's containers.                                                               | no       | false      |
| justify   | Provides access to flex justification.                                                      | no       | flex-start |
| reverse   | Allows reversal of the vertical or horizontal layout.                                       | no       | false      |
| wrap      | Whether the children will wrap when the parent becomes too narrow to visually contain them. | no       | false      |
