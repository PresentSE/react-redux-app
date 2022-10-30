import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import {
  titleChanged,
  taskDeleted,
  completeTask,
  getTasks,
} from "./store/task";
import configureStore from "./store/store";
import { Provider, useSelector, useDispatch } from "react-redux";

const store = configureStore();

const App = (params) => {
  const state = useSelector((state) => state.entities);
  const isLoading = useSelector((state) => state.isLoading);
  const error = useSelector((state) => state.error);
  const dispatch = useDispatch();
  console.log(state);

  useEffect(() => {
    dispatch(getTasks());
  }, []);

  // const completeTask = (taskId) => {
  //   store.dispatch((dispatch, getState) => {
  //     console.log(dispatch);
  //     console.log(getState);

  //     store.dispatch(taskCompleted(taskId));
  //   });
  // };

  const changeTitle = (taskId) => {
    dispatch(titleChanged(taskId));
  };

  const deletedTask = (taskId) => {
    dispatch(taskDeleted(taskId));
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <h1>APP</h1>
      <ul>
        {state.map((el) => (
          <li key={el.id}>
            <p>{el.title}</p>
            <p>{`Completed: ${el.completed}`}</p>
            <button onClick={() => dispatch(completeTask(el.id))}>
              Complete
            </button>
            <button onClick={() => changeTitle(el.id)}>Change title</button>
            <button onClick={() => deletedTask(el.id)}>Delete task</button>
            <hr />
          </li>
        ))}
      </ul>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>
);
