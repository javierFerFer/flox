import { inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState
} from '@ngrx/signals';
import { LocalStorageService } from "../../services/local-storage/local-storage.service";
import { UserModel } from "./user.model";
export type UserTheme = 'light' | 'dark';

type UserState = {
    user: UserModel;
    theme: UserTheme;
}

const initialState: UserState = {
    user: {
        username: ''
    },
    theme: 'light'
}

export const UserStore = signalStore(
  {providedIn: 'root'},
  withState(initialState),
  // withComputed(({ user, theme }) => ({
  //   theme: computed(() => theme),
  //   user: computed(() => user), 
  // })),
  withMethods((store) => ({
    updateTheme(theme: UserTheme): void {
      patchState(store, (state) => ({ ...state, theme }));
    },
    updateUser(user: UserModel): void {
      patchState(store, (state) => ({ ...state, user }));
    },
  })),
  withHooks({
    onInit: (store) => {
        const localStorageService = inject(LocalStorageService);
        const storedTheme = localStorageService.getItem<UserTheme>('theme') || 'light';
        const storedUser = localStorageService.getItem<UserModel>('user') || { username: '' };
        
        patchState(store, (state) => ({
            ...state,
            theme: storedTheme,
            user: storedUser
        }));
    }
  })
);