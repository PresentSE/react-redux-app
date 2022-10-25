import * as actionType from "./actionTypes";

export function taskReduser(state = [], action) {
  switch (action.type) {
    case actionType.taskUpdated: {
      const newArray = [...state];
      const elementIndex = newArray.findIndex(
        (el) => el.id === action.payload.id
      );
      newArray[elementIndex] = { ...newArray[elementIndex], ...action.payload };
      return newArray;
    }
    case actionType.taskDeleted: {
      const newArray = [...state];
      const elementIndex = newArray.findIndex(
        (el) => el.id === action.payload.id
      );
      newArray.splice(elementIndex, 1);
      return newArray;
    }
    default:
      return state;
  }
}
