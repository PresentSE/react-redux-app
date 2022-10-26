import { createStore } from "redux";
import taskReduser from "./task";

export function configureStore() {
  return createStore(taskReduser);
}

export default configureStore;
