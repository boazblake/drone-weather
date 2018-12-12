import m from "mithril";
import { log } from "../services/index.js";

const Weather = ({ attrs: { Models } }) => {
  const state = {};

  const updateState = () => {
    // console.log("updatesttae", Models.Weather.today);
    state.today = Models.Weather.today;
    return state;
  };

  return {
    oninit: updateState,
    view: ({ attrs: { Models } }) =>
      m("pre.pre column", JSON.stringify(state.today, null, 2)),
  };
};

export default Weather;
