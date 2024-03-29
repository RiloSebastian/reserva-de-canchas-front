import { MenuItem, Select } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
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
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { Stack } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Snackbar from "@mui/material/Snackbar";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import MaterialTable from "material-table";
import React, { forwardRef, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  createCourt,
  deleteCourt,
  setCourtSchedules,
  updateCourt,
} from "../../actions/court";
import { retrieveSports } from "../../actions/sports";
import { UPDATE_COURT_SCHEDULES } from "../../actions/types";
import ChipCourtState from "../../components/employees/ChipCourtState";
import FormularioHorarioPrecioCancha from "../../components/formularios-datos/FormularioHorarioPrecioCancha";
import UploadPhotos from "../../components/ui/UploadPhotos";
import CourtsDetails from "./CourtsDetails";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
  },
  gridList: {
    flexWrap: "nowrap",
  },
}));

const InputImage = styled("input")({
  display: "none",
});

const ListaCanchas = ({ institutionId }) => {
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
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
      <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  };
  const editActionRef = React.useRef();

  const dispatch = useDispatch();

  const institution = useSelector((state) => state.institution);

  const courts = useSelector((state) => state.court);

  const sportsData = useSelector((state) => state.sports);

  const history = useHistory();

  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const [openSnackbar, setOpenSnackbar] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    message: "",
    severity: "",
    autoHideDuration: 4000,
  });

  const [sportArray, setSportArray] = useState([]);

  const [openUploadPhotos, setOpenUploadPhotos] = useState(false);

  const [enableSelectSurface, setEnableSelectSurface] = useState(false);

  const [isMultipleEdit, setIsMultipleEdit] = useState(false);

  const [enableButtons, setEnableButtons] = useState(true);

  const [sportSelected, setSportSelected] = useState({});

  const [data, setData] = useState([]);

  const [photoData, setPhotoData] = useState([]);

  const [images, setImages] = useState([]);

  const [fileObjects, setFileObjects] = useState([]);

  const [schedules, setSchedules] = useState([]);

  const [sport, setSports] = useState({});

  const [surfaces, setSurfaces] = useState([]);

  const [switchState, setSwitchState] = useState(false);

  const handleSwitchChange = (oldRow, e) => {
    const changeData = { [e.target.name]: e.target.checked };
    const newRow = { ...oldRow, ...changeData };

    console.log("habilitando cancha");
    console.log(changeData);
    console.log(oldRow);
    console.log(newRow);
  };

  const handleSelectedSport = (sport_id) => {
    console.log("handleSelectedSport");
    console.log(sport_id);
  };

  const columns = [
    {
      title: "Nombre Cancha",
      field: "name",
      validate: (rowData) =>
        rowData.name === undefined || rowData.name === ""
          ? {
              isValid: false,
              helperText: "El nombre de la cancha no puede estar vacio",
            }
          : true,
    },
    {
      title: "Deporte",
      field: "sport",
      editable: "onAdd",
      validate: (rowData) =>
        rowData.sport === undefined
          ? {
              isValid: false,
              helperText: "Debe seleccionar un deporte para la cancha",
            }
          : true,
      lookup: sport,
      render: (rowData, renderType) =>
        renderType === "group" ? rowData : rowData["sport"],
      editComponent: (rowData) => (
        <Select
          value={rowData.value || undefined}
          onChange={(e) => rowData.onChange(String(e.target.value))}
          /*  onChange={(e) => {
            setSportSelected(e.target.value);
            rowData.onChange(String(e.target.value));
          }} */
        >
          {sportsData.map((type) => (
            <MenuItem value={type.name}>{type.name}</MenuItem>
          ))}
        </Select>
      ),
    },
    {
      title: "Superficie",
      field: "courtType",
      validate: (rowData) =>
        rowData.courtType === undefined
          ? {
              isValid: false,
              helperText: "Debe seleccionar la Superficie de la Cancha",
            }
          : true,
      lookup: surfaces,
      render: (rowData, renderType) => rowData.courtType,
      editComponent: (rowData) => {
        console.log("CUANDO AGRUPPO");
        let surfacesArrayFilteredBySport = sportsData.filter(
          (s) => s.name === rowData.rowData.sport
        );

        let surfacesFounded = [];
        if (surfacesArrayFilteredBySport.length > 0) {
          surfacesFounded = surfacesArrayFilteredBySport[0].courtTypes;
        }

        return (
          <Select
            defaultValue={rowData.value}
            value={rowData.value || undefined}
            onChange={(e) => {
              rowData.onChange(String(e.target.value));
            }}
          >
            {surfacesFounded.map((sup) => (
              <MenuItem value={sup}>{sup}</MenuItem>
            ))}
          </Select>
        );
      },
    },
    {
      title: "Descripcion",
      field: "description",
      grouping: false,
      validate: (rowData) =>
        rowData.description === undefined || rowData.description === ""
          ? {
              isValid: false,
              helperText: "La descripcion de la cancha no puede estar vacio",
            }
          : true,
    },
    {
      title: "Seña",
      field: "signPorcentage",
      type: "numeric",
      grouping: false,
      validate: (rowData) =>
        rowData.signPorcentage < 0 ||
        rowData.signPorcentage > 100 ||
        rowData.signPorcentage === undefined
          ? {
              isValid: false,
            }
          : true,
      render: (rowData) =>
        rowData.signPorcentage === undefined || rowData.signPorcentage === 0
          ? "no requiere seña"
          : "% " + rowData.signPorcentage,
      editComponent: (props) => (
        <TextField
          id="standard-start-adornment"
          type="number"
          size="small"
          value={props.value}
          helperText={
            props.value < 0 || props.value > 100
              ? "La Seña debe ser entre 0 y 100"
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
      title: "Techada",
      field: "courtCover",
      render: (rowData) => (rowData.courtCover ? "Si" : "No"),
      editComponent: (props) => (
        <FormControlLabel
          control={
            <Switch
              onChange={(e) => props.onChange(e.target.checked)}
              checked={props.value}
            />
          }
          label={props.value ? "Techada" : "Descubierta"}
        />
      ),
    },
    {
      title: "Iluminacion",
      field: "courtIllumination",
      render: (rowData) => (rowData.courtIllumination ? "Si" : "No"),
      editComponent: (props) => (
        <FormControlLabel
          control={
            <Switch
              onChange={(e) => props.onChange(e.target.checked)}
              checked={props.value}
            />
          }
          label={props.value ? "Si" : "No"}
        />
      ),
    },
    {
      title: "Estado",
      field: "state",
      editable: "onUpdate",
      render: (rowData, renderType) => (
        <ChipCourtState
          rowData={rowData}
          renderType={renderType}
          states={{ enable: "Habilitada", disable: "Deshabilitada" }}
        />
      ),
      editComponent: (props) => (
        <FormControlLabel
          control={
            <Switch
              onChange={(e) => props.onChange(e.target.checked)}
              checked={props.value}
            />
          }
          label={props.value ? "Habilitada" : "Deshabilitada"}
        />
      ),
    },
    {
      field: "schedules",
      filtering: false,
      grouping: false,
      //lookup: schedules,
      render: () => {},
      editComponent: (props) => {
        console.log("PROPS");
        console.log(props);
        if (props.value === undefined || props.value.length === 0) {
          return (
            <>
              <Button
                color="info"
                variant="contained"
                onClick={() => desplegarModalToEdit(props)}
              >
                Agregar Horarios y Precios
              </Button>

              {/*  <FormularioHorarioPrecioCancha
                open={open}
                setOpen={setOpen}
                schedules={schedules}
                setSchedules={setSchedules}
                isMultipleEdit={isMultipleEdit}
                onChange={props.onChange}
              /> */}
            </>
          );
        } else {
          return (
            <>
              <Button
                color="info"
                variant="contained"
                onClick={() => desplegarModalToEdit(props)}
              >
                Modificar Horarios y Precios
              </Button>
              {/* <FormularioHorarioPrecioCancha
                open={open}
                setOpen={setOpen}
                schedules={schedules}
                setSchedules={setSchedules}
                isMultipleEdit={isMultipleEdit}
                onChange={props.onChange}
              /> */}
            </>
          );
        }
      },
    },
    {
      field: "pictures",
      filtering: false,
      grouping: false,
      render: () => {},
      editComponent: (props) => {
        const handleUploadImage = (e) => {
          props.onChange(e);
        };
        return (
          <>
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
              onClick={() => {
                setOpenUploadPhotos(true);
              }}
            >
              <PhotoCamera />
            </IconButton>
            <UploadPhotos
              openUploadPhotos={openUploadPhotos}
              setOpenUploadPhotos={setOpenUploadPhotos}
              setImages={setImages}
              setFileObjects={setFileObjects}
              images={images}
              isMultipleEdit={isMultipleEdit}
              handleUploadImage={handleUploadImage}
              fileObjects={fileObjects}
              filesLimit={6}
              isModal={true}
            />
          </>
        );
      },
    },
  ];

  const retrieveSportsList = () => {
    dispatch(retrieveSports())
      .then((data) => {
        const dynamicLookupObject = data.reduce(function (acc, cur, i) {
          acc[cur.name] = cur.name;

          return acc;
        }, {});
        setSports(dynamicLookupObject);
      })
      .catch((error) => {
        setSports([]);
      });
  };

  const handleSechueduleChanges = (props) => {
    console.log("DESPLEGAR FORM DE HORARIOS Y PRECIOS");
    setIsMultipleEdit(false);
    setOpen(true);
  };

  const [handleChangeSchedules, setHandleChangeSchedules] = useState();
  const [isEdit, setIsEdit] = useState(true);
  const [rowData, setRowData] = useState({});

  const desplegarModalToEdit = (props) => {
    console.log("DESPLEGAR FORM DE HORARIOS Y PRECIOS TO EDIT");
    console.log(props);
    console.log(props.onChange);
    setHandleChangeSchedules(() => props.onChange);
    setSchedules(props.value);
    setIsEdit(props.rowData !== undefined && props.rowData.id);
    if (props.rowData !== undefined && props.rowData.id) {
      setRowData(props.rowData);
    }
    setOpen(true);
  };

  const desplegarModal = (props) => {
    console.log("DESPLEGAR FORM DE HORARIOS Y PRECIOS");
    setIsMultipleEdit(false);
    setOpen(true);
  };

  const desplegarModalForMultipleEdit = (props) => {
    console.log("DESPLEGAR FORM DE HORARIOS Y PRECIOS PARA MULTIPLES CANCHAS");
    setIsMultipleEdit(true);
    setOpen(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    setOpenSnackbar((prevState) => {
      return { ...prevState, open: false };
    });
  };

  const createCancha = (newCancha) => {
    console.log("DATA DE LA NUEVA CANCHA");
    console.log(newCancha);

    const cancha = [
      {
        ...newCancha,
        cancelationTimeInHours: 1,
        institutionId: institution.id,
        courtCover: newCancha.courtCover ? newCancha.courtCover : false,
        courtIllumination: newCancha.courtIllumination
          ? newCancha.courtIllumination
          : false,
        state: "ENABLED",
        schedules: newCancha.schedules,
      },
    ];

    return dispatch(createCourt(institution.id, cancha));
  };

  const updateCancha = (canchaToUpdated) => {
    console.log("canchaToUpdated");

    const cancha = {
      ...canchaToUpdated,
      cancelationTimeInHours: 1,
      institutionId: institution.id,
      state: canchaToUpdated.state ? "ENABLED" : "DISABLED",
      schedules: canchaToUpdated.schedules,
    };

    console.log(cancha);

    return dispatch(updateCourt(cancha));
  };

  const handleUploadSchedules = (court_id, schedules, force) => {
    dispatch(setCourtSchedules(court_id, schedules, force))
      .then((schedules) => {
        const courtToUpdate = courts.filter(
          (court) => court.id === court_id
        )[0];
        dispatch({
          type: UPDATE_COURT_SCHEDULES,
          payload: { ...courtToUpdate, schedules },
        });

        setOpenSnackbar({
          open: true,
          severity: "success",
          message: "Horarios Actualizados Exitosamente!",
        });
      })
      .catch((error) => {
        console.log("CATCHEANDO ERROR");
        console.log(error);
        if (error.data.status === 400 && error.data.error === "Bad Request") {
          setOpenSnackbar({
            open: true,
            severity: "error",
            message:
              "Error al intentar cargar los datos, por favor revisar que todos los campos esten completos",
          });
        } else {
          setOpenSnackbar({
            open: true,
            severity: "error",
            message: Object.values(error.data).map((error, idx) => (
              <Fragment key={error}>
                {<br />}
                {error}
                {<br />}
              </Fragment>
            )),
          });
        }
      });
  };

  const deleteCancha = (id) => {
    console.log("ELIMINANDO CANCHA " + id);

    return dispatch(deleteCourt(id));
  };

  const retrieveCourts = () => {
    setData(courts);
  };

  useEffect(() => {
    retrieveCourts();
  }, [courts]);
  /* const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    console.log("RENDERIZANDO ON SPORT SELECTED");
    console.log(sportsData);
    const surfacesArrayFilteredBySport = sportsData.filter(
      (s) => s.name === sportSelected
    )[0].courtTypes;

    if (surfacesArrayFilteredBySport.length > 0) {
      const dynamicLookupSurfaces = surfacesArrayFilteredBySport.reduce(
        (a, v) => ({ ...a, [v]: v }),
        {}
      );
      setSurfaces(dynamicLookupSurfaces);
    } else {
      console.log("no hay superficies cargadas");
    }
  }, [sportSelected]); */

  useEffect(() => {
    //DEVOLVER LAS CANCHAS DE LA INSTITUCION
    retrieveCourts();

    //SETEAR LOS DEPORTES DISPONIBLES
    retrieveSportsList();

    //setSport(dynamicLookupObject);
    //setData(courtList);
  }, []);

  return (
    <>
      <MaterialTable
        icons={tableIcons}
        title="Listado de Canchas"
        localization={{
          pagination: {
            labelDisplayedRows: "{from}-{to} de {count}",
            labelRowsSelect: "canchas",
            nextTooltip: "Proxima Pagina",
            previousTooltip: "Pagina Previa",
            firstTooltip: "Primer Pagina",
            lastTooltip: "Ultima Pagina",
          },
          toolbar: {
            nRowsSelected: "{0} cancha(s) seleccionada(s)",
            searchTooltip: "Buscar",
            searchPlaceholder: "Buscar Cancha",
          },
          header: {
            actions: "Opciones",
          },
          body: {
            addTooltip: "Agregar Nueva Cancha",
            editTooltip: "Editar Cancha",
            deleteTooltip: "Eliminar Cancha",
            emptyDataSourceMessage:
              "Aun no existen canchas asociadas a la institucion",
            filterRow: {
              filterTooltip: "Filtro",
            },
            editRow: {
              saveTooltip: "Confirmar",
              cancelTooltip: "Cancelar",
              deleteText: "Esta seguro que desea Eliminar esta Cancha?",
            },
          },
          grouping: {
            placeholder: "Arrastre los encabezados aquí para agruparlos",
          },
        }}
        columns={columns}
        data={data}
        options={{
          selection: true,
          grouping: true,
          filtering: true,
        }}
        detailPanel={[
          {
            tooltip: "Mostrar Detalle de Cancha",
            render: (rowData) => <CourtsDetails rowData={rowData} />,
          },
        ]}
        actions={[
          {
            tooltip: "Eliminar todas las canchas seleccionadas",
            icon: Delete,
            onClick: (evt, data) =>
              alert("Quieres eliminar " + data.length + " Canchas"),
          },
          {
            tooltip: "Editar Horarios",
            icon: Edit,
            onClick: (evt, data) => desplegarModalForMultipleEdit(),
          },
        ]}
        editable={{
          onRowAdd: (newData) =>
            new Promise(async (resolve, reject) => {
              const cancha = await createCancha(newData)
                .then((cancha) => {
                  console.log("agregar cancha a la lista");
                  console.log(cancha);

                  setData([...data, cancha]);

                  setOpenSnackbar({
                    open: true,
                    severity: "success",
                    message: "Cancha creada Exitosamente!",
                  });

                  resolve();
                })
                .catch((error) => {
                  console.log("error al agregar cancha a la lista");
                  console.log(error);
                  setOpenSnackbar({
                    open: true,
                    severity: "error",
                    message: Object.values(error.data).map((error, idx) => (
                      <Fragment key={error}>
                        {<br />}
                        {error}
                        {<br />}
                      </Fragment>
                    )),
                  });
                  reject();
                });
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise(async (resolve, reject) => {
              const cancha = await updateCancha(newData)
                .then((cancha) => {
                  console.log("actualizar cancha");
                  console.log(cancha);

                  const dataUpdate = [...data];
                  const index = oldData.tableData.id;
                  dataUpdate[index] = cancha;
                  setData([...dataUpdate]);

                  resolve();
                })
                .catch((err) => {
                  console.log("error al editar la cancha seleccionada");
                  console.log(err);

                  let errorMessage =
                    "No se ha identificado el error, vuelva a intentar";

                  switch (err.status) {
                    case 409:
                      errorMessage = err.data.name;
                      break;

                    default:
                      break;
                  }
                  setOpenSnackbar({
                    open: true,
                    severity: "error",
                    message: Object.values(err.data).map((err, idx) => (
                      <Fragment key={err}>
                        {err}
                        {<br />}
                      </Fragment>
                    )),
                  });
                  reject();
                });
            }),
          onRowDelete: (oldData) =>
            new Promise(async (resolve, reject) => {
              console.log("eliminando cancha");
              console.log(oldData);

              const cancha = await deleteCancha(oldData.id)
                .then((canchaDeleted) => {
                  const dataDelete = [...data];
                  const index = oldData.tableData.id;
                  dataDelete.splice(index, 1);
                  setData([...dataDelete]);

                  resolve();
                })
                .catch((err) => {
                  console.log("error al eliminar la cancha de la institucion");
                  console.log(err);
                  setOpenSnackbar({
                    open: true,
                    severity: "error",
                    message: err.message,
                  });
                  reject();
                });
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
      {open && (
        <FormularioHorarioPrecioCancha
          open={open}
          setOpen={setOpen}
          schedules={schedules}
          setSchedules={setSchedules}
          isMultipleEdit={isMultipleEdit}
          onChange={handleChangeSchedules}
          isEdit={isEdit}
          rowData={rowData}
          handleUploadSchedules={handleUploadSchedules}
        />
      )}
    </>
  );
};

export default ListaCanchas;
