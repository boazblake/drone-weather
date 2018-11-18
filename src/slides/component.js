import m from 'mithril'
import O from 'patchinko/constant'
import { clone, merge } from 'ramda'
import {
  animateEntrance,
  animateExit,
  animateFadeOut,
  animateFadeIn,
} from '../services/animations.js'
import SlidesModal from './slidesModal.js'
import Slide from './Slide/component.js'
import { loadSlides } from './model.js'

import './style.css'

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
    oninit: getSlides,
    view: ({ attrs: { Models } }) => [
      Models.toggleModal
        ? m(SlidesModal, {
            toggleModal: () => (Models.toggleModal = !Models.toggleModal),
            slides: Models.CurrentPresentation.slides,
            slide: clone(Models.SlideModel),
            pId: Models.CurrentPresentation.id,
          })
        : '',
      m(
        'section.section columns is-multiline',
        {
          oncreate: ({ dom }) => animateFadeIn({ dom }),
          onBeforeRemove: (vnode, done) => {
            vnode.dom.addEventListener('animationend', done)
            vnode.dom.style.animation = 'fadeOut 1s'
          },
          style: { overflow: 'scroll', height: '65vh' },
        },
        [
          m(
            '.column is-6',
            {
              oncreate: ({ dom }) => animateFadeIn({ dom }),
              onBeforeRemove: ({ dom }) => animateFadeOut({ dom }),
              style: { overflow: 'scroll', height: '65vh' },
            },
            [
              Models.CurrentPresentation.slides.map(s =>
                m(Slide, {
                  key: s.id,
                  Models,
                  getSlides,
                  s,
                })
              ),
            ]
          ),
        ]
      ),
    ],
  }
}

export default Slides
