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
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useHistory } from "react-router-dom";
import { BASE_URL_INSTITUTIONS } from "../routes";

// Dictionaries for German language
import esMessages from "devextreme/localization/messages/es.json";

import { locale, loadMessages } from "devextreme/localization";
import moment from "moment";

const PREFIX = "Demo";

const classes = {
  cell: `${PREFIX}-cell`,
  content: `${PREFIX}-content`,
  text: `${PREFIX}-text`,
  textWeek: `${PREFIX}-textWeek`,
  sun: `${PREFIX}-sun`,
  cloud: `${PREFIX}-cloud`,
  rain: `${PREFIX}-rain`,
  sunBack: `${PREFIX}-sunBack`,
  cloudBack: `${PREFIX}-cloudBack`,
  rainBack: `${PREFIX}-rainBack`,
  opacity: `${PREFIX}-opacity`,
  appointment: `${PREFIX}-appointment`,
  apptContent: `${PREFIX}-apptContent`,
  flexibleSpace: `${PREFIX}-flexibleSpace`,
  flexContainer: `${PREFIX}-flexContainer`,
  tooltipContent: `${PREFIX}-tooltipContent`,
  tooltipText: `${PREFIX}-tooltipText`,
  title: `${PREFIX}-title`,
  icon: `${PREFIX}-icon`,
  circle: `${PREFIX}-circle`,
  textCenter: `${PREFIX}-textCenter`,
  dateAndTitle: `${PREFIX}-dateAndTitle`,
  titleContainer: `${PREFIX}-titleContainer`,
  container: `${PREFIX}-container`,
  weekendCell: `${PREFIX}-weekendCell`,
  weekendCellAvailable: `${PREFIX}-weekendCellAvailable`,
  weekEnd: `${PREFIX}-weekEnd`,
  nonWorkingCell: `${PREFIX}-nonWorkingCell`,
};

const views = [{ type: "week", maxAppointmentsPerCell: 1 }, "month"];

const notifyDisableDate = () => {
  notify(
    "No se puede crear o mover una reserva a regiones de hora/fecha deshabilitadas.",
    "warning",
    3000
  );
};

const notifyNoCourtsAvailable = () => {
  notify(
    "No se puede crear o mover si no hay canchas habilitadas",
    "error",
    3000
  );
};

const groups = ["sportId"];

