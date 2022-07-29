import { dinnerTime } from "../pages/reservas/data";
import moment from "moment";

const formatTime = "hh:mm a";
const es = moment().locale("es");

export default class Utils {
  static genPassword() {
    const number = "0123456789";
    const lowChars = "abcdefghijklmnopqrstuvwxyz";
    const upChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const specialChars = "!@#$%^&*()";

    const passwordLength = 3;
    let password = "";
    for (let i = 0; i <= passwordLength; i++) {
      let randomNumber1 = Math.floor(Math.random() * number.length);
      let randomNumber2 = Math.floor(Math.random() * lowChars.length);
      let randomNumber3 = Math.floor(Math.random() * upChars.length);
      let randomNumber4 = Math.floor(Math.random() * specialChars.length);
      password += number.substring(randomNumber1, randomNumber1 + 1);
      password += lowChars.substring(randomNumber2, randomNumber2 + 1);
      password += upChars.substring(randomNumber3, randomNumber3 + 1);
      password += specialChars.substring(randomNumber4, randomNumber4 + 1);
    }
    return password;
  }

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

  static isDinner(date, busyTime) {
    const hours = date.getHours();
    const day = date.getDay();

    let isDinner = true;

    for (const range of busyTime) {
      for (const horario of range.horariosLaborales) {
        for (var i = horario.from; i <= horario.to - 1; i++) {
          if (range.diasLaboralesSegmentados.includes(day) && hours === i) {
            isDinner = false;
          }
        }
      }
    }

    return isDinner;
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

  static hasCoffeeCupIcon(date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return hours === dinnerTime.from && minutes === 0;
  }

  static isValidAppointment(
    component,
    appointmentData,
    workingDays,
    busyTime,
    holidays
  ) {
    const startDate = new Date(appointmentData.startDate);
    const endDate = new Date(appointmentData.endDate);
    const cellDuration = 60;
    return Utils.isValidAppointmentInterval(
      startDate,
      endDate,
      cellDuration,
      workingDays,
      busyTime,
      holidays
    );
  }

  static isValidAppointmentInterval(
    startDate,
    endDate,
    cellDuration,
    workingDays,
    busyTime,
    holidays
  ) {
    const edgeEndDate = new Date(endDate.getTime() - 1);

    if (
      !Utils.isValidAppointmentDate(
        edgeEndDate,
        workingDays,
        busyTime,
        holidays
      )
    ) {
      return false;
    }

    const durationInMs = cellDuration * 60 * 1000;
    const date = startDate;
    while (date <= endDate) {
      if (
        !Utils.isValidAppointmentDate(date, workingDays, busyTime, holidays)
      ) {
        return false;
      }
      const newDateTime = date.getTime() + durationInMs - 1;
      date.setTime(newDateTime);
    }

    return true;
  }

  static isValidAppointmentDate(date, workingDays, busyTime, holidays) {
    return (
      !Utils.isHoliday(date, holidays) &&
      !Utils.isDinner(date, busyTime) &&
      !Utils.isWeekend(date, workingDays)
    );
  }
}
