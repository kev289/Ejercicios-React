import React, { createContext, useContext, useState } from "react";
type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("dark");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div style={{ 
        background: theme === "light" ? "#f9f9f9" : "#1a1a1a", 
        color: theme === "light" ? "#1a1a1a" : "#f9f9f9",
        transition: 'all 0.3s ease',
        minHeight: '200px',
        padding: '20px',
        borderRadius: '16px'
      }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme debe usarse dentro de un ThemeProvider");
  return context;
};

const ThemeButton = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme} className="btn btn-primary">
      Cambiar a tema {theme === "light" ? "Oscuro" : "Claro"}
    </button>
  );
};

const ThemeDisplay = () => {
  const { theme } = useTheme();
  return <p>El tema actual es: <strong>{theme.toUpperCase()}</strong></p>;
};

const ThemeBox = () => {
  const { theme } = useTheme();
  return (
    <div style={{ 
      padding: '10px', 
      border: `2px solid ${theme === "light" ? "#646cff" : "#c084fc"}`, 
      borderRadius: '8px',
      marginTop: '10px'
    }}>
      Soy un componente afectado por el tema global.
    </div>
  );
};

const ThemeContextApp = () => {
  return (
    <div className="exercise-container">
      <h2>11. Context API (Tema Global)</h2>
      <ThemeProvider>
        <ThemeDisplay />
        <ThemeButton />
        <ThemeBox />
      </ThemeProvider>
    </div>
  );
};

export default ThemeContextApp;
