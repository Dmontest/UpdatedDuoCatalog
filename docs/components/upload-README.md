# cds-react-upload

UI component to upload a file from a react application.

> [Design Guidelines](https://magnetic.cisco.com/0a43ab5cd/p/498d71-upload)

## Installation

NPM: `npm i @ciscodesignsystems/cds-react-upload`

Yarn: `yarn add @ciscodesignsystems/cds-react-upload`

## Styling and Theme Installation

You will also need to install the styling and needed theme files.

NPM: `npm i @ciscodesignsystems/cds-magnetic-theme-web`

Yarn: `yarn add @ciscodesignsystems/cds-magnetic-theme-web`

Then import the following into your app's css:

```css
@import '@ciscodesignsystems/cds-magnetic-theme-web/css/dist/token-theme-light-variables.css';
@import '@ciscodesignsystems/cds-react-upload/index.css';
```

## Dependencies

### Required

These dependencies must be met in your product:

- [react](https://www.npmjs.com/package/react) >=16.14.0
- [react-dom](https://www.npmjs.com/package/react-dom) >=16.14.0
- @ciscodesignsystems/cds-component-types
- @ciscodesignsystems/cds-react-button
- @ciscodesignsystems/cds-react-flex
- @ciscodesignsystems/cds-react-icons
- @ciscodesignsystems/cds-react-notification
- @ciscodesignsystems/cds-react-progress-bar
- @ciscodesignsystems/cds-react-spinner
- @ciscodesignsystems/cds-react-tooltip
- @ciscodesignsystems/cds-component-utilities

## CDSUpload

### Common Props

| Name                  | Description                                                                                                       | Required | Default |
| --------------------- | ----------------------------------------------------------------------------------------------------------------- | -------- | ------- |
| beforeUpload          | Action to perform before file upload starts                                                                       | no       |         |
| onChange              | Action to perform when there is any change in file or file status                                                 | no       |         |
| action                | form action url                                                                                                   | no       |         |
| name                  | file param post to server                                                                                         | no       | 'file'  |
| style                 | root component inline style                                                                                       | no       | {}      |
| className             | root component className                                                                                          | no       | -       |
| method                | request method                                                                                                    | no       | post    |
| directory             | support upload whole directory                                                                                    | no       | false   |
| data                  | other data object to post or a function which returns a data object(a promise object which resolve a data object) | no       | -       |
| headers               | http headers to post, available in modern browsers                                                                | no       | {}      |
| accept                | input accept attribute                                                                                            | no       | -       |
| capture               | input capture attribute                                                                                           | no       | -       |
| multiple              | only support ie10+                                                                                                | no       | false   |
| customRequest         | provide an override for the default xhr behavior for additional customization                                     | no       | null    |
| withcredentials       | ajax upload with cookie send                                                                                      | no       | false   |
| openFileDialogOnClick | useful for drag only upload as it does not trigger on enter key or click event                                    | no       | true    |

## CDSUpload.Button

### Usage

```tsx
export const Component = () => {
  return <CDSUpload.Button text="Upload Button" />;
};
```

### Props

| Name                | Description                                                      | Required | Default     |
| ------------------- | ---------------------------------------------------------------- | -------- | ----------- |
| buttonVariant       | Variant of the button to display                                 | no       | 'primary'   |
| text                | Text to display when nothing has been uploaded                   | no       | 'Upload'    |
| errorMessage        | A custom error message to be displayed below the upload trigger. | no       | 'undefined' |
| onErrorMessageClose | The handler for when the error message is dismissed.             | no       | 'undefined' |

### Deprecated Props

> These props have been deprecated due to updates to design guidelines.

| Name           | Description                                    | Required | Default     |
| -------------- | ---------------------------------------------- | -------- | ----------- |
| customProgress | Percentage progress to display in progress bar | no       | 0           |
| uploadingText  | Text to display while uploading                | no       | 'Uploading' |
| loading        | Whether to show loading spinner                | no       | false       |

## CDSUpload.DragAndDrop

### Usage

```tsx
export const Component = () => {
  return (
    <CDSUpload.DragAndDrop
      size="md"
      text="Click or drag file to this area to upload"
      supplementalText="Supplemental text"
    />
  );
};
```

### Props

| Name                | Description                                                      | Required | Default     |
| ------------------- | ---------------------------------------------------------------- | -------- | ----------- |
| size                | This prop allows to select size of upload.                       | no       | 'md'        |
| text                | This prop allows to change the text.                             | no       | 'Upload'    |
| supplementalText    | This prop allows to add a help text.                             | no       | 'undefined' |
| errorMessage        | A custom error message to be displayed below the upload trigger. | no       | 'undefined' |
| onErrorMessageClose | The handler for when the error message is dismissed.             | no       | 'undefined' |

## CDSUpload.List

### Usage

```tsx
export const Component = () => {
  const fileList = [
    {
      uid: '1',
      name: 'example-file-1.png',
      status: 'done' as const,
      percent: 30,
      thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '2',
      name: 'example-file-2.png',
      status: 'done' as const,
      thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  ];

  return (
    <CDSUpload.List
      loading={loading}
      fileList={fileList}
      onChange={() => ({})}
      onRemove={(file) => console.log(file)}
      onPreview={(file) => console.log(file)}
      onDownload={(file) => console.log(file)}
    />
  );
};
```

### Props

CDSUpload.List can accept all CDSUpload.Button props.

| Name              | Description                                                                   | Required | Default                         |
| ----------------- | ----------------------------------------------------------------------------- | -------- | ------------------------------- |
| defaultFileList   | Array of objects containing files to show by default                          | no       |                                 |
| fileList          | Array of objects containing files to show                                     | no       |                                 |
| showUploadList    | Object to determine whether to show downloadIcon, previewIcon, removeIcon     | no       | (this displays all three icons) |
| onRemove          | Removes the file from the list and calls onRemove function passed as prop     | no       |                                 |
| onPreview         | Action to perform when preview button is clicked                              | no       |                                 |
| onDownload        | Action to perform when download button is clicked                             | no       |                                 |
| uploadListVariant | Variant of the list to display                                                | no       | 'file'                          |
| maxCount          | Config max count of `fileList`. Will replace current one when `maxCount` is 1 | no       |                                 |
| type              | The type for the upload trigger.                                              | no       | 'button'                        |

## CDSUpload.Avatar (DEPRECATED)

> This variant has been deprecated due to updates to design guidelines.

### Usage

```tsx
export const Component = () => {
  <CDSUpload.Avatar
    loading={loading}
    beforeUpload={beforeUpload}
    onChange={handleChange}
    onClickDelete={onClickDelete}
  />;
};
```

### Props

| Name             | Description                                     | Required | Default     |
| ---------------- | ----------------------------------------------- | -------- | ----------- |
| imageUrl         | URL of the image uploaded                       | no       |             |
| onClickDelete    | Action to perform when delete button is clicked | no       | () => ({})  |
| size             | Size of the avatar upload to display            | no       | 'md'        |
| text             | Text to display when nothing has been uploaded  | no       | 'Upload'    |
| loading          | Whether to show loading spinner                 | no       | false       |
| supplementalText | Additional text to help the user                | no       |             |
| customProgress   | Percentage progress to display in progress bar  | no       | 0           |
| uploadingText    | Text to display while uploading                 | no       | 'Uploading' |

### Accessibility

The `upload` component library has been designed with accessibility in mind. The following features and practices help ensure that these components are accessible to all users, including those who use assistive technologies:

#### ARIA Attributes

`aria-describedby`

The aria-describedby attribute is used to associate the component with a description, providing additional context to users. This is particularly useful for form elements where the label may not fully convey the necessary information.

#### Usage

Add the aria-describedby attribute to any interactive element that requires additional description.

```tsx
<CDSUpload.Button
  aria-describedby="upload-button-description"
  text="Upload Button"
/>
<p id="upload-button-description">This button allows you to upload files.</p>
```

`aria-live`

The aria-live attribute is used to inform assistive technologies about updates to dynamic content that should be announced to the user. In this component library, aria-live is used in error messages or notifications to ensure that screen readers announce changes immediately.

`Values`:

- `assertive`: Content updates are announced immediately.
- `polite`: Content updates are announced when the user is idle.

#### Usage

```tsx
{
  errorMessage && (
    <div role="region" aria-live="assertive">
      <CDSNotification
        className="cds-upload__notification"
        aria-label="Notification"
        status="negative"
        onClose={onErrorMessageClose}>
        {errorMessage}
      </CDSNotification>
    </div>
  );
}
```

`aria-label`

The aria-label attribute provides a textual description for interactive elements when a visible label is not present or is not sufficient. This attribute is particularly useful for buttons or icons that rely on visual cues.

#### Usage

Use aria-label to clearly describe the function of a button or control.

```tsx
<button aria-label="Delete image" onClick={handleDelete}>
  <TrashSimple size={20} />
</button>
```
