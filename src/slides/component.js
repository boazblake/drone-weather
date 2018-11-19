import m from 'mithril'
import { clone, merge, filter, propEq, without, concat } from 'ramda'
import {
  animateEntrance,
  animateExit,
  animateFadeOut,
  animateFadeIn,
} from '../services/animations.js'
import SlidesModal from './slidesModal.js'
import Slide from './Slide/component.js'
import Preview from './Preview/component.js'
import { loadSlides } from './model.js'
import { log } from '../services/index.js'

import './style.css'

const Slides = ({ attrs: { Models } }) => {
  const state = {
    left: [],
    right: [],
    dragId: '',
    dragging: false,
    droppable: false,
  }

  const onError = error => console.log('error', error)

  const onSuccess = presentation => {
    Models.CurrentPresentation = merge(Models.CurrentPresentation, presentation)

    state.left = filter(
      propEq('isSelected', false),
      Models.CurrentPresentation.slides
    )
    state.right = filter(
      propEq('isSelected', true),
      Models.CurrentPresentation.slides
    )
  }

  const getSlides = ({ attrs: { Models } }) => {
    Models.CurrentPresentation.id = m.route.param('id')
    return loadSlides(Models.CurrentPresentation.id)(Models).fork(
      onError,
      onSuccess
    )
  }

  const handleDragLeave = ev => {
    ev.preventDefault()
    state.dragging = false
    state.droppable = false
  }

  const handleDrop = ev => {
    ev.preventDefault()
    if (state.dragging) {
      state.droppable = true
      let item = filter(propEq('id', state.dragId), state.left)
      item.map(i => (i.order = state.right.length + 1))
      console.log('item', item, state.right.length + 1)
      state.left = without(item, state.left)
      state.right = concat(state.right, item)
    }
  }

  const handleDragOver = ev => {
    ev.preventDefault()
    state.dragging = true
    ev.dataTransfer.dropEffect = 'move'
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
      m('section.section', [
        m(
          'section.section columns is-multiline leftDrag',
          {
            oncreate: ({ dom }) => animateFadeIn({ dom }),
            onBeforeRemove: (vnode, done) => {
              vnode.dom.addEventListener('animationend', done)
              vnode.dom.style.animation = 'fadeOut 1s'
            },
            style: {
              overflow: 'scroll',
              height: '80vh',
              width: '25%',
              display: 'inline-block',
            },
          },
          [
            state.left.map(s =>
              m(Slide, {
                key: s.id,
                Models,
                getSlides,
                s,
                state,
              })
            ),
          ]
        ),

        m(
          'section.section columns is-multiline rightDrag',
          {
            oncreate: ({ dom }) => animateFadeIn({ dom }),
            onBeforeRemove: (vnode, done) => {
              vnode.dom.addEventListener('animationend', done)
              vnode.dom.style.animation = 'fadeOut 1s'
            },
            style: {
              border: state.dragging ? '1px dashed white' : '',
              overflow: 'scroll',
              height: '80vh',
              display: 'inline-block',
              width: '70%',
              'padding-top': 0,
              'padding-right': 0,
              'margin-left': '5%',
            },
            ondragleave: handleDragLeave,
            ondrop: handleDrop,
            ondragover: handleDragOver,
          },
          [
            state.right.map(s =>
              m(Preview, {
                key: s.id,
                Models,
                getSlides,
                s,
                state,
              })
            ),
          ]
        ),
      ]),
    ],
  }
}

export default Slides
