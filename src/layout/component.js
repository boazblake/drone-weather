import m from 'mithril'
import Toolbar from '../Toolbar/component.js'

const Layout = {
  view: ({ children, attrs: Models }) => [m(Toolbar, Models), children],
}

export default Layout
