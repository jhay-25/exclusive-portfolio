import { useEffect } from "react";
import "../styles/globals.scss";
import { AuthContextProvider } from "../contexts/AuthContext";
import backendService from "../services/backend.service";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);

      if (user.username === "codingjohn") {
        backendService.setToken(user.token);
      }
    }
  }, []);

  return (
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  );
}

export default MyApp;
