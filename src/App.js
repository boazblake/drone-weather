import m from 'mithril'
import Stream from 'mithril-stream'

import Presentations from './presentations/component.js'
import Slides from './slides/component.js'
import Editor from './editor/component.js'
import Layout from './layout/component.js'
import SlideShow from './slideshow/component.js'
import { getPresentationsTask } from './presentations/model.js'
import { log } from './services/index.js'

const makeRoutes = mdl => {
  let model = Stream(mdl)
  return {
    '/presentations': {
      view: () => m(Layout, model(), m(Presentations, model())),
    },
    '/presentation/:id/slides': {
      view: () => m(Layout, model(), m(Slides, model())),
    },
    '/edit/slide/:id': {
      view: () => m(Layout, model(), m(Editor, model())),
    },
    '/slideshow/:id': {
      view: () => m(Layout, model(), m(SlideShow, model())),
    },
  }
}

export const App = ({ attrs: model }) => {
  const state = {
    errors: '',
  }

  const onError = error => {
    log('error')(error)
    state.error = error
  }

  const onSuccess = Models => dto => (Models.Presentations = dto)

  const findPresentations = ({ attrs: { Models } }) =>
    getPresentationsTask().fork(onError, onSuccess(Models))

  return {
    oninit: findPresentations,
    oncreate: ({ dom }) => {
      const mainStage = dom.querySelector('.main-stage')

      m.route(mainStage, '/presentations', makeRoutes(model))
    },
    view: ({ children }) => {
      return m('.App', [m('.main-stage', children)])
    },
  }
}

export default App
