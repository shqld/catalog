import { h, hydrate, Fragment } from 'preact'
import { useEffect } from 'preact/hooks'
import Menu from './components/tree'
import { handleKeyEvents } from './lib/events'

const PieceContainer = () => {
  useEffect(() => {
    const el = document.getElementById('mirror-container')! as HTMLIFrameElement
    handleKeyEvents(el.contentWindow!)
  }, [])

  return <iframe id="mirror-container" src="/inner.html" />
}

const App = () => (
  <Fragment>
    <Menu />
    <PieceContainer />
  </Fragment>
)

export const renderApp = () => {
  const menuContainer = document.getElementById('mirror-app')!
  hydrate(<App />, menuContainer)
}
