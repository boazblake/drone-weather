import m from 'mithril'
import Task from 'data.task'
import {
  traverse,
  concat,
  eqProps,
  clone,
  compose,
  filter,
  map,
  prop,
  reverse,
} from 'ramda'
import { log } from '../../services/index.js'
import {
  animateEntrance,
  animateExit,
  animateFadeIn,
  animateFadeOut,
} from '../../services/animations.js'
import { forLess, forGreater, reduceOrder, updateRemoveSlide } from './model.js'
import { updateSlideTask } from '../../services/requests.js'
import marked from 'marked'

import './style.css'

const Preview = ({ attrs: { getSlides, Models, s, key, state } }) => {
  const onError = task => error => log(`error with ${task}`)(error)
  const onSuccess = _ => getSlides({ attrs: { Models } })

  const updateAndSaveSlideTask = slide =>
    updateSlideTask(prop('id', slide))(slide).fork(
      onError('updating'),
      onSuccess
    )

  const removeSlideTask = s => {
    let head = filter(forLess(s), state.right())
    let tail = compose(map(reduceOrder), filter(forGreater(s)))(state.right())
    let removeSlide = updateRemoveSlide(s)

    let updateList = concat(removeSlide, tail)

    return traverse(Task.of, updateAndSaveSlideTask, updateList)
  }

  const handleDragStart = ev => {
    ev.target.style.opacity = '0.4'
    ev.dataTransfer.effectAllowed = 'move'
    ev.dataTransfer.setData('text/plain', 'preview')
    s.isSelected = true //some reason s.isSelected is still false at this point
    state.previewDrag.drag = s
  }

  const handleDragOver = ev => {
    ev.preventDefault()
    if (state.previewDrag.drag) state.previewDrag.drop = s
  }

  const handleDragLeave = ev => {
    ev.preventDefault()
    state.previewDrag.drop = null
  }

  const handleDrop = ev => ev.preventDefault()

  const handleDragEnd = ev => {
    ev.target.style.opacity = '1'
    state.slideDrag.dragging = false
    if (state.previewDrag.drop) {
      let start = state.previewDrag.drag.order
      let end = state.previewDrag.drop.order

      let dragged = state.previewDrag.drag
      let dropped = state.previewDrag.drop

      state.previewDrag.drag = Models.SlideModel
      state.previewDrag.drop = Models.SlideModel

      if (!eqProps('id', dragged, dropped)) {
        dragged.order = end
        dropped.order = start
        updateSlideTask(dragged.id)(dragged)
          .chain(_ => updateSlideTask(dropped.id)(dropped))
          .fork(onError('updating'), onSuccess)
      }
    }
  }

  return {
    oncreate: ({ dom }) => animateFadeIn({ dom }),
    onBeforeRemove: ({ dom }) => animateExit({ dom }),
    view: () =>
      m(
        'section.box',
        {
          draggable: true,
          ondragstart: handleDragStart,
          ondragend: handleDragEnd,
          ondragover: handleDragOver,
          ondrop: handleDrop,
          ondragleave: handleDragLeave,
          style: {
            overflow: 'hidden',
            display: 'inline-block',
            width: '200px',
            height: '200px',
            margin: '12px',
            // opacity:
            //   state.previewDrag.drop && state.previewDrag.drop.id == s.id
            //     ? 0.4
            //     : 1,
          },
        },
        [
          m(
            'article.article',
            {
              onBeforeRemove: ({ dom }) => animateExit({ dom }),
              style: {
                position: 'relative',
                top: 0,
                'z-index': 1,
              },
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
