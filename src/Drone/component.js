import m from "mithril";
import { log } from "../services/index.js";
import Models from "../Models.js";
import Chart from "../Chart/component.js";
import Task from "data.task";
import { set, lensProp } from "ramda";
import { toCels, toFaren } from "./model.js";
import { animateFadeIn } from "../services/animations.js";

const Drone = () => {
  const state = {
    selected: "F",
    tempSelected: { F: toFaren, C: toCels },
  };

  const updateTemp = () =>
    state.selected == "F" ? (state.selected = "C") : (state.selected = "F");

  const onError = error => {
    log("error")(error);
    Models.Errors.push(error);
  };

  const onSuccess = _ => setTimeout(() => getData(), 4000);

  const toTemp = ({ data }) =>
    Task.of(
      data.map(d =>
        set(lensProp("metric"), state.tempSelected[state.selected](d.metric), d)
      )
    );

  const updateChrono = data =>
    Task.of((Models.Chrono = data.sort((x, y) => x.timestamp > y.timestamp)));

  const getData = () =>
    Models.getDroneData
      .chain(toTemp)
      .chain(updateChrono)
      .fork(onError, onSuccess);

  return {
    oninit: getData,
    oncreate: animateFadeIn,
    view: () =>
      m(".container box", [
        m("h1.title", "Temp for last 30 mins"),
        m(Chart(Models, updateTemp, state.selected)),
        m(
          "pre.pre",
          `Last Data Point: ${JSON.stringify(Models.Chrono[0], null, 2)}`
        ),
      ]),
  };
};

export default Drone;
