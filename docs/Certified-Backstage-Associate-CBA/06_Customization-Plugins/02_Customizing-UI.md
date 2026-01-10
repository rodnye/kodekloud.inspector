# Customizing UI - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Backstage-Associate-CBA/Customization-Plugins/Customizing-UI)

---

## Table of Contents

- Customizing UI
  - Backstage Design System
  - Exploring Backstage Components
  - Theming in Backstage
  - Applying the Theme with React Context
  - Next Steps
  - Links and References
  - Watch Video
    - Material-UI Integration
    - Creating a Custom Theme
      - Custom Color Overrides

---

## Content

Certified Backstage Associate (CBA)

Customization Plugins

# Customizing UI

In this guide, we’ll show you how to customize the Backstage user interface by leveraging its design system, theming capabilities, and React Context integration. You’ll learn how to integrate Material-UI, explore prebuilt Backstage components, create a custom theme, and apply it across your app.

## Backstage Design System

Backstage’s design system builds on top of [Material-UI](https://mui.com/) and Backstage’s own component library. All Material-UI components work seamlessly alongside Backstage’s custom elements—giving you a consistent look and feel.

![The image is a diagram titled "Backstage Design System," showing two components: "Backstage UI/UX" and "Material UI."](https://kodekloud.com/kk-media/image/upload/v1752870120/notes-assets/images/Certified-Backstage-Associate-CBA-Customizing-UI/backstage-design-system-ui-ux-material-ui.jpg)

### Material-UI Integration

Material-UI provides prebuilt React components—buttons, cards, sliders, etc.—that you can drop right into your Backstage frontend.

Install the core packages:

```
npm install @mui/material @emotion/react @emotion/styled
```

Then import and use the components:

```
import Button from '@mui/material/Button';
import ShoppingCartRounded from '@mui/icons-material/ShoppingCartRounded';


export const MyButtons = () => (
  <>
    <Button variant="text" startIcon={<ShoppingCartRounded />}>
      Add item
    </Button>
    <Button variant="contained" startIcon={<ShoppingCartRounded />}>
      Add item
    </Button>
    <Button variant="outlined" startIcon={<ShoppingCartRounded />}>
      Add item
    </Button>
  </>
);
```

> [!important]
> **Note**
>
> Browse the full list of Backstage and Material-UI components in the [Backstage Storybook](https://backstage.io/storybook).

## Exploring Backstage Components

Backstage publishes its components in Storybook. You’ll find cards, progress bars, navigation elements, and more—all ready to customize.

![The image shows a user interface with a sidebar menu and four progress cards displaying percentages (30%, 57%, 89%, and 20%) in circular progress bars. The theme is set to "Light theme."](https://kodekloud.com/kk-media/image/upload/v1752870121/notes-assets/images/Certified-Backstage-Associate-CBA-Customizing-UI/user-interface-sidebar-progress-cards.jpg)

| Component Type  | Description                          | Example Usage                                               |
| --------------- | ------------------------------------ | ----------------------------------------------------------- |
| Card            | Container for grouped content        | `<Card><CardContent>...</CardContent></Card>`               |
| Progress Circle | Visualize task completion percentage | `<CircularProgress variant="determinate" value={50} />`     |
| Sidebar         | Navigation wrapper for main sections | `<Sidebar><SidebarItem to="/">Home</SidebarItem></Sidebar>` |

## Theming in Backstage

A **theme** defines colors, typography, shadows, and opacity. Backstage supports multiple themes (light/dark) so you can match your brand or user preferences.

![The image is a design theme guide showing different color palettes, typography, shadow effects, and element opacity options. It includes background, primary, and secondary colors, along with font and shadow settings.](https://kodekloud.com/kk-media/image/upload/v1752870122/notes-assets/images/Certified-Backstage-Associate-CBA-Customizing-UI/design-theme-guide-color-typography.jpg)

### Creating a Custom Theme

1.  In your frontend app directory, navigate to `packages/apps/<your-app>/src`.
2.  Create a `theme/` folder and add `myTheme.ts`.

Define your theme using Backstage theming utilities:

```
// packages/apps/<your-app>/src/theme/myTheme.ts
import {
  createUnifiedTheme,
  createBaseThemeOptions,
  palettes,
} from '@backstage/theme';


export const myTheme = createUnifiedTheme({
  ...createBaseThemeOptions({
    palette: palettes.light,
  }),
  fontFamily: 'Comic Sans MS',     // Custom font
  defaultPageTheme: 'home',         // Default layout style
});
```

#### Custom Color Overrides

Override specific palette values for a unique look:

```
export const funTheme = createUnifiedTheme({
  ...createBaseThemeOptions({
    palette: {
      ...palettes.light,
      mode: 'light',
      primary: { main: '#e30777' },
      secondary: { main: '#f50057' },
    },
  }),
});
```

These colors will propagate to Buttons, Links, Charts, and other components.

> [!important]
> **Warning**
>
> Using a nonstandard font like `Comic Sans MS` may impact readability. Choose a web-safe or hosted font for production.

## Applying the Theme with React Context

Backstage uses React Context to make the theme available to all components. Wrap your root app with `ThemeProvider`:

![The image is a flowchart illustrating a React component hierarchy for changing themes, starting with "themeProvider" and "app" at the top, followed by "home," and branching into "SideBar," "Catalog," and "Search."](https://kodekloud.com/kk-media/image/upload/v1752870123/notes-assets/images/Certified-Backstage-Associate-CBA-Customizing-UI/react-component-hierarchy-flowchart.jpg)

```
// packages/apps/<your-app>/src/App.tsx
import React from 'react';
import { ThemeProvider } from '@backstage/core-components';
import { myTheme } from './theme/myTheme';
import { AppRoutes } from './AppRoutes';


export const App = () => (
  <ThemeProvider theme={myTheme}>
    <AppRoutes />
  </ThemeProvider>
);
```

By wrapping `AppRoutes` in `ThemeProvider`, the `myTheme` object is shared throughout your component tree—allowing consistent styling based on your custom theme.

## Next Steps

Now you’re ready to:

- Integrate Material-UI components into Backstage.
- Browse and customize Backstage Storybook components.
- Define custom themes that match your brand.
- Apply them across your app using React Context.

## Links and References

- [Backstage Documentation](https://backstage.io/docs)
- [Backstage Theme API](https://backstage.io/docs/theme/api)
- [Material-UI Documentation](https://mui.com/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-backstage-associate-cba/module/aad867ea-baf2-4ca7-b722-ad38ea794a7e/lesson/46e863ef-ceb6-44b9-83a0-1eaff4b9006b)**
>
> Watch video content
