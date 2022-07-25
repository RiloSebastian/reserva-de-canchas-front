import React from "react";
import Utils from "../../utils/utils";
import ReservationDetails from "../ui/devexpress/ReservationDetails";

export default function DataCell({
  children,
  className,
  itemData,
  isDisableDate,
  isDinner,
  timePrice,
  courtDetails,
  // workingDays,
  // busyTimes
}) {
  let cssClasses = className ? className : "";

  if (isDisableDate) {
    cssClasses += " disable-date";
  } else if (isDinner) {
    cssClasses += " dinner";
  } else if (timePrice === 0) {
    cssClasses += " no-price";
  } else {
    return (
      <ReservationDetails
        itemData={itemData}
        timePrice={timePrice}
        courtDetails={courtDetails}
      />
    );
  }
  return <div className={cssClasses}>{children}</div>;
}
