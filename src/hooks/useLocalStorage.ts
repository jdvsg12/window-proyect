import { useState, useEffect } from 'react'

const useLocalStorage = (key: string, defaultValue: []) => {
  const [value, setValue] = useState(() => {
    try {
      // Intenta obtener el valor de localStorage
      const storedValue = localStorage.getItem(key)
      // Si existe y es un JSON válido, lo parseamos
      if (storedValue) {
        return JSON.parse(storedValue)
      } else {
        // Si no existe, retorna el valor por defecto
        return defaultValue
      }
    } catch (error) {
      console.error('Error parsing local storage value:', error)
      // Si hay un error en el parseo, retorna el valor por defecto
      return defaultValue
    }
  })

  useEffect(() => {
    try {
      // Intenta almacenar el valor en localStorage
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error('Error setting local storage value:', error)
    }
  }, [value, key])

  return [value, setValue]
}

export default useLocalStorage
