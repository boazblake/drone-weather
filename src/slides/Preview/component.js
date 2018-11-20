import m from 'mithril'
import Task from 'data.task'
import {
  traverse,
  concat,
  eqProps,
  clone,
  compose,
  filter,
  lt,
  gt,
  prop,
  map,
  lensProp,
  set,
  subtract,
} from 'ramda'
import { log } from '../../services/index.js'
import {
  animateEntrance,
  animateExit,
  animateFadeIn,
  animateFadeOut,
} from '../../services/animations.js'
import { updateSlideTask } from '../../services/requests.js'
import marked from 'marked'

import './style.css'

const Preview = ({ attrs: { getSlides, Models, s, key, state } }) => {
  const onError = task => error => log(`error with ${task}`)(error)
  const onSuccess = _ => {
    console.log('success', _)
    getSlides({ attrs: { Models } })
  }

  const updateListTask = slide => {
    console.log('slide updatings', slide)
    return updateSlideTask(slide.id)(slide).fork(onError('updating'), onSuccess)
  }

  const removeSlideTask = s => {
    console.log('list', state.right)
    //for any R.s for propEq 'order' is lt to s
    const forGreater = checkSlide => lt(s.order, prop('order', checkSlide))

    const reduceOrder = slide => {
      console.log('slide', slide.order, subtract(prop('order', slide), 1))

      return set(
        lensProp('order', slide),
        subtract(prop('order', slide), 1),
        slide
      )
    }

    const forLess = checkSlide => gt(s.order, prop('order', checkSlide))

    let head = filter(forLess, state.right)

    let tail = compose(map(reduceOrder), filter(forGreater))(state.right)

    s.isSelected = false
    s.order = 0

    state.right = concat(concat(head, tail), [s])

    traverse(Task.of, updateListTask, state.right)
  }

  const handleDragStart = ev => {
    ev.target.style.opacity = '0.4'
    ev.dataTransfer.effectAllowed = 'move'
    ev.dataTransfer.setData('text/plain', 'preview')
    state.previewDrag.drag = s
    console.log('start', ev)
  }

  const handleDragOver = ev => {
    ev.preventDefault()
    state.previewDrag.drop = s
  }

  const handleDragLeave = ev => {
    ev.preventDefault()
    state.previewDrag.drop = null
  }

  const handleDrop = ev => {
    console.log('drop', ev)
    ev.preventDefault()
  }

  const handleDragEnd = ev => {
    console.log('end', ev)
    ev.target.style.opacity = '1'
    state.slideDrag.dragging = false

    let start = state.previewDrag.drag.order
    let end = state.previewDrag.drop.order

    let dragged = clone(state.previewDrag.drag)
    let dropped = clone(state.previewDrag.drop)

    state.previewDrag.drag = Models.SlideModel
    state.previewDrag.drop = Models.SlideModel

    if (!eqProps('id', dragged, dropped)) {
      dragged.order = end
      dropped.order = start

      updateSlideTask(state.previewDrag.drag.id)(state.previewDrag.drag)
        .chain(_ =>
          updateSlideTask(state.previewDrag.drop.id)(state.previewDrag.drop)
        )
        .fork(onError('updating'), onSuccess)
    }
  }

  return {
    oncreate: ({ dom }) => animateFadeIn({ dom }),
    onBeforeRemove: ({ dom }) => animateExit({ dom }),
    view: () =>
      m(
        'section. box',
        {
          draggable: true,
          ondragstart: handleDragStart,
          ondragend: handleDragEnd,
          ondragover: handleDragOver,
          ondrop: handleDrop,
          ondragleave: handleDragLeave,
          style: {
            overflow: 'hidden',
            height: '60vh',
            display: 'inline-block',
            width: '200px',
            height: '200px',
            margin: '12px',
            opacity:
              state.previewDrag.drop && state.previewDrag.drop.id == s.id
                ? 0.4
                : 1,
          },
        },
        [
          m(
            'article.article',
            {
              onBeforeRemove: ({ dom }) => animateExit({ dom }),
              style: { position: 'relative', top: 0, 'z-index': 1 },
            },
            [
              m(
                'a.button remove-preview',
                {
                  'z-index': 1,
                  onclick: () => removeSlideTask(s),
                },
                [
                  m('span.icon is-small', [
                    m('i.fas fa-sign-out-alt', {
                      style: {
                        color: 'white',
                        transform: 'rotate(180deg)',
                      },
                    }),
                  ]),
                ]
              ),
            ]
          ),
          [
            m('span.icon is-small', [
              m('span.fa-stack ', [
                m(
                  'span.fa-stack-1',
                  {
                    style: {
                      position: 'relative',
                      'margin-left': '75px',
                      top: '-50px',
                      color: '#e67e22',
                      'font-size': '6rem',
                      'z-index': 1,
                    },
                  },
                  s.order
                ),
              ]),
            ]),
          ],
          m(
            'article.article',
            { style: { position: 'relative', top: '-155px', 'z-index': 0 } },
            [m.trust(marked(s.contents))]
          ),
        ]
      ),
  }
}

export default Preview
