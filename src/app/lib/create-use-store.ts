import { Store } from 'unistore'
import { useState, useEffect } from 'preact/hooks'

type Arguments<F extends Function> = F extends (...args: infer A) => any
  ? A
  : never

const extract = (state: any, key: any) => {
  if (!key) return state

  if (Array.isArray(key)) {
    return key.reduce((acc, k) => {
      acc[k] = state[k]
      return acc
    }, {})
  }

  return state[key]
}

type UseStore<K> = {
  <T extends keyof K>(key: T): K[T]
  <T extends Array<keyof K>>(key: T): Pick<K, T[number]>
  (key?: undefined): K
}

export const createUseStore = <K>(store: Store<K>) => {
  const useStore: UseStore<K> = <T>(key: T) => {
    const [state, set] = useState(extract(store.getState(), key))

    useEffect(
      () =>
        store.subscribe(() => {
          set(extract(store.getState(), key))
        }),
      []
    )

    return state
  }

  return {
    useStore,
  }
}
