import { createAction, createSlice } from "@reduxjs/toolkit";
import todosService from "../services/todos.service";

const initialState = [];

// const update = createAction("task/updated");
// const remove = createAction("task/removed");

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    recived(state, action) {
      return action.payload;
    },
    update(state, action) {
      console.log(action);
      const elementIndex = state.findIndex((el) => el.id === action.payload.id);
      state[elementIndex] = { ...state[elementIndex], ...action.payload };
    },
    remove(state, action) {
      console.log(action);
      return state.filter((el) => el.id !== action.payload.id);
    },
  },
});

const { actions, reducer: taskReduser } = taskSlice;
const { update, remove, recived } = actions;

const taskRequested = createAction("task/requested");
const taskRequestFailed = createAction("task/taskRequestFailed");

export const getTasks = () => async (dispatch) => {
  dispatch(taskRequested());
  try {
    const data = await todosService.fetch();
    dispatch(recived(data));
    console.log(data);
  } catch (error) {
    dispatch(taskRequestFailed(error.message));
  }
};

export const completeTask = (id) => (dispatch, getState) => {
  dispatch(update({ id, completed: true }));
};

// const taskReduser = createReducer(initialState, (builder) => {
//   builder
//     .addCase(update, (state, action) => {
//       const elementIndex = state.findIndex((el) => el.id === action.payload.id);
//       state[elementIndex] = { ...state[elementIndex], ...action.payload };
//     })
//     .addCase(remove, (state, action) => {
//       return state.filter((el) => el.id !== action.payload.id);
//     });
// });

export function titleChanged(id) {
  return update({ id, title: `New title for ${id}` });
}

export function taskDeleted(id) {
  return remove({ id });
}

export default taskReduser;
