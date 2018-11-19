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
    s.order = 0
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
