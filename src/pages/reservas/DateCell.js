import React from "react";
import Utils from "./utils.js";

export default function DateCell(props) {
  const { date, text } = props.itemData;
  const { workingDays } = props;
  const isWeekend = Utils.isWeekend(date, workingDays);

  const hasNoPrice = Utils.checkPrice(props);

  return (
    <div className={isWeekend ? "disable-date" : null}>
      <div>{text}</div>
    </div>
  );
}
