import m from 'mithril'
import { log } from '../../services/index.js'
import {
  deletePresentationsTask,
  findPresentationsTask,
} from '../../services/requests.js'
import Task from 'data.task'

const Presentation = ({ attrs: { title, id, model } }) => {
  const onError = task => error => log(`error with ${task}`)(error)
  const onSuccess = _ => findPresentations({ attrs: { model } })

  const authDeleteTask = id =>
    alert('Are you sure you want to delete?') ? Task.of(id) : Task.rejected(id)

  const removePresTask = pId =>
    authDeleteTask(pId)
      .chain(deletePresentationsTask)
      .fork(onError('deleting'), onSuccess)

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
