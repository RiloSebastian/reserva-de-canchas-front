import { UPDATE_DAYS_AND_SCHEDULES } from "../actions/types";

//const user = JSON.parse(localStorage.getItem("user"));

const initialState = [
  { label: "Lunes", value: 1, daysAndTimesId: null, selected: false },
  { label: "Martes", value: 2, daysAndTimesId: null, selected: false },
  { label: "Miercoles", value: 3, daysAndTimesId: null, selected: false },
  { label: "Jueves", value: 4, daysAndTimesId: null, selected: false },
  { label: "Viernes", value: 5, daysAndTimesId: null, selected: false },
  { label: "Sabado", value: 6, daysAndTimesId: null, selected: false },
  { label: "Domingo", value: 7, daysAndTimesId: null, selected: false },
];

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_DAYS_AND_SCHEDULES:
      return {
        ...state,
        isLoggedIn: false,
      };
    case REMOVE_DAYS_AND_SCHEDULES:
      return {
        ...state,
        isLoggedIn: false,
      };
    default:
      return state;
  }
}
