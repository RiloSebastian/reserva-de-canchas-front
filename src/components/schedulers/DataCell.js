import React from "react";
import Utils from "../../utils/utils";
import ReservationDetails from "../ui/devexpress/ReservationDetails";

export default function DataCell({
  children,
  className,
  itemData,
  isDisableDate,
  isDinner
  // workingDays,
  // busyTimes
}) {
  /* const { startDate } = itemData;
  const isDisableDate =
    Utils.isHoliday(startDate) || Utils.isWeekend(startDate, workingDays);
  const isDinner = Utils.isDinner(startDate, busyTimes); */
  let cssClasses = className ? className : "";

  if (isDisableDate) {
    cssClasses += " disable-date";
  } else if (isDinner) {
    cssClasses += " dinner";
  } else {
    return <ReservationDetails />;
  }
  return <div className={cssClasses}>{children}</div>;
}
