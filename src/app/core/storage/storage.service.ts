import { Injectable } from '@angular/core';
import { StorageKey } from './storage-key';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {
  }

  /**
   * Set an item into session storage
   * @param key string
   * @param data any
   */
  set(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('error saving to session storage', e);
    }
  }

  /**
   * Get an item from session storage
   * @param key string
   * @param defaultValue any | undefined
   */
  get(key: string, defaultValue?: any | undefined) {
    try {
      const storeValue = localStorage.getItem(key);
      if (storeValue) {
        return JSON.parse(storeValue);
      } else {
        if (defaultValue) {
          return defaultValue;
        }
      }
    } catch (e) {
      console.error('error getting from session storage', e);
      return null;
    }
  }

  /**
   * Get user information from storage
   * @param key string
   */
  getUserInfoByKey(key: string): string | null {
    const user = this.get(StorageKey.LOGGED_USER);
    if (typeof user === 'object' && user.hasOwnProperty(key)) {
      return user[key];
    }
    return null;
  }

  /**
   * Set user information from storage
   * @param key string
   * @param value string
   */
  setUserInfoByKey(key: string, value: string): void {
    const user = this.get(StorageKey.LOGGED_USER);
    user[key] = value;
    this.set(StorageKey.LOGGED_USER, user);
  }

  /**
   * clear all session storage
   */
  clear() {
    localStorage.clear();
  }

  /**
   * remove a key value from session storage
   * @param key string
   */
  remove(key: string) {
    try {
      return localStorage.removeItem(key);
    } catch (e) {
      console.error('error removing from session storage', e);
    }
  }

}
