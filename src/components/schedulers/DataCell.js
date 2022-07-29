import React from "react";
import ReservationDetails from "../ui/devexpress/ReservationDetails";
import ReservationNoPriceDetails from "../ui/devexpress/ReservationNoPriceDetails";

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
    return (
      <ReservationNoPriceDetails
        itemData={itemData}
        timePrice={timePrice}
        courtDetails={courtDetails}
      />
    );
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
