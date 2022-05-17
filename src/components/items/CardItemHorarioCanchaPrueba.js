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
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import { default as Grid, default as MuiGrid } from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import moment from "moment";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { BASE_URL_CUSTOMERS } from "../../pages/routes";

const GridDescription = styled(MuiGrid)(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  '& [role="separator"]': {
    margin: theme.spacing(0, 2),
  },
}));

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
  primary: "#FF5733",
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

const CardItemHorarioCanchaPrueba = ({ open, setOpen, schedule, date }) => {
  const history = useHistory();

  const [courts, setCourts] = useState(schedule.courts);

  const [courtSelected, setCourtSelected] = useState(schedule.courts[0]);

  const [selectedIndex, setSelectedIndex] = useState(
    schedule.courts[0].court_id
  );

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

    let courtFinalSelected = {
      ...court,
      fecha: moment(date).format("DD / MM"),
      horario: schedule.schedule,
    };

    console.log("before checkout - sending court selected");
    console.log(courtFinalSelected);

    history.push({
      pathname: BASE_URL_CUSTOMERS.base + "/checkout",
      state: courtFinalSelected,
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
            <List
              dense
              sx={{ width: "100%", maxWidth: 500, bgcolor: "background.paper" }}
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
                        <ListItemText
                          id={labelId}
                          primary={
                            <Grid container alignItems="center">
                              <Grid item xs>
                                <Typography gutterBottom variant="h6">
                                  {court.name}
                                </Typography>
                              </Grid>
                              <Grid item>
                                <Typography gutterBottom variant="h6">
                                  {`$ ${court.price}`}
                                </Typography>
                              </Grid>
                            </Grid>
                          }
                          secondary={
                            <div>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  width: "fit-content",
                                  color: "text.secondary",
                                  "& svg": {
                                    m: 1.5,
                                  },
                                  "& hr": {
                                    mx: 0.5,
                                  },
                                }}
                              >
                                <Typography
                                  variant="subtitle2"
                                  gutterBottom
                                  component="div"
                                >
                                  {court.surface}
                                </Typography>
                                <Divider
                                  orientation="vertical"
                                  variant="middle"
                                  flexItem
                                />
                                <Typography
                                  variant="subtitle2"
                                  gutterBottom
                                  component="div"
                                >
                                  {court.isCovered ? "Techada" : "Descubierta"}
                                </Typography>
                                <Divider
                                  orientation="vertical"
                                  variant="middle"
                                  flexItem
                                />
                                <Typography
                                  variant="subtitle2"
                                  gutterBottom
                                  component="div"
                                >
                                  {court.isLighting
                                    ? "Con Iluminacion"
                                    : "Sin Iluminacion"}
                                </Typography>
                              </Box>
                            </div>
                          }
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
    </>
  );
};
export default CardItemHorarioCanchaPrueba;
