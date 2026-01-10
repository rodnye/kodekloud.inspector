# Demo Customizing UI Theme - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Backstage-Associate-CBA/Customization-Plugins/Demo-Customizing-UI-Theme)

---

## Table of Contents

- Demo Customizing UI Theme
  - Theming Utilities from @backstage/theme
  - 1. Defining a Custom Theme
  - 2. Applying Your Custom Theme in App.tsx
  - 3. Creating a More Colorful “Fun” Theme
  - Preview of Custom Theme
  - References
  - Watch Video

---

## Content

Certified Backstage Associate (CBA)

Customization Plugins

# Demo Customizing UI Theme

In this lesson, we'll walk through creating a custom UI theme for Backstage. By default, Backstage ships with a standard design, but you can easily tailor color palettes, typography, and other style options to match your organization's brand.

## Theming Utilities from `@backstage/theme`

Backstage provides a powerful theming API via the `@backstage/theme` package. The key exports include:

| Export                   | Purpose                                                                         |
| ------------------------ | ------------------------------------------------------------------------------- |
| `createBaseThemeOptions` | Builds a base set of theme options (palette, typography, and page settings).    |
| `createUnifiedTheme`     | Combines base options into a full theme object consumable by the ThemeProvider. |
| `palettes`               | Collection of predefined light and dark color palettes.                         |

```
import {
  createBaseThemeOptions,
  createUnifiedTheme,
  palettes,
} from '@backstage/theme';
```

> [!important]
> **Note**
>
> Make sure `@backstage/theme` is installed in your workspace. If not, run `yarn add @backstage/theme` or `npm install @backstage/theme`.

## 1\. Defining a Custom Theme

Follow these steps to create a new theme file:

1.  Navigate to `packages/app/src` in your Backstage project.
2.  Create a `theme` folder if it doesn't already exist.
3.  Inside `theme`, add a file named `my-theme.ts`:

```
// packages/app/src/theme/my-theme.ts
import {
  createBaseThemeOptions,
  createUnifiedTheme,
  palettes,
} from '@backstage/theme';


export const myTheme = createUnifiedTheme({
  ...createBaseThemeOptions({
    palette: palettes.light,
  }),
  fontFamily: 'Comic Sans MS',
  defaultPageTheme: 'home',
});
```

This configuration:

- Spreads the **light** palette from `palettes.light`.
- Overrides the default `fontFamily` to `'Comic Sans MS'`.
- Sets `defaultPageTheme` to `'home'`.

> [!important]
> **Warning**
>
> Comic Sans MS is used here as an example. Choose fonts that align with your brand guidelines.

## 2\. Applying Your Custom Theme in `App.tsx`

To register and activate your new theme, update the `createApp` call in `packages/app/src/App.tsx`:

```
// packages/app/src/App.tsx
import React from 'react';
import { createApp } from '@backstage/app-defaults';
import { UnifiedThemeProvider } from '@backstage/theme';
import { LightIcon } from '@backstage/core-components';
import { myTheme } from './theme/my-theme';


const app = createApp({
  themes: [
    {
      id: 'my-theme',
      title: 'My Custom Theme',
      variant: 'light',
      icon: <LightIcon />,
      Provider: ({ children }) => (
        <UnifiedThemeProvider theme={myTheme}>
          {children}
        </UnifiedThemeProvider>
      ),
    },
  ],
  apis,
  bindRoutes({ bind }) {
    // your routes here
  },
});
```

Key properties in the theme config:

- **id**: A unique identifier (e.g., `my-theme`).
- **title**: Display name in the UI theme selector.
- **variant**: Choose `'light'` or `'dark'`.
- **icon**: React element shown next to the theme name.
- **Provider**: Wraps the application in `<UnifiedThemeProvider theme={myTheme}>`.

> [!important]
> **Note**
>
> Backstage will hot-reload your theme changes—no need to restart your development server.

After saving, the UI should instantly reflect your new font and default page theme.

## 3\. Creating a More Colorful “Fun” Theme

You can further customize palette attributes (primary, secondary, navigation) as shown:

```
// packages/app/src/theme/fun-theme.ts
import {
  createBaseThemeOptions,
  createUnifiedTheme,
  palettes,
} from '@backstage/theme';


export const funTheme = createUnifiedTheme({
  ...createBaseThemeOptions({
    palette: {
      ...palettes.light,
      mode: 'light',
      primary: { main: '#e03077' },
      secondary: { main: '#f50057' },
      navigation: {
        // Define custom navigation colors here
      },
    },
  }),
});
```

Then register `funTheme` in your `App.tsx`:

```
import { funTheme } from './theme/fun-theme';


const app = createApp({
  themes: [
    {
      id: 'fun-theme',
      title: 'Fun Theme',
      variant: 'light',
      icon: <LightIcon />,
      Provider: ({ children }) => (
        <UnifiedThemeProvider theme={funTheme}>
          {children}
        </UnifiedThemeProvider>
      ),
    },
  ],
  // ...
});
```

## Preview of Custom Theme

Upon refreshing the UI, your custom colors are applied across Backstage:

![The image shows a web interface titled "My Company Catalog" displaying a list of components with details such as name, system, owner, type, lifecycle, description, and tags. There are options for filtering and creating new components.](https://kodekloud.com/kk-media/image/upload/v1752870146/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Customizing-UI-Theme/my-company-catalog-interface.jpg)

## References

- [Backstage Theming Documentation](https://backstage.io/docs/themes/overview)
- [@backstage/theme on npm](https://www.npmjs.com/package/@backstage/theme)
- [Backstage App Defaults](https://backstage.io/docs/apps/getting-started)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-backstage-associate-cba/module/aad867ea-baf2-4ca7-b722-ad38ea794a7e/lesson/f5714cc0-79b1-4dcc-bdfa-c2f9a0749d3a)**
>
> Watch video content
