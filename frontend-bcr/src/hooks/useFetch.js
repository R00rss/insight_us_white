import { useEffect, useRef, useState } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const aboutController = new AbortController();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch(url, { signal: aboutController.signal })
      .then((response) => {
        if (response.status !== 200) return null
        return response.json()
      })
      .then(data_received => {
        if (data_received === null) throw new Error("Error fetching data");
        setData(data_received)
      })
      .catch(setError)
      .finally(() => setLoading(false));
    return () => aboutController.abort();
  }, [url]);

  return { data, error, loading, aboutController };
};
