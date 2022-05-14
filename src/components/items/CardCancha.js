import StarIcon from "@mui/icons-material/Star";
import { CardActionArea } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import CardItemHorarioCanchaPrueba from "./CardItemHorarioCanchaPrueba";

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
      {/*<Card sx={{ maxWidth: 345 }}>
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
          {<Button variant="contained" disableElevation onClick={desplegarModal}>
            Consultar Horarios
          </Button>}
        </CardActions>
      </Card>*/}

      {/*open && <CardItemHorarioCancha open={open} setOpen={setOpen} />*/}

      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="194"
            width="400"
            image={institution.image}
            alt="courts"
          />
          <CardHeader
            title={institution.institution_name}
            subheader={institution.address}
            sx={{
              pb: 0,
            }}
          />
          <CardContent>
            <Box
              sx={{
                width: 200,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Rating
                name="text-feedback"
                value={institution.institution_rating}
                readOnly
                precision={0.5}
                emptyIcon={
                  <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                }
              />
              <Box sx={{ ml: 1 }}>
                <Typography variant="body1">
                  {institution.institution_rating}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </CardActionArea>
        <Divider variant="middle" />
        <CardActions alignItems="center">
          <Box sx={{ m: 2 }}>
            <Typography gutterBottom variant="body1">
              Seleccione el horario
            </Typography>
            <Stack direction="row" spacing={1}>
              {institution.sport.schedules.map((schedule) => (
                <Chip
                  label={schedule.schedule + ` pm`}
                  onClick={() => desplegarModal(schedule)}
                />
              ))}
            </Stack>
          </Box>

          {/*<Button variant="contained" disableElevation onClick={desplegarModal}>
            Consultar Horarios
          </Button>*/}
        </CardActions>
      </Card>

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
