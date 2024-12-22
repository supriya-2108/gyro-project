import React, { createContext, useState, useContext } from "react";

// Create a context with a default value (could be null or an object with default state)
const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Example of state you want to manage globally
  const [theme, setTheme] = useState("light"); // Example of theme state

  // Method to update user data
  const login = (userData) => {
    setUser(userData);
  };

  // Method to change theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <AppContext.Provider value={{ user, theme, login, toggleTheme, setUser }}>
      {children}
    </AppContext.Provider>
  );
};

// Create a custom hook to use the context
export const useAppContext = () => {
  return useContext(AppContext);
};
