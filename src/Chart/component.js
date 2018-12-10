import m from "mithril";
import M from "moment";
import LineChart from "./line-chart.js";

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

const Chart = mdl => {
  const state = {
    status: "F",
    options: {
      margin: { t: 0 },
    },
  };

  state.plotly = mdl.Chrono.reduce(toDto, {
    x: [],
    y: [],
    line: { shape: "spline", smoothing: 1.3 },
    mode: "lines+markers",
  });

  return {
    view: () => [
      m("h2.subtitle", { color: "white" }, "Temp F°"),
      m(LineChart(state)),
    ],
  };
};

export default Chart;
