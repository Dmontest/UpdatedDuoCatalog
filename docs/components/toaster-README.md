# cds-react-toaster

Toaster Component

Toasts provide notifications independent of the content on the page.
To be displayed as toast, the information should be important enough that it merits global awareness.
Toasts disappear on their own, but they can also be manually dismissed.

## Installation

NPM: `npm i @ciscodesignsystems/cds-react-toaster`

Yarn: `yarn add @ciscodesignsystems/cds-react-toaster`

## Styling and Theme Installation

You will also need to install the styling and needed theme files.

NPM: `npm i @ciscodesignsystems/cds-magnetic-theme-web`

Yarn: `yarn add @ciscodesignsystems/cds-magnetic-theme-web`

Then import the following into your app's css:

```css
@import '@ciscodesignsystems/cds-magnetic-theme-web/css/dist/token-theme-light-variables.css';
@import '@ciscodesignsystems/cds-react-toaster/index.css';
```

## Dependencies

### Required

These dependencies must be met in your product:

- [react](https://www.npmjs.com/package/react) >=16.14.0
- [react-dom](https://www.npmjs.com/package/react-dom) >=16.14.0
- @ciscodesignsystems/cds-react-notification
- @ciscodesignsystems/cds-component-utilities

## Usage

Toast Usage :

Example 1 : Basic Example

```jsx
const [list, setList] = useState([]);
const addToastToList = (status, title, description, timeout) => {
  const toast = {
    id: `${Date.now()}${Math.random()}`,
    title: title,
    description: description,
    status: status,
    timeout: timeout,
  };
  setList([...list, toast]);
};
const deleteToast = (toastId) => {
  setList(list.filter((item) => item.id !== toastId));
};
return (
  <>
    <CDSFlex direction="vertical" gap="md">
      <CDSButton
        onClick={() => {
          addToastToList('positive', 'This is a Toast Heading..!!', 'This is Toast Message', 5000);
        }}>
        Push Positive Toast
      </CDSButton>
      <CDSButton
        onClick={() => {
          deleteToast(list[list.length - 1].id);
        }}>
        Remove last Toast
      </CDSButton>
    </CDSFlex>
    <CDSToaster toastList={list} placement="top-right" />
  </>
);
```

Example 2 : Using useToast hook

```jsx
const { toasts, addToast, deleteToast } = useToast();
return (
  <>
    <CDSFlex direction="vertical" gap="md">
      <CDSButton
        onClick={() => {
          addToast({
            id: `${Date.now()}${Math.random()}`,
            title: 'This is a Toast Heading..!!',
            description: faker.lorem.sentences(2),
            status: 'positive',
            timeout: 5000,
          });
        }}>
        Push Positive Toast
      </CDSButton>
      <CDSButton
        onClick={() => {
          deleteToast(toasts[toasts.length - 1].id);
        }}>
        Remove last Toast
      </CDSButton>
    </CDSFlex>
    <CDSToaster toastList={toasts} placement={placement} />
  </>
);
```

## Props

| Name      | Description                                                                                                                                                                                                                                                                                                                                                         | Default      |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | ----------- | --------- |
| toastList | ToastList provides list of ToastObjects that needs to be displayed in the Toast area. This toastList should be handled through state management, for adding or deleting Toast Message in the Toast area dynamically. For each ToastObject added in the ToastList, corresponding Notification Component gets generated with configurations given in the ToastObject. | []           |
| placement | Provides placement for the Toast Container on the Screen. Values : top-right &#124; top-left &#124; bottom-right &#124; bottom-left                                                                                                                                                                                                                                 | bottom-right | bottom-left | top-right |

ToastObject Props :

| Name             | Description                                                                                                                                                                                                        | Default                                                                            |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| id               | Each Toast message should be identified with it's unique id.                                                                                                                                                       |                                                                                    |
| title            | Provides Title to the notification being triggered as a Toast.                                                                                                                                                     |                                                                                    |
| description      | Provides description to the notification being triggered as a Toast.                                                                                                                                               |                                                                                    |
| status           | Provides status notification being triggered as a Toast. Values : positive &#124; warning &#124; info                                                                                                              | info                                                                               |
| timeout          | Provides timeout to the individual toast messages. As per requirement timeout can bse set to each Toast message (if not set, Default timeout will be considered).To opt-out from auto dismissal set timeout to -1. | According to Notification status, positive & info : 6 seconds, warning : 8 seconds |
| onToastDismissed | Callback Function. Function gets triggered once Toast is dissmised either through timeout or close action on notification.                                                                                         |                                                                                    |
| fitContent       | Default behaviour is Notification will adapt available width provided by Toaster component. Flag for Notification to adjust size as per notification content.                                                      | false                                                                              |
