import createStore from 'unistore'
import { createUseStore } from './create-use-store'

const defaultState = {
  showSideBar: true,
  locationHash: window.location.hash,
}

export const store = createStore(defaultState)

export const { useStore } = createUseStore(store)
