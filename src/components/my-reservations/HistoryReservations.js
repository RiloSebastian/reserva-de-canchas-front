import React, { useEffect, useState, forwardRef } from "react";
import MaterialTable from "material-table";
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
import { Delete } from "@material-ui/icons";
import Button from "@mui/material/Button";
import { Divider } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import StarHalfIcon from '@mui/icons-material/StarHalf';
import Chip from '@mui/material/Chip';
import RatingDialog from "../rating/RatingDialog";
import DoneIcon from "@mui/icons-material/Done";

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

const HistoryReservations = () => {

    const [openFeedbackModal, setOpenFeedbackModal] = useState(false);

    //const [feedbackSended, setFeedbackSended] = useState(false);

    const [reservationFeedback, setReservationFeedback] = useState({});


    const [columns, setColumns] = useState([
        { title: "Cancha", field: "name" },
        { title: "Institucion", field: "institucion" },
        { title: "Direccion", field: "direccion" },
        { title: "Fecha", field: "date", initialEditValue: "initial edit value" },

    ]);

    const [data, setData] = useState([
        {
            reservation_id: 1,
            name: "Cancha 1",
            date: "23/2 15:00",
            birthYear: "10:00",
            institucion: "Palermo Tennis",
            direccion: "Santa Fe 1234",
            feedbackSended: false,
        },
        {
            reservation_id: 2,
            name: "Cancha 5",
            date: "15/5 19:00",
            birthYear: "18:30",
            institucion: "Futbol Plaza",
            direccion: "Corrientes 2345",
            feedbackSended: false,
        },
    ]);

    const handleGiveFeedback = (rowData) => {

        console.log("handleGiveFeedback");
        console.log(rowData);

        if (!rowData.feedbackSended) {
            setReservationFeedback(rowData);
            setOpenFeedbackModal(true);
        }

    }

    const updateFeedback = reservation_id => {

        console.log("updateFeedback");
        console.log(reservation_id);

        setData(existingItems => {
            return existingItems.map((reservation) => {
                return reservation_id === reservation.reservation_id ?
                    { ...reservation, feedbackSended: true } : reservation
            })
        })
    }

    return (
        <>
            <MaterialTable
                title="Mis Turnos Finalizados"
                localization={{
                    pagination: {
                        labelDisplayedRows: "{from}-{to} de {count}",
                    },
                    toolbar: {
                        nRowsSelected: "{0} fila(s) seleccionada(s)",
                    },
                    header: {
                        actions: "Feedback",
                    },
                    body: {
                        emptyDataSourceMessage: "Aun no tiene Reservas realizadas",
                        filterRow: {
                            filterTooltip: "Filter",
                        },
                    },
                }}
                icons={tableIcons}
                columns={columns}
                data={data}
                actions={[
                    {
                        icon: 'save',
                        tooltip: 'Save User',
                        onClick: (event, rowData) => handleGiveFeedback(rowData)
                    }
                ]}
                components={{
                    Action: props => (
                        <Chip
                            onClick={(event) => props.action.onClick(event, props.data)}

                            onDelete={
                                props.data.feedbackSended && (() => { })
                            }
                            color={
                                props.data.feedbackSended
                                    ? "success"
                                    : "info"
                            }
                            clickable={
                                !props.data.feedbackSended
                            }
                            deleteIcon={<DoneIcon />}
                            label={
                                props.data.feedbackSended
                                    ? "Feedback Enviado"
                                    : "Calificar Institucion"
                            }
                        />
                    ),
                }}
                options={{
                    actionsColumnIndex: -1
                }}
            />
            < RatingDialog open={openFeedbackModal} setOpenFeedbackModal={setOpenFeedbackModal} reservationFeedback={reservationFeedback} updateFeedback={updateFeedback} />
        </>
    );
};

export default HistoryReservations;
