# Flox

Flox is a modern web application for educational planning and class
management built with Angular. It helps educators organize classes,
units, and sessions with an intuitive interface and powerful planning
features.

## Overview

Flox allows teachers to:

- Create and manage multiple classes
- Organize units within each class
- Plan detailed sessions with activities, evaluations,
  diversity-attention strategies, and observations
- Manage user preferences such as language and theme
- Sync data in real time using Firebase

## Features

- **Authentication System**: Secure login with Firebase
  Authentication
- **Class Management**: Create, edit, and delete classes
- **Unit Organization**: Add and manage units with names and
  summaries
- **Session Planning**: Detailed planning for each session
- **Multi-language Support**: English and Spanish
- **Theme Support**: Light and dark mode
- **Color Scheme Support**: Option to change the primary color of the interface
- **Real-time Sync**: Powered by Firebase Firestore

## Tech Stack

- **Framework**: Angular 19
- **State Management**: NgRx Signals & Toolkit
- **Backend**: Firebase Authentication & Firestore
- **UI Framework**: PrimeNG 19
- **Styling**: Tailwind CSS 4
- **Internationalization**: Transloco
- **Language**: TypeScript 5.7

## Prerequisites

- Node.js (LTS recommended)
- npm or yarn
- Angular CLI 19

## Installation

1.  Clone the repository:

```bash
git clone https://github.com/javierFerFer/flox.git
cd flox
```

2.  Install dependencies:

```bash
npm install --legacy-peer-deps
```

## Firebase Configuration

The application uses Firebase for both authentication and data storage.
A default Firebase configuration is provided in the project.

> **Important:**
> Replace the default Firebase configuration with your own credentials
> when deploying to production.
> Using environment-specific configuration files is strongly
> recommended.

## Development

### Start the Development Server

```bash
npm start
```

Navigate to **http://localhost:4200/**.
The app will reload automatically when you make changes.

### Build the Project

Development build:

```bash
npm run build
```

Production build:

```bash
npm run build:prod
```

Artifacts will be generated in the `dist/` folder.

### Run Tests

```bash
npm test
```

## Project Structure

    src/
    ├── app/
    │   ├── components/      # Reusable UI components
    │   ├── guards/          # Route guards
    │   ├── pages/           # Major application pages
    │   │   ├── dashboard/   # Dashboard & records management
    │   │   ├── login/       # Login page
    │   │   └── modals/      # Modal components
    │   ├── resolvers/       # Route data resolvers
    │   ├── services/        # Business logic & APIs
    │   └── stores/          # NgRx Signal stores
    ├── assets/
    │   └── i18n/            # Translation files
    └── ...

## Available Scripts

- `npm start` --- Start development server
- `npm run build` --- Build for development
- `npm run build:prod` --- Production build (with base href for
  deployment)
- `npm run watch` --- Build in watch mode
- `npm test` --- Run unit tests

## Internationalization

Flox supports multiple languages using Transloco.

Available languages:

- English (`en`)
- Spanish (`es`)

Translation files are stored in:

    src/assets/i18n/

## License

This project is licensed under the **GNU General Public License v3.0**.
See the `LICENSE` file for more details.

## Version

Current version: **1.0.0**
