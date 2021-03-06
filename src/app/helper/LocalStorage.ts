/**
 * Created by pengelkes on 21.12.2016.
 */
export class LocalStorage {
  private static currentUserId = 'currentUserId';
  private static currentEmail = 'currentEmail';
  private static token = 'token';
  private static loggedIn = 'loggedIn';

  static getCurrentUserId() {
    return +localStorage.getItem(LocalStorage.currentUserId)
  }

  static setCurrentUserId(value: string) {
    localStorage.setItem(LocalStorage.currentUserId, value);
  }

  static getCurrentEmail() {
    return localStorage.getItem(LocalStorage.currentEmail);
  }

  static setCurrentEmail(value: string) {
    localStorage.setItem(LocalStorage.currentEmail, value)
  }

  static getToken() {
    return localStorage.getItem(LocalStorage.token);
  }

  static setToken(value: string) {
    localStorage.setItem(LocalStorage.token, value)
  }

  static isLoggedIn() {
    return localStorage.getItem(LocalStorage.loggedIn) === 'true';
  }

  static setLoggedIn(value: boolean) {
    return localStorage.setItem(LocalStorage.loggedIn, String(value));
  }

}
