import {
  droneDataTask,
  droneWeatherByLLTask,
  droneWeatherByWoeidTask,
} from "./services/requests.js";

const Models = {
  getDroneData: droneDataTask(),
  getWeatherByLL: (lat, long) => droneWeatherByLLTask(lat, long),
  getWeatherByWoeid: woeid => droneWeatherByWoeidTask(woeid),
  Weather: [],
  Woeid: [],
  Chrono: [],
  Drone: {},
  Errors: [],
};

export default Models;
