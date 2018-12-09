import m from "mithril";
import M from "moment";
import PlotlyChart from "./plotly-line-chart.js";
import Charty from "./chartist-line-chart.js";

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

  state.plotly = mdl.Chrono.reduce(toDto, { x: [], y: [] });
  state.charty = mdl.Chrono.reduce(toDto, {
    type: "line",
    data: {
      labels: [],
      datasets: [
        {
          label: "Houston Temp",
          data: [],
          borderWidth: 1,
        },
      ],
      options: { scales: { yAxis: [{ ticks: { baginAtZero: true } }] } },
    },
  });

  return {
    view: () => [
      m("h2.title", "Temp"),
      m(PlotlyChart(state)),
      m(Charty, state),
    ],
  };
};

export default Chart;
