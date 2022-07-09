import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { label: "Lunes", value: "LUNES", daysAndTimesId: null, selected: false },
  { label: "Martes", value: "MARTES", daysAndTimesId: null, selected: false },
  {
    label: "Miercoles",
    value: "MIERCOLES",
    daysAndTimesId: null,
    selected: false,
  },
  { label: "Jueves", value: "JUEVES", daysAndTimesId: null, selected: false },
  {
    label: "Viernes",
    value: "VIERNES",
    daysAndTimesId: null,
    selected: false,
  },
  { label: "Sabado", value: "SABADO", daysAndTimesId: null, selected: false },
  {
    label: "Domingo",
    value: "DOMINGO",
    daysAndTimesId: null,
    selected: false,
  },
];

createSlice({
  name: "businessDays",
  initialState,
  reducers: {
    update(state, action) {
      state = action.businessDays;
    },
  },
});
