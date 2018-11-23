import {
  savePresentationTask,
  findPresentationsTask,
  getQlTask,
} from '../services/requests.js'
import { compose, path, assoc, map, pick } from 'ramda'

import { makeQuery } from '../services/index.js'

const toViewModel = compose(path(['data', 'allPresentations']))

// export const getPresentationsTask = () =>
//   findPresentationsTask().map(map(toViewModel))
//
// export const toPresentationDtoTask = title => model => {
//   let p = assoc('title', title, model)
//   return savePresentationTask(p)
// }

export const getPresentations = () =>
  getQlTask(`{ allPresentations { id title} }`).map(toViewModel)
