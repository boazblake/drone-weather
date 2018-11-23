import { getQlTask } from '../services/requests.js'
import { path } from 'ramda'

export const loadSlide = id => {
  const q = `{Slide(id: ${id}) { title, contents, id, presentation_id}}`
  return getQlTask(q).map(path(['data', 'Slide']))
}

export const saveSlide = slide => {
  const q = `mutation {
            updateSlide(id: ${slide.id}
                        title: ${JSON.stringify(slide.title)}
                        contents: ${JSON.stringify(slide.contents)}
                      )
              { id
                title
                contents
              }
          }
          `
  return getQlTask(q).map(path(['data', 'updateSlide']))
}
