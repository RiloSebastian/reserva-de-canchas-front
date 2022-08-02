export function getNextFromTimeForInstitution(dateTimes) {
  const maxDateTime = new Date(
    Math.max(...dateTimes.map((e) => new Date(e.to)))
  );

  console.log("MAXIMO HORARIO ENCONTRADO");
  console.log(maxDateTime);

  return maxDateTime;
}

export function getNextFromTime(dateTimes) {
  const maxDateTime = new Date(
    Math.max(...dateTimes.map((e) => new Date(e.timeFrame.to)))
  );

  console.log("MAXIMO HORARIO ENCONTRADO");
  console.log(maxDateTime);

  return maxDateTime;
}

export function getNextUpToTime(dateTimes) {
  const minDateTime = new Date(
    Math.min(...dateTimes.map((e) => new Date(e.timeFrame.from)))
  );

  console.log("MINIMO HORARIO ENCONTRADO");
  console.log(minDateTime);

  return minDateTime;
}

export function validateStartDayTime(startDayHour, startDayTime) {
  console.log("COMPARO " + startDayHour + " CON " + startDayTime);

  if (startDayHour === null || startDayHour === undefined) {
    return startDayTime;
  }

  return startDayTime < startDayHour ? startDayTime : startDayHour;
}

export function validateEndtDayTime(endDayHour, endDayTime) {
  console.log("COMPARO " + endDayHour + " CON " + endDayTime);
  if (endDayHour === null || endDayHour === undefined) {
    return endDayTime;
  }

  return endDayTime > endDayHour ? endDayTime : endDayHour;
}
