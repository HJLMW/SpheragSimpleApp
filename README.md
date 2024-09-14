# Spherag Water Management App

## Description
A simple mobile application developed in **React Native** and Redux for global state management, created for the company **Spherag**. The app allows users to monitor and control irrigation systems and other connected devices on farms, offering an intuitive interface to visualize the status of each component and its location in a Map. (such as pumps, valves, flow meters, etc.).

### Important Notes:
- The app displays fictional types of atlases, meaning the information presented is not real.
- The app does not maintain an active session; it only reflects the screen flow from the login. This could be easily managed by storing the user state with AsyncLocalStorage.

## Folder Structure

- **components**: Contains reusable components such as buttons, search bars, and text inputs.
- **constants**: Defines global constants like the colors used in the app.
- **images**: Image files used in the app, such as the Spherag logo.
- **screens**: The different screens of the application, organized by context like `Home`, `Login`, and `Atlases`.
- **states**: Global state implementation using Redux, where system and user states are managed.
- **store.tsx**: Configuration of the Redux store.
- **types**: Types used throughout the application, including data types for Atlases, connectors, and systems.
- **utils**: Utility functions, such as the API for interacting with the backend and types used in Redux hooks.

### Project Tree
```bash
├── components
│   ├── Button.tsx
│   ├── HeaderBar.tsx
│   ├── SearchBar.tsx
│   └── TextInput.tsx
├── constants
│   └── colors.ts
├── images
│   └── spherag-logo.png
├── screens
│   ├── Home
│   │   ├── Atlases
│   │   │   ├── Atlas
│   │   │   │   ├── Atlas.tsx
│   │   │   │   └── Styles.js
│   │   │   ├── Atlases.tsx
│   │   │   └── Styles.js
│   │   ├── Home.tsx
│   │   ├── Styles.js
│   │   └── Systems
│   │       ├── Styles.js
│   │       └── Systems.tsx
│   ├── Login
│   │   ├── Login.tsx
│   │   └── Styles.js
│   └── Screens.tsx
├── states
│   ├── systemSlice.tsx
│   └── userSlice.tsx
├── store.tsx
├── types
│   ├── atlas.ts
│   ├── connectors.ts
│   └── system.ts
└── utils
    ├── api.tsx
    └── reduxHookTypes.tsx
```
