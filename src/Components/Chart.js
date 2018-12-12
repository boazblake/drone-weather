import m from "mithril";
import { animateFadeIn } from "../services/animations.js";
import { toChartDto } from "./Helpers.js";
import { convertTemp } from "./Helpers.js";
import Graph from "./Graph.js";
import Plotly from "plotly.js-dist";

const Chart = ({ attrs: { Models } }) => {
  Models.Chrono.reduce(toChartDto, Models.ChartDataModel);

  console.log(Models.ChartDataModel);

  return {
    oncreate: animateFadeIn,
    view: ({ attrs: { Models } }) => {
      return [
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
      ];
    },
  };
};

export default Chart;
