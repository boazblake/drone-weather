import {
  droneDataTask,
  droneWeatherByLLTask,
  droneWeatherByWoeidTask,
} from "./services/requests.js";
import { toCels, toFaren } from "./Components/Helpers.js";

const Weather = {
  sun_rise: "",
  sun_set: "",
  week: [],
  now: {},
};

const ChartModel = {
  x: [],
  y: [],
};

const ChartState = {
  temp: { selected: "F", tempOptions: { F: toFaren, C: toCels } },
};

const Models = {
  getDroneData: droneDataTask,
  getWeatherByLL: (lat, long) => droneWeatherByLLTask(lat, long),
  getWeatherByWoeid: woeid => droneWeatherByWoeidTask(woeid),
  Weather,
  ChartModel,
  ChartState,
  TempChart: {},
  Chrono: [],
  Drone: {},
  Errors: [],
};

export default Models;
