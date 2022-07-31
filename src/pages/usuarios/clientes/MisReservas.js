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
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import React, { useState, useEffect, forwardRef } from "react";
import HistoryReservations from "../../../components/my-reservations/HistoryReservations";
import NextReservations from "../../../components/my-reservations/NextReservations";
import ReservationService from "../../../services/reservations/ReservationService";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { retrieveCustomerReservations } from "../../../actions/reservations";

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

const MisReservas = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();

  const [columns, setColumns] = useState([
    { title: "Cancha", field: "name" },
    { title: "Institucion", field: "institucion" },
    { title: "Direccion", field: "direccion" },
    {
      title: "Fecha",
      field: "surname",
      initialEditValue: "initial edit value",
    },
    { title: "Horario", field: "birthYear", type: "numeric" },
  ]);

  const [data, setData] = useState([
    {
      name: "Cancha 1",
      surname: "27/4 10:00",
      birthYear: "10:00",
      institucion: "Palermo Tennis",
      direccion: "Santa Fe 1234",
    },
    {
      name: "Cancha 5",
      surname: "30/4 18:30",
      birthYear: "18:30",
      institucion: "Futbol Plaza",
      direccion: "Corrientes 2345",
    },
  ]);

  const [nextReservations, setNextReservations] = useState([]);

  const [historyReservations, setHistoryReservations] = useState([]);

  const getCustomerReservations = async (customerId) => {
    dispatch(retrieveCustomerReservations(customerId))
      .then((reservas) => {
        //SEPARAR RESERVAS EN PENDIENTES Y FINALIZADAS
        console.info("SEPARAR RESERVAS EN PENDIENTES Y FINALIZADAS");

        setNextReservations(reservas);
        setHistoryReservations(reservas);
        return reservas;
      })
      .catch((err) => err);
  };

  useEffect(() => {
    getCustomerReservations(user.id);
  }, []);

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: 2,
        }}
      >
        <Container
          sx={{
            margin: 0,
          }}
          maxWidth="100%"
        >
          <NextReservations
            nextReservations={nextReservations}
            setNextReservations={setNextReservations}
          />
        </Container>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: 2,
        }}
      >
        <Container
          sx={{
            margin: 0,
          }}
          maxWidth="100%"
        >
          <HistoryReservations
            historyReservations={historyReservations}
            setHistoryReservations={setHistoryReservations}
          />
        </Container>
      </Box>
    </>
  );
};

export default MisReservas;
