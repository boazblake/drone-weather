import m from 'mithril'
import Stream from 'mithril-stream'
import { filter } from 'ramda'

const SlideModel = {
  title: '',
  contents: '',
  order: 0,
  presentation_id: '',
}

const Slides = []

const Presentations = []

const CurrentPresentation = {
  title: '',
  id: '',
  slideShow: Stream([]),
  Slides,
}
const Models = {
  Presentations,
  CurrentPresentation,
  SlideModel,
  toggleModal: false,
}

export default Models
