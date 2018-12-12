import m from "mithril";
import { animateFadeIn } from "../services/animations.js";
import { toChartDto } from "./Helpers.js";
import { convertTemp } from "./Helpers.js";
import Graph from "./Graph.js";
import Plotly from "plotly.js-dist";

const Chart = ({ attrs: { Models } }) => {
  return {
    oncreate: animateFadeIn,
    view: ({ attrs: { Models } }) => {
      // console.log("chart view", Models);
      return Models.ChartState
        ? [
            m(
              "h2.subtitle",
              { color: "white" },
              `Temp ${Models.ChartState.temp.selected}°`
            ),
            m(
              "button.button",
              { onclick: () => convertTemp(Models.ChartState.temp) },
              "Change Temp"
            ),
            m(Graph, { Models }),
          ]
        : m("", ["Still loading ..."]);
    },
  };
};

export default Chart;
