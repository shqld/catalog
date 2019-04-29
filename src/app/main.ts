import { registerEvents } from './lib/events'
import { renderApp } from './app'

const main = async () => {
  registerEvents()
  renderApp()
}

document.addEventListener('DOMContentLoaded', main)
