import { loadSlideTask } from "../services/requests.js";
import { log } from "../services/index.js";
import { lensProp, over } from "ramda";

const contentsLens = lensProp("contents");

export const loadSlide = id => loadSlideTask(id);
