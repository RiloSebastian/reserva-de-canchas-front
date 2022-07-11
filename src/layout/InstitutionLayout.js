import React from "react";
import MenuBar from "../components/menuBar/MenuBar";
import { ConfirmProvider } from "material-ui-confirm";

const InstitutionLayout = ({ children }) => {
  return (
    <ConfirmProvider>
      <MenuBar />
    </ConfirmProvider>
  );
};
export default InstitutionLayout;
