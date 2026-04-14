# cds-react-footer

UI component that sits at the bottom of every page in an application. It displays the copyright, legal information, and other useful links to the user.

> [Design Guidelines](https://magnetic.cisco.com/0a43ab5cd/p/908807-footer)

## Installation

NPM: `npm i @ciscodesignsystems/cds-react-footer`

Yarn: `yarn add @ciscodesignsystems/cds-react-footer`

## Styling and Theme Installation

You will also need to install the styling and needed theme files.

NPM: `npm i @ciscodesignsystems/cds-magnetic-theme-web`

Yarn: `yarn add @ciscodesignsystems/cds-magnetic-theme-web`

Then import the following into your app's css:

```css
@import '@ciscodesignsystems/cds-magnetic-theme-web/css/dist/token-theme-light-variables.css';
@import '@ciscodesignsystems/cds-react-footer/index.css';
```

## Dependencies

### Required

These dependencies must be met in your product:

- [react](https://www.npmjs.com/package/react) >=16.14.0
- [react-dom](https://www.npmjs.com/package/react-dom) >=16.14.0
- @ciscodesignsystems/cds-component-utilities

### Optional

Optional dependencies will vary depending on your product needs, but may include the following components:

- @ciscodesignsystems/cds-react-button

## Usage

```tsx
<CDSFooter
  brandName="Cisco Systems, Inc."
  rightSlot={
    <>
      <a href="#0" target="_self">
        Privacy Policy
      </a>
      <a href="#0" target="_self">
        Terms of Service
      </a>
    </>
  }>
  <div>
    <p>Last login about 2 hours ago from your current IP address</p>
    <p>Current session started about 2 hours ago</p>
    <p>Your organization's data is hosted in United States</p>
  </div>
</CDSFooter>
```

## Props

| Name      | Description                                          | Default |
| --------- | ---------------------------------------------------- | ------- |
| brandName | The name to display associated with the copyright.   | -       |
| rightSlot | Items to display next to the copyright on the right. |         |
| children  | Items to display under the copyright.                |         |
