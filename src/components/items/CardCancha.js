import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red, green } from "@mui/material/colors";
import Button from "@mui/material/Button";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CardActionArea } from "@mui/material";
import CardItemHorarioCancha from "./CardItemHorarioCancha";
import CardItemHorarioCanchaPrueba from "./CardItemHorarioCanchaPrueba";
import StarIcon from "@mui/icons-material/Star";
import { Icon } from "@mui/material";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";
import Box from "@mui/material/Box";

const CardCancha = ({ institution }) => {
  const [open, setOpen] = useState(false);

  const [schedule, setSchedule] = useState([]);

  const desplegarModal = (schedule) => {
    console.log("schedule");
    console.log(schedule);

    setSchedule(schedule);

    setOpen(true);
  };

  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: green[500] }} aria-label="recipe">
                <SportsTennisIcon />
              </Avatar>
            }
            action={
              <Box alignItems="center">
                <StarIcon fontSize="large" color="info" />
                <Box
                  textAlign="center"
                  component="span"
                  sx={{ display: { xs: "block", md: "block" } }}
                >
                  {institution.institution_rating}
                </Box>
              </Box>
            }
            title={institution.institution_name}
            subheader={institution.address}
          />
          <CardMedia
            component="img"
            height="194"
            image={institution.image}
            alt="Paella dish"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Los Precios pueden variar segun Dias y Horarios.
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions alignItems="center">
          {institution.sport.schedules.map((schedule) => (
            <Button
              alignItems="center"
              variant="contained"
              disableElevation
              onClick={() => desplegarModal(schedule)}
            >
              {schedule.schedule}
            </Button>
          ))}
          {/*<Button variant="contained" disableElevation onClick={desplegarModal}>
            Consultar Horarios
          </Button>*/}
        </CardActions>
      </Card>

      {/*open && <CardItemHorarioCancha open={open} setOpen={setOpen} />*/}

      {open && (
        <CardItemHorarioCanchaPrueba
          open={open}
          setOpen={setOpen}
          schedule={schedule}
        />
      )}
    </>
  );
};

export default CardCancha;
