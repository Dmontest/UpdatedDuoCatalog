# cds-react-code-snippet

A Code Snippet is a view-only presentation of code that serves as information or reference, with integrated copy to clipboard option for copying and inserting into another interface.

## Installation

NPM: `npm i @ciscodesignsystems/cds-react-code-snippet`

Yarn: `yarn add @ciscodesignsystems/cds-react-code-snippet`

## Styling and Theme Installation

You will also need to install the styling and needed theme files.

NPM: `npm i @ciscodesignsystems/cds-magnetic-theme-web`

Yarn: `yarn add @ciscodesignsystems/cds-magnetic-theme-web`

Then import the following into your app's css:

```css
@import '@ciscodesignsystems/cds-magnetic-theme-web/css/dist/token-theme-light-variables.css';
@import '@ciscodesignsystems/cds-react-code-snippet/index.css';
```

## Dependencies

### Required

These dependencies must be met in your product:

- [react](https://www.npmjs.com/package/react) >=16.14.0
- [react-dom](https://www.npmjs.com/package/react-dom) >=16.14.0
- @ciscodesignsystems/cds-component-utilities
- @ciscodesignsystems/cds-react-text
- @ciscodesignsystems/cds-react-copy-to-clipboard

## Usage

```tsx
<CDSCodeSnippet.Inline size="sm" hasCopyToClipboard>
  169.250.1.2 255.255.255.252
</CDSCodeSnippet.Inline>

<CDSCodeSnippet.Block
  language="javascript"
  size="md"
  hasLineNumbers
  hasSyntaxHighlight
>
  const a = await resolveAfter2Seconds(20);
  const b = await resolveAfter2Seconds(30);
</CDSCodeSnippet.Block>
```

## Inline Props

| Name               | Description                                                    | Required | Default |
| ------------------ | -------------------------------------------------------------- | -------- | ------- |
| size               | The size of the code block                                     | no       | 'md'    |
| children           | The content of the code block. Must be a string.               | Yes      |         |
| hasCopyToClipboard | If true, a copy button will be rendered next to the code block | no       | false   |

## Block Props

| Name               | Description                                                                                                             | Required | Default     |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------- | -------- | ----------- |
| size               | The size of the code block                                                                                              | no       | 'md'        |
| children           | The content of the code block. Must be a string.                                                                        | yes      |             |
| language           | The language of the code block, refer: [Shiki Languages](https://shiki.style/languages)                                 | yes      | `plaintext` |
| hasLineNumbers     | If true, line numbers will be shown next to the code block.                                                             | no       | false       |
| callToActionBar    | Slot for call to action bar.                                                                                            | no       |             |
| width              | The width of the code block.                                                                                            | no       |             |
| height             | The height of the code block. If height is undefined, the code block will take the full height of its parent container. | no       |             |
| hasSyntaxHighlight | Highlight the code                                                                                                      | no       | false       |
| highlighter        | Pass a custom instance of shiki's highlighter                                                                           | no       |             |
| shikiOptions       | Pass options to customize the `shikiOptions.highlighter` and `shikiOptions.codeToHast` internal instances               | no       |             |

## CDSCodeBlock

`CDSCodeBlock` is a component that only has the styling of the code block, without any syntax highlighting. This is useful when you want to display code without the overhead of syntax highlighting, or highlighting is handled separately within your own application logic.

### Props

| Name            | Description                                                                                                             | Required | Default |
| --------------- | ----------------------------------------------------------------------------------------------------------------------- | -------- | ------- |
| children        | The content of the code block. Must be a string.                                                                        | yes      |         |
| hasLineNumbers  | Show line numbers next to the code block.                                                                               | no       | false   |
| callToActionBar | Slot for call to action bar.                                                                                            | no       |         |
| width           | The width of the code block.                                                                                            | no       |         |
| height          | The height of the code block. If height is undefined, the code block will take the full height of its parent container. | no       |         |

### Example Usage for CDSCodeBlock

```tsx
import { CDSCodeBlock } from '@ciscodesignsystems/cds-react-code-snippet';

const MyCodeBlock = () => (
  <CDSCodeBlock hasLineNumbers>const x = 10; const y = 20; console.log(x + y);</CDSCodeBlock>
);
```

## WithShiki

`WithShiki` is a render hook that provides syntax highlighting capabilities using Shiki.

### Example Usage for WithShiki

```tsx
import { CDSCodeBlock, WithShiki } from '@ciscodesignsystems/cds-react-code-snippet';

const MyCodeBlock = () => (
  <WithShiki code={'const x = 10;'} language="typescript">
    {(highlightedCode) => <CDSCodeBlock hasLineNumbers>{highlightedCode}</CDSCodeBlock>}
  </WithShiki>
);
```

## useShiki

`useShiki` is a hook for integrating Shiki syntax highlighting into your components.

### Example Usage for useShiki

```tsx
import { CDSButton } from '@ciscodesignsystems/cds-react-button';
import { useShiki } from '@ciscodesignsystems/cds-react-code-snippet';

const MyComponent = () => {
  const highlight = useShiki('const x = 10;', {
    language: 'typescript',
  });

  return (
    <CDSCodeBlock
      hasLineNumbers
      callToActionBar={
        <CDSButton.Group>
          <CDSButton variant="secondary">Copy</CDSButton>
          <CDSButton variant="secondary">Export</CDSButton>
        </CDSButton.Group>
      }>
      {highlight}
    </CDSCodeBlock>
  );
};
```

### Custom Highlighter Instance

You can pass your own highlighter instance ensure that `shikiOptions.codeToHast` is included for the highlighting to work. This is because the underlying engine does not know of your custom highlighter instance's configuration, like themes and languages, so it needs to be provided explicitly via `shikiOptions.codeToHast`.

#### Example Usage for Custom Highlighter

```tsx
import { getHighlighter } from 'shiki';
import { CDSCodeBlock, WithShiki } from '@ciscodesignsystems/cds-react-code-snippet';

export default function CustomHighlighter() {
  const customHighlighter = getHighlighter({
    theme: 'monokai',
    langs: ['javascript'],
    shikiOptions: {
      codeToHast: {
        theme: 'monokai',
      },
    },
  });

  return (
    <WithShiki
      highlighter={customHighlighter}
      language="javascript"
      shikiOptions={{ codeToHast: { theme: 'monokai' } }}>
      {(highlightedCode) => <CDSCodeBlock hasLineNumbers>{highlightedCode}</CDSCodeBlock>}
    </WithShiki>
  );
}
```

#### Example Usage for Server Components

Shiki's default WASM engine and "full" bundle is designed for server-usage. The bundle that CDS provides is optimized for client-side usage, by using [Shiki's Web Bundle](https://shiki.style/languages) and JS Regex engine.
For server usage (like Next.js's Server Component) you don't need to use `WithShiki` or `useShiki`, you can use shiki's full bundle directly on the server and pass the result to the `CDSCodeBlock` component.

```tsx
import { codeToHtml } from 'shiki';
import { CDSCodeBlock } from '@ciscodesignsystems/cds-react-code-snippet';

export default async function ServerComponent() {
  const sampleCode = await codeToHtml(
    `FROM node:lts-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD ["node", "app.js"]`,
    {
      lang: 'Dockerfile',
      theme: 'vitesse-dark', // UX team prefers themes: { light: `light-plus`, dark: `dark-plus` }
    }
  );

  return (
    <CDSCodeBlock>
      <div dangerouslySetInnerHTML={{ __html: sampleCode }} />
    </CDSCodeBlock>
  );
}
```

## Built-in/Bundled Languages

`CDSCodeSnippet` [has the web bundle of languages from Shiki built-in](https://shiki.style/guide/bundles#shiki-bundle-web). If you need a language that is not included in the above list, you can look at the [full bundle of languages listed on Shiki's website](https://shiki.style/languages) and then create your own highlighter instance with the full bundle, as shown in the _[Custom Highlighter Instance](#custom-highlighter-instance)_ examples above, and pass it to the [`WithShiki`](#withshiki) or [`useShiki`](#useshiki) components.

Use this link to see the [list of languages included in the web bundle](https://shiki.style/languages).

> Additional Notes:
>
> - The full bundle is large and may impact your bundle size, so use it judiciously.
> - If you need only a few languages, consider creating a custom highlighter instance with just those languages to optimize performance.

## Known Issues

The following are known issues and may affect your use of this component.

- Cypress test: `Cannot read properties of undefined (reading 'VSCODE_TEXTMATE_DEBUG')
Shiki is using textmate in its package.`

```tsx
// ../../../node_modules/@shikijs/core/dist/textmate.mjs
({
  InDebugMode: typeof process !== 'undefined' && !!process.env['VSCODE_TEXTMATE_DEBUG'],
});
```

When running the Cypress test for code snippet in vite environment, it might have the error: process.env is undefined.
To fix this Cypress test error, add following in vite.config.js environment,

```tsx
  define: {
    'process.env': {
      VSCODE_TEXTMATE_DEBUG: false,
    },
  }
```

- Jest encountered an unexpected token

When running Jest tests, you may encounter the following error when using ECMAScript Modules (ESM): `Jest encountered an unexpected token`

Updated your jest config to ignore transforming these ESM packages related to shiki

```js
transform: {
  'node_modules/(hast-util-to-jsx-runtime|hast-util-whitespace|hast-util-to-html|html-void-elements|comma-separated-tokens|devlop|property-information|space-separated-tokens|unist-util-position|zwitch|estree-util-is-identifier-name|shiki|@shikijs/*|stringify-entities|character-entities-legacy|character-entities-html4|ccount)/.+\\.(js|ts|jsx|tsx|mjs|mts)?$':
    'ts-jest',
  '^.+\\.(ts|tsx)?$': 'ts-jest',
  '^.+\\.(js|jsx)?$': 'babel-jest',
},
transformIgnorePatterns: [
  '<rootDir>/node_modules/(?!hast-util-to-jsx-runtime|hast-util-whitespace|hast-util-to-html|html-void-elements|comma-separated-tokens|devlop|space-separated-tokens|unist-util-position|property-information|zwitch|estree-util-is-identifier-name|shiki|@shikijs/*|stringify-entities|character-entities-legacy|character-entities-html4|ccount)/',
],
```

> Note: Migrating to Vitest, a Vite-native testing framework, would resolve this issue more elegantly, as Vitest has built-in support for ECMAScript Modules (ESM) as it uses uses Vite underneath which is a ESM-first tool.
