import { findSlidesTask } from '../services/requests.js'
import { assoc, filter, propEq, head } from 'ramda'

const toViewModel = id => model => slides => {
  let hasId = propEq('id', parseInt(id))
  return assoc('slides', slides, head(filter(hasId, model.Presentations)))
}

export const loadSlides = pId => model =>
  findSlidesTask(pId).map(toViewModel(pId)(model))
