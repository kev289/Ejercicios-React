import React, { createContext, useContext, useState } from "react";
// 1. Definimos el tipo de datos del contexto
type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// 2. Creamos el Contexto
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 3. Creamos el Proveedor del Contexto (Provider)
// Este componente envolverá a los demás para darles acceso al tema.
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

// 4. Hook personalizado para usar el contexto de forma fácil
const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme debe usarse dentro de un ThemeProvider");
  return context;
};

// --- COMPONENTES QUE CONSUMEN EL CONTEXTO ---

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

// Componente principal del ejercicio
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
