import React from "react";
import Utils from "./utils.js";

export default function DataCell(props) {
  const { startDate } = props.itemData;
  const { workingDays, holidays, busyTime } = props;

  const isDisableDate =
    Utils.isHoliday(startDate, holidays) ||
    Utils.isWeekend(startDate, workingDays);
  const isDinner = Utils.isDinner(startDate, busyTime);

  let cssClasses = props.className ? props.className : "";

  if (isDisableDate) {
    cssClasses += " disable-date";
  } else if (isDinner) {
    cssClasses += " dinner";
  }

  return <div className={cssClasses}>{props.children}</div>;
}
