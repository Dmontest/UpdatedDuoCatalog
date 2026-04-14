# cds-react-nav

Left navigation provides users with the ability to easily navigate to different pages, destinations, and functionalities across an application.

## Installation

NPM: `npm i @ciscodesignsystems/cds-react-nav`

Yarn: `yarn add @ciscodesignsystems/cds-react-nav`

## Styling and Theme Installation

You will also need to install the styling and needed theme files.

NPM: `npm i @ciscodesignsystems/cds-magnetic-theme-web`

Yarn: `yarn add @ciscodesignsystems/cds-magnetic-theme-web`

Then import the following into your app's css:

```css
@import '@ciscodesignsystems/cds-magnetic-theme-web/css/dist/token-theme-light-variables.css';
@import '@ciscodesignsystems/cds-react-nav/index.css';
```

## Dependencies

### Required

These dependencies must be met in your product:

- [react](https://www.npmjs.com/package/react) >=16.14.0
- [react-dom](https://www.npmjs.com/package/react-dom) >=16.14.0
- @ciscodesignsystems/cds-react-icons
- @ciscodesignsystems/cds-component-types
- @ciscodesignsystems/cds-react-breadcrumb
- @ciscodesignsystems/cds-react-button
- @ciscodesignsystems/cds-component-utilities
- @ciscodesignsystems/cds-react-tooltip

### Optional

Optional dependencies will vary depending on your product needs, but may include the following components:

- @phosphor-icons/react

## Usage

```tsx
const SwitcherMenu = () => {
  const [search, setSearch] = useState('');
  return (
    <CDSNav.Menu>
      <CDSTextInput
        placeholder="Search"
        prefix={<MagnifyingGlass size={16} />}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <CDSNav.Menu.Section style={{ marginTop: '10px' }}>
        <CDSNav.Menu.Label>Organizations</CDSNav.Menu.Label>
        {organizations
          .filter((name) => name.toLowerCase().includes(search.toLowerCase()))
          .map((name) => (
            <CDSNav.Menu.Link
              key={name}
              onClick={() => console.log('clicked org switcher', name)}
              as={'button'}>
              {name}
            </CDSNav.Menu.Link>
          ))}
      </CDSNav.Menu.Section>
    </CDSNav.Menu>
  );
};

const navItemMenu = (
  <CDSNav.Menu>
    <CDSNav.Menu.Section>
      <CDSNav.Menu.Label>Menu Section 1</CDSNav.Menu.Label>
      <CDSNav.Menu.Link href="/#" icon={<Link />}>
        Link 1
      </CDSNav.Menu.Link>
      <CDSNav.Menu.Link menu={level2Menu}>Link 2</CDSNav.Menu.Link>
      <CDSNav.Menu.Link as="button" onClick={() => console.log('clicked!')}>
        Link 2 <CDSTag size="sm">New</CDSTag>
      </CDSNav.Menu.Link>
      <CDSNav.Menu.Link href="/#" selected={true}>
        Link 3
      </CDSNav.Menu.Link>
    </CDSNav.Menu.Section>
  </CDSNav.Menu>
);

<div style={{ display: 'grid', gridTemplateColumns: 'min-content 1fr' }}>
  <CDSNav>
    <CDSNav.Section>
      <CDSNav.Switcher icon="organization-switcher" menu={navItemMenu} subHeading="Organization">
        Acme Organization
      </CDSNav.Switcher>
    </CDSNav.Section>
    <CDSNav.Item icon="home" menu={navItemMenu} isSelected>
      Home
    </CDSNav.Item>
    <CDSNav.Item icon="applications" href="#0" as="a">
      Applications
    </CDSNav.Item>
  </CDSNav>
  <div>...rest of content</div>
</div>;
```

### Polymorphic Menu Link Component

The CDSNav.Item and CDSNav.Menu.Link components are polymorphic, meaning that they can accept as `as` prop that modifies the rendered component
type. This is useful when the consuming application needs to override the component, such as using a `<CustomLink>`
component instead of the default anchor.

### Icons

The `CDSNav.Item` and `CDSNav.Switcher` components accept an `icon` prop that can be used to display an icon
next to the text. The icon prop accepts a string or a React component. If a string is provided, it must be one of the supported
icons listed in our Storybook Nav/Icons. If a React component is provided, it must be a tokenized component using the following tokens:

- brand-accent-icon-default
- brand-accent-icon-medium-default
- brand-accent-icon-weak-default
- brand-accent-border-default
- brand-accent-border-medium-default
- brand-accent-border-strong-default
- brand-accent-icon-strong-default

If there is a need to use another token value, please reach out to the CDS team so that we can update this list.

## Props

### CDSNav

| Name                         | Description                                                                                                                                         | Required | Default     |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ----------- |
| children                     | Children containing multiple `CDSNav.Item`                                                                                                          | yes      | -           |
| initialCollapsed             | Initial state of the collapsed                                                                                                                      | no       | `false`     |
| iconOnlyCollapsed            | Specifies if when collapsed it should be in icon-only mode                                                                                          | no       | `false`     |
| collapseButtonProps          | Props to pass to collapse button, such as children and aria-label. Additional props include: <ul><li>`tooltip`: text to show when hovered</li></ul> | no       | `undefined` |
| hideCollapseButton           | Determines if the collapse button is visible                                                                                                        | no       | `false`     |
| isCollapsed                  | Collapsed state of the nav used in conjunction with setCollapsed to control the component.                                                          | no       | `undefined` |
| setCollapsed                 | Callback that is called when the collapsed state is change. _Note: if using this prop, the component becomes controlled_                            | no       | `undefined` |
| menuSize                     | Spacing of the items in the flyout menu                                                                                                             | no       | `compact`   |
| menuGroupGap                 | Spacing between sections in the flyout menu. Possible values: `24`, `32`                                                                            | no       | `32`        |
| enableSubMenuStackAutoDetect | Enables the Nav capability to find the list of active items for the current page to self manage the sub menu stack                                  | no       | false       |

### CDSNav.Switcher

| Name       | Description                                                | Required | Default     |
| ---------- | ---------------------------------------------------------- | -------- | ----------- |
| icon       | Icon to display. Please see [Icons](#icons) for more info. | yes      | -           |
| subHeading | Heading to put above the item label                        | yes      | -           |
| children   | Text to display on the button                              | yes      | -           |
| menu       | Flyout menu to show when the nav item is selected          | no       | `undefined` |

### CDSNav.Section

| Name     | Description                       | Required | Default |
| -------- | --------------------------------- | -------- | ------- |
| children | Children containing `CDSNav.Item` | yes      | -       |

### CDSNav.Section.Label

| Name     | Description                            | Required | Default |
| -------- | -------------------------------------- | -------- | ------- |
| children | Label to show above a `CDSNav.Section` | yes      | -       |

### CDSNav.Item

| Name       | Description                                                                     | Required | Default     |
| ---------- | ------------------------------------------------------------------------------- | -------- | ----------- |
| icon       | Icon to display. Please see [Icons](#icons) for more info.                      | yes      | -           |
| children   | Text to display on the button                                                   | yes      | -           |
| menu       | Flyout menu to show when the nav item is selected                               | no       | `undefined` |
| isSelected | Determines if the selected style should show to denote this is the current page | no       | `false`     |
| suffix     | Suffix to display next to the text. Typically used with `CDSTag.Colored`        | no       | `undefined` |

### CDSNav.Menu

| Name             | Description                                                                                       | Required | Default     |
| ---------------- | ------------------------------------------------------------------------------------------------- | -------- | ----------- |
| children         | Children containing `CDSNavMenu.Link` or `CDSNav.Menu.Section`                                    | yes      | -           |
| closeButtonProps | Props to pass to collapse button, such as aria-label                                              | no       | `undefined` |
| backButtonProps  | Props to pass to back button, such as children and aria-label                                     | no       | `undefined` |
| title            | Override for the heading of the menu. If not defined the title of the `CDSNav.Item` will be used. | no       | `undefined` |

### CDSNav.Menu.Section

| Name     | Description                            | Required | Default |
| -------- | -------------------------------------- | -------- | ------- |
| children | Children containing `CDSNav.Menu.Link` | yes      | -       |

### CDSNav.Menu.Label

| Name     | Description                                    | Required | Default |
| -------- | ---------------------------------------------- | -------- | ------- |
| children | Label to show above a `CDSNav.Menu.Link` group | yes      | -       |

### CDSNav.Menu.Link

| Name       | Description                                                                     | Required | Default     |
| ---------- | ------------------------------------------------------------------------------- | -------- | ----------- |
| icon       | Icon to display                                                                 | no       | `undefined` |
| children   | Text to display on the link                                                     | yes      | -           |
| menu       | Submenu to show when the nav item is selected                                   | no       | `undefined` |
| isSelected | Determines if the selected style should show to denote this is the current page | no       | `false`     |
| suffix     | Suffix to display next to the text. Typically used with `CDSTag.Colored`        | no       | `undefined` |
