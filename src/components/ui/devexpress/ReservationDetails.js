import React from "react";

const ReservationDetails = ({ itemData, timePrice, courtDetails }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        fontWeight: "bold",
      }}
    >
      $ {timePrice}
    </div>
  );
};

export default ReservationDetails;
