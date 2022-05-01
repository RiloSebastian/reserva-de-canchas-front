import React, { useEffect, useState, forwardRef, useRef } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ScheduleAndPrice from "./../ScheduleAndPrice";
import MaterialTable from "material-table";
import IconButton from "@mui/material/IconButton";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import moment from "moment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TextField from "@mui/material/TextField";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import DateAdapter from "@mui/lab/AdapterMoment";
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
import FormularioHorarioPrecioCancha from "../../components/formularios-datos/FormularioHorarioPrecioCancha";
import UploadImage from "../../components/UploadImage";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { useHistory } from "react-router-dom";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Visibility } from "@mui/icons-material/Visibility";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BASE_URL_CUSTOMERS } from "../../pages/routes";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
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

const colors = {
  primary: "#ff0000",
};

const theme = createTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: colors.primary,
      // dark: will be calculated from palette.primary.main,
    },
  },
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            borderLeft: `5px solid ${colors.primary}`,
          },
        },
      },
    },
  },
});

const CardItemHorarioCanchaPrueba = ({ open, setOpen, schedule }) => {
  const history = useHistory();

  const [courts, setCourts] = useState(schedule.courts);

  const [courtSelected, setCourtSelected] = useState(schedule.courts);

  const [date, setDate] = useState(moment(new Date()));

  const [selectedIndex, setSelectedIndex] = useState(
    schedule.courts[0].court_id
  );

  //const [enabled, setEnabled] = useState(true);
  const [enabled, setEnabled] = useState(true);

  const [value, setValue] = useState(schedule.courts[0].court_id);

  const handleChange = (event) => {
    console.log("changing");
    setValue(event.target.value);
  };

  const [loading, setLoading] = useState(false);

  const [checked, setChecked] = useState([schedule.courts[0].court_id]);

  const tableRef = useRef();
  const [selection, setSelection] = useState([]);
  const [data, setData] = useState([
    { horario: "20 : 00", precio: 1200.0 },
    { horario: "21 : 00", precio: 1400.0 },
  ]);

  const handleClose = () => {
    setLoading(true);

    setOpen(false);
  };

  const handleReservar = (court) => {
    setLoading(true);

    setOpen(false);

    history.push({
      pathname: BASE_URL_CUSTOMERS.base + "/checkout",
      state: court,
    });
  };

  const handleToggle = (value) => () => {
    console.log("handleToggle");
    console.log(value);
    setSelectedIndex(value.court_id);

    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    setCourtSelected(value);
  };

  useEffect(() => {
    if (selection.length !== 0) {
      setEnabled(false);
    } else {
      setEnabled(true);
    }
  }, [selection]);

  return (
    <>
      <div>
        <Dialog open={open} onClose={handleClose} maxWidth="xl">
          <DialogTitle sx={{ textAlign: "center" }}>
            Elegi Tu Cancha
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Seleccione la cancha que desea reservar.
            </DialogContentText>

            {/*<Box textAlign="left" sx={{ m: 4 }}>
              <LocalizationProvider dateAdapter={DateAdapter}>
                <MobileDatePicker
                  label="Fecha"
                  value={date}
                  onChange={(newValue) => {
                    setDate(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
                </Box>*/}
            <List
              dense
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              {courts.map((court) => {
                const labelId = `checkbox-list-secondary-label-${court.court_id}`;
                return (
                  <ThemeProvider theme={theme}>
                    <ListItem key={court.court_id} disablePadding>
                      <ListItemButton
                        selected={selectedIndex === court.court_id}
                        role={undefined}
                        onClick={handleToggle(court)}
                        dense
                      >
                        <ListItemAvatar>
                          <Avatar
                            alt={`Avatar n°${court.court_id + 1}`}
                            src={`/static/images/avatar/${
                              court.court_id + 1
                            }.jpg`}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          id={labelId}
                          primary={` ${court.name}`}
                          secondary={`$ ${court.price}`}
                        />
                      </ListItemButton>
                    </ListItem>
                  </ThemeProvider>
                );
              })}
            </List>
          </DialogContent>

          <Box textAlign="center" sx={{ m: 2 }}>
            <LoadingButton
              color="secondary"
              onClick={() => handleReservar(courtSelected)}
              loading={loading}
              loadingPosition="start"
              startIcon={<EventAvailableIcon />}
              variant="contained"
              //disabled={enabled}
            >
              Reservar Turno {schedule.schedule} HS
            </LoadingButton>
          </Box>
        </Dialog>
      </div>
      {/*<div>
      <Dialog open={open} onClose={handleClose} maxWidth="xl">
        <DialogTitle>Cancha 1 - Horarios</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Seleccione los horarios que desea reservar.
          </DialogContentText>

          <Box textAlign="left" sx={{ m: 4 }}>
            <LocalizationProvider dateAdapter={DateAdapter}>
              <MobileDatePicker
                label="Fecha"
                value={date}
                onChange={(newValue) => {
                  setDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Box>
          <MaterialTable
            options={{
              selection: true,
              showTitle: false,
              draggable: false,
              search: false,
              paging: false,
              toolbar: false,
              detailPanelColumnAlignment: "right",
              toolbarButtonAlignment: "right",
            }}
            onSelectionChange={(rows) => {
              console.log(selection);
              setSelection(rows);
            }}
            tableRef={tableRef}
            icons={tableIcons}
            columns={[
              { title: "Horario (hs)", field: "horario" },
              { title: "Precio ($)", field: "precio" },
            ]}
            data={data}
            title="Remote Data Example"
          />
        </DialogContent>

        <Box textAlign="center" sx={{ m: 2 }}>
          <LoadingButton
            color="secondary"
            onClick={handleReservar}
            loading={loading}
            loadingPosition="start"
            startIcon={<EventAvailableIcon />}
            variant="contained"
            disabled={enabled}
          >
            Reservar
          </LoadingButton>
        </Box>
      </Dialog>
          </div>*/}
    </>
  );
};
export default CardItemHorarioCanchaPrueba;
