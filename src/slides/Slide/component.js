import m from 'mithril'
import { log } from '../../services/index.js'
import { deleteSlideTask, updateSlideTask } from '../../services/requests.js'
import {
  animateEntrance,
  animateExit,
  animateFadeIn,
  animateFadeOut,
} from '../../services/animations.js'
import { take, prop } from 'ramda'
import '../style.css'
import {
  updateSlideDragStart,
  updateSlideDragEnd,
  updateStateDragEnd,
} from './model.js'

const Slide = ({ attrs: { getSlides, Models, s, key, state } }) => {
  const onError = task => error => log(`error with ${task}`)(error)
  const onSuccess = _ => getSlides({ attrs: { Models } })

  const authDeleteTask = id =>
    alert('Are you sure you want to delete?') ? Task.of(id) : Task.rejected(id)

  const removeSlideTask = id =>
    authDeleteTask(id)
      .chain(deleteSlideTask)
      .fork(onError('deleting'), onSuccess)

  const addSlideToShow = s =>
    updateSlideTask(prop('id', s))(s).fork(onError('updating'), onSuccess)

  const handleDragStart = ev => {
    ev.target.style.opacity = '0.4'
    ev.dataTransfer.effectAllowed = 'move'
    ev.dataTransfer.setData('text/plain', 'slide')
    state.slideDrag = updateSlideDragStart(s)(state.slideDrag)
  }

  const handleDragEnd = ev => {
    ev.target.style.opacity = '1'
    if (state.slideDrag.droppable) {
      s = updateSlideDragEnd(state.right.length)(s)
      updateStateDragEnd(state.slideDrag)
      return addSlideToShow(s)
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
              'a.button',
              {
                onclick: () => m.route.set(`/edit/slide/${s.id}`),
              },
              [
                m('span', take(15, s.title)),
                m('span.icon is-small', [m('i.fas fa-edit')]),
              ]
            ),
          ]),
          m('div.level-right', [
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
