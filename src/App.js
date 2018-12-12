import m from "mithril";
import Layout from "./Components/Layout.js";
import Drone from "./Components/Drone.js";

const routes = mdl => {
  return {
    "/drone": {
      view: () => m(Layout, m(Drone, { mdl })),
    },
  };
};

export const App = ({ attrs: model }) => {
  return {
    oncreate: ({ dom }) => {
      const main = dom.querySelector(".section-main");
      m.route(main, "/drone", routes(model));
    },
    view: ({ children }) => {
      return m(".App", [m(".section-main", children)]);
    },
  };
};

export default App;
