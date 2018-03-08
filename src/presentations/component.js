import { log } from '../services/index.js'
import m from 'mithril'
import O from 'patchinko/constant'
import { clone } from 'ramda'
import { animateEntrance, animateExit } from '../services/animations.js'
import { getPresentationsTask } from './model.js'
import PresentationModal from './presentationModal.js'
import Presentation from './Presentation/component.js'

const Presentations = ({ attrs: { Models } }) => {
  const state = {
    errors: '',
  }

  const onError = error => {
    log('error')(error)
    state.error = error
  }

  const onSuccess = dto => {
    Models.Presentations = dto
  }

  const findPresentations = ({ attrs: { Models } }) =>
    getPresentationsTask().fork(onError, onSuccess)

  return {
    oncreate: findPresentations,
    view: ({ attrs: { Models } }) =>
      m('.article', [
        Models.toggleModal
          ? m(PresentationModal, {
              toggleModal: () => (Models.toggleModal = !Models.toggleModal),
              presentations: Models.Presentations,
              presentationModel: clone(Models.PresentationModel),
            })
          : '',
        m('section.section columns is-multiline', [
          m('.column is-6', { style: { overflow: 'scroll', height: '65vh' } }, [
            Models.Presentations.map(({ title, id }) =>
              m(Presentation, {
                key: id,
                id,
                title,
                Models,
                findPresentations,
                oncreate: ({ dom }) => animateEntrance(dom),
                onBeforeRemove: ({ dom }) => animateExit(dom),
              })
            ),
          ]),
        ]),
      ]),
  }
}

export default Presentations
