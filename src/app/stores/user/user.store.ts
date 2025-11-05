import { computed, effect, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { UserModel } from './user.model';
import {
  FirebaseUserConfig,
  UserTheme,
} from '../../resolvers/user-config-modal.resolver';
import { DEFAULT_LANGUAGE } from '../../app.config';
import { TranslocoService } from '@jsverse/transloco';

export const DEFAULT_THEME: UserTheme = 'light';
export enum themesEnum {
  LIGHT = 'light',
  DARK = 'dark',
}

type UserState = {
  user: UserModel;
  isLoading: boolean;
};

const initialState: UserState = {
  user: {
    email: '',
    uid: '',
    userConfig: {
      appLanguage: DEFAULT_LANGUAGE,
      toggleTheme: DEFAULT_THEME,
      lastVersionReadIt: undefined,
    },
  },
  isLoading: false,
};

export const UserStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ user }) => ({
    themeAsBoolean: computed(() =>
      user().userConfig?.toggleTheme === DEFAULT_THEME ? true : false,
    ),
  })),
  withMethods((store, localStorageService = inject(LocalStorageService)) => ({
    updateTheme(theme: UserTheme): void {
      patchState(store, (state) => {
        return {
          ...state,
          user: {
            ...state.user,
            userConfig: {
              ...state.user.userConfig,
              toggleTheme: theme,
            },
          },
        };
      });
    },
    updateUser(user: UserModel): void {
      patchState(store, (state) => ({
        ...state,
        user: {
          ...user,
          userConfig: {
            ...state.user.userConfig,
          },
        },
      }));
    },
    updateUserConfig(userConfig: FirebaseUserConfig): void {
      patchState(store, (state) => ({
        ...state,
        user: {
          ...state.user,
          userConfig: {
            ...userConfig,
            appLanguage: userConfig.appLanguage
              ? userConfig.appLanguage
              : localStorageService.getItem<UserModel>('user')?.userConfig
                    ?.appLanguage
                ? localStorageService.getItem<UserModel>('user')?.userConfig
                    ?.appLanguage
                : DEFAULT_LANGUAGE,
            photo: userConfig.photo
              ? userConfig.photo
              : localStorageService.getItem<UserModel>('user')?.userConfig
                  ?.photo, // get from state = get from localStorage due to a free tier firebase
            toggleTheme: userConfig.toggleTheme
              ? userConfig.toggleTheme
              : localStorageService.getItem<UserModel>('user')?.userConfig
                    ?.toggleTheme
                ? localStorageService.getItem<UserModel>('user')?.userConfig
                    ?.toggleTheme
                : DEFAULT_THEME,
          },
        },
      }));
    },
    setIsLoading(isLoading: boolean): void {
      patchState(store, (state) => ({ ...state, isLoading }));
    },
    _updateUserIntoLocalStorage(user: UserModel): void {
      localStorageService.setItem<UserModel>('user', user);
    },
  })),
  withHooks({
    onInit: (store) => {
      const localStorageService = inject(LocalStorageService);
      const translocoService = inject(TranslocoService);

      const storedUser = localStorageService.getItem<UserModel>('user') || {};
      patchState(store, (state) => ({
        ...state,
        user: {
          ...storedUser,
          userConfig: {
            ...storedUser.userConfig,
            toggleTheme: storedUser.userConfig?.toggleTheme
              ? storedUser.userConfig?.toggleTheme
              : DEFAULT_THEME,
          },
        },
      }));

      effect(() => {
        const theme = store.user().userConfig?.toggleTheme;
        const user = store.user();
        const storedUser = localStorageService.getItem<UserModel>('user') || {};
        store._updateUserIntoLocalStorage({
          ...user,
          userConfig: {
            ...user.userConfig,
            toggleTheme: theme
              ? theme
              : storedUser.userConfig?.toggleTheme
                ? storedUser.userConfig?.toggleTheme
                : DEFAULT_THEME,
          },
        });

        // change app language
        translocoService.setActiveLang(
          user.userConfig?.appLanguage || DEFAULT_LANGUAGE,
        );
      });

      effect(() => {
        const user = store.user();
        store._updateUserIntoLocalStorage(user);
      });
    },
  }),
);
