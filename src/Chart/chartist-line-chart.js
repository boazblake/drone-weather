import m from "mithril";
import Chart from "chart.js";

const Charty = ({ attrs: { charty } }) => {
  const state = { created: null, chart: null };

  const plotData = ({ dom }) => {
    console.log("chart???", state);
    if (!state.created) {
      state.chart = new Chart(dom, charty);
      console.log("????", state);
      state.created = true;
      return;
    }
    state.chart.update();
  };

  return {
    oncreate: plotData,
    view: () => m("canvas.", { style: { height: "450px" } }),
  };
};

export default Charty;
