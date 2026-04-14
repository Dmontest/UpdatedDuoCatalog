# cds-react-activity-timeline

The Activity Timeline component shows a list of events, milestones, or series of information, in chronological order.

> [Design Guidelines](https://magnetic.cisco.com/0a43ab5cd/p/59296d-activity-timeline/b/738367)

## Installation

NPM: `npm i @ciscodesignsystems/cds-react-activity-timeline`

Yarn: `yarn add @ciscodesignsystems/cds-react-activity-timeline`

## Styling and Theme Installation

You will also need to install the styling and needed theme files.

NPM: `npm i @ciscodesignsystems/cds-magnetic-theme-web`

Yarn: `yarn add @ciscodesignsystems/cds-magnetic-theme-web`

Then import the following into your app's css:

```css
@import '@ciscodesignsystems/cds-magnetic-theme-web/css/dist/token-theme-light-variables.css';
@import '@ciscodesignsystems/cds-react-activity-timeline/index.css';
```

## Dependencies

### Required

These dependencies must be met in your product:

- [react](https://www.npmjs.com/package/react) >=16.14.0
- [react-dom](https://www.npmjs.com/package/react-dom) >=16.14.0
- @ciscodesignsystems/cds-component-utilities
- @ciscodesignsystems/cds-component-types
- @ciscodesignsystems/cds-react-divider
- @ciscodesignsystems/cds-react-button
- @ciscodesignsystems/cds-react-tooltip
- @ciscodesignsystems/cds-react-icons

### Optional

Optional dependencies will vary depending on your product needs, but may include the following components:

- @phosphor-icons/react
- framer-motion

## Usage

### Default

```tsx
export const Component = () => {
  <CDSActivityTimeline {...args}>
    <CDSActivityTimeline.Item title="Heading" status="complete" timestamp={'2 minutes ago'} />
    <CDSActivityTimeline.Item title="Heading" status="in-progress" timestamp={'1 minute ago'}>
      // Custom Content Goes Here
    </CDSActivityTimeline.Item>
    <CDSActivityTimeline.Item title={'Heading'} status="in-active" timestamp={'Not Started'} />
  </CDSActivityTimeline>;
};
```

### Numbered

```tsx
export const Component = () => {
  <CDSActivityTimeline {...args} isNumbered>
    <CDSActivityTimeline.Item title={'Heading'} status="neutral" timestamp={'2 minutes ago'} />
    <CDSActivityTimeline.Item title={'Heading'} status="neutral" timestamp={'2 minute ago'} />
    <CDSActivityTimeline.Item title={'Heading'} status="neutral" timestamp={'2 minute ago'} />
  </CDSActivityTimeline>;
};
```

### WithTooltipOnTimestamp

```tsx
export const Component = () => {
  <CDSActivityTimeline {...args}>
    <CDSActivityTimeline.Item
      title="Heading"
      status="neutral"
      timestamp={'2 minutes ago'}
      timestampDescription="Apr 15 2024 01:57:00 UTC"
    />
    <CDSActivityTimeline.Item
      title="Heading"
      status="neutral"
      timestamp={'2 minute ago'}
      timestampDescription="Apr 15 2024 01:57:00 UTC"
    />
    <CDSActivityTimeline.Item
      title="Heading"
      status="neutral"
      timestamp={'2 minute ago'}
      timestampDescription="Apr 15 2024 01:57:00 UTC"
    />
  </CDSActivityTimeline>;
};
```

### Collapsed

```tsx
export const Component = () => {
  <CDSActivityTimeline {...args} isCollapsible>
    <CDSActivityTimeline.Item title={'Heading'} status="complete" timestamp={'2 minutes ago'}>
      // Custom Collapsed Content Goes Here
    </CDSActivityTimeline.Item>
    <CDSActivityTimeline.Item title={'Heading'} status="in-progress" timestamp={'2 minute ago'}>
      // Custom Collapsed Content Goes Here
    </CDSActivityTimeline.Item>
    <CDSActivityTimeline.Item title={'Heading'} status="error" timestamp={'2 minute ago'}>
      // Custom Collapsed Content Goes Here
    </CDSActivityTimeline.Item>
    <CDSActivityTimeline.Item title={'Heading'} status="in-active" timestamp={'2 minute ago'}>
      // Custom Collapsed Content Goes Here
    </CDSActivityTimeline.Item>
  </CDSActivityTimeline>;
};
```

## Props

### CDSActivityTimeline

| Name          | Description                                                                           | Required | Default |
| ------------- | ------------------------------------------------------------------------------------- | -------- | ------- |
| children      | It represents one or more React elements that populate the timeline                   | yes      |         |
| isCollapsible | Indicates whether the timeline item is collapsible or expanded                        | no       | false   |
| onCollapse    | Callback function invoked when the timeline item is collapsed or expanded             | no       |         |
| isNumbered    | Optional property that prepends the header with the position of an item in a timeline | no       | false   |
| className     | class name for the activity timeline                                                  | no       |         |

### CDSActivityTimeline.Item

| Name                 | Description                                                                                  | Required | Default |
| -------------------- | -------------------------------------------------------------------------------------------- | -------- | ------- |
| title                | The title can take a ReactNode this content sits above the timestamp                         | yes      |         |
| number               | The number is used to prepend the header when the numbered prop for ActivityTimeline is true | no       |         |
| status               | The status displays the according indicator status icon that sits next to the header         | yes      |         |
| timestamp            | The timestamp is the time shown below the heading                                            | yes      |         |
| timestampDescription | The timeDescription is the tooltip text shown for the timestamp                              | no       |         |
| onCollapse           | Callback function invoked when the timeline item is collapsed or expanded                    | no       |         |
| isOpen               | Indicates whether the timeline item is open                                                  | no       |         |
