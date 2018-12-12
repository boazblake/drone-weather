import m from "mithril";
import Layout from "./Components/Layout.js";
import Drone from "./Components/Drone.js";

const routes = Models => {
  return {
    "/drone": {
      view: () => m(Layout, m(Drone, { Models })),
    },
  };
};

export const App = ({ attrs: { Models } }) => {
  return {
    oncreate: ({ dom }) => {
      const main = dom.querySelector(".section-main");
      m.route(main, "/drone", routes(Models));
    },
    view: ({ children }) => {
      return m(".App", [m(".section-main", children)]);
    },
  };
};

export default App;
