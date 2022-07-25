import React from "react";

const ReservationDetails = ({ itemData, timePrice, courtDetails }) => {
  return (
    <div style={{ textAlign: "center", fontWeight: "bold" }}>$ {timePrice}</div>
  );
};

export default ReservationDetails;
