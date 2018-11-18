import m from 'mithril'
import { contains, filter, propEq } from 'ramda'
import { log } from '../services/index.js'

const toggleModal = model => {
  return [
    m(
      'a.navbar-item',
      {
        onclick: () => (model.toggleModal = !model.toggleModal),
      },
      'Add New'
    ),
  ]
}
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

const Toolbar = ({ attrs: { Models } }) => {
  console.log('pres in toolbar', Models.CurrentPresentation)
  const currentPage = m.route.get().split('/')[1]
  return {
    view: () =>
      m(
        'nav.navbar is-white',
        m('.navbar-menu is-active', [
          // m('.level', [
          [
            m('.navbar-start', [navView(Models)(currentPage)]),
            m('.navbar-end', [actionView(Models)(currentPage)]),
          ],
          // ]),
        ])
      ),
  }
}

export default Toolbar
