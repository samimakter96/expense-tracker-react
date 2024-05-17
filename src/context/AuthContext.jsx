import { createContext, useContext, useState } from 'react';

const AuthContext = createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const initialToken = localStorage.getItem('token');
  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem('token', token);
  };

  const logOutHandler = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logOutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// custom hooks
export const useAuth = () => {
  return useContext(AuthContext);
};
