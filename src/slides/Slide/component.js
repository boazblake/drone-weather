import m from 'mithril'
import { log, makeQuery } from '../../services/index.js'
import {
  animateEntrance,
  animateExit,
  animateFadeIn,
  animateFadeOut,
  animeEntrance,
} from '../../services/animations.js'
import { take, prop } from 'ramda'
import '../style.css'
import {
  updateSlideDragStart,
  updateSlideDragEnd,
  updateStateDragEnd,
  saveSlideToShowTask,
  deleteSlideTask,
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

  const addSlideToShow = s => {
    saveSlideToShowTask(s).fork(onError('updating'), x => {
      state.slideDrag = {
        dragId: '',
        dragging: false,
        droppable: false,
      }
    })
  }

  const handleDragStart = ev => {
    ev.target.style.opacity = '0.4'
    ev.dataTransfer.effectAllowed = 'move'
    ev.dataTransfer.setData('text/plain', 'slide')
    state.slideDrag = updateSlideDragStart(s)(state.slideDrag)
  }

  const handleDragEnd = ev => {
    ev.target.style.opacity = '1'
    if (state.slideDrag.droppable) {
      let _slide = updateSlideDragEnd(state.right().length)(s)

      updateStateDragEnd(state.slideDrag)
      return addSlideToShow(_slide)
    }
  }

  return {
    oncreate: ({ dom }) => animateFadeIn({ dom }),
    onBeforeRemove: ({ dom }) => animateFadeOut({ dom }),
    view: ({ attrs: { getSlides, Models, s, key, state } }) =>
      m(
        'section.level box',
        {
          id: s.id,
          draggable: true,
          ondragstart: handleDragStart,
          ondragend: handleDragEnd,
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
