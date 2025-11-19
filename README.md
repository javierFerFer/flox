# Flox

A modern web application for educational planning and class management built with Angular. Flox helps educators organize their classes, units, and sessions with an intuitive interface and comprehensive management features.

## Overview

Flox is an educational planning tool that allows teachers to:
- Create and manage multiple classes
- Organize units within each class
- Plan detailed sessions with activities, evaluations, and observations
- Track diversity attention strategies
- Customize user preferences including language and theme [1](#0-0) 

## Features

- **Authentication System**: Secure login with Firebase Authentication [2](#0-1) 
- **Class Management**: Create, edit, and delete classes [3](#0-2) 
- **Unit Organization**: Add units to classes with names and summaries
- **Session Planning**: Detailed session planning with activities, evaluations, diversity attention, and observations
- **Multi-language Support**: Available in English and Spanish [4](#0-3) 
- **Theme Support**: Light and dark mode [5](#0-4) 
- **Real-time Data Sync**: Powered by Firebase Firestore [6](#0-5) 

## Tech Stack

- **Framework**: Angular 19.2.0 [7](#0-6) 
- **State Management**: NgRx Signals & Toolkit [8](#0-7) 
- **Backend**: Firebase (Authentication & Firestore) [9](#0-8) 
- **UI Framework**: PrimeNG 19.1.3 [10](#0-9) 
- **Styling**: Tailwind CSS 4.1.7 [11](#0-10) 
- **Internationalization**: Transloco [12](#0-11) 
- **Language**: TypeScript 5.7.2 [13](#0-12) 

## Prerequisites

- Node.js (LTS version recommended)
- npm or yarn
- Angular CLI 19.2.10 [14](#0-13) 

## Installation

1. Clone the repository:
```bash
git clone https://github.com/javierFerFer/flox.git
cd flox
```

2. Install dependencies:
```bash
npm install
```

## Firebase Configuration

The application uses Firebase for authentication and data storage. The Firebase configuration is located in the application config file. [15](#0-14) 

**Note**: For production use, you should replace the Firebase configuration with your own project credentials and use environment-specific configuration files.

## Development

### Starting the Development Server

```bash
npm start
```

Navigate to `http://localhost:4200/`. The application will automatically reload when you make changes to source files. [16](#0-15) 

### Building the Project

For development build:
```bash
npm run build
```

For production build:
```bash
npm run build:prod
```

The build artifacts will be stored in the `dist/` directory. [17](#0-16) 

### Running Tests

```bash
npm test
``` [18](#0-17) 

## Project Structure

```
src/
├── app/
│   ├── components/      # Reusable UI components
│   ├── guards/          # Route guards (auth, init, etc.)
│   ├── pages/           # Main application pages
│   │   ├── dashboard/   # Dashboard with records management
│   │   ├── login/       # Authentication page
│   │   └── modals/      # Modal components
│   ├── resolvers/       # Route resolvers
│   ├── services/        # Business logic and API services
│   └── stores/          # NgRx Signal stores
├── assets/
│   └── i18n/           # Translation files
└── ...
``` [19](#0-18) 

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for development
- `npm run build:prod` - Build for production with base href configuration
- `npm run watch` - Build in watch mode
- `npm test` - Run unit tests [20](#0-19) 

## Internationalization

The application supports multiple languages through Transloco. Currently available languages:
- English (en)
- Spanish (es)

Translation files are located in `src/assets/i18n/`. [21](#0-20) 

## License

This project is licensed under the GNU General Public License v3.0. [22](#0-21) 

See the [LICENSE](LICENSE) file for details.

## Version

Current version: 0.28.0 [23](#0-22) 

---

**Notes:**
- This is a comprehensive README that covers all major aspects of the Flox application based on the codebase structure and configuration.
- The Firebase configuration credentials shown in the code are currently hardcoded. For production deployments, these should be moved to environment-specific configuration files.
- The application uses hash-based routing strategy for deployment flexibility. [24](#0-23)

### Citations

**File:** src/assets/i18n/en.json (L1-242)
```json
{
  "name": "en",
  "LOGIN_PAGE": {
    "TITLE": "Login",
    "USERNAME": "Username",
    "PASSWORD": "Password",
    "LOGIN_BUTTON": "Log In",
    "ERRORS": {
      "CREDENTIALS_ERROR": {
        "TITLE": "Error",
        "MESSAGE": "credentials are not valid!"
      }
    }
  },
  "NAVIGATION": {
    "CLASSES": {
      "LABEL": "Classes"
    },
    "SIGN-OUT": {
      "LABEL": "Close session"
    }
  },
  "DASHBOARD": {
    "RECORDS": {
      "LABEL": "Select or create a class to start!",
      "COMPONENTS": {
        "CREATE_NEW_CLASS_BUTTON": "Create a new class",
        "CLASS": {
          "LABEL": "Class without units!, try to add a new one",
          "ACTIONS": {
            "ADD_NEW_UNIT": "Add new unit",
            "DELETE_CLASS": "Delete class"
          },
          "CONFIRM_DELETE_CLASS_DIALOG": {
            "HEADER": "Danger Zone",
            "MESSAGE": "Do you want to delete the selected class? It will delete all the units related with it",
            "ACTIONS": {
              "DELETE": "Yes, delete it",
              "CANCEL": "No, cancel"
            },
            "RESULT": {
              "SUCCESS": {
                "SUMMARY": "Success",
                "DETAIL": "Class deleted correctly!"
              },
              "ERROR": {
                "SUMMARY": "Error",
                "DETAIL": "Class was no deleted"
              }
            }
          },
          "CONFIRM_READ_NEW_CHANGES_DIALOG": {
            "HEADER": "Patch notes: {{version}}",
            "ACTIONS": {
              "CLOSE": "Close"
            }
          },
          "UNITS_TABLE": {
            "HEADERS": {
              "NAME": "Name",
              "SUMMARY": "Summary"
            },
            "CONTEXT_MENU_ACTIONS": {
              "EDIT": "Edit the unit",
              "DELETE": "Delete the unit"
            },
            "CONFIRM_DELETE_UNIT_DIALOG": {
              "HEADER": "Danger Zone",
              "MESSAGE": "Do you want to delete the selected unit?",
              "ACTIONS": {
                "DELETE": "Yes, delete it",
                "CANCEL": "No, cancel"
              },
              "RESULT": {
                "SUCCESS": {
                  "SUMMARY": "Success",
                  "DETAIL": "Unit deleted correctly!"
                },
                "ERROR": {
                  "SUMMARY": "Error",
                  "DETAIL": "Unit was no deleted"
                }
              }
            }
          }
        }
      },
      "MODALS": {
        "CREATE_NEW_CLASS": {
          "TITLE": "Create new class",
          "FORM": {
            "CLASS_NAME": "Name of the class",
            "MESSAGES": {
              "CLASS_CREATE_SUCCESS": {
                "SUMMARY": "Success",
                "DETAIL": "Class created correctly!"
              },
              "CLASS_CREATE_UNSUCCESS": {
                "SUMMARY": "Error",
                "DETAIL": "Class was no created"
              }
            }
          },
          "ACTIONS": {
            "SAVE": "Save changes",
            "CLOSE": "Discard changes"
          }
        },
        "CREATE_NEW_UNIT": {
          "TITLE": "Create new unit",
          "FORM": {
            "UNIT_NAME": "Name",
            "SUMMARY": "Summary",
            "MESSAGES": {
              "UNIT_CREATE_SUCCESS": {
                "SUMMARY": "Success",
                "DETAIL": "Unit added correctly!"
              },
              "UNIT_CREATE_UNSUCCESS": {
                "SUMMARY": "Error",
                "DETAIL": "Unit was no added"
              }
            }
          },
          "ACTIONS": {
            "SAVE": "Save changes",
            "CLOSE": "Discard changes"
          }
        },
        "UNIT_DETAILS": {
          "TITLE": "Unit info",
          "FORM": {
            "UNIT_NAME": "Unit name",
            "SUMMARY": "Summary",
            "MESSAGES": {
              "UNIT_DETAILS_EDIT_SUCCESS": {
                "SUMMARY": "Success",
                "DETAIL": "Unit edited correctly"
              },
              "UNIT_DETAILS_EDIT_UNSUCCESS": {
                "SUMMARY": "Error",
                "DETAIL": "Unit was no edited"
              }
            }
          },
          "ACTIONS": {
            "CLOSE": "Discard changes",
            "SAVE": "Save changes"
          }
        },
        "CREATE_NEW_SESSION": {
          "TITLE": "Create new session",
          "FORM": {
            "SESSION_NAME": "Session name",
            "SESSION_ACTIVITIES": "Activities",
            "SESSION_EVALUATION": "Evaluations",
            "SESSION_ATTENTION_OF_DIVERSITY": "Diversity attention",
            "SESSION_OBSERVATIONS": "Observations",
            "MESSAGES": {
              "NEW_SESSION_CREATE_SUCCESS": {
                "SUMMARY": "Success",
                "DETAIL": "Session created correctly!"
              },
              "NEW_SESSION_CREATE_UNSUCCESS": {
                "SUMMARY": "Error",
                "DETAIL": "Session was no created"
              }
            }
          },
          "TABLE": {
            "LABELS": {
              "NO_SESSIONS": "Unit without sessions, try to create a new one"
            },
            "HEADERS": {
              "NAME": "Name",
              "ACTIVITIES": "Activities",
              "EVALUATIONS": "Evaluations",
              "ATTENTION_OF_DIVERSITY": "Diversity attention",
              "OBSERVATIONS": "Observations"
            },
            "ACTIONS": {
              "ADD_NEW_SESSION": "Add session"
            }
          },
          "ACTIONS": {
            "CLOSE": "Discard changes",
            "SAVE": "Save changes"
          }
        },
        "EDIT_NEW_SESSION": {
          "TITLE": "Edit session",
          "FORM": {
            "SESSION_NAME": "Session name",
            "SESSION_ACTIVITIES": "Activites",
            "SESSION_EVALUATION": "Evaluations",
            "SESSION_ATTENTION_OF_DIVERSITY": "Diversity attention",
            "SESSION_OBSERVATIONS": "Observations",
            "MESSAGES": {
              "NEW_SESSION_EDIT_SUCCESS": {
                "SUMMARY": "Success",
                "DETAIL": "The session was edited successfully!"
              },
              "NEW_SESSION_EDIT_UNSUCCESS": {
                "SUMMARY": "Error",
                "DETAIL": "The session was not edited successfully"
              }
            }
          },
          "ACTIONS": {
            "CLOSE": "Discard changes",
            "SAVE": "Save changes"
          }
        }
      }
    }
  },
  "SHARED_MODALS": {
    "USER_CONFIG": {
      "TITLE": "Edit profile",
      "SUB_TITLE": "Update your information",
      "FORM": {
        "APP_LANGUAGE": "Language to use",
        "ACTIONS": {
          "SAVE": "Save changes"
        },
        "MESSAGES": {
          "USER_EDIT_SUCCESS": {
            "SUMMARY": "Success",
            "DETAIL": "User edited correctly!"
          },
          "USER_EDIT_UNSUCCESS": {
            "SUMMARY": "Error",
            "DETAIL": "Error trying to update the user configuration"
          }
        }
      }
    }
  },
  "LANGUAGES": {
    "EN": "English",
    "ES": "Spanish"
  }
```

**File:** src/app/app.config.ts (L26-34)
```typescript
const firebaseConfig = {
  apiKey: 'AIzaSyA53tCg81VnygQLo6exgQsldVO_SfIe4b4',
  authDomain: 'flox-8290b.firebaseapp.com',
  projectId: 'flox-8290b',
  storageBucket: 'flox-8290b.firebasestorage.app',
  messagingSenderId: '866079552751',
  appId: '1:866079552751:web:29de8621b438e37ce3d71a',
  measurementId: 'G-FNFLETJVZH',
};
```

**File:** src/app/app.config.ts (L52-55)
```typescript
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
```

**File:** src/app/app.config.ts (L57-59)
```typescript
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
```

**File:** src/app/app.config.ts (L82-84)
```typescript
      provide: PROJECT_VERSION,
      useValue: { version: '0.28.0' },
    },
```

**File:** src/app/app.routes.ts (L44-156)
```typescript
    path: 'dashboard',
    canActivate: [AuthGuard],
    resolve: [DashBoardResolver],
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent,
      ),
    children: [
      {
        path: '',
        redirectTo: 'records',
        pathMatch: 'full',
      },
      {
        path: 'records',
        resolve: [UserClassesResolver],
        loadComponent: () =>
          import('./pages/dashboard/sub-pages/records/records.component').then(
            (m) => m.RecordsComponent,
          ),
        children: [
          {
            path: 'create-new-class',
            loadComponent: () =>
              import('./components/modal-wrapper/modal-wrapper.component').then(
                (m) => m.ModalWrapperComponent,
              ),
            data: {
              modalTitleKey: 'DASHBOARD.RECORDS.MODALS.CREATE_NEW_CLASS.TITLE',
              modalComponentPromise: import(
                '../app/pages/modals/create-new-class/create-new-class.component'
              ).then((m) => m.CreateNewClassModalComponent),
            },
            outlet: 'recordsModals',
          },
          {
            path: 'class/:id',
            resolve: [ClassIdResolver],
            canActivate: [ExistClassGuard],
            loadComponent: () =>
              import(
                './pages/dashboard/sub-pages/class-id/class-id.component'
              ).then((m) => m.ClassIdComponent),
            outlet: 'classTable',
            children: [
              {
                path: 'create-new-unit',
                loadComponent: () =>
                  import(
                    './components/modal-wrapper/modal-wrapper.component'
                  ).then((m) => m.ModalWrapperComponent),
                data: {
                  modalTitleKey:
                    'DASHBOARD.RECORDS.MODALS.CREATE_NEW_UNIT.TITLE',
                  modalComponentPromise: import(
                    './pages/modals/create-new-unit/create-new-unit.component'
                  ).then((m) => m.CreateNewUnitModalComponent),
                },
                outlet: 'createUnit',
              },
              {
                path: 'unit-details/:id',
                loadComponent: () =>
                  import(
                    './components/modal-wrapper/modal-wrapper.component'
                  ).then((m) => m.ModalWrapperComponent),
                data: {
                  modalTitleKey: 'DASHBOARD.RECORDS.MODALS.UNIT_DETAILS.TITLE',
                  modalComponentPromise: import(
                    '../app/pages/modals/unit-details/units-details.component'
                  ).then((m) => m.UnitsDetailComponent),
                },
                outlet: 'unitDetails',
                children: [
                  {
                    path: 'create-unit-session',
                    loadComponent: () =>
                      import(
                        './components/modal-wrapper/modal-wrapper.component'
                      ).then((m) => m.ModalWrapperComponent),
                    data: {
                      modalTitleKey:
                        'DASHBOARD.RECORDS.MODALS.CREATE_NEW_SESSION.TITLE',
                      modalComponentPromise: import(
                        '../app/pages/modals/create-unit-session/create-new-session.component'
                      ).then((m) => m.CreateNewSessionModalComponent),
                    },
                    outlet: 'createUnitSession',
                  },
                  {
                    path: 'session-details/:id',
                    loadComponent: () =>
                      import(
                        './components/modal-wrapper/modal-wrapper.component'
                      ).then((m) => m.ModalWrapperComponent),
                    data: {
                      modalTitleKey:
                        'DASHBOARD.RECORDS.MODALS.EDIT_NEW_SESSION.TITLE',
                      modalComponentPromise: import(
                        '../app/pages/modals/session-detail/session-detail.component'
                      ).then((m) => m.SessionDetailModalComponent),
                    },
                    outlet: 'sessionDetails',
                  },
                ],
              },
            ],
          },
        ],
      },
      ...MODAL_SHARED_ROUTES,
    ],
  },
```

**File:** transloco.config.ts (L1-9)
```typescript
import {TranslocoGlobalConfig} from '@jsverse/transloco-utils';
    
const config: TranslocoGlobalConfig = {
  rootTranslationsPath: 'src/assets/i18n/',
  langs: [ 'en', 'es' ],
  keysManager: {}
};
    
export default config;
```

**File:** src/app/app.component.ts (L15-25)
```typescript
  private theme$ = toObservable(this.userStore.themeAsBoolean).pipe(
    tap((isLightTheme: boolean) => {
      const element = document.querySelector('html');
      if (isLightTheme === undefined) return;
      if (isLightTheme) {
        element!.classList.remove('dark-mode');
      } else {
        element!.classList.add('dark-mode');
      }
    }),
  );
```

**File:** package.json (L4-10)
```json
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "build:prod": "ng build --configuration=production --base-href=/apps/flox/",
    "watch": "ng build --watch --configuration development",
    "test": "ng test"
```

**File:** package.json (L14-26)
```json
    "@angular-architects/ngrx-toolkit": "19.2.0",
    "@angular/animations": "^19.2.0",
    "@angular/common": "^19.2.0",
    "@angular/compiler": "^19.2.0",
    "@angular/core": "^19.2.0",
    "@angular/fire": "^19.2.0",
    "@angular/forms": "^19.2.0",
    "@angular/platform-browser": "^19.2.0",
    "@angular/platform-browser-dynamic": "^19.2.0",
    "@angular/router": "^19.2.0",
    "@jsverse/transloco": "^7.6.1",
    "@ngrx/operators": "^19.2.0",
    "@ngrx/signals": "^19.2.0",
```

**File:** package.json (L31-31)
```json
    "primeng": "^19.1.3",
```

**File:** package.json (L33-34)
```json
    "tailwindcss": "^4.1.7",
    "tailwindcss-primeui": "^0.6.1",
```

**File:** package.json (L40-40)
```json
    "@angular/cli": "^19.2.10",
```

**File:** package.json (L51-51)
```json
    "typescript": "~5.7.2"
```

**File:** src/app (L1-1)
```text
[{"name":"app.component.html","path":"src/app/app.component.html","sha":"5bc1b7b94255205f66c4a4e036225b62dddbd407","size":250,"url":"https://api.github.com/repos/javierFerFer/flox/contents/src/app/app.component.html?ref=develop","html_url":"https://github.com/javierFerFer/flox/blob/develop/src/app/app.component.html","git_url":"https://api.github.com/repos/javierFerFer/flox/git/blobs/5bc1b7b94255205f66c4a4e036225b62dddbd407","download_url":"https://raw.githubusercontent.com/javierFerFer/flox/develop/src/app/app.component.html","type":"file","_links":{"self":"https://api.github.com/repos/javierFerFer/flox/contents/src/app/app.component.html?ref=develop","git":"https://api.github.com/repos/javierFerFer/flox/git/blobs/5bc1b7b94255205f66c4a4e036225b62dddbd407","html":"https://github.com/javierFerFer/flox/blob/develop/src/app/app.component.html"}},{"name":"app.component.scss","path":"src/app/app.component.scss","sha":"4e87b0e20f4e646c3775f4a9e87966cbdd0517db","size":120,"url":"https://api.github.com/repos/javierFerFer/flox/contents/src/app/app.component.scss?ref=develop","html_url":"https://github.com/javierFerFer/flox/blob/develop/src/app/app.component.scss","git_url":"https://api.github.com/repos/javierFerFer/flox/git/blobs/4e87b0e20f4e646c3775f4a9e87966cbdd0517db","download_url":"https://raw.githubusercontent.com/javierFerFer/flox/develop/src/app/app.component.scss","type":"file","_links":{"self":"https://api.github.com/repos/javierFerFer/flox/contents/src/app/app.component.scss?ref=develop","git":"https://api.github.com/repos/javierFerFer/flox/git/blobs/4e87b0e20f4e646c3775f4a9e87966cbdd0517db","html":"https://github.com/javierFerFer/flox/blob/develop/src/app/app.component.scss"}},{"name":"app.component.spec.ts","path":"src/app/app.component.spec.ts","sha":"7d865df3885b811e4c822412a850568aad5b4818","size":1655,"url":"https://api.github.com/repos/javierFerFer/flox/contents/src/app/app.component.spec.ts?ref=develop","html_url":"https://github.com/javierFerFer/flox/blob/develop/src/app/app.component.spec.ts","git_url":"https://api.github.com/repos/javierFerFer/flox/git/blobs/7d865df3885b811e4c822412a850568aad5b4818","download_url":"https://raw.githubusercontent.com/javierFerFer/flox/develop/src/app/app.component.spec.ts","type":"file","_links":{"self":"https://api.github.com/repos/javierFerFer/flox/contents/src/app/app.component.spec.ts?ref=develop","git":"https://api.github.com/repos/javierFerFer/flox/git/blobs/7d865df3885b811e4c822412a850568aad5b4818","html":"https://github.com/javierFerFer/flox/blob/develop/src/app/app.component.spec.ts"}},{"name":"app.component.ts","path":"src/app/app.component.ts","sha":"ad312586ffe2b36118853726f64eaddf181e18e0","size":896,"url":"https://api.github.com/repos/javierFerFer/flox/contents/src/app/app.component.ts?ref=develop","html_url":"https://github.com/javierFerFer/flox/blob/develop/src/app/app.component.ts","git_url":"https://api.github.com/repos/javierFerFer/flox/git/blobs/ad312586ffe2b36118853726f64eaddf181e18e0","download_url":"https://raw.githubusercontent.com/javierFerFer/flox/develop/src/app/app.component.ts","type":"file","_links":{"self":"https://api.github.com/repos/javierFerFer/flox/contents/src/app/app.component.ts?ref=develop","git":"https://api.github.com/repos/javierFerFer/flox/git/blobs/ad312586ffe2b36118853726f64eaddf181e18e0","html":"https://github.com/javierFerFer/flox/blob/develop/src/app/app.component.ts"}},{"name":"app.config.ts","path":"src/app/app.config.ts","sha":"c1fa8d4cf48a891218eeb38fd72dada604badbe8","size":2705,"url":"https://api.github.com/repos/javierFerFer/flox/contents/src/app/app.config.ts?ref=develop","html_url":"https://github.com/javierFerFer/flox/blob/develop/src/app/app.config.ts","git_url":"https://api.github.com/repos/javierFerFer/flox/git/blobs/c1fa8d4cf48a891218eeb38fd72dada604badbe8","download_url":"https://raw.githubusercontent.com/javierFerFer/flox/develop/src/app/app.config.ts","type":"file","_links":{"self":"https://api.github.com/repos/javierFerFer/flox/contents/src/app/app.config.ts?ref=develop","git":"https://api.github.com/repos/javierFerFer/flox/git/blobs/c1fa8d4cf48a891218eeb38fd72dada604badbe8","html":"https://github.com/javierFerFer/flox/blob/develop/src/app/app.config.ts"}},{"name":"app.routes.ts","path":"src/app/app.routes.ts","sha":"172982d2ac535405907c46c89c54b184c368d816","size":5768,"url":"https://api.github.com/repos/javierFerFer/flox/contents/src/app/app.routes.ts?ref=develop","html_url":"https://github.com/javierFerFer/flox/blob/develop/src/app/app.routes.ts","git_url":"https://api.github.com/repos/javierFerFer/flox/git/blobs/172982d2ac535405907c46c89c54b184c368d816","download_url":"https://raw.githubusercontent.com/javierFerFer/flox/develop/src/app/app.routes.ts","type":"file","_links":{"self":"https://api.github.com/repos/javierFerFer/flox/contents/src/app/app.routes.ts?ref=develop","git":"https://api.github.com/repos/javierFerFer/flox/git/blobs/172982d2ac535405907c46c89c54b184c368d816","html":"https://github.com/javierFerFer/flox/blob/develop/src/app/app.routes.ts"}},{"name":"components","path":"src/app/components","sha":"be3a83ab3f0c973c173dba74267900d4ddb5c0ee","size":0,"url":"https://api.github.com/repos/javierFerFer/flox/contents/src/app/components?ref=develop","html_url":"https://github.com/javierFerFer/flox/tree/develop/src/app/components","git_url":"https://api.github.com/repos/javierFerFer/flox/git/trees/be3a83ab3f0c973c173dba74267900d4ddb5c0ee","download_url":null,"type":"dir","_links":{"self":"https://api.github.com/repos/javierFerFer/flox/contents/src/app/components?ref=develop","git":"https://api.github.com/repos/javierFerFer/flox/git/trees/be3a83ab3f0c973c173dba74267900d4ddb5c0ee","html":"https://github.com/javierFerFer/flox/tree/develop/src/app/components"}},{"name":"directives","path":"src/app/directives","sha":"ec8c96a997bc7f9d3f97a9867fef0fa1dc3358e2","size":0,"url":"https://api.github.com/repos/javierFerFer/flox/contents/src/app/directives?ref=develop","html_url":"https://github.com/javierFerFer/flox/tree/develop/src/app/directives","git_url":"https://api.github.com/repos/javierFerFer/flox/git/trees/ec8c96a997bc7f9d3f97a9867fef0fa1dc3358e2","download_url":null,"type":"dir","_links":{"self":"https://api.github.com/repos/javierFerFer/flox/contents/src/app/directives?ref=develop","git":"https://api.github.com/repos/javierFerFer/flox/git/trees/ec8c96a997bc7f9d3f97a9867fef0fa1dc3358e2","html":"https://github.com/javierFerFer/flox/tree/develop/src/app/directives"}},{"name":"guards","path":"src/app/guards","sha":"49476a6ae20a690535e1f08b0dc36e7e7cb9080f","size":0,"url":"https://api.github.com/repos/javierFerFer/flox/contents/src/app/guards?ref=develop","html_url":"https://github.com/javierFerFer/flox/tree/develop/src/app/guards","git_url":"https://api.github.com/repos/javierFerFer/flox/git/trees/49476a6ae20a690535e1f08b0dc36e7e7cb9080f","download_url":null,"type":"dir","_links":{"self":"https://api.github.com/repos/javierFerFer/flox/contents/src/app/guards?ref=develop","git":"https://api.github.com/repos/javierFerFer/flox/git/trees/49476a6ae20a690535e1f08b0dc36e7e7cb9080f","html":"https://github.com/javierFerFer/flox/tree/develop/src/app/guards"}},{"name":"pages","path":"src/app/pages","sha":"e1bc8a72fb428874b3b2ed0eff11ac55c42b1a70","size":0,"url":"https://api.github.com/repos/javierFerFer/flox/contents/src/app/pages?ref=develop","html_url":"https://github.com/javierFerFer/flox/tree/develop/src/app/pages","git_url":"https://api.github.com/repos/javierFerFer/flox/git/trees/e1bc8a72fb428874b3b2ed0eff11ac55c42b1a70","download_url":null,"type":"dir","_links":{"self":"https://api.github.com/repos/javierFerFer/flox/contents/src/app/pages?ref=develop","git":"https://api.github.com/repos/javierFerFer/flox/git/trees/e1bc8a72fb428874b3b2ed0eff11ac55c42b1a70","html":"https://github.com/javierFerFer/flox/tree/develop/src/app/pages"}},{"name":"resolvers","path":"src/app/resolvers","sha":"ef5b63af09e7029e094f3c26f0fa898dad0fe8d8","size":0,"url":"https://api.github.com/repos/javierFerFer/flox/contents/src/app/resolvers?ref=develop","html_url":"https://github.com/javierFerFer/flox/tree/develop/src/app/resolvers","git_url":"https://api.github.com/repos/javierFerFer/flox/git/trees/ef5b63af09e7029e094f3c26f0fa898dad0fe8d8","download_url":null,"type":"dir","_links":{"self":"https://api.github.com/repos/javierFerFer/flox/contents/src/app/resolvers?ref=develop","git":"https://api.github.com/repos/javierFerFer/flox/git/trees/ef5b63af09e7029e094f3c26f0fa898dad0fe8d8","html":"https://github.com/javierFerFer/flox/tree/develop/src/app/resolvers"}},{"name":"services","path":"src/app/services","sha":"5c23c46dfa16c921aa2f9fe87c1a2c8e5b2203c2","size":0,"url":"https://api.github.com/repos/javierFerFer/flox/contents/src/app/services?ref=develop","html_url":"https://github.com/javierFerFer/flox/tree/develop/src/app/services","git_url":"https://api.github.com/repos/javierFerFer/flox/git/trees/5c23c46dfa16c921aa2f9fe87c1a2c8e5b2203c2","download_url":null,"type":"dir","_links":{"self":"https://api.github.com/repos/javierFerFer/flox/contents/src/app/services?ref=develop","git":"https://api.github.com/repos/javierFerFer/flox/git/trees/5c23c46dfa16c921aa2f9fe87c1a2c8e5b2203c2","html":"https://github.com/javierFerFer/flox/tree/develop/src/app/services"}},{"name":"stores","path":"src/app/stores","sha":"e1e3eee86d6315cefdaa7865eade211f723cbabd","size":0,"url":"https://api.github.com/repos/javierFerFer/flox/contents/src/app/stores?ref=develop","html_url":"https://github.com/javierFerFer/flox/tree/develop/src/app/stores","git_url":"https://api.github.com/repos/javierFerFer/flox/git/trees/e1e3eee86d6315cefdaa7865eade211f723cbabd","download_url":null,"type":"dir","_links":{"self":"https://api.github.com/repos/javierFerFer/flox/contents/src/app/stores?ref=develop","git":"https://api.github.com/repos/javierFerFer/flox/git/trees/e1e3eee86d6315cefdaa7865eade211f723cbabd","html":"https://github.com/javierFerFer/flox/tree/develop/src/app/stores"}},{"name":"tailwind.config.js","path":"src/app/tailwind.config.js","sha":"e7cb52b866d8a9ad05aa02526465a0dd253ef731","size":172,"url":"https://api.github.com/repos/javierFerFer/flox/contents/src/app/tailwind.config.js?ref=develop","html_url":"https://github.com/javierFerFer/flox/blob/develop/src/app/tailwind.config.js","git_url":"https://api.github.com/repos/javierFerFer/flox/git/blobs/e7cb52b866d8a9ad05aa02526465a0dd253ef731","download_url":"https://raw.githubusercontent.com/javierFerFer/flox/develop/src/app/tailwind.config.js","type":"file","_links":{"self":"https://api.github.com/repos/javierFerFer/flox/contents/src/app/tailwind.config.js?ref=develop","git":"https://api.github.com/repos/javierFerFer/flox/git/blobs/e7cb52b866d8a9ad05aa02526465a0dd253ef731","html":"https://github.com/javierFerFer/flox/blob/develop/src/app/tailwind.config.js"}},{"name":"transloco-loader.ts","path":"src/app/transloco-loader.ts","sha":"aa6a084572288c6e2b402dba4c27ad923110c770","size":415,"url":"https://api.github.com/repos/javierFerFer/flox/contents/src/app/transloco-loader.ts?ref=develop","html_url":"https://github.com/javierFerFer/flox/blob/develop/src/app/transloco-loader.ts","git_url":"https://api.github.com/repos/javierFerFer/flox/git/blobs/aa6a084572288c6e2b402dba4c27ad923110c770","download_url":"https://raw.githubusercontent.com/javierFerFer/flox/develop/src/app/transloco-loader.ts","type":"file","_links":{"self":"https://api.github.com/repos/javierFerFer/flox/contents/src/app/transloco-loader.ts?ref=develop","git":"https://api.github.com/repos/javierFerFer/flox/git/blobs/aa6a084572288c6e2b402dba4c27ad923110c770","html":"https://github.com/javierFerFer/flox/blob/develop/src/app/transloco-loader.ts"}},{"name":"version.config.ts","path":"src/app/version.config.ts","sha":"1dabd7a0ddf8ed8c93a993d583785d86231a086c","size":181,"url":"https://api.github.com/repos/javierFerFer/flox/contents/src/app/version.config.ts?ref=develop","html_url":"https://github.com/javierFerFer/flox/blob/develop/src/app/version.config.ts","git_url":"https://api.github.com/repos/javierFerFer/flox/git/blobs/1dabd7a0ddf8ed8c93a993d583785d86231a086c","download_url":"https://raw.githubusercontent.com/javierFerFer/flox/develop/src/app/version.config.ts","type":"file","_links":{"self":"https://api.github.com/repos/javierFerFer/flox/contents/src/app/version.config.ts?ref=develop","git":"https://api.github.com/repos/javierFerFer/flox/git/blobs/1dabd7a0ddf8ed8c93a993d583785d86231a086c","html":"https://github.com/javierFerFer/flox/blob/develop/src/app/version.config.ts"}}]
```

**File:** LICENSE (L1-2)
```text
                    GNU GENERAL PUBLIC LICENSE
                       Version 3, 29 June 2007
```
