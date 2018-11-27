import { getQlTask } from '../services/requests.js'
import { makeQuery } from '../services/index.js'
import { path } from 'ramda'

export const loadSlide = id => {
  let q = `{ slide(where:{id:${JSON.stringify(id)}}){
              id content title
            }
          }`
  return getQlTask(q).map(path(['data', 'slide']))
}

export const editSlide = ({ id, title, content }) => {
  let q = `mutation {
            updateSlide(
              data: {
                title: ${JSON.stringify(title)}
                content: ${JSON.stringify(content)}
              }
              where: {
                id: ${JSON.stringify(id)}
              }) {
                id
                title
              }
        }`

  return getQlTask(q).map(path(['data', 'updatePresentation', 'Slides']))
}
