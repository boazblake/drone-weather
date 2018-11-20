import { compose, set, lensProp, prop } from 'ramda'

const updateId = slide => slideDrag =>
  set(lensProp('dragId', slideDrag), prop('id', slide), slideDrag)

export const updateSlideDragStart = slide =>
  compose(updateId(slide), updateDrag)

const updateIsSelected = slide => set(lensProp('isSelected'), true, slide)

const updateOrder = length => slide => set(lensProp('order'), length, slide)

export const updateSlideDragEnd = length =>
  compose(updateIsSelected, updateOrder(length))

const updateDrag = state => set(lensProp('dragging', false, state))
const updateDrop = state => set(lensProp('droppable', false, state))

export const updateStateDragEnd = compose(updateDrop, updateDrag)
