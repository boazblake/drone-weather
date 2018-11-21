// index.jsx

import m from 'mithril'
const root = document.getElementById('app')

// Styles

import 'bulma/css/bulma.css'

import './index.css'
import './presentations/style.css'
import './slides/style.css'
import './slides/Preview/style.css'

import Models from './Models.js'
import App from './App.js'

m.render(root, m(App, { Models }))
