import { store } from './store'

export const handleKeyEvents = (frame: Window) => {
  frame.addEventListener('keydown', ({ key }) => {
    switch (key) {
      case 'a':
        return store.setState({ showSideBar: !store.getState().showSideBar })

      default:
    }
  })
}

export const registerEvents = () => {
  handleKeyEvents(window)

  window.addEventListener('hashchange', () => {
    store.setState({ locationHash: window.location.hash })
  })
}
