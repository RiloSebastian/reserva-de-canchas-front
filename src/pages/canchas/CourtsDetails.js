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

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CourtsDetails = ({ rowData }) => {
  const { photos } = rowData;

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
        <Typography variant="h6" component="h6">
          Horarios
        </Typography>
        <List dense sx={{ width: "100%", bgcolor: "background.paper" }}>
          {[0, 1].map((value) => {
            const labelId = `checkbox-list-secondary-label-${value}`;
            return (
              <ListItem key={value} disablePadding>
                <ScheduleAndPrice horario={horario} setHorarios={setHorarios} />
              </ListItem>
            );
          })}
        </List>
      </Grid>
      <Grid item xs={12}>
        {photos.length > 0 ? (
          <ImageList
            sx={{ width: 500, height: 500 }}
            style={{ display: "flex", flexDirection: "row", padding: 0 }}
            rowHeight={164}
          >
            {photos.map((item) => (
              <ImageListItem key={item.img}>
                <img
                  //{...srcset(item.img, 250, 250, 0, 0)}
                  src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                  srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.title}
                  loading="lazy"
                />
                <ImageListItemBar
                  sx={{
                    background:
                      "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                      "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
                  }}
                  title={item.title}
                  position="top"
                  actionIcon={
                    <IconButton
                      sx={{ color: "white" }}
                      aria-label={`star ${item.title}`}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                  actionPosition="left"
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
      </Grid>
    </Grid>
  );
};

export default CourtsDetails;
