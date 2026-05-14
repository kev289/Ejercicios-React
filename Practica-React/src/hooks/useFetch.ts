import { useState, useEffect } from "react";

export const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url, { signal: controller.signal });
        
        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }

        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          setError(err.message || "Ocurrió un error");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, [url]); 

  return { data, loading, error };
};
