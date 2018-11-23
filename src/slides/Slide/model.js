import { getQlTask } from '../../services/requests.js'

import { compose, set, lensProp, prop } from 'ramda'

const updateId = slide => slideDrag =>
  set(lensProp('dragId', slideDrag), prop('id', slide), slideDrag)

export const updateSlideDragStart = slide =>
  compose(updateId(slide), updateDrag)

const updateOrder = length => slide => set(lensProp('order'), length, slide)

export const updateSlideDragEnd = length => compose(updateOrder(length))

const updateDrag = state => set(lensProp('dragging', false, state))
const updateDrop = state => set(lensProp('droppable', false, state))

export const updateStateDragEnd = compose(updateDrop, updateDrag)

export const saveSlideToShowTask = slide => {
  let q = `mutation {
            updateSlide(id: ${slide.id}
              order: ${slide.order})
              { id
                order
              }
          }
          `

  return getQlTask(q)
}

export const deleteSlideTask = id => {
  let q = `mutation {
            deleteSlide(id: ${id})
          }
          `

  return getQlTask(q)
}
