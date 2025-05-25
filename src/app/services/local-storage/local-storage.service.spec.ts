import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';


describe('[LocalStorageService] - set value', () => {
  it('should verify that put value into localStorage', () => {
    const service = TestBed.inject(LocalStorageService);
    const key = 'testKey';
    const value = { test: 'value' };
    service.setItem(key, value);
    const storedValue = localStorage.getItem(key);
    expect(storedValue).toBeTruthy();
    expect(JSON.parse(storedValue!)).toEqual(value);
  });
});

  describe('[LocalStorageService] - get value', () => {
  it('should verify that get value into localStorage', () => {
    const service = TestBed.inject(LocalStorageService);
    const key = 'testKey';
    const value = { test: 'value' };
    localStorage.setItem(key, JSON.stringify(value));
    const storedValue = service.getItem<{ test: string }>(key);
    expect(storedValue).toBeTruthy();
    expect(storedValue!.test).toEqual(value.test);
  })
});
