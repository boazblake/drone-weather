import m from "mithril";
import Chart from "chart.js";
import { log } from "../services/index.js";
import Stock from "paths-js/stock";

const Graph = v => {
  const state = {};
  const createPlot = ({ dom }) => {
    state.chart = Stock({
      xaccessor: dto => {
        console.log("dto", dto);
        return dto.timestamp;
      },
      yaccessor: dto => dto.metric,
      data: [v.attrs.Models.ChartDataModel],
    });
    console.log(state.chart);
  };

  return {
    oncreate: createPlot,
    view: v =>
      state.chart
        ? m("", { style: { height: "450px" } }, [
            state.chart.curves.map((d, i) =>
              m("path", {
                d: d.line.path.print(),
                stroke: d.color,
                fill: "none",
              })
            ),
          ])
        : m("", "stil loading ..."),
  };
};

export default Graph;
