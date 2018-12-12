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
  today: {},
};

const ChartState = {
  temp: { selected: "F", tempOptions: { F: toFaren, C: toCels } },
};

const Models = {
  getDroneData: droneDataTask,
  getWeatherByLL: (lat, long) => droneWeatherByLLTask(lat, long),
  getWeatherByWoeid: woeid => droneWeatherByWoeidTask(woeid),
  Weather,
  ChartModel: {},
  ChartDataModel: [],
  ChartState,
  Chrono: [],
  Drone: {},
  Errors: [],
};

export default Models;
