import { useEffect, useState } from 'react'

export function useCases() {
  const [cases, setCases] = useState([])

  useEffect(() => {
    fetch('http://localhost:4010/api/cases')
      .then(response => response.json())
      .then(data => setCases(data))
      .catch(() => setCases([]))
  }, [])

  return cases
}
