import React from "react";
import { AppointmentForm } from "@devexpress/dx-react-scheduler-material-ui";

const AppointmentFormContainerBasic = ({
  onFieldChange,
  appointmentData,
  ...restProps
}) => {
  const onCustomFieldChange = (nextValue) => {
    onFieldChange({ customField: nextValue });
  };

  return (
    <AppointmentForm.BasicLayout
      appointmentData={appointmentData}
      onFieldChange={onFieldChange}
      {...restProps}
    >
      <AppointmentForm.Label text="Correo Electronico" type="title" />
      <AppointmentForm.TextEditor
        value={appointmentData.customField}
        onValueChange={onCustomFieldChange}
        placeholder="Correo Electronico"
      />
    </AppointmentForm.BasicLayout>
  );
};

export default AppointmentFormContainerBasic;
