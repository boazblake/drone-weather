import m from 'mithril'
import { log } from '../../services/index.js'
import { deleteSlideTask, updateSlideTask } from '../../services/requests.js'
import {
  animateEntrance,
  animateExit,
  animateFadeIn,
  animateFadeOut,
} from '../../services/animations.js'

import '../style.css'

const Slide = ({ attrs: { getSlides, Models, s, key, state } }) => {
  const onError = task => error => log(`error with ${task}`)(error)
  const onSuccess = _ => getSlides({ attrs: { Models } })

  const authDeleteTask = id =>
    alert('Are you sure you want to delete?') ? Task.of(id) : Task.rejected(id)

  const removeSlideTask = id =>
    authDeleteTask(id)
      .chain(deleteSlideTask)
      .fork(onError('deleting'), onSuccess)

  const selectSlide = id =>
    updateSlideTask(id)(s).fork(onError('updating'), onSuccess)

  const handleDragStart = ev => {
    ev.target.style.opacity = '0.4'
    state.dragging = true
    state.dragId = s.id
    ev.dataTransfer.effectAllowed = 'move'
  }

  const handleDragEnd = ev => {
    ev.target.style.opacity = '1'
    if (state.droppable) {
      s.isSelected = true
      selectSlide(s.id)
    }
  }

  return {
    oncreate: ({ dom }) => animateFadeIn({ dom }),
    onBeforeRemove: ({ dom }) => animateFadeOut({ dom }),
    view: () =>
      m(
        'section.level box',
        {
          id: s.id,
          draggable: true,
          ondragstart: handleDragStart,
          ondragend: handleDragEnd,
          style: {
            'background-color': s.isSelected ? '#3498db' : '#95a5a6',
          },
        },
        [
          m('div.level-left', [
            m(
              'button.button',
              {
                onclick: () => selectSlide(s.id),
              },
              s.title
            ),
          ]),
          m('div.level-right', [
            m(
              `a.button`,
              {
                onclick: () => m.route.set(`/edit/slide/${s.id}`),
              },
              [m('span.icon is-small', [m('i.fas fa-edit')])]
            ),

            m('button.delete', {
              style: { 'background-color': '#e74c3c' },
              onclick: () => removeSlideTask(s.id),
            }),
          ]),
        ]
      ),
  }
}

export default Slide
