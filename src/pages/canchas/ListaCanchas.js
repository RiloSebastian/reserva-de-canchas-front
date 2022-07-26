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
import React, {
  forwardRef,
  Fragment,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createCourt, deleteCourt, updateCourt } from "../../actions/court";
import ChipState from "../../components/employees/ChipState";
import FormularioHorarioPrecioCancha from "../../components/formularios-datos/FormularioHorarioPrecioCancha";
import UploadPhotos from "../../components/ui/UploadPhotos";
import CanchaService from "../../services/canchas/CanchaService";
import DeporteService from "../../services/deportes/DeporteService";
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

const getSurfaces = (sport) => {
  return surfacesArray.filter((s) => sport.id === s.sport_id);
};

const surfacesArray = [
  {
    sport_id: "61a68dbc107957730042e154",
    surface: [
      {
        id: 0,
        name: "Polvo de Ladrillo",
      },
      {
        id: 1,
        name: "Cemento",
      },
      {
        id: 2,
        name: "Césped",
      },
    ],
  },
  {
    sport_id: "61a68dbc107957730042e153",
    surface: [
      {
        id: 0,
        name: "Césped Sintetico",
      },
      {
        id: 1,
        name: "Cesped Natural",
      },
      {
        id: 2,
        name: "Alfombra",
      },
      {
        id: 3,
        name: "Cemento",
      },
    ],
  },
  {
    sport_id: "61a68dbc107957730042e155",
    surface: [
      {
        id: 0,
        name: "Césped Artificial",
      },
      {
        id: 1,
        name: "Cemento",
      },
      {
        id: 2,
        name: "Hormigón Poroso",
      },
      {
        id: 3,
        name: "Recubrimiento Sintético",
      },
    ],
  },
];

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

  const dispatch = useDispatch();

  const institution = useSelector((state) => state.institution);

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

  const [sports, setSports] = useState({});

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
      validate: (rowData) =>
        rowData.sport === undefined
          ? {
              isValid: false,
              helperText: "Debe seleccionar un deporte para la cancha",
            }
          : true,
      lookup: sports,
      render: (rowData) => rowData.sport,
      editComponent: (rowData) => {
        return (
          <Select
            value={rowData.value || "string"}
            onChange={(e) => {
              rowData.onChange(String(e.target.value));
              setSportSelected(e.target.value);
            }}
          >
            {sportArray.map((type) => (
              <MenuItem value={type.id}>{type.name}</MenuItem>
            ))}
          </Select>
        );
      },
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
      //lookup: (rowData) => getSurfaces(rowData.sport),
      lookup: surfaces,
      render: (rowData) => rowData.courtType,
    },
    { title: "Descripcion", field: "description" },
    {
      title: "Seña",
      field: "signPorcentage",
      type: "numeric",
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
      field: "enabled",
      editable: "onUpdate",
      render: (rowData, renderType) => (
        <ChipState
          rowData={rowData}
          renderType={renderType}
          states={{ enable: "Habilitada", disable: "Deshabilitada" }}
        />
      ),
      //render: (rowData) => (rowData.enabled ? "Habilidata" : "Deshabilitada"),
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
      lookup: schedules,
      editComponent: (props) => {
        return (
          <>
            <Button color="info" variant="contained" onClick={desplegarModal}>
              Agregar Horarios y Precios
            </Button>
            <FormularioHorarioPrecioCancha
              open={open}
              setOpen={setOpen}
              schedules={schedules}
              setSchedules={setSchedules}
              isMultipleEdit={isMultipleEdit}
              onChange={props.onChange}
            />
          </>
        );
      },
    },
    {
      field: "images",
      filtering: false,
      editComponent: (props) => (
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
            images={images}
            isMultipleEdit={isMultipleEdit}
            handleUploadImage={handleUploadImage}
            fileObjects={fileObjects}
            setFileObjects={setFileObjects}
            filesLimit={6}
            isModal={true}
          />
        </>
      ),
    },
  ];

  const handleUploadImage = (e) => {
    let ImagesArray = Object.entries(e.target.files).map((e) =>
      URL.createObjectURL(e[1])
    );
    console.log(ImagesArray);
    setImages([...images, ...ImagesArray]);
    console.log("images", images);
  };

  const retrieveSportsList = async () => {
    try {
      const listadoDeportes = await DeporteService.getAll();

      console.log("listadoDeportes");
      console.log(listadoDeportes);

      const data = listadoDeportes.data;

      if (data) {
        const sports = {};
        data.map((s) => (sports[s.id] = s.name));

        console.log(sports);

        setSports(sports);
        setSportArray(data);
      }
    } catch (err) {
      //history.push("/login");
      console.log("ERROR AL OBTENER LA LISTA DE DEPORTES");
    }
  };

  const desplegarModal = (props) => {
    setIsMultipleEdit(false);
    setOpen(true);
  };

  const desplegarModalForMultipleEdit = (props) => {
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
        courtType: "CEMENTO",
        institutionId: institution.id,
        sport: "TENIS",
        state: "DISABLED",
      },
    ];

    return dispatch(createCourt(institution.id, cancha));
  };

  const updateCancha = async (canchaToUpdated) => {
    console.log("canchaToUpdated");

    const cancha = {
      ...canchaToUpdated,
      cancelationTimeInHours: 1,
      institutionId: institution.id,
      ["schedules"]: schedules,
    };

    console.log(cancha);

    return dispatch(updateCourt(cancha));
  };

  const deleteCancha = async (id) => {
    console.log("ELIMINANDO CANCHA " + id);

    return dispatch(deleteCourt(id));
  };

  const retrieveCourts = async (institutionId) => {
    try {
      const listadoCanchas = await CanchaService.getAll(institutionId);

      console.log("listadoCanchas");
      console.log(listadoCanchas);

      const data = listadoCanchas.data.map(
        ({
          id,
          name,
          sport,
          courtType,
          courtCover,
          courtIllumination,
          signPorcentage,
          state,
          description,
          schedules,
        }) => {
          console.log("REARMANDO CANCHA PARA LISTARLAS");
          console.log({
            id,
            name,
            sport,
            courtType,
            courtCover,
            courtIllumination,
            signPorcentage,
            state,
            description,
            schedules,
          });
          return {
            id,
            name,
            sport,
            courtType,
            courtCover,
            courtIllumination,
            signPorcentage,
            state,
            description,
            schedules,
          };
        }
      );

      setData(data);

      /* if (data) {
        data.forEach((court) => {
          console.log("obteniendo imagenes");
          console.log(court);

          if (court.images_id !== null) {
            let photos = [];

            court.images_id.forEach((image_id) => {
              photos.push({
                img: "http://localhost:8080/api/photos/" + image_id,
                title: "Breakfast",
                author: "@bkristastucchio",
                featured: true,
              });
            });

            console.log("array de photos");
            console.log(photos);

            court.photos = photos;
          } else {
          }
        });

        console.log("final data");
        console.log(data);

        setData(data);
      } */
    } catch (err) {
      //history.push("/login");
      setData([]);
    }
  };

  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    console.log("sportArray");
    console.log(sportArray);
    console.log("sportSelected");
    console.log(sportSelected);

    const surfacesArrayFiltered = sportArray.filter(
      (s) => s.id == sportSelected
    );

    if (surfacesArrayFiltered.length > 0) {
      /* const dynamicLookupSurfaces = sportArray.surfaces.reduce(function (
        acc,
        cur,
        i
      ) {
        acc[cur.id] = cur.name;

        return acc;
      },
      {}); */

      const dynamicLookupSurfaces = surfacesArray[0].surface.reduce(function (
        acc,
        cur,
        i
      ) {
        acc[cur.id] = cur.name;

        return acc;
      },
      {});

      setSurfaces(dynamicLookupSurfaces);
    } else {
      console.log("no hay superficies cargadas");
    }
  }, [sportSelected]);

  useEffect(() => {
    //DEVOLVER LAS CANCHAS DE LA INSTITUCION
    retrieveCourts(institution.id);

    //SETEAR LOS DEPORTES DISPONIBLES
    retrieveSportsList();

    const dynamicLookupObject = sportArray.reduce(function (acc, cur, i) {
      acc[cur.id] = cur.name;

      return acc;
    }, {});

    console.log(dynamicLookupObject);

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

                  setData([...data, cancha[0]]);

                  setOpenSnackbar({
                    open: true,
                    severity: "success",
                    message: "Cancha creada Exitosamente!",
                  });

                  resolve();
                })
                .catch((err) => {
                  console.log("error al agregar cancha a la lista");
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
    </>
  );
};

export default ListaCanchas;
