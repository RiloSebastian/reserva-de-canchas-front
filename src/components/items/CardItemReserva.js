import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const CardItemReserva = ({ reserva }) => {
  const { date, period, institution, field, state } = reserva;
  return (
    <Card  sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-evenly',
        marginY: "40px",
        backgroundColor: '#dedede'
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          padding: "10px",
          flexGrow: 2,
        }}
      >
        <Typography color="text.secondary" sx={{marginRight:'15px'}}>{state}</Typography>
        <div style={{marginRight:'15px'}}>
          <Typography variant="h5" component="div">
            {field}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {institution}
          </Typography>
        </div>
        <Typography sx={{marginRight:'15px'}} color="text.secondary">{date}</Typography>
        <Typography sx={{marginRight:'15px'}} color="text.secondary">{period}</Typography>
      </CardContent>
      <CardActions>
        <Button disabled size="small" color="secondary" >
          Ver Detalles
        </Button>
        <Button disabled size="small" color="error" >
          Cancelar Reserva
        </Button>
      </CardActions>
    </Card>
  );
};

export default CardItemReserva;
