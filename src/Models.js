import { droneDataTask } from "./services/requests.js";

const Models = {
  getDroneData: droneDataTask(),
  MapData: [],
  TimeStamps: [],
  Chrono: [],
  Drone: {},
  Errors: [],
};

export default Models;
