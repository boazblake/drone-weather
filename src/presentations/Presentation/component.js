import m from 'mithril'
import { log } from '../../services/index.js'
import { deletePresentationsTask } from '../../services/requests.js'

const Presentation = ({ attrs: { title, id, findPresentations, model } }) => {
  const onError = task => error => log(`error with ${task}`)(error)
  const onSuccess = _ => findPresentations({ attrs: { model } })

  const removePresTask = pId =>
    deletePresentationsTask(pId).fork(onError('deleting'), onSuccess)

  return {
    view: () =>
      m('section.level box', [
        m('div.level-left', [
          m(
            'button.button',
            {
              onclick: () => m.route.set(`/presentation/${id}/slides`),
            },
            title
          ),
        ]),
        m('div.level-right', [
          m('button.delete', {
            style: { 'background-color': '#e74c3c' },
            onclick: () => removePresTask(id),
          }),
        ]),
      ]),
  }
}

export default Presentation
