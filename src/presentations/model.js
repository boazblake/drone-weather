import { getQlTask } from '../services/requests.js'
import { compose, path } from 'ramda'

import { log } from '../services/index.js'

export const getPresentations = () =>
  getQlTask(`{ allPresentations { id title} }`).map(
    path(['data', 'allPresentations'])
  )

export const savePresentationTask = state => {
  const q = `mutation { createPresentation(id: ${
    state.id
  } title: ${JSON.stringify(state.title)}) { id title} }`
  return getQlTask(q).map(path(['data', 'createPresentation']))
}
