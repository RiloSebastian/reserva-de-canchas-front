import React from "react";
import Utils from "../../../utils/utils";

export default function TimeCell({ itemData, busyTime }) {
  const { date, text } = itemData;
  const isDinner = Utils.isDinner(date, busyTime);
  const hasCoffeeCupIcon = Utils.hasCoffeeCupIcon(date);

  return (
    <div className={isDinner ? "dinner" : null}>
      {text}
      {hasCoffeeCupIcon ? <div className="cafe" /> : null}
    </div>
  );
}
