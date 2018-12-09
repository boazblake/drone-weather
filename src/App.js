import m from "mithril";
import Layout from "./layout/component.js";
import Models from "./Models.js";
import Drone from "./Drone/component.js";

const routes = {
  "/drone": {
    view: () => m(Layout, m(Drone)),
  },
};

export const App = ({ attrs: model }) => {
  return {
    oncreate: ({ dom }) => {
      const main = dom.querySelector(".section-main");
      m.route(main, "/drone", routes);
    },
    view: ({ children }) => {
      return m(".App", [m(".section-main", children)]);
    },
  };
};

export default App;
