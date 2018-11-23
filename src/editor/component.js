import m from 'mithril'
import Stream from 'mithril-stream'
import marked from 'marked'
import { loadSlide, saveSlide } from './model.js'
import { log } from '../services/index.js'

const Editor = ({ attrs: Models }) => {
  let state = { slide: { title: '', contents: '' } }

  const toSlides = _ =>
    m.route.set(`/presentation/${state.slide.presentation_id}/slides`)

  const onError = error => log('error')(error)

  const onSuccess = slide => {
    state.slide = slide
  }

  const getSlide = ({ attrs: { Models } }) => {
    let slideId = m.route.param('id')
    return loadSlide(slideId).fork(onError, onSuccess)
  }

  const updateTitle = text => (state.slide.title = text)
  const updateContents = text => (state.slide.contents = text)

  const save = e => {
    e.preventDefault()

    saveSlide(state.slide).fork(onError, () => toSlides())
  }

  return {
    oncreate: getSlide,
    view: ({ attrs: { Models } }) =>
      m('.article', [
        m('section.section columns is-multiline', [
          m('.column is-6', { style: { overflow: 'scroll', height: '65vh' } }, [
            m('.field', [
              m('p', [
                m('input.input is-large', {
                  type: 'text',
                  placeholder: 'Slide Title',
                  oninput: m.withAttr('value', updateTitle),
                  value: state.slide.title,
                }),
              ]),
            ]),
            m('.field', [
              m('p', [
                m('textarea.textarea', {
                  oninput: m.withAttr('value', updateContents),
                  value: state.slide.contents,
                  style: { height: '45vh' },
                }),
              ]),
            ]),
            m('.field is-grouped', [
              m(
                '.control',
                { style: { width: '50%', display: 'inline-block' } },
                [
                  m(
                    'button.button is-dark is-outlined is-link',
                    {
                      style: { width: '100%', display: 'inline-block' },
                      onclick: save,
                    },
                    'Save'
                  ),
                ]
              ),
              m(
                '.control',
                { style: { width: '50%', display: 'inline-block' } },

                m(
                  'button.button is-dark is-outlined is-link',
                  {
                    style: { width: '100%', display: 'inline-block' },
                    onclick: toSlides,
                  },
                  'Cancel'
                )
              ),
            ]),
          ]),
          m('article.column is-6', [
            m(
              '.box',
              {
                style: { height: '60vh', overflow: 'scroll' },
              },
              m.trust(marked(state.slide.contents || ''))
            ),
          ]),
        ]),
      ]),
  }
}

export default Editor
