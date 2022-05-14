import { Delete } from "@material-ui/icons";
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
import React, { forwardRef, useState } from "react";
import FormularioHorarioPrecioCancha from "../../components/formularios-datos/FormularioHorarioPrecioCancha";

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

const ListaPromociones = () => {
  const [open, setOpen] = useState(false);

  const [columns, setColumns] = useState([
    { title: "Nombre Promocion", field: "name" },
    {
      title: "Descripcion",
      field: "description",
      initialEditValue: "initial edit value",
    },
    //{ title: 'Birth Year', field: 'birthYear', type: 'numeric' },
    { title: "Porcentaje de Descuento", field: "descuento" },
  ]);

  const [data, setData] = useState([
    {
      name: "Promo 1",
      description: "Descuento con Tarjeta de Credito",
      descuento: "10%",
    },
    {
      name: "Promo 2",
      description: "Descuento en Canchas de Tenis",
      descuento: "20%",
    },
    {
      name: "Promo 3",
      description: "Descuento pack mensual",
      descuento: "15%",
    },
  ]);

  const desplegarModal = () => {
    setOpen(true);
  };

  return (
    <>
      <MaterialTable
        icons={tableIcons}
        title="Listado de Promociones"
        columns={columns}
        data={data}
        options={{
          selection: true,
          grouping: true,
          filtering: true,
        }}
        detailPanel={[
          {
            tooltip: "Show Name",
            render: (rowData) => {
              return (
                <div
                  style={{
                    fontSize: 100,
                    textAlign: "center",
                    color: "white",
                    backgroundColor: "#43A047",
                  }}
                >
                  {rowData.name}
                </div>
              );
            },
          },
        ]}
        actions={[
          {
            tooltip: "Eliminar todas las canchas seleccionadas",
            icon: Delete,
            onClick: (evt, data) =>
              alert("You want to delete " + data.length + " rows"),
          },
          {
            tooltip: "Editar Horarios",
            icon: Edit,
            onClick: (evt, data) =>
              alert("You want to delete " + data.length + " rows"),
          },
        ]}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                setData([...data, newData]);

                resolve();
              }, 1000);
            }),
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
      {open && <FormularioHorarioPrecioCancha open={open} setOpen={setOpen} />}
    </>
  );
};

export default ListaPromociones;
