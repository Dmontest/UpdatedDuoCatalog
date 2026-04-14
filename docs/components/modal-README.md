# cds-react-modal

Modals are overlays that focus a users attention on information or a task without taking them out of context. They require an interaction for the user to see the rest of the page.

> [Design Guidelines](https://magnetic.cisco.com/0a43ab5cd/p/02a012-modal)

## Installation

NPM: `npm i @ciscodesignsystems/cds-react-modal`

Yarn: `yarn add @ciscodesignsystems/cds-react-modal`

## Styling and Theme Installation

You will also need to install the styling and needed theme files.

NPM: `npm i @ciscodesignsystems/cds-magnetic-theme-web`

Yarn: `yarn add @ciscodesignsystems/cds-magnetic-theme-web`

Then import the following into your app's css:

```css
@import '@ciscodesignsystems/cds-magnetic-theme-web/css/dist/token-theme-light-variables.css';
@import '@ciscodesignsystems/cds-react-modal/index.css';
```

## Dependencies

### Required

These dependencies must be met in your product:

- [react](https://www.npmjs.com/package/react) >=16.14.0
- [react-dom](https://www.npmjs.com/package/react-dom) >=16.14.0
- @ciscodesignsystems/cds-react-flex
- @ciscodesignsystems/cds-component-types
- @ciscodesignsystems/cds-component-utilities

## Usage

### Basic Modal Usage

```tsx
export const Component = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div>
      <CDSModal isOpen={open} size="lg" onClose={() => setOpen(false)}>
        ...insert modal content
      </CDSModal>
      <CDSButton onClick={() => setOpen(true)}>Open modal</CDSButton>
    </div>
  );
};
```

### Modal Carousel Usage

```tsx
export const Component = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState(0);

  const handleOnBack = () => {
    const previousStep = activeStep - 1;
    setActiveStep(previousStep);
  };

  const handleOnNext = () => {
    const nextStep = activeStep + 1;
    setActiveStep(nextStep);
  };

  return (
    <div>
      <CDSModal isOpen={open} size="lg" onClose={() => setOpen(false)}>
        <CDSModal.Carousel activeStep={0} steps={5} />
        <div>
          <CDSButton disabled={activeStep === 0} variant="secondary" onClick={handleOnBack}>
            Back
          </CDSButton>
          <CDSButton disabled={activeStep === 4} onClick={handleOnNext}>
            Next
          </CDSButton>
        </div>
      </CDSModal>
      <CDSButton onClick={() => setOpen(true)}>Open modal</CDSButton>
    </div>
  );
};
```

### Modal Content Usage

```tsx
export const Component = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div>
      <CDSModal isOpen={open} size="lg" onClose={() => setOpen(false)}>
        <CDSModal.Content style={{ marginBottom: 16, height: '100px' }}>
          Scroll content goes here.
        </CDSModal.Content>
      </CDSModal>
      <CDSButton onClick={() => setOpen(true)}>Open modal</CDSButton>
    </div>
  );
};
```

### Modal Hero Usage

```tsx
export const Component = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div>
      <CDSModal isOpen={open} size="lg" onClose={() => setOpen(false)}>
        <CDSModal.Hero alt="Cisco Live" src="./cisco-live-banner.png" />
      </CDSModal>
      <CDSButton onClick={() => setOpen(true)}>Open modal</CDSButton>
    </div>
  );
};
```

## Props

### CDSModal

| Name    | Description                                            | Required | Default |
| ------- | ------------------------------------------------------ | -------- | ------- |
| isOpen  | Determines if the Modal is opened or closed.           | no       | true    |
| size    | Defines the size of the modal.                         | no       | md      |
| onClose | The callback that's executed once the model is closed. | no       | -       |

### CDSModal.Carousel

| Name       | Description                                        | Required | Default |
| ---------- | -------------------------------------------------- | -------- | ------- |
| activeStep | Determines the active step of the Carousel.        | yes      |         |
| steps      | The total number of steps present in the Carousel. | yes      |         |

### CDSModal.Content

No specific props, provide content as children to display.

### CDSModal.Hero

No specific props, hero extends image. Provide image using href to display the banner.
