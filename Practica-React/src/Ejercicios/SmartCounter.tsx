import { useState } from 'react';

const SmartCounter = () => {
  const [count, setCount] = useState<number>(0);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => (prev > 0 ? prev - 1 : 0));
  const reset = () => setCount(0);

  return (
    <div>
      <h2>Contador Inteligente</h2>
      <div>
        <span className={count >= 10 ? 'limit-reached' : ''}>{count}</span>
      </div>
      
      {count >= 10 && (
        <p>
          Has llegado al límite recomendado
        </p>
      )}

      <div>
        <button onClick={increment}>
          Incrementar
        </button>
        <button onClick={decrement}>
          Disminuir
        </button>
        <button onClick={reset}>
          Reiniciar
        </button>
      </div>
    </div>
  );
};

export default SmartCounter;
