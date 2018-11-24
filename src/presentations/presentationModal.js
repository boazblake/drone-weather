import m from 'mithril'
import { savePresentationTask } from './model.js'
import { log } from '../services/index.js'

const PresentationModal = ({ attrs }) => {
  const onError = errors => {
    log('error')(errors)
    attrs.state.errors = errors
    attrs.toggleModal()
  }
  const onSuccess = p => {
    attrs.state.title = ''
    attrs.state.errors = []
    attrs.presentations.push(p)
    attrs.toggleModal()
  }

  const save = e => {
    e.preventDefault()
    savePresentationTask(attrs.state).fork(onError, onSuccess)
  }

  return {
    view: () =>
      m('article.modal is-active', [
        m('.modal-background'),
        m('.modal-content', [
          m('fieldset.fieldset hero', [
            m('legend.legend', 'Add a Presentation'),
            m('label.label', 'Presentation Name'),
            m('input.input', {
              type: 'text',
              onchange: m.withAttr('value', v => (attrs.state.title = v)),
            }),
            m('button.button', { onclick: save }, 'save presentation'),
          ]),
        ]),
        m('button.modal-close is-large', {
          onclick: () => {
            return attrs.toggleModal()
          },
          'aria-label': 'close',
        }),
      ]),
  }
}

export default PresentationModal
