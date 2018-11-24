import { getQlTask } from '../services/requests.js'
import { compose, path, map, prop } from 'ramda'

import { log } from '../services/index.js'
const toViewModel = ({ data, errors }) => {
  console.log('errors', errors)
  console.log('data', data)
  return { data, errors }
}

export const getPresentations = () =>
  getQlTask(`query {
  presentations{ id, title}
}`).map(path(['data', 'presentations']))

export const savePresentationTask = state => {
  const q = `mutation {
    createPresentation(data: {title: ${JSON.stringify(state.title)}})
    { title id}
  }`
  return getQlTask(q).map(path(['data', 'createPresentation']))
}

export const deletePresentationsTask = id => {
  const q = `mutation {
    deletePresentation(where: {id: ${JSON.stringify(id)}})
    { title id}
  }`
  return getQlTask(q).map(path(['data', 'deletePresentation']))
}
