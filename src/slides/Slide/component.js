import m from 'mithril'
import { log } from '../../services/index.js'
import { deleteSlideTask, updateSlideTask } from '../../services/requests.js'
import {
  animateEntrance,
  animateExit,
  animateFadeIn,
  animateFadeOut,
} from '../../services/animations.js'

const Slide = ({ attrs: { getSlides, Models, s } }) => {
  const onError = task => error => log(`error with ${task}`)(error)
  const onSuccess = _ => {
    console.log('success', Models)
    console.log('s', s)
    getSlides({ attrs: { Models } })
  }

  const authDeleteTask = id =>
    alert('Are you sure you want to delete?') ? Task.of(id) : Task.rejected(id)

  const removeSlideTask = id =>
    authDeleteTask(id)
      .chain(deleteSlideTask)
      .fork(onError('deleting'), onSuccess)

  const selectSlide = id => {
    s.isSelected = !s.isSelected
    updateSlideTask(id)(s).fork(onError('updating'), onSuccess)
  }

  return {
    oncreate: ({ dom }) => animateFadeIn({ dom }),
    onBeforeRemove: ({ dom }) => animateFadeOut({ dom }),
    view: () =>
      m(
        'section.level box',
        {
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
