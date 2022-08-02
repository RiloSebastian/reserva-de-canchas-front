import React, { forwardRef, useState, useEffect, Fragment } from "react";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import MaterialTable from "material-table";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import CancelReservationDialog from "./CancelReservationDialog";
import ReservationService from "../../services/reservations/ReservationService";
import SnackbarAlertMessageComponent from "./../ui/SnackbarAlertMessageComponent";
import { cancelReservation } from "../../actions/reservations";
import { useDispatch } from "react-redux";
import moment from "moment";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const NextReservations = ({ nextReservations }) => {
  const [openCancelReservationModal, setOpenCancelReservationModal] =
    useState(false);

  const [selectedReservation, setSelectedReservation] = useState(null);

  const [loading, setLoading] = useState(false);

  const [returnDepositPaid, setReturnDepositPaid] = useState(false);

  const dispatch = useDispatch();

  const [openSnackbar, setOpenSnackbar] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    message: "",
    severity: "",
    autoHideDuration: 4000,
  });

  const [columns, setColumns] = useState([
    { title: "Cancha", field: "name" },
    { title: "Institucion", field: "institucion" },
    { title: "Direccion", field: "direccion" },
    { title: "Fecha", field: "date", initialEditValue: "initial edit value" },
    {
      title: "Seña",
      field: "advancePayment",
      render: (rowData) => `$ ${rowData.advancePayment}`,
    },
    {
      title: "Precio Total",
      field: "price",
      render: (rowData) => `$ ${rowData.price}`,
    },
  ]);

  const [data, setData] = useState([
    {
      id: 1,
      name: "Cancha 1",
      date: "27/5 15:00",
      birthYear: "10:00",
      institucion: "Palermo Tennis",
      direccion: "Santa Fe 1234",
      feedbackSended: false,
      status: "PENDING",
      price: 1200.0,
      advancePayment: 600.0,
      returnableDeposit: true,
    },
    {
      id: 2,
      name: "Cancha 5",
      date: "25/5 19:00",
      birthYear: "18:30",
      institucion: "Futbol Plaza",
      direccion: "Corrientes 2345",
      feedbackSended: false,
      status: "PENDING",
      price: 1800.0,
      advancePayment: 900.0,
      returnableDeposit: false,
    },
  ]);

  const confirmCancelation = (reservation_id) => {
    dispatch(cancelReservation(reservation_id, true))
      .then((data) => {
        console.log("RESERVA CANCELADA");
        setOpenSnackbar({
          open: true,
          severity: "success",
          message: "Reserva Cancelada",
        });
        setOpenCancelReservationModal(false);
        setLoading(false);
      })
      .catch((error) => {
        console.log("ERROR AL CANCELAR LA RESERVA");
        console.log(error);

        let errorMessage = Object.values(error.data).map((error, idx) => (
          <Fragment key={error}>
            {error}
            {<br />}
          </Fragment>
        ));

        setOpenSnackbar({
          open: true,
          severity: "error",
          message: errorMessage
            ? errorMessage
            : "Error al Cancelar, por favor vuelva a intentar mas tarde",
        });
        setOpenCancelReservationModal(false);
        setLoading(false);
      });
  };

  const handleCheckCancellationFee = async (reservation) => {
    console.log("VERIFICAR SI SE LE DEBE DEVOLVER LA SEñA");

    return moment(new Date()).isAfter(reservation.cancelationTime);
  };

  const handleCancelReservation = async (rowData) => {
    console.log("handleCancelReservation");
    console.log(rowData);

    setSelectedReservation(rowData);

    const returnDepositPaid = await handleCheckCancellationFee(rowData);

    console.log("MANEJAR REPUESTA PARA DEVOLVER SEñA");
    console.log(returnDepositPaid);

    /* if (rowData.status !== "CANCELED") {
      setLoading(true);
      setOpenCancelReservationModal(true);
    } */

    if (true) {
      console.log(
        "MOSTRAMOS EL MODAL CON EL MENSAJE SI SE DEVUELVE O NO LA SEñA AL CLIENTE"
      );
      setLoading(true);
      setReturnDepositPaid(returnDepositPaid);
      setOpenCancelReservationModal(true);
    } else {
    }
  };

  const updateRervationStatus = (reservation_id) => {
    console.log("updateRervationStatus");
    console.log(reservation_id);

    setData((existingItems) => {
      return existingItems.map((reservation) => {
        return reservation_id === reservation.reservation_id
          ? { ...reservation, status: "CANCELED" }
          : reservation;
      });
    });
  };

  useEffect(() => {
    //setData(nextReservations);
  }, [nextReservations]);

  return (
    <>
      <MaterialTable
        title="Mis Proximos Turnos"
        localization={{
          pagination: {
            labelDisplayedRows: "{from}-{to} de {count}",
          },
          toolbar: {
            nRowsSelected: "{0} fila(s) seleccionada(s)",
          },
          header: {
            actions: "Opciones",
          },
          body: {
            emptyDataSourceMessage: "Aun no tiene Reservas realizadas",
            filterRow: {
              filterTooltip: "Filter",
            },
          },
        }}
        components={{
          Action: (props) => {
            return (
              <Box sx={{ "& > button": { m: 1 } }}>
                <LoadingButton
                  color={props.data.status !== "CANCELED" ? "error" : "error"}
                  onClick={(event) => props.action.onClick(event, props.data)}
                  loading={
                    loading &&
                    selectedReservation.reservation_id ===
                      props.data.reservation_id &&
                    selectedReservation.status !== "CANCELED"
                  }
                  loadingPosition="start"
                  startIcon={<DeleteIcon />}
                  variant="contained"
                >
                  Cancelar Reserva
                </LoadingButton>
              </Box>
            );
          },
        }}
        onRowClick={(evt, selectedRow) => setSelectedReservation(selectedRow)}
        options={{
          actionsColumnIndex: -1,
        }}
        icons={tableIcons}
        columns={columns}
        data={data}
        actions={[
          {
            onClick: (event, rowData) => handleCancelReservation(rowData),
          },
        ]}
      />
      <CancelReservationDialog
        open={openCancelReservationModal}
        selectedReservation={selectedReservation}
        setOpenCancelReservationModal={setOpenCancelReservationModal}
        updateRervationStatus={updateRervationStatus}
        setLoading={setLoading}
        returnDepositPaid={returnDepositPaid}
        confirmCancelation={confirmCancelation}
      />
      <SnackbarAlertMessageComponent
        openSnackbar={openSnackbar}
        setOpenSnackbar={setOpenSnackbar}
      />
    </>
  );
};

export default NextReservations;
