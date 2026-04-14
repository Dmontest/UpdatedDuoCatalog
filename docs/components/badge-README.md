# cds-react-badge

A badge is a visual indicator that provides concise information, such as a numeric value or a status, for an element.

> [Design Guidelines](https://magnetic.cisco.com/0a43ab5cd/p/545f23-badge)

## Installation

NPM: `npm i @ciscodesignsystems/cds-react-badge`

Yarn: `yarn add @ciscodesignsystems/cds-react-badge`

## Styling and Theme Installation

You will also need to install the styling and needed theme files.

NPM: `npm i @ciscodesignsystems/cds-magnetic-theme-web`

Yarn: `yarn add @ciscodesignsystems/cds-magnetic-theme-web`

Then import the following into your app's css:

```css
@import '@ciscodesignsystems/cds-magnetic-theme-web/css/dist/token-theme-light-variables.css';
@import '@ciscodesignsystems/cds-react-badge/index.css';
```

## Dependencies

### Required

These dependencies must be met in your product:

- [react](https://www.npmjs.com/package/react) >=16.14.0
- [react-dom](https://www.npmjs.com/package/react-dom) >=16.14.0
- @ciscodesignsystems/cds-react-icons
- @ciscodesignsystems/cds-component-utilities

### Optional

Optional dependencies will vary depending on your product needs, but may include the following components:

- @phosphor-icons/react

## Usage

```tsx
export const Component = () => {
  return (
    <CDSFlex gap={25}>
      <CDSBadge.Counter aria-label="Counter Badge Value 42" value={42} />
      <CDSBadge.Dot aria-label="Example notification">
        <Bell size={26} />
      </CDSBadge.Dot>
      <CDSBadge.Notifier size="sm" aria-label="Badge Notifier Value 100" value={100}>
        <Bell size={26} />
      </CDSBadge.Notifier>
      <CDSBadge.Status aria-label="Positive" status="positive">
        <Bell size={26} />
      </CDSBadge.Status>
    </CDSFlex>
  );
};

export const WithButtonExample = () => {
  const onClick = () => {
    console.log('Clicked');
  };

  return (
    <CDSFlex>
      <CDSButton
        icon={
          <CDSBadge.Notifier size="sm" aria-label="Badge Notifier Value 100" value={100}>
            <Bell size={26} />
          </CDSBadge.Notifier>
        }
        variant="tertiary"
        onClick={onClick}
      />
    </CDSFlex>
  );
};
```

## Props

### CDSBadge.Counter

| Name       | Description                         | Required | Default |
| ---------- | ----------------------------------- | -------- | ------- |
| size       | Size of the badge                   | no       | `md`    |
| value      | Numerical value inside of the badge | yes      |         |
| aria-label | Text label (accessibility)          | no       |         |

### CDSBadge.Dot

| Name       | Description                                                   | Required | Default |
| ---------- | ------------------------------------------------------------- | -------- | ------- |
| children   | Target on which badge will be displayed (on top-right corner) | yes      |         |
| aria-label | Text label (accessibility)                                    | no       |         |

### CDSBadge.Notifier

| Name       | Description                                                   | Required | Default |
| ---------- | ------------------------------------------------------------- | -------- | ------- |
| size       | Size of the badge                                             | no       | `md`    |
| value      | Numerical value inside of the badge                           | yes      |         |
| children   | Target on which badge will be displayed (on top-right corner) | yes      |         |
| aria-label | Text label (accessibility)                                    | no       |         |

### CDSBadge.Status

| Name       | Description                                                   | Required | Default |
| ---------- | ------------------------------------------------------------- | -------- | ------- |
| status     | Displays the status icon                                      | yes      |         |
| children   | Target on which badge will be displayed (on top-right corner) | yes      |         |
| aria-label | Text label (accessibility)                                    | no       |         |
