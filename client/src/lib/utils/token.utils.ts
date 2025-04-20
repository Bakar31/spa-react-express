import { jwtDecode } from "jwt-decode";

interface IDecodedToken {
  exp?: number;
}

export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded: IDecodedToken = jwtDecode(token);
    return decoded.exp ? decoded.exp < Date.now() / 1000 : false;
  } catch {
    return true;
  }
};
