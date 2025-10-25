import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { MenuItem } from 'primeng/api';
import { UserConfigModalResolver } from './resolvers/user-config-modal.resolver';
import { InitGuard } from './guards/init.guard';
import { UserClassesResolver } from './resolvers/user-classes.resolver';
import { ClassIdResolver } from './resolvers/class-id.resolver';
import { ExistClassGuard } from './guards/exist-class.guard';

export const NAVIGATION_ELEMENTS: MenuItem[] = [
  {
    label: 'NAVIGATION.CLASSES.LABEL',
    icon: 'pi pi-users',
    routerLink: '/dashboard/records',
  },
];

const MODAL_SHARED_ROUTES: Routes = [
  {
    path: 'user-config',
    loadComponent: () =>
      import('./components/modal-wrapper/modal-wrapper.component').then(
        (m) => m.ModalWrapperComponent,
      ),
    resolve: [UserConfigModalResolver],
    data: {
      modalTitleKey: 'SHARED_MODALS.USER_CONFIG.TITLE',
      modalComponentPromise: import(
        '../app/pages/modals/user-config/user-config.component'
      ).then((m) => m.UserConfigModalComponent),
    },
    outlet: 'modal',
  },
];

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    canActivate: [InitGuard],
    data: {
      redirectTo: 'dashboard',
    },
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    resolve: [UserConfigModalResolver],
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

  {
    path: '**',
    redirectTo: '/login',
    pathMatch: 'full',
  },
];
