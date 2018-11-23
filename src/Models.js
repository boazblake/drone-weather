import m from 'mithril'
import Stream from 'mithril-stream'
import { filter } from 'ramda'

const SlideModel = {
  title: '',
  contents: '',
  id: '',
  order: 0,
  presentation_id: '',
}

const PresentationModel = {
  id: '',
  title: '',
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
  PresentationModel,
  SlideModel,
  toggleModal: false,
}

export default Models
