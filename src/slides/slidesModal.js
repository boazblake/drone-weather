import m from 'mithril'
import { assoc } from 'ramda'
import { saveSlideTask } from './model.js'

const SlidesModal = ({ attrs: { left, pId, slide, toggleModal } }) => {
  const state = {
    errors: '',
    title: '',
  }

  const onError = errors => {
    log('error')(errors)
    state.errors = errors
  }

  const onSuccess = slides => {
    left(slides)
    return toggleModal()
  }

  const save = e => {
    e.preventDefault()
    let dto = assoc('presentation_id', pId, assoc('title', state.title, slide))
    saveSlideTask(dto).fork(onError, onSuccess)
  }

  return {
    view: () =>
      m('.modal is-active', [
        m('.modal-background'),
        m('.modal-content', [
          m('fieldset.fieldset', [
            m('legend.legend', 'Add a Slide'),
            m('label.label', 'Slide title'),
            m('input.input', {
              type: 'text',
              onchange: m.withAttr('value', v => (state.title = v)),
            }),
            m('button.button', { onclick: save }, 'Create Slide'),
          ]),
        ]),
        m('button.modal-close is-large', {
          onclick: () => {
            return toggleModal()
          },
          'aria-label': 'close',
        }),
      ]),
  }
}

export default SlidesModal
