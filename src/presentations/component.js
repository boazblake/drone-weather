import { log } from '../services/index.js'
import m from 'mithril'
import O from 'patchinko/constant'
import { clone } from 'ramda'
import {
  animateEntrance,
  animateExit,
  animateFadeIn,
  animateFadeOut,
} from '../services/animations.js'
import PresentationModal from './presentationModal.js'
import Presentation from './Presentation/component.js'

import './style.css'

const Presentations = ({ attrs: { Models } }) => {
  return {
    view: ({ attrs: { Models } }) => [
      Models.toggleModal
        ? m(PresentationModal, {
            toggleModal: () => (Models.toggleModal = !Models.toggleModal),
            presentations: Models.Presentations,
            presentationModel: clone(Models.PresentationModel),
          })
        : '',
      m('section.section columns is-multiline', [
        m(
          '.column is-6',
          {
            class: 'presentation',
            oncreate: ({ dom }) => animateFadeIn({ dom }),
            onBeforeRemove: (vnode, done) => {
              vnode.dom.addEventListener('animationend', done)
              vnode.dom.style.animation = 'fadeOut 1s'
            },
            style: { overflow: 'scroll', height: '65vh' },
          },
          [
            Models.Presentations &&
              Models.Presentations.map(({ title, id }) =>
                m(Presentation, {
                  key: id,
                  id,
                  title,
                  Models,
                })
              ),
          ]
        ),
      ]),
    ],
  }
}

export default Presentations
