import m from 'mithril'
import {
  contains,
  filter,
  propEq,
  isEmpty,
  length,
  split,
  view,
  lensProp,
} from 'ramda'
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
      oncreate: m.route.link,
      href: '/presentations',
    },
    'Presentations'
  ),
]

const toSlides = model => [
  m(
    'a.navbar-item',
    {
      oncreate: m.route.link,
      href: `/presentation/${model.CurrentPresentation.id}/slides`,
    },
    'slides'
  ),
]

const toSlideShow = model => [
  m(
    'a.navbar-item',
    {
      disabled: isEmpty(length(model.CurrentPresentation.slideShow))
        ? true
        : false,
      oncreate: m.route.link,
      href: `/slideshow/${model.CurrentPresentation.id}`,
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
    default:
    // log('navView errorpage')()
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
    default:
    // log('actionView errorpage')()
  }
}

const Toolbar = ({ attrs: { Models } }) => {
  const currentPage = view(lensProp(1), split('/', m.route.get()))
  return {
    view: ({ attrs: { Models } }) =>
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
