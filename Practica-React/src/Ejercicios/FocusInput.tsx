import { useState, useEffect, useRef } from "react";

const FocusInput = () => {
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  return (
    <div>
      <h2>Foco Automático</h2>

      <div>
        <label>Escribe algo:</label>
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="El foco aparecerá aquí..."
        />
      </div>

      <button onClick={handleFocus}>
        Enfocar buscador
      </button>

      <div>
        <p>Texto escrito: <strong>{text || "(vacío)"}</strong></p>
      </div>
    </div>
  );
};

export default FocusInput;
