import m from "mithril";
import { log } from "../services/index.js";
import Chart from "./Chart.js";
import Weather from "./Weather.js";
import { getDroneData } from "./Helpers.js";
import { animateFadeIn } from "../services/animations.js";

const Drone = ({ attrs: { Models } }) => {
  const state = {
    status: "loading",
  };

  const onError = error => {
    log("error")(error);
    Models.Errors.push(error);
  };

  const onSuccess = _ => {
    state.status = "loaded";
    setTimeout(() => getData(), 4000);
  };

  const getData = () => getDroneData(Models).fork(onError, onSuccess);

  return {
    oninit: getData(),
    oncreate: animateFadeIn,
    view: ({ attrs: { Models } }) =>
      state.status == "loaded"
        ? m(".container box", [
            m("h1.title", "Temp for last 30 mins"),
            m(Chart, { Models }),
            m(".level", [
              m(".level-left", [
                m(
                  "pre.pre level-item",
                  `Last Data Point: ${JSON.stringify(
                    Models.Chrono[0],
                    null,
                    2
                  )}`
                ),
              ]),
              m(".level-right", [m(Weather, { Models })]),
            ]),
          ])
        : m("", ["loading..."]), // TODO: replace with loader
  };
};

export default Drone;
