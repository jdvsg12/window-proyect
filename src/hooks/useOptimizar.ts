import { useState, useCallback } from 'react'

const LONG_SIZE_PERFIL = 6000

type Perfil = number[]

interface UseMesurePerfilReturn {
  agregarValor: (value: number) => void
  cantidadDePerfiles: Perfil[]
}

export const useMesurePerfil = (): UseMesurePerfilReturn => {
  const [cantidadDePerfiles, setCantidadDePerfiles] = useState<Perfil[]>([])

  const agregarAUnPerfilExistente = useCallback(
    (value: number): boolean => {
      const perfilIndex = cantidadDePerfiles.findIndex(perfil => {
        const perfilSum = perfil.reduce((acc, val) => acc + val, 0)
        return perfilSum + value <= LONG_SIZE_PERFIL
      })

      if (perfilIndex !== -1) {
        const newCantidadDePerfiles = [...cantidadDePerfiles]
        newCantidadDePerfiles[perfilIndex] = [
          ...newCantidadDePerfiles[perfilIndex],
          value
        ]
        setCantidadDePerfiles(newCantidadDePerfiles)
        return true // Se añadió exitosamente a un perfil existente
      }

      return false // No se pudo añadir a ningún perfil existente
    },
    [cantidadDePerfiles]
  )

  const agregarValor = useCallback(
    (currentValue: number) => {
      let currentSum = 0
      let currentPerfil: Perfil = []

      const addOrCreatePerfil = (value: number) => {
        if (!agregarAUnPerfilExistente(value)) {
          if (currentSum + value === LONG_SIZE_PERFIL) {
            currentPerfil.push(value)
            setCantidadDePerfiles(prev => [...prev, currentPerfil])
            currentSum = 0
            currentPerfil = []
          } else if (currentSum + value > LONG_SIZE_PERFIL) {
            if (currentPerfil.length > 0) {
              setCantidadDePerfiles(prev => [...prev, currentPerfil])
            }
            currentPerfil = [value]
            currentSum = value
          } else {
            currentPerfil.push(value)
            currentSum += value
          }
        }
      }

      addOrCreatePerfil(currentValue)

      // Si al final quedan valores en el perfil actual, lo añadimos a cantidadDePerfiles
      if (currentPerfil.length > 0) {
        setCantidadDePerfiles(prev => [...prev, currentPerfil])
      }
    },
    [agregarAUnPerfilExistente]
  )

  return {
    agregarValor,
    cantidadDePerfiles
  }
}
