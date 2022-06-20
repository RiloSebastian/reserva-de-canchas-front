import React from 'react';
import Utils from '../../utils/utils';

export default function DateCell(
    itemData,
    workingDays,) {
    const { date, text } = itemData;
    const isWeekend = Utils.isWeekend(date, workingDays);

    return (
        <div className={isWeekend ? 'disable-date' : null}>
            <div>{text}</div>
        </div>
    );
}
