import React from "react";

const ReservationNoPriceDetails = ({ itemData, timePrice, courtDetails }) => {
  return (
    <div
      className={" no-price"}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        fontWeight: "bold",
      }}
    >
      Sin Precio
    </div>
  );
};

export default ReservationNoPriceDetails;
