import React, { forwardRef, useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
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
//import InputLabel from "@mui/material/InputLabel";
//import MenuItem from "@mui/material/MenuItem";
//import FormControl from "@mui/material/FormControl";
//import ListItemText from "@mui/material/ListItemText";
//import Select from "@mui/material/Select";
// import Checkbox from "@mui/material/Checkbox";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";

import Checkbox from "@material-ui/core/Checkbox";
import InputLabel from "@material-ui/core/InputLabel";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import PromocionService from "../../services/promociones/PromocionService";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Stack } from "@mui/material";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: 300,
  },
  indeterminateColor: {
    color: "#f50057",
  },
  selectAllText: {
    fontWeight: 500,
  },
  selectedAll: {
    backgroundColor: "rgba(0, 0, 0, 0.08)",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.08)",
    },
  },
}));

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

const options = ["CLIENTES", "ENTRENADORES"];

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
  const institution = useSelector((state) => state.institution);
  const [data, setData] = useState([
    {
      name: "Promo 1",
      description: "Descuento con Tarjeta de Credito",
      descuento: "10%",
      from: moment().format("L"),
      to: moment().format("L"),
      state: true,
    },
  ]);

  const [openSnackbar, setOpenSnackbar] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    message: "",
    severity: "",
    autoHideDuration: 4000,
  });

  const [personName, setPersonName] = useState([]);

  const classes = useStyles();
  const [selected, setSelected] = useState([]);
  const isAllSelected =
    options.length > 0 && selected.length === options.length;

  const handleCloseSnackbar = (event, reason) => {
    setOpenSnackbar((prevState) => {
      return { ...prevState, open: false };
    });
  };

  const handleChangeBeneficiarios = (event) => {
    console.log("HANDLEANDO BENEFICIARIOS");
    console.log(event);
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      setSelected(selected.length === options.length ? [] : options);
      return;
    }
    setSelected(value);
  };

  const [open, setOpen] = useState(false);

  const [columns, setColumns] = useState([
    {
      title: "Nombre Promocion",
      field: "name",
      validate: (rowData) =>
        rowData.name === undefined ||
        rowData.name === "" ||
        rowData.name.trim() === ""
          ? {
              isValid: false,
              helperText: "El nombre de la promo no puede estar vacio",
            }
          : true,
    },
    {
      title: "Descripcion",
      field: "description",
      validate: (rowData) =>
        rowData.description === undefined ||
        rowData.description === "" ||
        rowData.description.trim() === ""
          ? {
              isValid: false,
              helperText: "La descripcion de la promo no puede estar vacia",
            }
          : true,
    },
    {
      title: "Valido a Partir De",
      field: "from",
      type: "date",
      dateSetting: {
        format: "dd/MM/yyyy",
      },
      validate: (rowData) =>
        rowData.from === undefined
          ? {
              isValid: false,
            }
          : true,
      render: (rowData) => rowData.from,
      editComponent: (props) => (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label="Valido a Partir De"
            inputFormat="dd/MM/yyyy"
            value={props.value}
            //onChange={handleChange}
            onChange={(e) => props.onChange(e)}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      ),
    },
    //{ title: 'Birth Year', field: 'birthYear', type: 'numeric' },
    {
      title: "Valido Hasta",
      field: "to",
      type: "date",
      dateSetting: {
        format: "dd/MM/yyyy",
      },
      validate: (rowData) =>
        rowData.to === undefined
          ? {
              isValid: false,
            }
          : true,
      render: (rowData) => rowData.to,
      editComponent: (props) => (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label="Valido Hasta"
            inputFormat="dd/MM/yyyy"
            value={props.value}
            //onChange={handleChange}
            onChange={(e) => props.onChange(e)}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      ),
    },
    {
      title: "Porcentaje de Descuento",
      field: "discountPercentage",
      type: "numeric",
      validate: (rowData) =>
        rowData.discountPercentage < 0 ||
        rowData.discountPercentage > 100 ||
        rowData.discountPercentage === undefined
          ? {
              isValid: false,
            }
          : true,
      render: (rowData) =>
        rowData.signPercentage === undefined || rowData.signPercentage === 0
          ? "no requiere seña"
          : "% " + rowData.signPercentage,
      editComponent: (props) => (
        <TextField
          id="standard-start-adornment"
          type="number"
          size="small"
          name="discountPercentage"
          value={props.value}
          helperText={
            props.value < 0 || props.value > 100
              ? "El porcentaje de descuento debe ser entre 0 y 100"
              : ""
          }
          error={
            props.value < 0 || props.value > 100 || props.value === undefined
          }
          onChange={(e) => props.onChange(e.target.value)}
          InputProps={{
            inputProps: { min: 0, max: 100 },
            startAdornment: <InputAdornment position="start">%</InputAdornment>,
          }}
          variant="standard"
        />
      ),
    },
    {
      title: "Beneficiarios",
      field: "beneficiarios",
      editComponent: (props) => {
        console.log("MOSTRANDO BENEFICIARIOS EN EDIT COMPONENT");
        console.log(props);
        console.log(selected);
        return (
          <FormControl className={classes.formControl}>
            <InputLabel id="mutiple-select-label">Beneficiarios</InputLabel>
            <Select
              labelId="mutiple-select-label"
              multiple
              value={[props.value]}
              //onChange={handleChangeBeneficiarios}
              onChange={(e) => props.onChange(e.target.value)}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              <MenuItem
                value="all"
                classes={{
                  root: isAllSelected ? classes.selectedAll : "",
                }}
              >
                <ListItemIcon>
                  <Checkbox
                    classes={{ indeterminate: classes.indeterminateColor }}
                    checked={isAllSelected}
                    indeterminate={
                      selected.length > 0 && selected.length < options.length
                    }
                  />
                </ListItemIcon>
                <ListItemText
                  classes={{ primary: classes.selectAllText }}
                  primary="Select All"
                />
              </MenuItem>
              {options.map((option) => (
                <MenuItem key={option} value={option}>
                  <ListItemIcon>
                    <Checkbox checked={selected.indexOf(option) > -1} />
                  </ListItemIcon>
                  <ListItemText primary={option} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      },
    },
  ]);

  const createPromo = async (newPromo) => {
    console.log("newPromo");
    console.log(newPromo);

    let promo = { newPromo };

    try {
      const promoCreated = await PromocionService.create(institution.id, promo);

      const data = promoCreated.data;

      console.log("promo creada");
      console.log(promoCreated);
      console.log(data);
      return data;
    } catch (error) {
      return Promise.reject(error.data);
    }
  };

  const updatePromo = async (promoToUpdated) => {
    console.log("promoToUpdated");
    console.log(promoToUpdated);

    const promo = { promoToUpdated };

    console.log(promo);

    try {
      const promoUpdated = await PromocionService.update(institution.id, promo);
      const data = promoUpdated.data;

      console.log("promo actualizada");
      console.log(promoUpdated);
      console.log(data);
      return data;
    } catch (error) {
      return Promise.reject(error.data);
    }
  };

  const deletePromo = async (id) => {
    const promoDeleted = await PromocionService.remove(institution.id, id);
    const data = promoDeleted.data;
    return data;
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
            new Promise(async (resolve, reject) => {
              const promo = await createPromo(newData)
                .then((promo) => {
                  console.log("agregar promo a la lista");
                  console.log(promo);

                  setData([...data, promo]);

                  setOpenSnackbar({
                    open: true,
                    severity: "success",
                    message: "Promo creada Exitosamente!",
                  });

                  resolve();
                })
                .catch((err) => {
                  console.log("error al agregar promo a la lista");
                  console.log(err);
                  setOpenSnackbar({
                    open: true,
                    severity: "error",
                    message: err.message,
                  });
                  reject();
                });
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise(async (resolve, reject) => {
              const promo = await updatePromo(newData)
                .then((promo) => {
                  console.log("actualizar promo");
                  console.log(promo);

                  const dataUpdate = [...data];
                  const index = oldData.tableData.id;
                  dataUpdate[index] = promo;
                  setData([...dataUpdate]);

                  resolve();
                })
                .catch((err) => {
                  console.log("error al agregar promo a la lista");
                  console.log(err);
                  setOpenSnackbar({
                    open: true,
                    severity: "error",
                    message: err.message,
                  });
                  reject();
                });
            }),
          onRowDelete: (oldData) =>
            new Promise(async (resolve, reject) => {
              console.log("eliminando promo");
              console.log(oldData);

              const promo = await deletePromo(oldData.id);

              const dataDelete = [...data];
              const index = oldData.tableData.id;
              dataDelete.splice(index, 1);
              setData([...dataDelete]);

              resolve();
            }),
        }}
      />
      <div>
        <Stack spacing={2} sx={{ width: "100%" }}>
          <Snackbar
            autoHideDuration={4000}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            open={openSnackbar.open}
            onClose={handleCloseSnackbar}
          >
            <Alert
              severity={openSnackbar.severity}
              onClose={handleCloseSnackbar}
              sx={{ width: "100%" }}
            >
              {openSnackbar.message}
            </Alert>
          </Snackbar>
        </Stack>
      </div>
    </>
  );
};

export default ListaPromociones;
