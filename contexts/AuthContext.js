import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const getLocalStorageData = () => {
      const loggedUserJSON = window.localStorage.getItem("loggedUser");
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON);

        if (user.username === "codingjohn") {
          setLoggedUser(user);
          setIsAuthenticated(true);
        }
      }
    };

    getLocalStorageData();
  }, []);

  return (
    <AuthContext.Provider
      value={{ loggedUser, setLoggedUser, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }

  return context;
};
