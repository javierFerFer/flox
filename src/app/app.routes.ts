import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { CanActivateCalendarUserInfoEditGuard } from './guards/can-activate-calendar-user-info-edit.guard';
import { CanActivateCalendarUserInfoGuard } from './guards/can-activate-calendar-user-info.guard';
import { ExistClassGuard } from './guards/exist-class.guard';
import { InitGuard } from './guards/init.guard';
import { CalendarGlobalConfigResolver } from './resolvers/calendar-global-config.resolver';
import { CalendarUserConfigResolver } from './resolvers/calendar-user-config.resolver';
import { CalendarResolver } from './resolvers/calendar.resolver';
import { ClassIdResolver } from './resolvers/class-id.resolver';
import { DashBoardResolver } from './resolvers/dashboard.resolver';
import { UserClassesResolver } from './resolvers/user-classes.resolver';
import { UserConfigModalResolver } from './resolvers/user-config-modal.resolver';

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
      maximize: false,
      modalComponentPromise: () =>
        import('../app/pages/modals/user-config/user-config.component').then(
          (m) => m.UserConfigModalComponent,
        ),
      helperComponentPromise: () =>
        import(
          '../app/pages/modals/user-config/components/user-config-navbar/user-config-navbar.component'
        ).then((m) => m.UserConfigNavbarComponent),
      contentStyleClass: '![padding:0]',
    },
    children: [
      {
        path: '',
        redirectTo: 'preferences',
        pathMatch: 'full',
        outlet: 'user-config-outlet',
      },
      {
        path: 'preferences',
        outlet: 'user-config-outlet',
        loadComponent: () =>
          import(
            '../app/pages/modals/user-config/components/user-preferences/user-preferences.component'
          ).then((m) => m.UserPreferencesComponent),
      },
      {
        path: 'calendar-preferences',
        outlet: 'user-config-outlet',
        loadComponent: () =>
          import(
            '../app/pages/modals/user-config/components/calendar-preferences/calendar-preferences.component'
          ).then((m) => m.CalendarPreferencesComponent),
        children: [
          {
            path: 'calendar-user-config',
            resolve: [
              CalendarGlobalConfigResolver,
              CalendarUserConfigResolver,
              CalendarResolver,
            ],
            canActivate: [CanActivateCalendarUserInfoEditGuard],
            loadComponent: () =>
              import('./components/modal-wrapper/modal-wrapper.component').then(
                (m) => m.ModalWrapperComponent,
              ),
            data: {
              modalTitleKey:
                'DASHBOARD.RECORDS.MODALS.NEW_CALENDAR_SCHEDULE.TITLE',
              modalComponentPromise: () =>
                import(
                  '../app/pages/modals/user-config/components/user-calendar-info-edit/user-calendar-info-edit.component'
                ).then((m) => m.UserCalendarInfoEditComponent),
            },
            outlet: 'calendar-preferences-outlet',
          },
        ],
      },
    ],
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
              modalComponentPromise: () =>
                import(
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
                  modalComponentPromise: () =>
                    import(
                      './pages/modals/create-new-unit/create-new-unit.component'
                    ).then((m) => m.CreateNewUnitModalComponent),
                },
                outlet: 'createUnit',
              },
              {
                path: 'unit-details',
                outlet: 'unitDetails',
                children: [
                  {
                    path: 'edit/:id',
                    loadComponent: () =>
                      import(
                        './components/modal-wrapper/modal-wrapper.component'
                      ).then((m) => m.ModalWrapperComponent),
                    data: {
                      modalTitleKey:
                        'DASHBOARD.RECORDS.MODALS.UNIT_DETAILS.TITLE',
                      modalComponentPromise: () =>
                        import(
                          './pages/modals/unit-details/components/unit-edit/units-edit.component'
                        ).then((m) => m.UnitsEditComponent),
                    },
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
                          modalComponentPromise: () =>
                            import(
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
                          modalComponentPromise: () =>
                            import(
                              '../app/pages/modals/session-detail/session-detail.component'
                            ).then((m) => m.SessionDetailModalComponent),
                        },
                        outlet: 'sessionDetails',
                      },
                    ],
                  },
                  {
                    path: 'show/:id',
                    loadComponent: () =>
                      import(
                        './components/modal-wrapper/modal-wrapper.component'
                      ).then((m) => m.ModalWrapperComponent),
                    data: {
                      modalTitleKey:
                        'DASHBOARD.RECORDS.MODALS.UNIT_DETAILS.TITLE',
                      autoMaximize: true,
                      modalComponentPromise: () =>
                        import(
                          './pages/modals/unit-details/components/unit-show/units-show.component'
                        ).then((m) => m.UnitsShowComponent),
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: 'calendar',
        resolve: [
          CalendarGlobalConfigResolver,
          CalendarUserConfigResolver,
          CalendarResolver,
        ],
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
        loadComponent: () =>
          import(
            './pages/dashboard/sub-pages/calendar/calendar.component'
          ).then((m) => m.CalendarComponent),
        children: [
          {
            path: 'calendar-user-config',
            canActivate: [CanActivateCalendarUserInfoGuard],
            loadComponent: () =>
              import('./components/modal-wrapper/modal-wrapper.component').then(
                (m) => m.ModalWrapperComponent,
              ),
            data: {
              modalTitleKey:
                'DASHBOARD.RECORDS.MODALS.NEW_CALENDAR_SCHEDULE.TITLE',
              modalClosable: false,
              modalComponentPromise: () =>
                import(
                  '../app/pages/modals/user-calendar-info/user-calendar-info.component'
                ).then((m) => m.UserCalendarInfoModalComponent),
            },
            outlet: 'calendarUserConfig',
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
