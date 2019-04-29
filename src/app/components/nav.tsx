import { h } from 'preact'
import { useState } from 'preact/hooks'
import cx from 'classnames'

export default () => {
  const [isActive, setActive] = useState(false)
  const toggle = () => setActive(!isActive)

  return (
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand" style="background:var(--brand-color)">
        <a class="navbar-item" href="/#">
          Mirror
        </a>

        <a
          role="button"
          class={cx('navbar-burger burger', isActive && 'is-active')}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          onClick={toggle}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>
      </div>

      <div
        id="navbarBasicExample"
        class={cx('navbar-menu', isActive && 'is-active')}
      >
        <div class="navbar-start">
          <a class="navbar-item">Home</a>

          <a class="navbar-item">Documentation</a>

          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">More</a>

            <div class="navbar-dropdown">
              <a class="navbar-item">About</a>
              <a class="navbar-item">Jobs</a>
              <a class="navbar-item">Contact</a>
              <hr class="navbar-divider" />
              <a class="navbar-item">Report an issue</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