function ReservaGrid() {
  const [loading, setLoading] = useState(true);
  const [isAdminRole, setIsAdminRole] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const institution = useSelector((state) => state.institution);
  const courtList = useSelector((state) => state.court);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState(views[0]);
  const [sportSelected, setSportSelected] = useState("");
  const [sports, setSports] = useState([]);
  const [courts, setCourts] = useState(priorityData);
  const [workingDays, setWorkingDays] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [startDayHour, setStartDayHour] = useState(
    moment(institution.scheduleMinTime).hour()
  );
  const [endDayHour, setEndDayHour] = useState(
    moment(institution.scheduleMaxTime).hour()
  );

  const onAppointmentFormOpening = (e) => {
    console.log("ABRIENDO FORM");
    console.log(e);
    const startDate = new Date(e.appointmentData.startDate);
    if (!Utils.isValidAppointmentDate(startDate, workingDays, holidays)) {
      e.cancel = true;
      notifyDisableDate();
    } else if (!courtList || courtList.length === 0) {
      e.cancel = true;
      notifyNoCourtsAvailable();
    }
    applyDisableDatesToDateEditors(e.form);

    e.popup.option("showTitle", true);
    e.popup.option(
      "title",
      e.appointmentData.text
        ? e.appointmentData.text
        : "Crear una Nueva Reserva"
    );

    /*   const courtDetails = courts.filter(
      (court) => court.id === groupingInfo[0].id
    )[0];

    const timePrice = Utils.getTimePrice(courtDetails, e.appointmentData); */

    const timePrice = 150;

    const form = e.form;
    let mainGroupItems = form
      .itemOption("mainGroup")
      .items.filter(
        (mainGroupItem) => mainGroupItem.dataField !== "description"
      );
    console.log("CAMPOS DEL FORM");
    console.log(mainGroupItems);

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
        return i.dataField === "price";
      })
    ) {
      mainGroupItems.push({
        colSpan: 2,
        label: { text: "Precio" },
        editorType: "dxNumberBox",
        dataField: "price",
        editorOptions: { value: 2000, disabled: true },
        validationRules: [{ type: "required" }],
      });
      form.itemOption("mainGroup", "items", mainGroupItems);
    }

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

    form.itemOption(
      "mainGroup",
      "items",
      mainGroupItems.map((mainGroupItem) => {
        if (mainGroupItem.dataField == "text") {
          return {
            ...mainGroupItem,
            label: { text: "Nombre y Apellido" },
            validationRules: [{ type: "required" }],
          };
        } else {
          return mainGroupItem;
        }
      })
    );
  };

  const onAppointmentAdding = (e) => {
    const isValidAppointment = Utils.isValidAppointment(
      e.component,
      e.appointmentData,
      workingDays,
      holidays
    );
    if (!isValidAppointment) {
      e.cancel = true;
      notifyDisableDate();
    }
  };

  const onAppointmentUpdating = (e) => {
    const isValidAppointment = Utils.isValidAppointment(
      e.component,
      e.newData,
      workingDays,
      holidays
    );
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

    return (
      <CellTemplate
        itemData={itemData}
        workingDays={workingDays}
        holidays={holidays}
      />
    );
  };

  const renderDateCell = (itemData) => (
    <DateCell itemData={itemData} workingDays={workingDays} />
  );

  const renderTimeCell = (itemData) => <TimeCell itemData={itemData} />;

  let history = useHistory();
  const handleRedirectToConfig = () => {
    history.push({
      pathname: BASE_URL_INSTITUTIONS.base + "/configuracion",
      state: "data sended",
    });
  };

  const renderCourtPage = () => {
    history.push("/dashboard/canchas");
  };

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
    loadMessages(esMessages);
    locale("es-ES");
    console.log(
      "[CONSTRUCTOR] DEVUELVO LAS CANCHAS PARA EL DEPORTE " + sportSelected
    );
    const role = user.roles[0];
    if (role === "ROLE_ADMIN") {
      setIsAdminRole(true);
    } else {
      setIsAdminRole(false);
    }

    if (institution.schedules) {
      institution.schedules.forEach((schedule) => {
        schedule.daysAvailable.forEach((diaLaboral) => {
          switch (diaLaboral) {
            case "MIERCOLES":
              diaLaboral = "miércoles";
              break;
            case "SABADO":
              diaLaboral = "sábado";
              break;
            default:
              diaLaboral = diaLaboral.toLowerCase();
          }

          setWorkingDays((prevState) => {
            return [...prevState, moment().day(diaLaboral).day()];
          });
        });
      });
    }

    if (institution.freeDays && institution.freeDays.length > 0) {
      let newDateArray = [];

      institution.freeDays.forEach((day) => {
        newDateArray.push(new Date(moment(day).format("YYYY-MM-DD")));
      });

      setHolidays(newDateArray);
    }

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
    setLoading(false);
  }, []);

  return loading ? (
    <Box sx={{ display: "flex" }}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" disableShrink />
      </Backdrop>
    </Box>
  ) : institution.schedules && institution.schedules.length > 0 ? (
    <>
      <Paper>
        <body class="dx-viewport">
          <div class="demo-container">
            <React.Fragment>
              <div className="options">
                <div className="caption">Grilla de Reservas</div>
                {courtList && courtList.length > 0 ? (
                  <div className="option">
                    <RadioGroup
                      items={sports}
                      value={sportSelected}
                      layout="horizontal"
                      onValueChanged={onRadioGroupValueChanged}
                    />
                  </div>
                ) : (
                  <Paper>
                    <Box
                      width="100%"
                      top={0}
                      p={4}
                      zIndex="modal"
                      color="textSecondary"
                      bgcolor="background.header"
                    >
                      <Container maxWidth="md" className={classes.container}>
                        <Typography
                          variant="h5"
                          component="h2"
                          gutterBottom={true}
                          className={classes.header}
                        >
                          La Institucion aun no Posee Canchas Registradas
                        </Typography>
                        {isAdminRole ? (
                          <>
                            <Typography
                              variant="subtitle1"
                              color="textSecondary"
                              paragraph={true}
                            >
                              Haga Click en el siguiente Boton para crear su
                              primer Cancha
                            </Typography>
                            <Button
                              onClick={renderCourtPage}
                              variant="contained"
                              color="primary"
                              className={classes.action}
                            >
                              Ir al Menu de Canchas
                            </Button>
                          </>
                        ) : (
                          <Typography
                            variant="subtitle1"
                            color="textSecondary"
                            paragraph={true}
                          >
                            Por favor, pongase en Contacto con un Administrador
                            para agregar canchas a la institucion
                          </Typography>
                        )}
                      </Container>
                    </Box>
                  </Paper>
                )}
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
                startDayHour={startDayHour}
                endDayHour={endDayHour}
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
      </Paper>
    </>
  ) : (
    <>
      {(!institution.schedules || institution.schedules.length === 0) && (
        <Paper>
          <Box
            width="100%"
            top={0}
            p={4}
            zIndex="modal"
            color="textSecondary"
            bgcolor="background.header"
          >
            <Container maxWidth="md" className={classes.container}>
              <Typography
                variant="h5"
                component="h2"
                gutterBottom={true}
                className={classes.header}
              >
                La institucion aun no posee horarios de apertura y cierre
                cargados
              </Typography>
              {isAdminRole ? (
                <>
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    paragraph={true}
                  >
                    Por favor agregue los horarios en el panel de
                    configuraciones
                  </Typography>
                  <Button
                    onClick={handleRedirectToConfig}
                    variant="contained"
                    color="primary"
                    className={classes.action}
                  >
                    Ir a Panel de Configuracion
                  </Button>
                </>
              ) : (
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  paragraph={true}
                >
                  Por favor, pongase en Contacto con un Administrador para
                  agregar los horarios a la institucion
                </Typography>
              )}
            </Container>
          </Box>
        </Paper>
      )}
      <br />
      {(!courtList || courtList.length === 0) && (
        <Paper>
          <Box
            width="100%"
            top={0}
            p={4}
            zIndex="modal"
            color="textSecondary"
            bgcolor="background.header"
          >
            <Container maxWidth="md" className={classes.container}>
              <Typography
                variant="h5"
                component="h2"
                gutterBottom={true}
                className={classes.header}
              >
                La Institucion aun no Posee Canchas Registradas
              </Typography>
              {isAdminRole ? (
                <>
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    paragraph={true}
                  >
                    Haga Click en el siguiente Boton para crear su primer Cancha
                  </Typography>
                  <Button
                    onClick={renderCourtPage}
                    variant="contained"
                    color="primary"
                    className={classes.action}
                  >
                    Ir al Menu de Canchas
                  </Button>
                </>
              ) : (
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  paragraph={true}
                >
                  Por favor, pongase en Contacto con un Administrador para
                  agregar canchas a la institucion
                </Typography>
              )}
            </Container>
          </Box>
        </Paper>
      )}
    </>
  );
}

export default ReservaGrid;
