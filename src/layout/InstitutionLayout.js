import React from "react";
import MenuBar from "../components/menuBar/MenuBar";

const InstitutionLayout = ({ children }) => {
  //return <MenuBar />;
  return (
    <React.Fragment>
      <MenuBar />
      {children}
    </React.Fragment>
  );
};
export default InstitutionLayout;
