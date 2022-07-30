import { dinnerTime } from "./data.js";
import moment from "moment";

const formatTime = "hh:mm a";

export default class Utils {
  static isHoliday(date, holidays) {
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

  static isDinner(date) {
    const hours = date.getHours();
    return hours >= dinnerTime.from && hours < dinnerTime.to;
  }

  static hasCoffeeCupIcon(date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return hours === dinnerTime.from && minutes === 0;
  }

  static isValidAppointment(component, appointmentData, workingDays, holidays) {
    const startDate = new Date(appointmentData.startDate);
    const endDate = new Date(appointmentData.endDate);
    const cellDuration = component.option("cellDuration");
    return Utils.isValidAppointmentInterval(
      startDate,
      endDate,
      cellDuration,
      workingDays,
      holidays
    );
  }

  static isValidAppointmentInterval(
    startDate,
    endDate,
    cellDuration,
    workingDays,
    holidays
  ) {
    const edgeEndDate = new Date(endDate.getTime() - 1);

    if (!Utils.isValidAppointmentDate(edgeEndDate, workingDays, holidays)) {
      return false;
    }

    const durationInMs = cellDuration * 60 * 1000;
    const date = startDate;
    while (date <= endDate) {
      if (!Utils.isValidAppointmentDate(date, workingDays, holidays)) {
        return false;
      }
      const newDateTime = date.getTime() + durationInMs - 1;
      date.setTime(newDateTime);
    }

    return true;
  }

  static isValidAppointmentDate(date, workingDays, holidays) {
    return (
      !Utils.isHoliday(date, holidays) &&
      !Utils.isDinner(date) &&
      !Utils.isWeekend(date, workingDays)
    );
  }

  static getTimePrice(courtDetails, itemData) {
    let timePrice = 0;
    if (courtDetails.schedules && courtDetails.schedules.length > 0) {
      courtDetails.schedules.forEach((shedule) => {
        if (shedule.details && shedule.details.length > 0) {
          const daysNumberAvailable = shedule.daysAvailable.map((day) => {
            switch (day) {
              case "DOMINGO":
                return 0;
              case "LUNES":
                return 1;
              case "MARTES":
                return 2;
              case "MIERCOLES":
                return 3;
              case "JUEVES":
                return 4;
              case "VIERNES":
                return 5;
              case "SABADO":
                return 6;
              default:
                break;
            }
          });

          shedule.details.forEach((detail) => {
            const time = moment(
              moment(itemData.startDate).format("hh:mm a"),
              formatTime
            );
            const beforeTime = moment(
              moment(detail.timeFrame.from).format("hh:mm a"),
              formatTime
            );
            const afterTime = moment(
              moment(detail.timeFrame.to).format("hh:mm a"),
              formatTime
            );
            if (time.isBetween(beforeTime, afterTime, undefined, "[)")) {
              //VALIDAR EL DIA DE LA SEMANA
              if (
                daysNumberAvailable.includes(moment(itemData.startDate).day())
              ) {
                timePrice = detail.costPerSlot;
              }
            }
          });
        } else {
          return 0;
        }
      });
    } else {
      return 0;
    }
    return timePrice;
  }
}
