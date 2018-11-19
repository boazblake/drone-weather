import m from 'mithril'
import Stream from 'mithril-stream'
import { filter } from 'ramda'

const SlideModel = {
  title: '',
  contents: '',
  id: '',
  isSelected: false,
  order: 0,
  presentationId: '',
}

const PresentationModel = {
  id: '',
  title: '',
}

const CurrentPresentation = {
  title: '',
  id: '',
  slides: [],
  slideShow: [],
}

const Presentations = []

const Models = {
  Presentations,
  CurrentPresentation,
  PresentationModel,
  SlideModel,
  toggleModal: false,
}

export default Models
