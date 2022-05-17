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

const CardCancha = ({ institution, state }) => {
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
                  key={schedule}
                  label={schedule.schedule + ` pm`}
                  onClick={() => desplegarModal(schedule)}
                />
              ))}
            </Stack>
          </Box>
        </CardActions>
      </Card>

      {open && (
        <CardItemHorarioCanchaPrueba
          open={open}
          setOpen={setOpen}
          schedule={schedule}
          date={state.reservation_date}
          institution={institution}
        />
      )}
    </>
  );
};

export default CardCancha;
