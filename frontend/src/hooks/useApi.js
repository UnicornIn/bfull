import { useState, useEffect } from 'react';

export function useApiHealth() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch('/api/health')
      .then(r => r.json())
      .then(data => { setStatus(data); setLoading(false); })
      .catch(err => { setError(err.message); setLoading(false); });
  }, []);

  return { status, loading, error };
}
