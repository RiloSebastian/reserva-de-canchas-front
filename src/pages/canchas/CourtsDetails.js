import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InfoIcon from "@mui/icons-material/Info";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileTimePicker from "@mui/lab/MobileTimePicker";
import MuiAlert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Paper from "@mui/material/Paper";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { v4 as uuidv4 } from "uuid";
import SelectWeekDays from "../../components/formularios-datos/SelectWeekDays";
import { days } from "../../utils/days/days";

const useStyles = makeStyles((theme) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: 30,
  lineHeight: "30px",
}));

const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(
  props,
  ref
) {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="$"
    />
  );
});

const flexContainer = {
  display: "flex",
  flexDirection: "row",
  padding: 0,
};

const theme = createTheme({ palette: { mode: "light" } });

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CourtsDetails = ({ rowData }) => {
  const classes = useStyles();
  const { images, schedules } = rowData;

  const [fieldsToShow, setFieldsToShow] = useState({
    delete: true,
    enabled: true,
    readOnly: true,
  });

  const [daysSelected, setDaysSelected] = useState([]);

  const [daysSelectedId, setDaysSelectedId] = useState(uuidv4());

  useEffect(() => {
    console.log("MOSTRANDE DETALLE DE CANCHA");

    let daysAlreadySelected = [];

    if (schedules !== undefined) {
      schedules.forEach((horario) => {
        horario.daysAvailable.forEach((dia) => {
          daysAlreadySelected.push({
            label: dia.charAt(0).toUpperCase() + dia.slice(1).toLowerCase(),
            value: dia,
            daysAndTimesId: daysSelectedId,
            selected: true,
          });
        });
      });

      daysSelected.forEach((diaSeleccionado) => {
        if (
          !daysAlreadySelected
            .map((dia) => dia.value)
            .includes(diaSeleccionado.value)
        ) {
          daysAlreadySelected.push(diaSeleccionado);
        }
      });

      const arraySorted = daysAlreadySelected.sort((a, b) => {
        return days[a.label] - days[b.label];
      });
      console.log(arraySorted.sort());
      setDaysSelected(arraySorted.sort());
    }
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <ThemeProvider theme={theme}>
          <Item elevation={2}>
            <Typography variant="h6" component="h6">
              Horarios Cargados
            </Typography>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs>
                <FormControl sx={{ m: 1 }}>
                  <List>
                    {schedules && schedules.length > 0 ? (
                      <>
                        {schedules.map((diaYHorario) => (
                          <ListItem key={diaYHorario.id}>
                            <Paper className={classes}>
                              <Box
                                key={diaYHorario.id}
                                textAlign="center"
                                sx={{ m: 4 }}
                              >
                                <Box textAlign="left" sx={{ mt: 4 }}>
                                  <p>Dias de la Semana</p>
                                  <SelectWeekDays
                                    daysSelected={daysSelected}
                                    daysAndTimesId={daysSelectedId}
                                    fieldsToShow={fieldsToShow}
                                    readOnly={true}
                                  />
                                </Box>
                                <Box textAlign="left" sx={{ mt: 4 }}>
                                  <p>Horarios</p>

                                  <List>
                                    {diaYHorario.details.map((horario) => (
                                      <ListItem key={horario.id}>
                                        <Grid
                                          container
                                          spacing={3}
                                          alignItems="center"
                                        >
                                          <LocalizationProvider
                                            dateAdapter={AdapterDateFns}
                                          >
                                            <Grid item xs>
                                              <MobileTimePicker
                                                open={false}
                                                label="Desde"
                                                name="from"
                                                value={horario.timeFrame.from}
                                                renderInput={(params) => (
                                                  <TextField {...params} />
                                                )}
                                              />
                                            </Grid>
                                            <Grid item xs>
                                              <MobileTimePicker
                                                open={false}
                                                label="Hasta"
                                                name="to"
                                                value={horario.timeFrame.to}
                                                renderInput={(params) => (
                                                  <TextField {...params} />
                                                )}
                                              />
                                            </Grid>
                                          </LocalizationProvider>

                                          <Grid item xs>
                                            <TextField
                                              id="standard-read-only-input"
                                              label="/hr"
                                              value={`$ ${horario.costPerSlot}`}
                                              defaultValue="Precio por Hora"
                                              InputProps={{
                                                readOnly: true,
                                              }}
                                              variant="standard"
                                            />
                                          </Grid>
                                          <Grid
                                            hidden={fieldsToShow.enabled}
                                            item
                                            xs
                                          >
                                            <FormControlLabel
                                              control={
                                                <Switch
                                                  name="enabled"
                                                  checked={horario.enabled}
                                                  color="primary"
                                                />
                                              }
                                              label={
                                                horario.enabled
                                                  ? "Activo"
                                                  : "Inactivo"
                                              }
                                              labelPlacement="activo"
                                            />
                                          </Grid>
                                        </Grid>
                                      </ListItem>
                                    ))}
                                  </List>
                                </Box>
                              </Box>
                            </Paper>
                          </ListItem>
                        ))}
                      </>
                    ) : (
                      <Grid container justifyContent="center">
                        <Alert severity="warning">
                          no hay horarios cargados para esta cancha
                        </Alert>
                      </Grid>
                    )}
                  </List>
                </FormControl>
              </Grid>
            </Grid>
          </Item>
        </ThemeProvider>
      </Grid>
      <Grid item xs={12}>
        <ThemeProvider theme={theme}>
          <Item elevation={2}>
            <Typography variant="h6" component="h6">
              Imagenes Cargadas
            </Typography>
            {images && images.length > 0 ? (
              <ImageList
                style={flexContainer}
                sx={{ width: "100%", height: 150 }}
              >
                {itemData.map((item) => (
                  <ImageListItem
                    sx={{ width: 150, height: 100 }}
                    key={item.img}
                  >
                    <img
                      src={`${item.img}?w=248&fit=crop&auto=format`}
                      srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                      alt={item.title}
                      loading="lazy"
                    />
                    <ImageListItemBar
                      title={item.title}
                      subtitle={item.author}
                      actionIcon={
                        <IconButton
                          sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                          aria-label={`info about ${item.title}`}
                        >
                          <InfoIcon />
                        </IconButton>
                      }
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            ) : (
              <Grid container justifyContent="center">
                <Alert severity="warning">
                  no hay imagenes cargadas para esta cancha
                </Alert>
              </Grid>
            )}
          </Item>
        </ThemeProvider>
      </Grid>
    </Grid>
  );
};

export default CourtsDetails;

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
    author: "@bkristastucchio",
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
    author: "@rollelflex_graphy726",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
    author: "@helloimnik",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
    author: "@nolanissac",
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
    author: "@hjrc33",
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
    author: "@arwinneil",
    rows: 2,
    cols: 2,
    featured: true,
  },
];
