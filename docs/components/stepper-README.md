# cds-react-stepper

Steppers are used to guide the user through a series of steps (a minimum of 3 steps) or conditions that must be completed in order to achieve a task.

> [Design Guidelines](https://magnetic.cisco.com/0a43ab5cd/p/75aa5d-steppers)

## Installation

NPM: `npm i @ciscodesignsystems/cds-react-stepper`

Yarn: `yarn add @ciscodesignsystems/cds-react-stepper`

## Styling and Theme Installation

You will also need to install the styling and needed theme files.

NPM: `npm i @ciscodesignsystems/cds-magnetic-theme-web`

Yarn: `yarn add @ciscodesignsystems/cds-magnetic-theme-web`

Then import the following into your app's css:

```css
@import '@ciscodesignsystems/cds-magnetic-theme-web/css/dist/token-theme-light-variables.css';
@import '@ciscodesignsystems/cds-react-stepper/index.css';
```

## Dependencies

### Required

These dependencies must be met in your product:

- [react](https://www.npmjs.com/package/react) >=16.14.0
- [react-dom](https://www.npmjs.com/package/react-dom) >=16.14.0
- @ciscodesignsystems/cds-react-button
- @ciscodesignsystems/cds-react-sticky-bar
- @ciscodesignsystems/cds-component-utilities

### Optional

Optional dependencies will vary depending on your product needs, but may include the following components:

- @phosphor-icons/react

## Usage

```tsx
<CDSStepper horizontal={horizontal}>
  <CDSStepper.LeftPanel isExpanded={isExpanded} onCollapse={onCollapse} onExpand={onExpand}>
    {mappedSteps.map(({ active, description, key, title, stepNumber, completed, disabled }) => (
      <CDSStepper.Step
        active={active}
        description={description}
        expanded={isExpanded}
        key={key}
        title={title}
        stepNumber={stepNumber}
        completed={completed}
        disabled={disabled}>
        This is Step Content
      </CDSStepper.Step>
    ))}
  </CDSStepper.LeftPanel>
  <CDSStepper.RightPanel
    explanatoryText="All changes saved"
    primaryAction={() => nextStep()}
    secondaryAction={() => cancel()}
    tertiaryAction={() => prevStep()}
    isTertiaryActionAvailable={hasNextStep}>
    <div>Placeholder content</div>
  </CDSStepper.RightPanel>
</CDSStepper>
```

## Props

### CDSStepper

| Name       | Description                                       | Default |
| ---------- | ------------------------------------------------- | ------- |
| horizontal | Determines whether to make the stepper horizontal | false   |

### CDSStepper.LeftPanel

| Name         | Description                                                  | Default |
| ------------ | ------------------------------------------------------------ | ------- |
| children\*   | CDSStepper.Steps to display on left side                     | -       |
| isExpanded\* | Determines if the left panel shows the title and description | -       |
| onCollapse\* | Function to call when the panel is collapsed                 | -       |
| onExpand\*   | Function to call when the panel is expanded                  | -       |

### CDSStepper.RightPanel

| Name                      | Description                                                                        | Default  |
| ------------------------- | ---------------------------------------------------------------------------------- | -------- |
| children\*                | Content to display on the right panel                                              | -        |
| explanatoryText           | ReactNode to display alongside the cancel and next buttons                         |          |
| primaryAction\*           | Function to call when the primary action is performed                              | -        |
| primaryCta                | ReactNode to display on the primary button                                         | 'Next'   |
| isPrimaryActionDisabled   | Determines whether the primary action is disabled                                  | false    |
| secondaryAction\*         | Function to call when the secondary action is performed                            | -        |
| secondaryCta              | ReactNode to display on the tertiary button                                        | 'Cancel' |
| isSecondaryActionDisabled | Determines whether the secondary action is disabled                                | false    |
| isTertiaryActionAvailable | Determines whether to show a secondary button next to the primary button           | false    |
| tertiaryAction            | Function to call when the tertiary action is performed                             |          |
| tertiaryCta               | ReactNode to display on the secondary button                                       | 'Back'   |
| isTertiaryActionDisabled  | Determines whether the tertiary action is disabled                                 | false    |
| optionalSecondaryActions  | Optional Secondary Actions to be placed between the primary and secondary actions. |          |
| isPrimaryActionLoading    | Determines whether the primary button is in a loading state.                       | false    |

### CDSStepper.Step

| Name         | Description                                                                                                    | Default |
| ------------ | -------------------------------------------------------------------------------------------------------------- | ------- |
| active       | Whether the current step is active or not                                                                      | false   |
| completed    | Whether the current step has been completed                                                                    | false   |
| description  | Description to display under the title                                                                         |         |
| disabled     | Whether the current step is disabled or not                                                                    |         |
| expanded     | Whether to show the title and description                                                                      | false   |
| title\*      | Title to display next to the step number                                                                       | -       |
| stepNumber\* | Number of the step to display                                                                                  | -       |
| locale       | A locale object with strings used in the stepper step component, see [Localization](#localization) for details | no      |

### CDSStepper.SubStep

| Name        | Description                               | Default |
| ----------- | ----------------------------------------- | ------- |
| active      | Whether the sub-step is active            | false   |
| completed   | Whether the sub-step has been completed   | false   |
| disabled    | Whether the sub-step is disabled          | false   |
| description | Description text under the sub-step title |         |
| title       | Title for the sub-step                    | -       |
| expanded    | Whether to show the title and description | true    |

## Localization

The locale by default uses a fallback mechanism in which only the values passed to it would override from a default locale object used for the component. For the following usage of `CDSStepper.Step` with no overrides:

```tsx
<CDSStepper.Step />
```

The locale for the `CDSStepper.Step` component would look like:

```json
{
  "subStepProgressText": "{{currentSubStep}} of {{totalSubStepCount}} sub-steps"
}
```

By default, locale is not required. The overrides are merged based on the locale definition. By providing the following locale override:

```tsx
<CDSStepperStep
  locale={{
    subStepProgressText: '{{currentSubStep}} de {{totalSubStepCount}} sub etapas',
  }}
/>
```

In this example, `{{currentSubStep}}` and `{{totalSubStepCount}}` are placeholders automatically replaced by the component to reflect the current and total number of sub-steps. The user only needs to provide the localized pattern.

### CDSStepperStepLocale Type

These are the available string overrides for `CDSStepper.Step` locale object.

| Name                | Description                                                                                                                          | Required |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| subStepProgressText | String to override text for sub-step progress. Supports placeholders {{currentSubStep}} and {{totalSubStepCount}} for interpolation. | no       |
