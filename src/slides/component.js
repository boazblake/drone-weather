import m from 'mithril'
import {
  clone,
  merge,
  filter,
  propEq,
  prop,
  without,
  concat,
  head,
  sortBy,
} from 'ramda'
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
    slideDrag: {
      dragId: '',
      dragging: false,
      droppable: false,
    },
    previewDrag: {
      drag: null,
      drop: null,
    },
  }

  const onError = error => console.log('error', error)

  const onSuccess = presentation => {
    Models.CurrentPresentation = merge(Models.CurrentPresentation, presentation)

    state.left = filter(
      propEq('isSelected', false),
      Models.CurrentPresentation.slides
    )
    state.right = sortBy(
      prop('order'),
      filter(propEq('isSelected', true), Models.CurrentPresentation.slides)
    )

    console.log(state)
  }

  const getSlides = ({ attrs: { Models } }) => {
    Models.CurrentPresentation.id = m.route.param('id')
    return loadSlides(Models.CurrentPresentation.id)(Models).fork(
      onError,
      onSuccess
    )
  }

  const handleDragEnter = ev => {
    ev.preventDefault()
  }

  const handleDragLeave = ev => {
    ev.preventDefault()
    state.slideDrag.dragging = false
    state.slideDrag.droppable = false
  }

  const handleDrop = ev => {
    ev.preventDefault()
    let type = ev.dataTransfer.getData('text/plain')
    if (state.slideDrag.dragging) {
      if (type == 'slide') {
        let item = head(
          filter(propEq('id', state.slideDrag.dragId), state.left)
        )
        item.order = state.right.length + 1
        state.slideDrag.droppable = true
        state.left = without([item], state.left)
        state.right = concat(state.right, [item])

        console.log('items list length', item, state.right, state.right.length)
      } else {
        let item = head(
          filter(propEq('id', state.slideDrag.dragId), state.right)
        )
      }
    }
  }

  const handleDragOver = ev => {
    ev.preventDefault()
    let type = ev.dataTransfer.getData('text/plain')
    state.slideDrag.dragging = true
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
              border: state.slideDrag.dragging
                ? '1px dashed white'
                : '1px dashed grey',
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
            ondragenter: handleDragEnter,
          },

          state.right.map(s =>
            m(Preview, {
              ondragover: e => {
                e.preventDefault()
                console.log('preview dragged?')
              },
              ondragenter: e => {
                e.preventDefault()
                console.log('preview enterd?')
              },
              key: s.id,
              Models,
              getSlides,
              s,
              state,
            })
          )
        ),
      ]),
    ],
  }
}

export default Slides
