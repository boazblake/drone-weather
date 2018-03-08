import { findPresentationsTask } from "../services/requests.js";
import { savePresentationTask } from "../services/requests.js";
import { assoc, map, pick } from "ramda";

const toViewModel = pick(["title", "id"]);

export const getPresentationsTask = () =>
  findPresentationsTask().map(map(toViewModel));

export const toPresentationDtoTask = title => model => {
  let p = assoc("title", title, model);
  return savePresentationTask(p);
};
