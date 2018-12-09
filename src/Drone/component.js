import m from "mithril";
import { log } from "../services/index.js";
import Models from "../Models.js";
import Chart from "../Chart/component.js";

const Drone = () => {
  const getData = () => Models.getDroneData.fork(onError, onSuccess);

  const onError = error => {
    log("error")(error);
    Models.Errors.push(error);
  };

  const onSuccess = ({ data }) => {
    Models.Chrono = data.sort((x, y) => x.timestamp > y.timestamp);
    setTimeout(() => getData(), 4000);
  };

  return {
    oninit: getData,
    view: () =>
      m(".container", [m("h1.title", "Boaz Drone App"), m(Chart(Models))]),
  };
};

export default Drone;
