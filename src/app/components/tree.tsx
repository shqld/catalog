import { h } from 'preact'
import { useStore } from '../lib/store'
import cx from 'classnames'
import { PieceMap } from '../../lib/piece'

const ListItem = ({ href, name }: { href: string; name: string }) => (
  <li>
    <a href={href} class={cx(useStore('locationHash') === href && 'is-active')}>
      {name}
    </a>
  </li>
)

const parsePieceMap = (obj: PieceMap, paths: Array<string> = []) => {
  return Object.keys(obj).map(key => {
    const item = obj[key]

    if (item.path) {
      return <ListItem href={'#' + [...paths, key].join('|')} name={key} />
    } else {
      return (
        <li>
          {key}
          <ul>{parsePieceMap(item as PieceMap, paths.concat(key))}</ul>
        </li>
      )
    }
  })
}

const SideBar = () => {
  const { pieces } = window

  const showSideBar = useStore('showSideBar')

  return (
    <aside
      class="menu section is-2 is-fullheight is-hidden-mobile"
      style={{
        backgroundColor: '#7aa5d2',
        minWidth: '250px',
        overflow: 'scroll',
      }}
      hidden={!showSideBar}
      aria-hidden={!showSideBar}
    >
      <a href="/">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          viewBox="100 100 300 300"
          style="background-color: white;"
        >
          <path
            d="M165 165l0 170l170 0l0 -170l-170 0zm-5 -5l180 0l0 180l-180 0l0 -180z"
            fill="#7aa5d2"
            fill-rule="nonzero"
          />
        </svg>
      </a>
      <p class="menu-label">Pieces</p>
      <ul class="menu-list">{parsePieceMap(pieces)}</ul>
    </aside>
  )
}

export default SideBar
