import m from "mithril";
import { log } from "../services/index.js";
import Models from "../Models.js";
import Chart from "../Chart/component.js";
import Task from "data.task";

const Drone = () => {
  const updateChrono = ({ data }) =>
    Task.of((Models.Chrono = data.sort((x, y) => x.timestamp > y.timestamp)));

  const getData = () =>
    Models.getDroneData.chain(updateChrono).fork(onError, onSuccess);

  const onError = error => {
    log("error")(error);
    Models.Errors.push(error);
  };

  const onSuccess = data => setTimeout(() => getData(), 4000);

  return {
    oninit: getData,
    view: () =>
      m(".container box", [
        m("h1.title", "Temp for last 30 mins"),
        m(Chart(Models)),
        m(
          "pre.pre",
          `Last Data Point: ${JSON.stringify(Models.Chrono[0], null, 2)}`
        ),
      ]),
  };
};

export default Drone;
