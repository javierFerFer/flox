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
  FIREBASE_USER_CONFIG,
  UserTheme,
} from '../../resolvers/user-config-modal.resolver';

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
      appLanguage: '',
      photo: '',
      username: '',
      toggleTheme: DEFAULT_THEME,
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
          userConfig: state.user.userConfig,
        },
      }));
    },
    updateUserConfig(userConfig: FIREBASE_USER_CONFIG): void {
      patchState(store, (state) => ({
        ...state,
        user: {
          ...state.user,
          userConfig: {
            ...userConfig,
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
      });

      effect(() => {
        const user = store.user();
        store._updateUserIntoLocalStorage(user);
      });
    },
  }),
);
