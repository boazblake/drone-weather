import m from 'mithril'
import { toPresentationDtoTask } from './model.js'
import { log } from '../services/index.js'

const PresentationModal = ({ attrs }) => {
  console.log('pmopd', attrs)
  const state = {
    errors: '',
    title: '',
  }
  const onError = errors => {
    log('error')(errors)
    state.errors = errors
  }
  const onSuccess = presentation => {
    attrs.presentations.push(presentation)
    attrs.toggleModal()
  }

  const save = e => {
    e.preventDefault()
    toPresentationDtoTask(state.title)(attrs.presentationModel).fork(
      onError,
      onSuccess
    )
  }

  return {
    view: () =>
      m('article.modal', [
        m('.modal-background'),
        m('.modal-content', [
          m('fieldset.fieldset', [
            m('legend.legend', 'Add a Presentation'),
            m('label.label', 'Presentation Name'),
            m('input.input', {
              type: 'text',
              onchange: m.withAttr('value', v => (state.title = v)),
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
