import { getQlTask } from '../services/requests.js'

const toViewModel = model => ({ data: { Presentation } }) =>
  (model.CurrentPresentation = Presentation)

export const loadSlides = id => model =>
  getQlTask(
    `{ Presentation(id:${id}) { id title Slides {id, title, order, contents}} }`
  ).map(toViewModel(model))
