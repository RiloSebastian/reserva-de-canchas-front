import React from "react";
import Utils from "./utils.js";

export default function DataCell(props) {
  const { startDate } = props.itemData;
  const { workingDays, holidays, busyTime, courtDetails } = props;

  const isDisableDate =
    Utils.isHoliday(startDate, holidays) ||
    Utils.isWeekend(startDate, workingDays);
  const isDinner = Utils.isDinner(startDate, busyTime);

  const noPrice = Utils.getTimePrice(courtDetails, startDate);

  let cssClasses = props.className ? props.className : "";

  if (isDisableDate) {
    cssClasses += " disable-date";
  } else if (isDinner) {
    cssClasses += " dinner";
  } else if (noPrice === 0) {
    cssClasses += " no-price";
  }

  return <div className={cssClasses}>{props.children}</div>;
}
