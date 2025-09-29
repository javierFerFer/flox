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
import { FIREBASE_USER_CONFIG } from '../../resolvers/user-config-modal.resolver';
export type UserTheme = 'light' | 'dark';

type UserState = {
  user: UserModel;
  theme: UserTheme;
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
    },
  },
  theme: 'light',
  isLoading: false,
};

export const UserStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ theme }) => ({
    themeAsBoolean: computed(() => (theme() === 'light' ? true : false)),
  })),
  withMethods((store, localStorageService = inject(LocalStorageService)) => ({
    updateTheme(theme: UserTheme): void {
      patchState(store, (state) => {
        return { ...state, theme };
      });
    },
    updateUser(user: UserModel): void {
      patchState(store, (state) => ({ ...state, user }));
    },
    updateUserConfig(userConfig: FIREBASE_USER_CONFIG): void {
      patchState(store, (state) => ({
        ...state,
        user: {
          ...state.user,
          userConfig,
        },
      }));
    },
    setIsLoading(isLoading: boolean): void {
      patchState(store, (state) => ({ ...state, isLoading }));
    },
    _updateThemeIntoLocalStorage(theme: UserTheme): void {
      localStorageService.setItem<UserTheme>('theme', theme);
    },
    _updateUserIntoLocalStorage(user: UserModel): void {
      localStorageService.setItem<UserModel>('user', user);
    },
  })),
  withHooks({
    onInit: (store) => {
      const localStorageService = inject(LocalStorageService);
      const storedTheme =
        localStorageService.getItem<UserTheme>('theme') || 'light';
      const storedUser = localStorageService.getItem<UserModel>('user') || {};

      patchState(store, (state) => ({
        ...state,
        theme: storedTheme,
        user: storedUser,
      }));

      effect(() => {
        const theme = store.theme();
        store._updateThemeIntoLocalStorage(theme);
      });

      effect(() => {
        const user = store.user();
        store._updateUserIntoLocalStorage(user);
      });
    },
  }),
);
