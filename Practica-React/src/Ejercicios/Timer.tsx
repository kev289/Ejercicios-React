import { useState, useEffect, useRef } from "react";

const Timer = () => {
  const [seconds, setSeconds] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = window.setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive]); 

  const handleStart = () => setIsActive(true);
  const handlePause = () => setIsActive(false);
  
  const handleReset = () => {
    setIsActive(false);
    setSeconds(0);
  };

  return (
    <div>
      <h2>Temporizador</h2>
      
      <div>
        <span>{seconds}s</span>
      </div>

      <div>
        {!isActive ? (
          <button onClick={handleStart}>
            Iniciar
          </button>
        ) : (
          <button onClick={handlePause}>
            Pausar
          </button>
        )}
        <button onClick={handleReset}>
          Reiniciar
        </button>
      </div>
    </div>
  );
};

export default Timer;
