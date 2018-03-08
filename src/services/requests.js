import httpTasks from "./Tasks.js";
import Task from "data.task";

export const findPresentationsTask = () => httpTasks.getTask("presentations");

export const savePresentationTask = dto =>
  httpTasks.postTask(`presentations`)({
    dto,
  });

export const deletePresentationsTask = id =>
  httpTasks.deleteTask("presentations")(id);

export const findSlidesTask = id =>
  httpTasks.getTask(`presentations/${id}/slides`);

export const saveSlideTask = dto => httpTasks.postTask(`slides`)({ dto });

export const updateSlideTask = id => dto =>
  httpTasks.putTask(`slides/${id}`)({ dto });

export const deleteSlideTask = id => httpTasks.deleteTask("slides")(id);
export const loadSlideTask = id => httpTasks.getTask(`slides/${id}`);
