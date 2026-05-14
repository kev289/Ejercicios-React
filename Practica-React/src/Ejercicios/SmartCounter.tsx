import { useState } from 'react';

const SmartCounter = () => {
  const [count, setCount] = useState<number>(0);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => (prev > 0 ? prev - 1 : 0));
  const reset = () => setCount(0);

  return (
    <div className="exercise-container">
      <h2>1. Contador Inteligente</h2>
      <div className="counter-display">
        <span className={count >= 10 ? 'limit-reached' : ''}>{count}</span>
      </div>
      
      {count >= 10 && (
        <p className="warning-message">
          Has llegado al límite recomendado
        </p>
      )}

      <div className="button-group">
        <button onClick={increment} className="btn btn-primary">
          Incrementar
        </button>
        <button onClick={decrement} className="btn btn-secondary">
          Disminuir
        </button>
        <button onClick={reset} className="btn btn-danger">
          Reiniciar
        </button>
      </div>
    </div>
  );
};

export default SmartCounter;
