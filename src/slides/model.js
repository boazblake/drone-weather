import { getQlTask } from '../services/requests.js'
import { path } from 'ramda'

const toViewModel = model => presentations =>
  (model.CurrentPresentation = presentations)

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

export const loadSlides = id => model =>
  getQlTask(
    `{ presentation(where:{id:${JSON.stringify(id)}}){
      id, title, Slides { id title content order }
    } }`
  )
    .map(path(['data', 'presentation']))
    .map(toViewModel(model))

export const saveSlideTask = ({ title, order, presentation_id }) => {
  let q = `mutation {
            updatePresentation(
              where: {
                id: ${JSON.stringify(presentation_id)}
              }
              data: {
                  Slides:{
                    create : {
                      title: ${JSON.stringify(title)}
                      content: ""
                      order: ${JSON.stringify(order)}
                    }
                  } 
          }){
    id title Slides { id title content order }
  } }`

  return getQlTask(q).map(path(['data', 'updatePresentation', 'Slides']))
}

export const deleteSlideTask = presentation_id => id => {
  let q = `mutation {
            updatePresentation(
              where: {
                id: ${JSON.stringify(presentation_id)}
              }
              data: {
                  Slides:{
                    delete : [{
                      id: ${JSON.stringify(id)}
                    }]
                  } 
          }){
    id title Slides { id title content order}
  } }`

  return getQlTask(q).map(path(['data', 'updatePresentation', 'Slides']))
}
