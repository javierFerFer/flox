import { Injectable } from '@angular/core';

// DONT USE IT AS A SERVICE IN COMPONENTS, USE IT IN STORES OR OTHER SERVICES
// This service is designed to handle localStorage operations with JSON serialization.
// It is not intended to be used directly in components, but rather in stores or other services.
// This is to ensure a clean separation of concerns and to avoid direct dependencies on localStorage in components.
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  getItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    if (item) {
      try {
        return JSON.parse(item) as T;
      } catch (e) {
        console.error(`Error parsing localStorage item "${key}":`, e);
        return null;
      }
    }
    return null;
  }
  setItem<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`Error setting localStorage item "${key}":`, e);
    }
  }
}
