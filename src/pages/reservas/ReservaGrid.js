/* eslint-disable func-style */
import React, { useEffect, useState, Fragment, createRef, useRef } from "react";

import Scheduler, { Resource, View } from "devextreme-react/scheduler";
import notify from "devextreme/ui/notify";

import { data, holidays, priorityData, sportsList } from "./data.js";
import DataCell from "./DataCell.js";
import DataCellMonth from "./DataCellMonth.js";
import DateCell from "./DateCell.js";
import TimeCell from "./TimeCell.js";
import "devextreme/dist/css/dx.light.css";
import Utils from "./utils.js";
import SpeedDialAction from "devextreme-react/speed-dial-action";
import RadioGroup from "devextreme-react/radio-group";
import { useSelector } from "react-redux";

const views = [{ type: "week", maxAppointmentsPerCell: 1 }, "month"];

const notifyDisableDate = () => {
  notify(
    "No se puede crear o mover una reserva a regiones de hora/fecha deshabilitadas.",
    "warning",
    3000
  );
};

const groups = ["sportId"];

function ReservaGrid() {
  const courtList = useSelector((state) => state.court);

  const [currentDate, setCurrentDate] = useState(new Date(2021, 3, 27));
  const [currentView, setCurrentView] = useState(views[0]);
  const [sportSelected, setSportSelected] = useState("");
  const [sports, setSports] = useState([]);
  const [courts, setCourts] = useState(priorityData);

  const onAppointmentFormOpening = (e) => {
    console.log("ABRIENDO FORM");
    console.log(e);
    const startDate = new Date(e.appointmentData.startDate);
    if (!Utils.isValidAppointmentDate(startDate)) {
      e.cancel = true;
      notifyDisableDate();
    }
    applyDisableDatesToDateEditors(e.form);

    e.popup.option("showTitle", true);
    e.popup.option(
      "title",
      e.appointmentData.text
        ? e.appointmentData.text
        : "Crear una Nueva Reserva"
    );

    const form = e.form;
    let mainGroupItems = form
      .itemOption("mainGroup")
      .items.filter(
        (mainGroupItem) => mainGroupItem.dataField !== "description"
      );
    console.log("CAMPOS DEL FORM");
    console.log(mainGroupItems);
    mainGroupItems = mainGroupItems.map((mainGroupItem) => {
      if (mainGroupItem.dataField == "text") {
        return {
          ...mainGroupItem,
          label: { text: "Nombre y Apellido" },
          validationRules: [{ type: "required" }],
        };
      } else {
        return mainGroupItem;
      }
    });

    /* if (
      !mainGroupItems.find(function (i) {
        return i.dataField === "phone";
      })
    ) {
      mainGroupItems.push({
        colSpan: 2,
        label: { text: "Numero de Telefono" },
        editorType: "dxTextBox",
        dataField: "phone",
        validationRules: [{ type: "required" }],
      });
      form.itemOption("mainGroup", "items", mainGroupItems);
    } */

    if (
      !mainGroupItems.find(function (i) {
        return i.dataField === "email";
      })
    ) {
      mainGroupItems.push({
        colSpan: 2,
        label: { text: "Correo Electronico" },
        editorType: "dxTextBox",
        dataField: "email",
        validationRules: [{ type: "required" }],
      });
      form.itemOption("mainGroup", "items", mainGroupItems);
    }
  };

  const onAppointmentAdding = (e) => {
    const isValidAppointment = Utils.isValidAppointment(
      e.component,
      e.appointmentData
    );
    if (!isValidAppointment) {
      e.cancel = true;
      notifyDisableDate();
    }
  };

  const onAppointmentUpdating = (e) => {
    const isValidAppointment = Utils.isValidAppointment(e.component, e.newData);
    if (!isValidAppointment) {
      e.cancel = true;
      notifyDisableDate();
    }
  };

  const onCurrentViewChange = (value) => setCurrentView(value);

  const onRadioGroupValueChanged = (args) => {
    console.log("CAMBIANDO DEPORTE");
    console.log(args.value);
    setSportSelected(args.value);
  };

  const onOptionChanged = (e) => {
    if (e.name === "currentDate") {
      setCurrentDate(e.value);
    }
  };

  const applyDisableDatesToDateEditors = (form) => {
    const startDateEditor = form.getEditor("startDate");
    startDateEditor.option("disabledDates", holidays);

    const endDateEditor = form.getEditor("endDate");
    endDateEditor.option("disabledDates", holidays);
  };

  const renderDataCell = (itemData) => {
    const CellTemplate = currentView === "month" ? DataCellMonth : DataCell;

    return <CellTemplate itemData={itemData} />;
  };

  const renderDateCell = (itemData) => <DateCell itemData={itemData} />;

  const renderTimeCell = (itemData) => <TimeCell itemData={itemData} />;

  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    console.log(
      "[SPORT-SELECTED] DEVUELVO LAS CANCHAS PARA EL DEPORTE " + sportSelected
    );
    console.log(courtList);
    const courtFilteredBySport = courtList
      .filter((court) => court.sport === sportSelected)
      .map((c) => {
        return { ...c, text: c.name };
      });

    console.log(courtFilteredBySport);
    setCourts(courtFilteredBySport);
  }, [sportSelected]);

  useEffect(() => {
    console.log(
      "[CONSTRUCTOR] DEVUELVO LAS CANCHAS PARA EL DEPORTE " + sportSelected
    );

    console.log(courtList);

    const sportsByInstitutions = courtList
      .map((item) => item.sport)
      .filter((value, index, self) => self.indexOf(value) === index);

    setSportSelected(sportsByInstitutions[0]);

    setSports(sportsByInstitutions);

    const courtFilteredBySport = courtList
      .filter((court) => court.sport === sportSelected)
      .map((c) => {
        return { ...c, text: c.name };
      });

    console.log(courtFilteredBySport);
    setCourts(courtFilteredBySport);
  }, []);

  return (
    <body class="dx-viewport">
      <div class="demo-container">
        <React.Fragment>
          <div className="options">
            <div className="caption">Grilla de Reservas</div>
            <div className="option">
              <RadioGroup
                items={sports}
                value={sportSelected}
                layout="horizontal"
                onValueChanged={onRadioGroupValueChanged}
              />
            </div>
          </div>
          <Scheduler
            dataSource={data}
            groups={groups}
            views={views}
            defaultCurrentDate={currentDate}
            currentView={currentView}
            showCurrentTimeIndicator={true}
            onCurrentViewChange={onCurrentViewChange}
            onOptionChanged={onOptionChanged}
            height={600}
            showAllDayPanel={false}
            firstDayOfWeek={0}
            startDayHour={8}
            endDayHour={23}
            cellDuration={60}
            dataCellRender={renderDataCell}
            dateCellRender={renderDateCell}
            timeCellRender={renderTimeCell}
            onAppointmentFormOpening={onAppointmentFormOpening}
            onAppointmentAdding={onAppointmentAdding}
            onAppointmentUpdating={onAppointmentUpdating}
          >
            <Resource
              fieldExpr="sportId"
              allowMultiple={false}
              dataSource={courts}
              label="Cancha"
            />
          </Scheduler>
        </React.Fragment>
      </div>
    </body>
  );
}

export default ReservaGrid;
