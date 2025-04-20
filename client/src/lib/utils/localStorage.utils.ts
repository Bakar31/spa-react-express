import { IUser } from "@/types/auth.types";
import { StorageKeys } from "../enums/storage-keys.enum";

export const getStoredToken = (): string | null => {
  return localStorage.getItem(StorageKeys.TOKEN);
};

export const setStoredToken = (token: string): void => {
  localStorage.setItem(StorageKeys.TOKEN, token);
};

export const removeStoredToken = (): void => {
  localStorage.removeItem(StorageKeys.TOKEN);
};

export const getStoredUser = (): IUser | null => {
  const userStr = localStorage.getItem(StorageKeys.USER);
  return userStr ? JSON.parse(userStr) : null;
};

export const setStoredUser = (user: IUser): void => {
  localStorage.setItem(StorageKeys.USER, JSON.stringify(user));
};

export const removeStoredUser = (): void => {
  localStorage.removeItem(StorageKeys.USER);
};

export const clearAuthStorage = (): void => {
  removeStoredToken();
  removeStoredUser();
};
