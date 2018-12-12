import m from "mithril";
import { log } from "../services/index.js";

const Weather = ({ attrs: Models }) => {
  const state = {};

  const updateState = v =>
    console.log("updatesttae", (state.now = v.attrs.Models.Weather.now));

  return {
    // oninit: updateState,
    view: ({ attrs: Models }) =>
      m("pre.pre column", JSON.stringify(state.now, null, 2)),
  };
};

export default Weather;
