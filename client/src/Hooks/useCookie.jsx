import { useEffect, useState } from "react";

export const useCookie = () => {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const getCookieValue = (name) => {
      const cookies = document.cookie.split("; ");
      for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split("=");
        if (cookieName === name) {
          return decodeURIComponent(cookieValue);
        }
      }
      return null;
    };

    try {
      const myCookieValue = getCookieValue("jwt");

      if (myCookieValue) {
        setAuth(true);
      } else {
        setAuth(false);
        console.error("Unable to find Auth token");
      }
    } catch (error) {
      console.error("Error while processing cookies:", error);
      setAuth(false);
    }
  }, []);

  return auth;
};
