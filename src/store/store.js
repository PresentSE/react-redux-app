import { createStore } from "redux";
import taskReduser from "./task";

export function configureStore() {
  return createStore(
    taskReduser,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
}

export default configureStore;
