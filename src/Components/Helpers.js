import M from "moment";
import Task from "data.task";
import { set, lensProp, pluck, propEq } from "ramda";

export const toCels = f => (f - 32) * 5 / 9;
export const toFaren = c => c * (9 / 5) + 32;

export const convertTemp = temp =>
  temp.selected == "F" ? (temp.selected = "C") : (temp.selected = "F");

export const toChartDto = (acc, { timestamp, metric }) => {
  let time = M(timestamp)
    .utc()
    .fromNow();

  if (acc.x && acc.y) {
    acc.x.push(time);
    acc.y.push(metric);
    return acc;
  }
  acc.data.labels.push(time);
  acc.data.datasets[0].data.push(metric);

  return acc;
};

const toViewModel = mdls => ({ sun_rise, sun_set, consolidated_weather }) => {
  mdls.Weather = {
    sun_rise,
    sun_set,
    Week: consolidated_weather,
    now: consolidated_weather[0],
  };

  mdls.Chrono.reduce(toChartDto, mdls.ChartModel);
  return Task.of(mdls);
};

const filterForHTown = data => {
  let res = data.filter(propEq("title", "Houston"));
  return Task.of(pluck("woeid", res));
};

const updateWeather = mdls => data =>
  Task.of(
    (mdls.Drone = {
      latitude: data[0].latitude,
      longitude: data[0].longitude,
    })
  );

const updateChrono = mdls => data => Task.of((mdls.Chrono = data));

const toTemp = mdls => ({ data }) =>
  Task.of(
    data
      .sort((x, y) => x.timestamp > y.timestamp)
      .map(d =>
        set(
          lensProp("metric"),
          mdls.ChartState.temp.tempOptions[mdls.ChartState.temp.selected](
            d.metric
          ),
          d
        )
      )
  );

export const getDroneData = mdls =>
  mdls
    .getDroneData()
    .chain(toTemp(mdls))
    .chain(updateChrono(mdls))
    .chain(updateWeather(mdls))
    .chain(_ => mdls.getWeatherByLL(mdls.Drone.latitude, mdls.Drone.longitude))
    .chain(filterForHTown)
    .chain(mdls.getWeatherByWoeid)
    .chain(toViewModel(mdls));
