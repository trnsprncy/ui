import { useState } from "react";

export function useMockBrowserCookies() {
  const [cookies, setCookies] = useState<{ [name: string]: any }>({});

  const getCookie = (name: string) => {
    return cookies[name];
  };

  const setCookie = (name: string, value: any, options: any = {}) => {
    let cookie = {
      name,
      value,
      ...options,
    };
    setCookies({
      ...cookies,
      [name]: cookie,
    });
  };

  const removeCookie = (name: string) => {
    let updatedCookies = { ...cookies };
    if (name in updatedCookies) {
      delete updatedCookies[name];
    }
    setCookies(updatedCookies);
  };

  return {
    getCookie,
    setCookie,
    removeCookie,
  };
}
