import m from 'mithril'
import O from 'patchinko/constant'
import { clone, merge } from 'ramda'
import { animateEntrance, animateExit } from '../services/animations.js'
import SlidesModal from './slidesModal.js'
import Slide from './Slide/component.js'
import { loadSlides } from './model.js'

const Slides = ({ attrs: { Models } }) => {
  const onError = error => console.log('error', error)

  const onSuccess = presentation =>
    (Models.CurrentPresentation = merge(
      Models.CurrentPresentation,
      presentation
    ))

  const getSlides = ({ attrs: { Models } }) => {
    Models.CurrentPresentation.id = m.route.param('id')
    return loadSlides(Models.CurrentPresentation.id)(Models).fork(
      onError,
      onSuccess
    )
  }

  return {
    oncreate: getSlides,
    view: ({ attrs: { Models } }) =>
      m('.article', [
        Models.toggleModal
          ? m(SlidesModal, {
              toggleModal: () => (Models.toggleModal = !Models.toggleModal),
              slides: Models.CurrentPresentation.slides,
              slide: clone(Models.SlideModel),
              pId: Models.CurrentPresentation.id,
            })
          : '',

        m('section.section columns is-multiline', [
          m(
            '.column is-6 is-multiline',
            { style: { overflow: 'scroll', height: '65vh' } },
            [
              Models.CurrentPresentation.slides.map(s =>
                m(Slide, {
                  oncreate: ({ dom }) => animateEntrance(dom),
                  onbeforeremove: ({ dom }) => animateExit(dom),
                  key: s.id,
                  Models,
                  getSlides,
                  s,
                })
              ),
            ]
          ),
        ]),
      ]),
  }
}

export default Slides
