export function getNextFromTime(dateTimes) {
  const maxDateTime = new Date(
    Math.max(...dateTimes.map((e) => new Date(e.to)))
  );

  console.log("MAXIMO DIA ENCONTRADO");
  console.log(maxDateTime);

  return maxDateTime;
}
