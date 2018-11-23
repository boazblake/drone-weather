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
    isFullscreen: '%',
    clicks: 0,
    size: Models.CurrentPresentation.slideShow().length,
    contents: pluck('contents', Models.CurrentPresentation.slideShow()),
  }

  const makeFullScreen = () => {
    state.clicks = 0
    state.isFullscreen = '%'
  }
  const makeSmallScreen = () => {
    state.clicks = 0
    state.isFullscreen = 'vh'
  }

  const doubleClick = e => {
    e.preventDefault()
    state.clicks++
    setTimeout(() => {
      log('set time out runnign')(state.clicks)
      state.clicks <= 1 ? makeSmallScreen() : makeFullScreen()
    }, 500)
    console.log(state)
  }

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
                      width: `100${state.isFullscreen}`,
                      height: `100${state.isFullscreen}`,
                      margin: 0,
                    },
                    onupdate: ({ dom }) => animateFadeIn({ dom }),
                    oncreate: ({ dom }) => animateFadeIn({ dom }),
                    onBeforeRemove: ({ dom }) => animateExit({ dom }),
                    onclick: doubleClick,
                    style: {
                      height: '80vh',
                      width: `100${state.isFullscreen}`,
                      overflow: 'scroll',
                    },
                  },
                  m.trust(
                    marked(state.contents[state.cursor] || 'No Slides Added')
                  )
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
