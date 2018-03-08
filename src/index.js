// index.jsx

import m from "mithril";
const root = document.getElementById("app");

// Styles
import "./index.css";

import "bulma/css/bulma.css";

import Models from "./Models.js";
import App from "./App.js";

m.render(root, m(App, { Models }));
