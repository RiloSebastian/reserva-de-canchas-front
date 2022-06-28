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
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

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
  const [personName, setPersonName] = useState([]);

  const handleChange = (event) => {
    console.log("actualizando beneficiarios")
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const [open, setOpen] = useState(false);

  const [columns, setColumns] = useState([
    { title: "Nombre Promocion", field: "name" },
    {
      title: "Descripcion",
      field: "description",
    },
    //{ title: 'Birth Year', field: 'birthYear', type: 'numeric' },
    { title: "Porcentaje de Descuento", field: "descuento" },
    {
      title: "Beneficiarios", field: "beneficiarios", editComponent: props => (
        <div>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-checkbox-label">Beneficiarios</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={personName}
              onChange={handleChange}
              input={<OutlinedInput label="Beneficiarios" />}
              renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}
            >
              {names.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={personName.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      )
    },
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
