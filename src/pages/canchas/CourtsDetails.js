import DeleteIcon from "@mui/icons-material/Delete";
import MuiAlert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import moment from "moment";
import React, { useEffect, useState } from "react";
import ScheduleAndPrice from "./../../components/ScheduleAndPrice";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import InfoIcon from "@mui/icons-material/Info";
import ListSubheader from "@mui/material/ListSubheader";

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
  const { photos, schedules } = rowData;

  const [fieldsToShow, setFieldsToShow] = useState({
    delete: true,
    enabled: true,
  });

  const [horario, setHorario] = useState({
    id: "",
    from: new Date(),
    to: new Date(new Date().setHours(new Date().getHours() + 1)),
    desde: moment(new Date("2018-01-01T00:00:00.000Z")),
    hasta: moment(new Date("2018-01-01T00:00:00.000Z")),
    precio: "",
    horarioHabilitado: true,
  });

  const [from, setFrom] = useState(new Date());

  const [to, setTo] = useState(
    new Date(new Date().setHours(new Date().getHours() + 1))
  );

  const [id, setd] = useState(1);

  const nuevoHorario = {
    id: "",
    from: new Date(),
    to: new Date(new Date().setHours(new Date().getHours() + 1)),
    price: "",
    enabled: true,
  };

  useEffect(() => {
    //traer los horarios guardados por la institucion
    //getHorarios();

    console.log("MOSTRANDE DETALLE DE CANCHA");
    console.log(rowData);

    const newSchedule = [...horarios, nuevoHorario];
    setHorarios(newSchedule);
  }, []);

  const [horarios, setHorarios] = useState([]);

  const [checked, setChecked] = React.useState([1]);

  useEffect(() => {
    setHorarios((horarios) => {
      let horariosUpdated = horarios.map((horario) =>
        horario.id === id ? { ...horario, ["from"]: from } : horario
      );

      return [...horariosUpdated];
    });

    setHorarios((horarios) => {
      let horariosUpdated = horarios.map((horario) =>
        horario.id === id ? { ...horario, ["to"]: to } : horario
      );

      return [...horariosUpdated];
    });
  }, []);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <ThemeProvider theme={theme}>
          <Item elevation={2}>
            <Typography variant="h6" component="h6">
              Horarios Cargados
            </Typography>
            <List
              dense
              sx={{
                width: "100%",
                bgcolor: "background.paper",
              }}
            >
              {[0, 1].map((value) => {
                const labelId = `checkbox-list-secondary-label-${value}`;
                return (
                  <ListItem key={value} disablePadding>
                    <ScheduleAndPrice
                      horario={horario}
                      setHorarios={setHorarios}
                      fieldsToShow={fieldsToShow}
                    />
                  </ListItem>
                );
              })}
            </List>
          </Item>
        </ThemeProvider>
      </Grid>
      <Grid item xs={12}>
        <ThemeProvider theme={theme}>
          <Item elevation={2}>
            <Typography variant="h6" component="h6">
              Imagenes Cargadas
            </Typography>
            {photos.length > 0 ? (
              <ImageList sx={{ width: "100%", height: 450 }}>
                {itemData.map((item) => (
                  <ImageListItem
                    sx={{ width: 500, height: 450 }}
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
