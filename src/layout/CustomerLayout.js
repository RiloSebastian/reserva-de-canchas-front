import React from "react";
import MenuBar from "../components/menuBar/MenuBar";
import { ConfirmProvider } from "material-ui-confirm";

const CustomerLayout = () => {
  return <ConfirmProvider><MenuBar /></ConfirmProvider>;
};

export default CustomerLayout;
