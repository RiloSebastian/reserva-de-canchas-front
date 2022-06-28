import { dinnerTime, holidays } from "./data/data";

export default class Utils {
  static isHoliday(date) {
    const localeDate = date.toLocaleDateString();
    return (
      holidays.filter((holiday) => holiday.toLocaleDateString() === localeDate)
        .length > 0
    );
  }

  static isWeekend(date, workingDays) {
    const day = date.getDay();
    return !workingDays.includes(day);
  }

  static isDinner(date, busyTime) {
    const hours = date.getHours();
    const day = date.getDay();

    let isDinner = true;

    /*   console.log("PRINTEANDO BUSY TIMES EN UTILS");
    console.log(busyTime); */

    for (const range of busyTime) {
      for (const horario of range.horariosLaborales) {
        for (var i = horario.from; i <= horario.to - 1; i++) {
          if (range.diasLaboralesSegmentados.includes(day) && hours === i) {
            isDinner = false;
          }
        }
      }
    }
    /* for (const range of dinnerTime) {
      return hours >= range.from && hours < range.to;
    } */

    return isDinner;
    //return hours >= dinnerTime.from && hours < dinnerTime.to;
  }

  static hasCoffeeCupIcon(date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return hours === dinnerTime.from && minutes === 0;
  }

  static isValidAppointment(component, appointmentData, workingDays, busyTime) {
    console.log("VALIDANDO SI ES UN APPOINTMENT VALIDO");
    console.log(component);
    console.log(appointmentData);
    console.log(workingDays);
    const startDate = new Date(appointmentData.startDate);
    const endDate = new Date(appointmentData.endDate);
    const cellDuration = 60;
    return Utils.isValidAppointmentInterval(
      startDate,
      endDate,
      cellDuration,
      workingDays,
      busyTime
    );
  }

  static isValidAppointmentInterval(
    startDate,
    endDate,
    cellDuration,
    workingDays,
    busyTime
  ) {
    const edgeEndDate = new Date(endDate.getTime() - 1);

    if (!Utils.isValidAppointmentDate(edgeEndDate, workingDays, busyTime)) {
      return false;
    }

    const durationInMs = cellDuration * 60 * 1000;
    const date = startDate;
    while (date <= endDate) {
      if (!Utils.isValidAppointmentDate(date, workingDays, busyTime)) {
        return false;
      }
      const newDateTime = date.getTime() + durationInMs - 1;
      date.setTime(newDateTime);
    }

    return true;
  }

  static isValidAppointmentDate(date, workingDays, busyTime) {
    return (
      !Utils.isHoliday(date) &&
      !Utils.isDinner(date, busyTime) &&
      !Utils.isWeekend(date, workingDays)
    );
  }
}
