import m from 'mithril'
import Task from 'data.task'
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
  const onSuccess = _ => getSlides({ attrs: { Models } })

  const removeSlideTask = s => {
    s.isSelected = false
    updateSlideTask(s.id)(s).fork(onError('updating'), onSuccess)
  }

  return {
    oncreate: ({ dom }) => animateFadeIn({ dom }),
    onBeforeRemove: ({ dom }) => animateExit({ dom }),
    view: () =>
      m(
        'section. box',
        {
          style: {
            'border-color': state.dragging ? '#3498db' : '#95a5a6',
            overflow: 'hidden',
            height: '60vh',
            display: 'inline-block',
            width: '200px',
            height: '200px',
            margin: '12px',
          },
        },
        [
          m(
            'article.article',
            {
              onBeforeRemove: ({ dom }) => animateExit({ dom }),
              style: { position: 'relative', top: 0 },
            },
            [
              m(
                'button.delete delete-preview',
                {
                  style: { 'background-color': '#e74c3c' },
                  onclick: () => removeSlideTask(s),
                },
                m('i.far fa-calendar-times')
              ),
            ]
          ),
          m('article.article', { style: { position: 'relative', top: 0 } }, [
            m.trust(marked(s.contents)),
          ]),
        ]
      ),
  }
}

export default Preview
