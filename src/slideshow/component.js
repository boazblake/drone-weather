import m from 'mithril'
import marked from 'marked'
import { filter, propEq, prop } from 'ramda'

const SlideShow = ({ Models }) => {
  const state = {
    cursor: 0,
    isFullscreen: 'vh',
    clicks: 0,
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
      console.log('set time out runnign', state.clicks)
      state.clicks >= 1 ? makeFullScreen() : makeSmallScreen()
    }, 300)
    e.preventDefault()
  }

  const loadSlideShow = ({ attrs: { Models } }) => {
    Models.CurrentPresentation.slideShow = filter(
      propEq('isSelected', true),
      Models.CurrentPresentation.slides
    ).map(prop('contents'))
  }

  return {
    oninit: loadSlideShow,
    view: ({ attrs: { Models } }) => {
      return m('. container', [
        m('.hero', [
          m('.hero-body', [
            m(
              '.box',
              {
                onclick: doubleClick,
                style: {
                  height: '80vh',
                  width: `100${state.isFullscreen}`,
                  overflow: 'scroll',
                },
              },
              m.trust(
                marked(
                  Models.CurrentPresentation.slideShow[state.cursor] ||
                    'No Slides Added'
                )
              )
            ),
          ]),
        ]),
      ])
    },
  }
}

export default SlideShow
