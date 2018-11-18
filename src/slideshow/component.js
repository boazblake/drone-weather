import m from 'mithril'
import Stream from 'mithril-stream'
import marked from 'marked'
import { filter, propEq, prop } from 'ramda'
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
    isFullscreen: 'vh',
    clicks: 0,
    size: 0,
    contents: [],
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
    state.clicks++
    setTimeout(() => {
      // console.log('set time out runnign', state.clicks)
      state.clicks >= 1 ? makeFullScreen() : makeSmallScreen()
    }, 300)
    e.preventDefault()
  }

  const loadSlideShow = ({ attrs: { Models } }) => {
    Models.CurrentPresentation.slideShow = filter(
      propEq('isSelected', true),
      Models.CurrentPresentation.slides
    ).map(prop('contents'))
    state.size = Models.CurrentPresentation.slideShow.length - 1
    state.contents = Models.CurrentPresentation.slideShow
    state.slide = state.contents[state.cursor]
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
    oninit: loadSlideShow,
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
          m('.hero', [
            m('.hero-body', [
              m(
                '.box',
                {
                  onupdate: ({ dom }) => animateFadeIn({ dom }),
                  oncreate: ({ dom }) => animateFadeIn({ dom }),
                  onBeforeRemove: (vnode, done) => {
                    vnode.dom.addEventListener('animationend', done)
                    vnode.dom.style.animation = 'fadeOut 1s'
                  },
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
            ]),
          ]),
        ]
      )
    },
  }
}

export default SlideShow
