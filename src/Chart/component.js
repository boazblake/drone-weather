import m from "mithril";
import M from "moment";
import LineChart from "./line-chart.js";
import { animateFadeIn } from "../services/animations.js";

const toDto = (acc, { timestamp, metric }) => {
  let time = M(timestamp)
    .utc()
    .fromNow();

  if (acc.x && acc.y) {
    acc.x.push(time);
    acc.y.push(metric);
    return acc;
  }
  acc.data.labels.push(time);
  acc.data.datasets[0].data.push(metric);

  return acc;
};

const Chart = (mdl, updateTemp, temp) => {
  const state = {
    options: {
      margin: { t: 0 },
      line: {
        shape: "spline",
        smoothing: 1.3,
        color: temp == "F" ? "e67e22" : "27ae60",
        simplify: false,
      },
    },
  };

  state.plotly = mdl.Chrono.reduce(toDto, {
    x: [],
    y: [],
  });

  return {
    oncreate: animateFadeIn,
    view: () => [
      m("h2.subtitle", { color: "white" }, `Temp ${temp}°`),
      m("button.button", { onclick: updateTemp }, "Change Temp"),
      m(LineChart(state)),
    ],
  };
};

export default Chart;
