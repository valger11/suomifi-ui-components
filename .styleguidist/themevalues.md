## Default Theme Values

### Colors

Theme colors is of type _`ColorDesignTokens`_ and defines all the colors and gradients used in the components.

```js noeditor
import { SuomifiThemeConsumer } from '../src/core/theme';
import { ThemeProps } from '../src/docs/Theme/ThemeProps';

<SuomifiThemeConsumer>
  {({ suomifiTheme }) => (
    <ThemeProps title="colors:" values={suomifiTheme.colors} />
  )}
</SuomifiThemeConsumer>;
```

### Spacing

Theme spacing is of type _`SpacingDesignTokens`_ and defines external spacing used between more complex elements as well as some parts of internal spacing.

```js noeditor
import { SuomifiThemeConsumer } from '../src/core/theme';
import { ThemeProps } from '../src/docs/Theme/ThemeProps';

<SuomifiThemeConsumer>
  {({ suomifiTheme }) => (
    <ThemeProps title="spacing:" values={suomifiTheme.spacing} />
  )}
</SuomifiThemeConsumer>;
```

### Typography

Theme typography is of type _`TypographyDesignTokens`_ and defines most typography styles used in the components.

```js noeditor
import { SuomifiThemeConsumer } from '../src/core/theme';
import { ThemeProps } from '../src/docs/Theme/ThemeProps';

<SuomifiThemeConsumer>
  {({ suomifiTheme }) => (
    <ThemeProps
      title="typography:"
      values={suomifiTheme.typography}
    />
  )}
</SuomifiThemeConsumer>;
```

### Gradients

Theme gradients is of type _`GradientDesignTokens`_ and defines all gradient colors used in the components. By default, gradients are based on color design tokens.

```js noeditor
import { SuomifiThemeConsumer } from '../src/core/theme';
import { ThemeProps } from '../src/docs/Theme/ThemeProps';

<SuomifiThemeConsumer>
  {({ suomifiTheme }) => (
    <ThemeProps title="gradients:" values={suomifiTheme.gradients} />
  )}
</SuomifiThemeConsumer>;
```

### Focus

Theme focus is of type _`FocusDesignTokens`_ and defines all focus styles used in the library. By default, focus styles are based on color, spacing and radius design tokens.

```js noeditor
import { SuomifiThemeConsumer } from '../src/core/theme';
import { ThemeProps } from '../src/docs/Theme/ThemeProps';

<SuomifiThemeConsumer>
  {({ suomifiTheme }) => (
    <ThemeProps title="focus:" values={suomifiTheme.focus} />
  )}
</SuomifiThemeConsumer>;
```

### Radius

Theme focus is of type _`RadiusDesignTokens`_ and defines all focus styles used in the library.

```js noeditor
import { SuomifiThemeConsumer } from '../src/core/theme';
import { ThemeProps } from '../src/docs/Theme/ThemeProps';

<SuomifiThemeConsumer>
  {({ suomifiTheme }) => (
    <ThemeProps title="radius:" values={suomifiTheme.radius} />
  )}
</SuomifiThemeConsumer>;
```

### Shadows

Theme focus is of type _`ShadowDesignTokens`_ and defines all shadow styles used in the library. By default, shadow styles are based on color design tokens.

```js noeditor
import { SuomifiThemeConsumer } from '../src/core/theme';
import { ThemeProps } from '../src/docs/Theme/ThemeProps';

<SuomifiThemeConsumer>
  {({ suomifiTheme }) => (
    <ThemeProps title="shadows:" values={suomifiTheme.shadows} />
  )}
</SuomifiThemeConsumer>;
```

### Transitions

Theme focus is of type _`TransitionDesignTokens`_ and defines all shadow styles used in the library. By default, shadow styles are based on color design tokens.

```js noeditor
import { SuomifiThemeConsumer } from '../src/core/theme';
import { ThemeProps } from '../src/docs/Theme/ThemeProps';

<SuomifiThemeConsumer>
  {({ suomifiTheme }) => (
    <ThemeProps
      title="transitions:"
      values={suomifiTheme.transitions}
    />
  )}
</SuomifiThemeConsumer>;
```

### Z-indexes

Theme zindexes is of type _`ZIndexDesignTokens`_ and defines all z-indexes used in the library. Most implementations use portals by default and do not rely on z-index.

```js noeditor
import { SuomifiThemeConsumer } from '../src/core/theme';
import { ThemeProps } from '../src/docs/Theme/ThemeProps';

<SuomifiThemeConsumer>
  {({ suomifiTheme }) => (
    <ThemeProps title="zindexes:" values={suomifiTheme.zindexes} />
  )}
</SuomifiThemeConsumer>;
```

### Raw token values

Theme values is of type _`RawDesignTokens`_ and provides colors, typograhpy and spacing design tokens in more granular format for use with custom styles. Values have no effect on the theme and are only provided for further use.

```js noeditor
import { SuomifiThemeConsumer } from '../src/core/theme';
import { ThemeProps } from '../src/docs/Theme/ThemeProps';

<SuomifiThemeConsumer>
  {({ suomifiTheme }) => (
    <ThemeProps title="values:" values={suomifiTheme.values} />
  )}
</SuomifiThemeConsumer>;
```
