import m from 'mithril'
import Task from 'data.task'
import { log } from '../../services/index.js'
import {
  animateEntrance,
  animateExit,
  animateFadeIn,
  animateFadeOut,
} from '../../services/animations.js'
import marked from 'marked'

import './style.css'

const Preview = ({ attrs: { getSlides, Models, s, key, state } }) => {
  const onError = task => error => log(`error with ${task}`)(error)
  const onSuccess = _ => {
    console.log('success', Models)
    console.log('s', s)
    getSlides({ attrs: { Models } })
  }

  const authDeleteTask = id =>
    alert('Are you sure you want to delete?') ? Task.of(id) : Task.rejected(id)

  const removeSlideTask = id =>
    authDeleteTask(id).fork(onError('deleting'), onSuccess)

  const selectSlide = id => {
    s.isSelected = !s.isSelected
    updateSlideTask(id)(s).fork(onError('updating'), onSuccess)
  }

  return {
    oncreate: ({ dom }) => animateFadeIn({ dom }),
    onBeforeRemove: ({ dom }) => animateFadeOut({ dom }),
    view: () =>
      m(
        'section. box',
        {
          style: {
            'border-color': s.isSelected ? '#3498db' : '#95a5a6',
            overflow: 'hidden',
            height: '60vh',
            display: 'inline-block',
            width: '200px',
            height: '200px',
            margin: '12px',
          },
        },
        [
          m('article.article', { style: { position: 'relative', top: 0 } }, [
            m('button.delete-preview', {
              style: { 'background-color': '#e74c3c' },
              onclick: () => removeSlideTask(s.id),
            }),
          ]),
          m('article.article', { style: { position: 'relative', top: 0 } }, [
            m.trust(marked(s.contents)),
          ]),
        ]
      ),
  }
}

export default Preview
