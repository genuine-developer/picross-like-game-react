import { useCallback, useState } from 'react'

type useLocalStorageType<T> = [T, (value: T | ((state: T) => T)) => void, () => void]

export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): useLocalStorageType<T> => {
  const [value, setValue] = useState<T>(
    (): T => {
      try {
        const value = localStorage.getItem(key)
        return value ? JSON.parse(value) : initialValue
      } catch (error) {
        console.error(error)
        return initialValue
      }
    }
  )

  const setStoredValue = useCallback<(value: T | ((state: T) => T)) => void>(
    (value) => {
      setValue(value)
      try {
        localStorage.setItem(key, JSON.stringify(value))
      } catch (error) {
        console.error(error)
      }
    },
    [key]
  )

  const cleanStorage = useCallback<() => void>(() => {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error(error)
    }
  }, [key])

  return [value, setStoredValue, cleanStorage]
}
