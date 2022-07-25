import React from "react";
import Utils from "../../../utils/utils";

export default function DateCell(
  children,
  className,
  itemData,
  workingDays,
  busyTimes,
  holidays
) {
  const { startDate } = itemData;
  const isDisableDate =
    Utils.isHoliday(startDate, holidays) ||
    Utils.isWeekend(startDate, workingDays);
  const isDinner = Utils.isDinner(startDate, busyTimes);
  let cssClasses = className ? className : "";

  if (isDisableDate) {
    cssClasses += " disable-date";
  } else if (isDinner) {
    cssClasses += " dinner";
  }

  return <div className={cssClasses}>{children}</div>;
}
