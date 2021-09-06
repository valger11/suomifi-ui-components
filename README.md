# [<img src="https://avatars0.githubusercontent.com/u/11345641?s=88&v=4" alt="DVV" width="18"/> suomifi-ui-components](https://vrk-kpa.github.io/suomifi-ui-components/)

![npm](https://img.shields.io/npm/v/suomifi-ui-components) ![NPM](https://img.shields.io/npm/l/suomifi-ui-components) ![WCAG](https://img.shields.io/badge/WCAG%202.1-AA-green) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-green.svg)](http://makeapullrequest.com)

Suomi.fi-styleguide in React components. [Living styleguide](https://vrk-kpa.github.io/suomifi-ui-components/) (latest release/master-branch).

## ✨ Features

- Accessibility WCAG 2.1 level AA
- React-components with TypeScript support
- Suomi.fi brand styles
- Highly customizable (CSS, CSS-in-JS)

Works with [React >= 16.8.0](https://github.com/facebook/react) and [Styled Components >= 5.2.1](https://github.com/styled-components/styled-components). Supports [TypeScript](https://github.com/Microsoft/TypeScript). CJS and ESM builds provided via the npm package.

Supports and tested on latest versions of Chrome, Firefox, Safari and Edge. Also tested with NVDA, VoiceOver and TalkBack screen readers.

## 📦 Install

To install the component library itself

```bash
yarn add suomifi-ui-components
```

Include **required** styles from `dist/main.css` as best suited for your project. You can, for example, import the stylesheet to your app and let your bundler handle it:

```typescript
import 'suomifi-ui-components/dist/main.css';
```

This stylesheet contains part of the global styles for the library and Reach UI peer dependency styles.

Include **required** fonts as best suited for your project. You can, for example, use the following import with your global css.

```css
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600&display=swap');
```

The following fonts and variants are required: Font-family: 'Source Sans Pro', Font-weight: 300, 400, 600

### Peer dependencies

You should also install the following peer dependencies.

- [React](https://www.npmjs.com/package/react) version >=16.8.0 and related dependencies and typings.
- [styled-components](https://www.npmjs.com/package/styled-components) version >=5.2.1 and related dependencies and typings.

- The aim is to keep dependencies up to date and use the latest available versions. We encourage you to use the latest available versions of peer dependencies.

```bash
yarn add styled-components
```

- If using TypeScript, version 3.8 or above is required.

- In case TypeScript is used and skipLibCheck compiler option is set to false, also typings for [react](https://www.npmjs.com/package/@types/react), [react-dom](https://www.npmjs.com/package/@types/react-dom), [styled-components](https://www.npmjs.com/package/@types/styled-components/) and [warning](https://www.npmjs.com/package/@types/warning) are required.

```bash
yarn add @types/styled-components @types/warning
```

## 🔨 Usage

```jsx
import { Button } from 'suomifi-ui-components';
ReactDOM.render(<Button />, mountNode);
```

### 🌊 Component variants

Components have variant-property for different versions of the current component. Some components might also have static variants e.g. `Component.variant`, but using these is discouraged as they are being removed in future releases.

```jsx
import { Button } from 'suomifi-ui-components';
<Button variant=”secondary”>This is a seconday button</Button>;
```

### ⛱ Extending styles

Components' styles can be customized with [Styled Components](https://github.com/styled-components/styled-components) / [Emotion](https://github.com/emotion-js/emotion):

```javascript
styled(Button)...
```

_HOX!!! If you use Styled Components you cannot use Component.variant (static methods) and you need to use variant-property to get variants from the styled(Component)._ Partly for this reason we are getting rid of the static variants in the future releases.

**or** using CSS-ClassName:

```jsx
<Button className="button--custom">Example</Button>
```

```css
.fi-button.button--custom {
  ...;
}
```

Don't use ~~!important~~, if really really needed - for specificity hack you can define styles using classNames multiple times `.fi-button.button--custom.button--custom {...}`

## 🔮 FAQ

See [FAQ.md](/FAQ.md).

## ⌨️ Development

See [DEVELOPMENT.md](/DEVELOPMENT.md).

## 🤝 Contributing

We welcome all contributions. Please read our [CONTRIBUTING.md](/CONTRIBUTING.md) first.

## Licensing

MIT [LICENSE](/LICENSE)
