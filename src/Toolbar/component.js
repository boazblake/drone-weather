import m from 'mithril'
import { contains, filter, propEq } from 'ramda'
import { log } from '../services/index.js'

const toggleModal = model => [
  m(
    'a.navbar-item',
    {
      onclick: () => (model.toggleModal = !model.toggleModal),
    },
    'Add New'
  ),
]

const toPresentations = [
  m(
    'a.navbar-item',
    {
      onclick: () => m.route.set('/presentations'),
    },
    'Presentations'
  ),
]

const toSlides = model => [
  m(
    'a.navbar-item',
    {
      onclick: () =>
        m.route.set(`/presentation/${model.CurrentPresentation.id}/slides`),
    },
    'slides'
  ),
]

const toSlideShow = model => [
  m(
    'a.navbar-item',
    {
      disabled:
        filter(propEq('isSelected', true), model.CurrentPresentation.slides)
          .length == 0
          ? true
          : false,
      onclick: () => m.route.set(`/slideshow/${model.CurrentPresentation.id}`),
    },
    'Slide Show'
  ),
]

const navView = model => page => {
  switch (page) {
    case 'presentation':
      return [toPresentations, toSlideShow(model)]
      break

    case 'slideshow':
      return [toPresentations, toSlides(model)]
      break

    case 'slides':
      return [toPresentations, toSlideShow(model)]
      break

    case 'edit':
      return [toPresentations, toSlides(model), toSlideShow(model)]
      break
  }
}

const actionView = model => page => {
  switch (page) {
    case 'presentations':
      return [toggleModal(model)]
      break
    case 'presentation':
      return [toggleModal(model)]
      break
    case 'edit':
      break
    case 'slides':
      break
    default:
      console.log('errorpage')
      break
  }
}

const Toolbar = ({ attrs: { model } }) => {
  console.log('p in toolbar', model().Models.CurrentPresentation.title)
  const currentPage = m.route.get().split('/')[1]
  return {
    view: () =>
      m(
        'nav.navbar',
        m('.navbar-menu is-active', [
          // m('.level', [
          [
            m('.navbar-start', [navView(model().Models)(currentPage)]),
            m('.navbar-end', [actionView(model().Models)(currentPage)]),
          ],
          // ]),
        ])
      ),
  }
}

export default Toolbar
