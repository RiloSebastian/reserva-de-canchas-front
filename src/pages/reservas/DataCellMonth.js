import React from "react";
import DataCell from "./DataCell.js";

export default function DataCellMonth({ itemData, workingDays, holidays }) {
  const day = itemData.startDate.getDate();

  return (
    <DataCell
      itemData={itemData}
      workingDays={workingDays}
      holidays={holidays}
      className="dx-scheduler-date-table-cell-text"
    >
      {day}
    </DataCell>
  );
}
