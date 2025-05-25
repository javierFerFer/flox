import { TestBed } from '@angular/core/testing';
import { UserStore } from './user.store';

describe('[userStore] - default theme', () => {
  it('should verify that the default theme is light', () => {
    const userStore = TestBed.inject(UserStore);
    expect(userStore.theme()).toEqual('light');
  });
});


describe('[userStore] - default user values', () => {
  it('should verify that the default user value is empty', () => {
    const userStore = TestBed.inject(UserStore);
    expect(userStore.user().username).toEqual('');
  });
});


describe('[userStore] - update theme', () => {
  it('should verify that the theme can be updated', () => {
    const userStore = TestBed.inject(UserStore);
    userStore.updateTheme('dark');
    expect(userStore.theme()).toEqual('dark');
  });
});

describe('[userStore] - update user', () => {
  it('should verify that the user can be updated', () => {
    const userStore = TestBed.inject(UserStore);
    userStore.updateUser({ username: 'testUser' });
    expect(userStore.user().username).toEqual('testUser');
  });
});