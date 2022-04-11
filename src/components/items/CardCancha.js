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
import { red } from "@mui/material/colors";
import Button from "@mui/material/Button";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CardActionArea } from "@mui/material";
import CardItemHorarioCancha from "./CardItemHorarioCancha";
import CardItemHorarioCanchaPrueba from "./CardItemHorarioCanchaPrueba";

const CardCancha = () => {
  const [open, setOpen] = useState(false);

  const desplegarModal = () => {
    setOpen(true);
  };

  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                T
              </Avatar>
            } /*
                action={
                    <IconButton aria-label="settings">
                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon />
                        </IconButton>
                    </IconButton>
                }*/
            title="Cancha 1"
            subheader="Baires Tenis"
          />
          <CardMedia
            component="img"
            height="194"
            image="https://ca-times.brightspotcdn.com/dims4/default/c87dd1b/2147483647/strip/true/crop/2000x1220+0+0/resize/840x512!/format/webp/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F63%2Fd1%2F3e3f11da4573890956f04d55e473%2Ftn-photos-staff-s1-daily-pilot-816448-tn-dpt-me-alta-laguna-park-courts-1.jpg"
            alt="Paella dish"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Los Precios pueden variar segun Dias y Horarios.
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions disableSpacing>
          <Button variant="contained" disableElevation onClick={desplegarModal}>
            Consultar Horarios
          </Button>
        </CardActions>
      </Card>

      {/*open && <CardItemHorarioCancha open={open} setOpen={setOpen} />*/}

      {open && <CardItemHorarioCanchaPrueba open={open} setOpen={setOpen} />}
    </>
  );
};

export default CardCancha;
