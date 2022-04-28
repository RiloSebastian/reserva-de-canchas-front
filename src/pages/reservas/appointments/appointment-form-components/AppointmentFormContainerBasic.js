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
      <AppointmentForm.Label text="Custom Field" type="title" />
      <AppointmentForm.TextEditor
        value={appointmentData.customField}
        onValueChange={onCustomFieldChange}
        placeholder="Custom field"
      />
    </AppointmentForm.BasicLayout>
  );
};

export default AppointmentFormContainerBasic;
