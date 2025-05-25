import { TestBed } from '@angular/core/testing';
import { UserStore } from './user.store';

describe('[userStore]', () => {
  it('should verify that the default theme is light or dark', () => {
    const userStore = TestBed.inject(UserStore);
    expect(['light', 'dark']).toContain(userStore.theme());
  });

  it('should verify that the default user value is empty', () => {
    const userStore = TestBed.inject(UserStore);
    expect(userStore.user().username).toEqual('');
  });

  it('should verify that the theme can be updated', () => {
    const userStore = TestBed.inject(UserStore);
    userStore.updateTheme('dark');
    expect(userStore.theme()).toEqual('dark');
  });

  it('should verify that the user can be updated', () => {
    const userStore = TestBed.inject(UserStore);
    userStore.updateUser({ username: 'testUser' });
    expect(userStore.user().username).toEqual('testUser');
  });
});
