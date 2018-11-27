import { getQlTask } from '../services/requests.js'
import { compose, lt, prop, gt, set, lensProp, subtract, path } from 'ramda'

const toViewModel = model => presentations =>
  (model.CurrentPresentation = presentations)

export const toStruct = (acc, item) => {
  if (item.order > 0 && !acc.keys.has(item.id)) {
    item.order = acc.keys.size + 1
    acc.keys.add(item.id)
    acc.values[item.order] = item
    acc.items(Object.keys(acc.values))
    return acc
  }
  return acc
}

const orderOf = slide => prop('order', slide)

export const forGreater = removeSlide => checkSlide =>
  lt(orderOf(removeSlide), orderOf(checkSlide))

export const forLess = removeSlide => checkSlide =>
  gt(orderOf(removeSlide), orderOf(checkSlide))

export const reduceOrder = slide =>
  set(lensProp('order', slide), subtract(orderOf(slide), 1), slide)

export const getId = item => prop('id', item)

const resetOrder = slide => set(lensProp('order', slide), 0, slide)

export const updateRemoveSlide = compose(Array.of, resetOrder)

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

export const updateSlideTask = presentation_id => slides => {
  let qlSlides = slides.map(
    slide =>
      `{
      where: {
        id: ${JSON.stringify(slide.id)}
      }
      data: {
        order: ${JSON.stringify(slide.order)}
      }
    }`
  )

  let q = `mutation {
            updatePresentation(
              where: {
                id: ${JSON.stringify(presentation_id)}
              }
              data: {
                Slides:{
                  update : [${qlSlides}]
                }
              }
            )
          { id title Slides { id title content order } } 
        }`

  return getQlTask(q).map(path(['data', 'updatePresentation', 'Slides']))
}
