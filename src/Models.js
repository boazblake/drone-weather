import m from 'mithril'
import Stream from 'mithril-stream'
import O from 'patchinko/constant'
import { filter } from 'ramda'

const User = {
  name: '',
  password: '',
  Token: '',
}

const SlideModel = {
  title: '',
  contents: '',
  id: '',
  isSelected: false,
  presentationId: '',
}

const PresentationModel = {
  id: '',
  title: '',
}

const Presentations = []
const CurrentPresentation = {
  title: '',
  id: '',
  slides: [],
  slideShow: [],
}

const Models = {
  Presentations,
  CurrentPresentation,
  PresentationModel,
  SlideModel,
  toggleModal: false,
}

export default Models
