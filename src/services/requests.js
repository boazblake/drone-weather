import m from "mithril";
import Task from "data.task";

const baseUrl = "https://react-assessment-api.herokuapp.com/api";

const getTask = url =>
  new Task((rej, res) =>
    m
      .request({
        method: "GET",
        url: `${baseUrl}/${url}`,
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      })
      .then(res, rej)
  );

export const droneDataTask = () => getTask("drone");
export const droneWeatherByLLTask = (latt, long) =>
  getTask(`weather/location/search/?lattlong=${latt},${long}`);
export const droneWeatherByWoeidTask = woeid =>
  getTask(`weather/location/${woeid}`);
