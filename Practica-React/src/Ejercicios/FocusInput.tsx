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
    <div className="exercise-container">
      <h2>9. Foco Automático (useRef)</h2>

      <div className="form-group">
        <label>Escribe algo:</label>
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="El foco aparecerá aquí..."
        />
      </div>

      <button onClick={handleFocus} className="btn btn-primary" style={{ marginBottom: '10px' }}>
        Enfocar buscador
      </button>

      <div style={{ marginTop: '10px', padding: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
        <p>Texto escrito: <strong>{text || "(vacío)"}</strong></p>
      </div>
    </div>
  );
};

export default FocusInput;
