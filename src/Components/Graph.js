import m from "mithril";
import Plotly from "plotly.js-dist";
import { log } from "../services/index.js";

const Graph = ({ attrs: { Models } }) => {
  const state = {
    options: {
      margin: { t: 0 },
      line: {
        shape: "spline",
        smoothing: 1.3,
        color: Models.ChartState.temp.selected == "F" ? "e67e22" : "27ae60",
        simplify: false,
      },
    },
  };

  const plotData = ({ dom, attrs: { Models } }) =>
    Plotly.react(dom, [Models.TempChart], state.options);

  return {
    oncreate: plotData,
    onupdate: plotData,
    view: ({ attrs: { Models } }) => m(".", { style: { height: "450px" } }),
  };
};

export default Graph;
