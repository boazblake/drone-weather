import m from 'mithril'
import Stream from 'mithril-stream'

import Presentations from './presentations/component.js'
import Slides from './slides/component.js'
import Editor from './editor/component.js'
import Layout from './layout/component.js'
import SlideShow from './slideshow/component.js'

const makeRoutes = model => {
  let modelCopy = Stream(model)
  return {
    '/presentations': {
      view: () => m(Layout, { model: modelCopy }, m(Presentations, model)),
    },
    '/presentation/:id/slides': {
      view: () => m(Layout, { model: modelCopy }, m(Slides, model)),
    },
    '/edit/slide/:id': {
      view: () => m(Layout, { model: modelCopy }, m(Editor, model)),
    },
    '/slideshow/:id': {
      view: () => m(Layout, { model: modelCopy }, m(SlideShow, model)),
    },
  }
}

export const App = ({ attrs: model }) => {
  return {
    oncreate: vnode => {
      const mainStage = vnode.dom.querySelector('.main-stage')

      m.route(mainStage, '/presentations', makeRoutes(model))
    },
    view: ({ children }) => {
      return m('.App', [m('.main-stage', children)])
    },
  }
}

export default App
