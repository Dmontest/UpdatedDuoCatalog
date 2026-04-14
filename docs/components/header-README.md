# cds-react-header

The header is a foundation for navigating and orienting users to a product. The persistent header provides consistent locations to invoke a product’s navigation as well as pervasive access to system-wide functions like search, notifications, and navigating between products. Position `Sticky` is the intended default header behavior.

> [Design Guidelines](https://magnetic.cisco.com/0a43ab5cd/p/64617a-header)

## Installation

NPM: `npm i @ciscodesignsystems/cds-react-header`

Yarn: `yarn add @ciscodesignsystems/cds-react-header`

## Styling and Theme Installation

You will also need to install the styling and needed theme files.

NPM: `npm i @ciscodesignsystems/cds-magnetic-theme-web`

Yarn: `yarn add @ciscodesignsystems/cds-magnetic-theme-web`

Then import the following into your app's css:

```css
@import '@ciscodesignsystems/cds-magnetic-theme-web/css/dist/token-theme-light-variables.css';
@import '@ciscodesignsystems/cds-react-header/index.css';
```

## Dependencies

### Required

These dependencies must be met in your product:

- [react](https://www.npmjs.com/package/react) >=16.14.0
- [react-dom](https://www.npmjs.com/package/react-dom) >=16.14.0
- @ciscodesignsystems/cds-component-types

### Optional

Optional dependencies will vary depending on your product needs, but may include the following components:

- @ciscodesignsystems/cds-magnetic-theme-web
- @ciscodesignsystems/cds-react-button
- @ciscodesignsystems/cds-react-icons
- @ciscodesignsystems/cds-react-menu
- @ciscodesignsystems/cds-react-text-input
- @ciscodesignsystems/cds-component-utilities
- @radix-ui/react-navigation-menu
- @phosphor-icons/react

## Usage

### CDSHeader

```tsx
export const Component = () => {
  // ...
  return (
    <CDSHeader
      sentiment="inverse"
      title="Your product name"
      logo={<CiscoLogo size="sm" />}
      logoLink="#0"
      logoLinkTarget="_self">
      {/* ... */}
    </CDSHeader>
  );
};
```

### CDSHeader (Polymorphic Example)

```tsx
import { Link } from 'react-router-dom';

export const Component = () => {
  // ...
  return (
    <CDSHeader
      as="section"
      sentiment="inverse"
      title="Your product name"
      logo={<CiscoLogo size="sm" />}
      logoLinkProps={{ as: Link, to: '#0', 'data-testid': 'headerLogoLinkId' }}>
      {/* ... */}
    </CDSHeader>
  );
};
```

### CDSAlertsMenuRoot

```tsx
export const Component = => {
  // ...
  return (
    <CDSHeader {...props}>
      <CDSAlertsMenuRoot
        sentiment="inverse"
        alertCount={true}
        alertNumber={100}
        alertThreshold={99}
        alertThresholdSymbol="+">
        <CDSAlert sentiment="positive" headline="Success" rightGutter="17 minutes ago">
          Good news!
        </CDSAlert>
        <CDSAlertsMenuDivider />
        <CDSAlert
          headline="Custom alert"
          leftGutter={<Files size={23} />}
          rightGutter={
            <CDSButton sentiment="interact" icon={<PaintBrushHousehold size={15} />}>
              Clean
            </CDSButton>
          }>
          You can create a custom alert for your application however you'd like.
        </CDSAlert>
      </CDSAlertsMenuRoot>
    </CDSHeader>
  );
};
```

### CDSHeaderBadge

```tsx
export const Component = => {
  // ...
  return (
    <CDSHeader {...props}>
      <CDSHeaderBadge content="Connected" size={size} sentiment={sentiment}>
        <CheckCircle size="1.5em" weight="fill" color="var(--positive-bg-default)" />
      </CDSHeaderBadge>
    </CDSHeader>
  );
};
```

### CDSHelpMenu

```tsx
export const Component = => {
  // ...
  return (
    <CDSHeader {...props}>
      <CDSHelpMenuRoot sentiment="inverse">
        <CDSHelpMenuSection description="Find Documentation">
          <CDSHelpMenuLink interact="disabled" target="_blank" href="https://google.com">
            List item
          </CDSHelpMenuLink>
        </CDSHelpMenuSection>
        <CDSHelpMenuSection description="Get Support">
          <CDSHelpMenuLink href="#list-item-d">List item</CDSHelpMenuLink>
        </CDSHelpMenuSection>
      </CDSHelpMenuRoot>
    </CDSHeader>
  );
};
```

### CDSTenantMenuRoot

```tsx
export const Component = => {
  // ...
  return (
    <CDSHeader {...props}>
      <CDSTenantMenuRoot
        sentiment="inverse"
        switcherType={tenantSwitcherType}
        userName={tenantSwitcherUserName}
        tenantName={tenantSwitcherTenantName}>
        <CDSTenantMenuRow
          leftGutter={<User color="#707070" weight="regular" size={23} />}
          rightGutter={
            <CDSButton
              onClick={() => alert('Your logout functionality')}
              sentiment="interact"
              variant="secondary">
              Logout
            </CDSButton>
          }>
          <p
            style={{
              margin: '0',
              textTransform: 'uppercase',
              fontSize: '12px',
            }}>
            Logged in as
          </p>
          <p
            style={{
              margin: '0',
              fontSize: '14px',
              fontWeight: 'bold',
            }}>
            Alexander Ferguson
          </p>
          <p
            style={{
              margin: '0',
              fontSize: '14px',
            }}>
            alexander@bizcorp.com
          </p>
        </CDSTenantMenuRow>
        <CDSTenantMenuDivider />
        {/* ... */}
      </CDSTenantMenuRoot>
    </CDSHeader>
  );
};
```

### CDSMenu

```tsx
import { useOutsideClick } from '@ciscodesignsystems/cds-component-types';
// ...
export const Component = => {
  const [showMenuContent, setShowMenuContent] = useState(false);

  const menuContentRef = useRef<HTMLDivElement>(null);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);

  useOutsideClick<HTMLDivElement>(
    menuContentRef,
    () => {
      setShowMenuContent(false);
    },
    [menuTriggerRef]
  );

  // ...
  return (
    <CDSHeader {...props}>
      <CDSMenu
        ref={menuContentRef}
        align={align}
        width={width}
        showMenuContent={showMenuContent}
        trigger={
          <CDSButton
            ref={menuTriggerRef}
            sentiment="inverse"
            variant="ghost"
            className={showMenuContent ? 'active' : ''}
            icon={<User weight="regular" size={24} />}
            rightIcon={
              <CaretDown
                size={16}
                style={{
                  flexShrink: '0',
                  transform: showMenuContent ? 'rotate(180deg)' : '',
                }}
              />
            }
            aria-haspopup="true"
            aria-expanded={showMenuContent}
            onClick={() => {
              setShowMenuContent((prev) => !prev);
            }}>
            <MenuTriggerContent title={'Alexander'} subtitle={'Business Corp, Inc.'} />
          </CDSButton>
        }>
        <CDSMenu.Item
          icon={<Placeholder size={18} />}
          action={
            <CDSButton
              onClick={() => alert('Your action button functionality')}
              sentiment="interact"
              variant="secondary">
              Button
            </CDSButton>
          }
          label="Label"
          title="Menu item"
          subtitle="user@email.com"
        />
      </CDSMenu>
    </CDSHeader>
  );
};
```

### CDSCustomMenuRoot

```tsx
export const Component = => {

  return(
    <CDSCustomMenuRoot
      icon={<GearSixIcon size={24} weight="bold" />}
    >
      <CDSCustomMenuItem>Get Help</CDSCustomMenuItem>
      <CDSCustomMenuItem>Community</CDSCustomMenuItem>
      <CDSCustomMenuItem>Marketplace</CDSCustomMenuItem>
      <CDSCustomMenuItem>Cases</CDSCustomMenuItem>
      <CDSCustomMenuItem disabled>Data protection requests</CDSCustomMenuItem>
      <CDSCustomMenuItem>New features</CDSCustomMenuItem>
      <CDSCustomMenuItem>Firewall Info</CDSCustomMenuItem>
      <CDSCustomMenuItem>API docs</CDSCustomMenuItem>
      <CDSCustomMenuItem>Hardware requirements</CDSCustomMenuItem>
    </CDSCustomMenuRoot>
  )};
```

## Props

### CDSHeader

| Name           | Description                                                                                                                                                                                                                                                        | Required | Default        |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- | -------------- |
| as             | The HTML tag to be used as root for CDSHeader.                                                                                                                                                                                                                     | no       | `header`       |
| gradient       | Toggle the gradient for the header.                                                                                                                                                                                                                                | no       | true           |
| logo           | The logo to display in the header. This should be the Cisco logo in most cases.                                                                                                                                                                                    | yes      |                |
| logoLink       | Where the logo and product title should link to. Cannot be used with `logoLinkProps`. <br /><b>Note:</b> The use of `logoLink` prop in the `CDSHeader` component is deprecated and will be removed in a future release of CDS. Please use `logoLinkProps` instead. | yes      | `#0`           |
| logoLinkTarget | The target for the logoLink. Cannot be used with `logoLinkProps`. <br /><b>Note:</b> The use of `logoLinkTarget` prop in the `CDSHeader` component is deprecated and will be removed in a future release of CDS. Please use `logoLinkProps` instead.               | no       | `_self`        |
| logoLinkProps  | The prop list to be passed to CDSHeader logo link to avail the `Polymorphic functionality`. Cannot be used with `logoLink` & `logoLinkTarget` props.                                                                                                               | no       | `undefined`    |
| minWidth       | The max width of the menu container. This is a temporary solution until the header is made responsive.                                                                                                                                                             | no       | `880px`        |
| sentiment      | Background sentiment for the header. Brand has stipulated that this can currently only be set to inverse (gray).                                                                                                                                                   | no       | `inverse`      |
| title          | The name of the product to display in the header.                                                                                                                                                                                                                  | no       | `Product Name` |

### CDSAlertsMenuRoot

| Name                    | Description                                                                                          | Required | Default |
| ----------------------- | ---------------------------------------------------------------------------------------------------- | -------- | ------- |
| sentiment               | Sentiment of icon-button trigger                                                                     | no       | inverse |
| variant                 | Variant of icon-button trigger                                                                       | no       | ghost   |
| alertCount              | Show alerts count                                                                                    | no       | true    |
| alertNumber             | Alerts count                                                                                         | no       |         |
| alertThreshold          | Alerts threshold. Alerts exceeding this will be displayed as `alertThreshold + alertThresholdSymbol` | no       | 99      |
| alertThresholdSymbol    | Symbol to proceed the `alertThreshold` when `alertNumber` exceeds `alertThreshold`e                  | no       | +       |
| contentRef              | A React ref to the content element                                                                   | no       |         |
| triggerRef              | A React ref to the trigger element                                                                   | no       |         |
| showMenuContent         | A boolean prop indicating whether the alerts-menu should be displayed as open or closed              | no       |         |
| onShowMenuContentChange | It is a callback function invoked when the value associated with the component changes               | no       |         |

### CDSAlert

| Name        | Description                                                   | Required | Default |
| ----------- | ------------------------------------------------------------- | -------- | ------- |
| headline    | The headline for the alert item.                              | no       |         |
| sentiment   | The alert sentiment.                                          | no       |         |
| leftGutter  | The item to be displayed to the left side of alert children.  | no       |         |
| rightGutter | The item to be displayed to the right side of alert children. | no       |         |

### CDSHeaderBadge

| Name       | Description                                                          | Required | Default    |
| ---------- | -------------------------------------------------------------------- | -------- | ---------- |
| size       | The size of the badge to render                                      | no       | md         |
| content    | Content to be displayed in the badge.                                | no       |            |
| sentiment  | The sentiment of the badge to render                                 | yes      |            |
| prominence | The sentiment of the badge to render                                 | no       |            |
| childAlign | Aligns the icon within the badge with inner and either left or right | no       | inner-left |

### CDSHelpMenu

| Name       | Description                                                          | Required | Default |
| ---------- | -------------------------------------------------------------------- | -------- | ------- |
| align      | Aligns the expanded menu content to the left or right of the trigger | no       |         |
| sentiment  | Sentiment of icon-button trigger                                     | no       | inverse |
| variant    | Variant of icon-button trigger                                       | no       | ghost   |
| contentRef | A React ref to the content element                                   | no       |         |
| triggerRef | A React ref to the trigger element                                   | no       |         |

### CDSTenantMenuRoot

| Name                    | Description                                                                                                                                                  | Required | Default     |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- | ----------- |
| contentRef              | A React ref to the content element                                                                                                                           | no       |             |
| switcherType            | The tenant switcher type to display                                                                                                                          | yes      | combo       |
| userName                | The username to display in the tenant switcher menu. Accepts `string` and `ReactNode` so that products can pass components in to handle custom truncation    | no       | User Name   |
| tenantName              | The tenant name to display in the tenant switcher menu. Accepts `string` and `ReactNode` so that products can pass components in to handle custom truncation | no       | Tenant Name |
| sentiment               | The sentiment of the tenant switcher                                                                                                                         | no       | default     |
| containerMaxWidth       | The max width of the tenant menu container                                                                                                                   | no       | 220px       |
| containerFlex           | Flex attribute control of the tenant menu in your header                                                                                                     | no       | 1           |
| contentWidth            | Width at which the name and tenant name in the tenant menu will truncate with ellipsis                                                                       | no       | 120px       |
| showMenuContent         | A boolean prop indicating whether the tenant-menu should be displayed as open or closed                                                                      | no       |             |
| onShowMenuContentChange | It is a callback function invoked when the value associated with the component changes                                                                       | no       |             |

### CDSTenantMenuRow

| Name        | Description                                                   | Required | Default |
| ----------- | ------------------------------------------------------------- | -------- | ------- |
| leftGutter  | The item to be displayed to the left side of alert children.  | no       |         |
| rightGutter | The item to be displayed to the right side of alert children. | no       |         |
| truncate    | Controls whether to truncate the content of the menu row.     | no       | false   |

### CDSMenu

| Name            | Description                                                          | Required | Default |
| --------------- | -------------------------------------------------------------------- | -------- | ------- |
| trigger         | The trigger component to display the header menu content.            | yes      |         |
| align           | Aligns the expanded menu content to the left or right of the trigger | no       | left    |
| showMenuContent | Controls whether to display the menu content.                        | no       | false   |
| width           | Controls the width size of the menu content.                         | no       | 397px   |

### CDSMenu.Item

| Name     | Description                                                       | Required | Default |
| -------- | ----------------------------------------------------------------- | -------- | ------- |
| icon     | The Leading Icon for the menu item.                               | no       | false   |
| title    | A required main line title for the text section of the menu item. | yes      |         |
| action   | The action to be displayed on the right of the menu item.         | yes      |         |
| label    | An optional label for the text section of the menu item.          | no       |         |
| subtitle | An optional subtitle for the text section of the menu item.       | no       |         |
| truncate | Controls when to truncate the content text.                       | no       | false   |

### CDSSkipToMain

| Name  | Description                                                                                | Required | Default                |
| ----- | ------------------------------------------------------------------------------------------ | -------- | ---------------------- |
| href  | Specify the id/url of the content you want to redirect to on click of skip to main content | no       | -                      |
| as    | The HTML tag to be used for CDSSkipToMain                                                  | no       | 'a'                    |
| label | Determines the label for Skip to Main Link                                                 | no       | 'Skip to main content' |

### CDSCustomMenu

| Name       | Description                     | Required | Default |
| ---------- | ------------------------------- | -------- | ------- |
| contentRef | Ref to the menu content element | no       | —       |
| triggerRef | Ref to the trigger button       | no       | —       |

## Known Issues

The following are known issues and may affect your use of this component.

- Header dropdown menus may not compile correctly in certain NextJS projects due to Radix ESM issue.
  [radix-ui/primitives#1848](https://github.com/radix-ui/primitives/issues/1848).
  The workaround for this issue is to render the header on the client and not use SSR, either by dynamically importing the component
  or using the experimental app directory with `"use client"` at the top.
