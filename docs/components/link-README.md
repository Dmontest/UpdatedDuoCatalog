# cds-react-link

Link component that adheres to Magnetic design guidelines.

## Installation

NPM: `npm i @ciscodesignsystems/cds-react-link`

Yarn: `yarn add @ciscodesignsystems/cds-react-link`

## Styling and Theme Installation

You will also need to install the styling and needed theme files.

NPM: `npm i @ciscodesignsystems/cds-magnetic-theme-web`

Yarn: `yarn add @ciscodesignsystems/cds-magnetic-theme-web`

Then import the following into your app's css:

```css
@import '@ciscodesignsystems/cds-magnetic-theme-web/css/dist/token-theme-light-variables.css';
@import '@ciscodesignsystems/cds-react-link/index.css';
```

## Dependencies

### Required

These dependencies must be met in your product:

- [react](https://www.npmjs.com/package/react) >=16.14.0
- [react-dom](https://www.npmjs.com/package/react-dom) >=16.14.0
- @ciscodesignsystems/cds-react-button
- @ciscodesignsystems/cds-component-utilities

## Usage

```tsx
export const Component = () => {
  return (
    <CDSText>
      This is an example of a <CDSLink href="#">link</CDSLink>.
    </CDSText>
  );
};
```

## Props

This component inherits the props from CDSButton. All the CDSButton props except `variant` | `sentiment` | `destructive` | `block` | `loading` will be available for CDSLink.

| Name      | Description                                                                                       | Type         | Required | Default |
| --------- | ------------------------------------------------------------------------------------------------- | ------------ | -------- | ------- |
| as        | The "as" prop allows user to replace rendered HTML elements in a Link component from the outside. | HTMLElement  | no       | `as`    |
| size      | The size of the link to render                                                                    | `sm`/`md`    | no       |         |
| icon      | An icon that will be rendered on the left side of the link                                        | ReactElement | no       |         |
| rightIcon | An icon that will be rendered on the right side of the link                                       | ReactElement | no       |         |
| disabled  | To display disabled link                                                                          | boolean      | no       | false   |
