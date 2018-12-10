import m from "mithril";
import Toolbar from "../Toolbar/component.js";
import Models from "../Models.js";

const Layout = {
  view: ({ children }) => {
    return [m(".title"), "EOG RESOURCES DRONE APP", children];
  },
};

export default Layout;
