import m from 'mithril'
import Stream from 'mithril-stream'
import marked from 'marked'
import { pluck } from 'ramda'
import { log } from '../services/index.js'
import {
  animateEntrance,
  animateExit,
  animateFadeOut,
  animateFadeIn,
} from '../services/animations.js'

const SlideShow = ({ attrs: { Models } }) => {
  const state = {
    cursor: 0,
    isFullscreenWidth: 'vh',
    isFullscreenHeight: '%',
    clicks: 0,
    size: Models.CurrentPresentation.slideShow().length,
    contents: pluck('content', Models.CurrentPresentation.slideShow()),
  }

  marked.setOptions({
    baseUrl: null,
    breaks: false,
    gfm: true,
    headerIds: true,
    headerPrefix: '',
    highlight: null,
    langPrefix: 'language-js',
    mangle: true,
    pedantic: false,
    sanitize: true,
    sanitizer: null,
    silent: true,
    smartLists: true,
    smartypants: true,
    tables: true,
    xhtml: true,
  })

  const nextSlide = () => (state.cursor == state.size ? '' : state.cursor++)

  const prevSlide = () => (state.cursor == 0 ? '' : state.cursor--)

  const changeSlide = key => {
    switch (key) {
      case 'ArrowLeft':
        prevSlide()
        break
      case 'ArrowRight':
        nextSlide()
        break
    }
  }

  return {
    oninit: (state.slide = state.contents[state.cursor]),
    view: ({ attrs: { Models } }) => {
      return m(
        '. container',
        {
          style: {
            width: `100%`,
          },
          tabindex: 0,
          onkeyup: ({ key }) => {
            changeSlide(key)
          },
        },
        [
          m('.hero box', { style: { width: '100%', height: '100%' } }, [
            m(
              '.hero-body',
              { style: { width: '100%', height: '100%', margin: 0 } },
              [
                m(
                  '.box',
                  {
                    style: {
                      width: `100%`,
                      height: `100vh`,
                      margin: 0,
                    },
                    onupdate: ({ dom }) => animateFadeIn({ dom }),
                    oncreate: ({ dom }) => animateEntrance({ dom }),
                    onBeforeRemove: ({ dom }) => animateExit({ dom }),
                    style: {
                      height: '80vh',
                      width: `100%`,
                      overflow: 'scroll',
                      'align-contents': 'center',
                    },
                  },
                  m.trust(marked(state.contents[state.cursor] || '~ FIN ~'))
                ),
              ]
            ),
          ]),
        ]
      )
    },
  }
}

export default SlideShow
