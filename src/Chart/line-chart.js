import m from "mithril";
import Plotly from "plotly.js-dist";

const PlotlyChart = state => {
  const plotData = ({ dom }) => Plotly.plot(dom, [state.plotly], state.options);

  return {
    oncreate: plotData,
    view: () => m(".", { style: { height: "450px" } }),
  };
};

export default PlotlyChart;
