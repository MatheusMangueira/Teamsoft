import {
  useEffect,
  useState
} from 'react';

import axios from 'axios';

export function useAxios(url, options = {}) {
  const [error, setError] = useState(null)
  const [result, setResult] = useState(null)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    axios(url, options)
      .then(async (response) => {
        const data = await response.data
        setResult(data)
      })
      .catch(err => setError(err))
      .finally(() => setLoading(false))
  }, [url])

  return { isLoading, result, error }
}