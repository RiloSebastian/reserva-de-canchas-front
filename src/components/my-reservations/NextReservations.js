import React, { forwardRef, useState } from "react";
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

const NextReservations = () => {
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

  return (
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
      icons={tableIcons}
      columns={columns}
      data={data}
      editable={{
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataUpdate = [...data];
              const index = oldData.tableData.id;
              dataUpdate[index] = newData;
              setData([...dataUpdate]);

              resolve();
            }, 1000);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataDelete = [...data];
              const index = oldData.tableData.id;
              dataDelete.splice(index, 1);
              setData([...dataDelete]);

              resolve();
            }, 1000);
          }),
      }}
    />
  );
};

export default NextReservations;
