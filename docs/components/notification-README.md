# cds-react-notification

Notifications provide short, timely, and relevant information. They can be actionable or dismissed.

> [Design Guidelines](https://magnetic.cisco.com/0a43ab5cd/p/3912cf-notification)

## Installation

NPM: `npm i @ciscodesignsystems/cds-react-notification`

Yarn: `yarn add @ciscodesignsystems/cds-react-notification`

## Styling and Theme Installation

You will also need to install the styling and needed theme files.

NPM: `npm i @ciscodesignsystems/cds-magnetic-theme-web`

Yarn: `yarn add @ciscodesignsystems/cds-magnetic-theme-web`

Then import the following into your app's css:

```css
@import '@ciscodesignsystems/cds-magnetic-theme-web/css/dist/token-theme-light-variables.css';
@import '@ciscodesignsystems/cds-react-notification/index.css';
```

## Dependencies

### Required

These dependencies must be met in your product:

- [react](https://www.npmjs.com/package/react) >=16.14.0
- [react-dom](https://www.npmjs.com/package/react-dom) >=16.14.0
- @ciscodesignsystems/cds-react-button
- @ciscodesignsystems/cds-react-flex
- @ciscodesignsystems/cds-react-icons
- @ciscodesignsystems/cds-component-utilities

## Usage

### Single notification

```tsx
<CDSNotification onClose={() => {}} status="warning" title="">
  Notification - warning
</CDSNotification>
```

### Multiple notifications

```tsx
<CDSFlex
  direction="vertical"
  gap="md"
>
  <CDSNotification
    onClose={() => {}}
    status="negative"
    title=""
  >
    Notification - negative
  </CDSNotification>
  <CDSNotification
     onClose={() => {}}
    status="positive"
    title=""
  >
    Notification - positive
  </CDSNotification>
</CDSFlex>
/>
```

### Product Level notifications

```tsx
const notifications = [
  { title: 'This is an info message.', status: 'info' },
  {
    status: 'negative',
    children: (
      <div>
        This is a <a href="https://google.com">Link</a>
      </div>
    ),
  },
  {
    status: 'info',
    children: (
      <div>
        This is custom <CDSButton>Content</CDSButton>
      </div>
    ),
  },
];
const n = {
  title: 'This is a title for the product-level group banner.',
  status: 'info',
  notifications,
};
<CDSNotification product grouped title={n.title}>
  <CDSNotification.Group>
    {n.notifications.map((note) => (
      <CDSNotification.Item title={note.title} status={note.status} key={`${note.title}`}>
        {note.children}
      </CDSNotification.Item>
    ))}
  </CDSNotification.Group>
</CDSNotification>;
```

## Props

| Name          | Description                                                                                                                                          | Default | Required |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | -------- |
| banner?       | Flag to toggle banner Notification display                                                                                                           | false   | no       |
| onClose?      | Function that is called when the close icon is clicked. If notification has index it is passed. If not provided, the close icon will not be rendered | --      | no       |
| title?        | Heading for the notification                                                                                                                         | --      | no       |
| status?       | Status of the Notification ('negative' &#124; 'positive' &#124; 'warning' &#124; 'info')                                                             | 'info'  | no       |
| fitContent?   | Flag for Notification to adjust size as per notification content. Default behaviour is Notification will adapt available full width.                 | false   | no       |
| product?      | Flag for Notification to be styled as a product level notification                                                                                   | false   | no       |
| defaultOpen?  | Flag to toggle Product Level Notification children notifications                                                                                     | false   | no       |
| grouped?      | Flag to toggle grouped children notifications.                                                                                                       | false   | no       |
| onDismissAll? | Function that is called when the "Dismiss all" button is pressed                                                                                     | --      | no       |
| locale?       | Localize strings used by component                                                                                                                   | --      | no       |
| role          | ARIA role for the notification                                                                                                                       | no      |          |

## Localization

The locale by default uses a fallback mechanism in which only the values passed to it would override from a default locale object used for the component. For the following usage of `CDSNotification` with no overrides:

```tsx
<CDSNotification />
```

The locale for the `CDSNotification` component would look like:

```tsx
const locale: CDSNotificationLocale = {
  collapseLabel: 'Collapse to hide details',
  expandLabel: 'Expand to show details',
  dismissAllLabel: 'Dismiss all',
  dismissLabel: 'Dismiss',
};
```

By default, locale is not required. The overrides are merged based on the locale definition. By providing the following locale override:

```tsx
<CDSNotification locale={{ dismissLabel: 'Close' }} />
```

### CDSNotificationLocale Type

These are the available string overrides for `CDSNotification` locale object.

| Name            | Description                                      | Required |
| --------------- | ------------------------------------------------ | -------- |
| collapseLabel   | String to override text in the `collapse` button | no       |
| expandLabel     | String to override text in the `expand` button   | no       |
| dismissLabel    | String to override text in the `dismiss` button  | no       |
| dismissAllLabel | String to override text in the `dismissAllLabel` | no       |
