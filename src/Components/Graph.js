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
    (Models.Plot = Plotly.react(dom, [Models.ChartModel], state.options));

  const updatePlot = ({ dom, attrs: { Models } }) => {
    console.log(Models.Plot);
    return (Models.Plot = Plotly.react(
      dom,
      [Models.ChartModel],
      state.options
    ));
  };

  return {
    oncreate: plotData,
    onupdate: updatePlot,
    view: ({ attrs: { Models } }) => {
      console.log(Models.Plot);
      return Models.Plot
        ? m(".", { style: { height: "450px" } }, Models.Plot)
        : m();
    },
  };
};

export default Graph;
