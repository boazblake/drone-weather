import m from 'mithril'
import Stream from 'mithril-stream'
import marked from 'marked'
import { loadSlide, editSlide } from './model.js'
import { log } from '../services/index.js'

const Editor = ({ attrs: Models }) => {
  let state = { presentationId: '', slide: { title: '', content: '', id: '' } }

  const toSlides = _ =>
    m.route.set(`/presentation/${state.presentationId}/slides`)

  const onError = error => log('error')(error)

  const onSuccess = slide => {
    state.slide = slide
  }

  const getSlide = ({ attrs: { Models } }) => {
    state.slide.id = m.route.param('id')
    state.presentationId = m.route.param('pid')
    return loadSlide(state.slide.id).fork(onError, onSuccess)
  }

  const updateTitle = text => (state.slide.title = text)
  const updateContents = text => (state.slide.content = text)

  const save = e => {
    e.preventDefault()

    editSlide(state.slide).fork(onError, () => toSlides())
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
                  value: state.slide.content,
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
              m.trust(marked(state.slide.content || ''))
            ),
          ]),
        ]),
      ]),
  }
}

export default Editor
