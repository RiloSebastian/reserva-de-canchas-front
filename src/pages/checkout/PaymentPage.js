import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getPaymentDetails } from "../../actions/payment";
import CheckoutReservation from "./CheckoutReservation";

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import "react-phone-input-2/lib/style.css";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import moment from "moment";

const PaymentPage = () => {
  const { userToken } = useParams();
  const dispatch = useDispatch();

  const [isExpired, setIsExpired] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const [reservation, setReservation] = useState({});

  const retrievePaymentDetails = () => {
    dispatch(getPaymentDetails(userToken))
      .then((payment) => {
        console.log("DEVOLVIENDO DATOS DE LA RESERVA");
        console.log(payment);

        const d = new Date(payment.durationRange.from.toString());

        console.log("FORMATEANDO FECHA");
        console.log(moment(d));

        const reservation = {
          ...payment,
          sport: payment.courtSport,
          price: payment.finalCost,
          name: payment.courtId,
          fecha: moment(d).format("DD/MM"),
          horario: moment(d).format("h:mma"),
        };
        setReservation(reservation);
        setLoading(false);
      })
      .catch((error) => {
        console.log("ERROR AL OBTENER DATOS DE LA RESERVA");
        console.log(error);
        if (error.status === 409) {
          setIsExpired(true);
          setErrorMessage(error.data.message);
          setLoading(false);
        }
        return error;
      });
  };

  useEffect(() => {
    console.log(userToken);

    retrievePaymentDetails();
  }, []);

  return (
    <>
      {loading ? (
        <Box sx={{ display: "flex" }}>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
          >
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justify="center"
            >
              <Grid item>
                <Typography variant="h6" textAlign="center">
                  Cargando Pago
                </Typography>
              </Grid>
              <Grid item>
                <CircularProgress color="inherit" disableShrink />
              </Grid>
            </Grid>
          </Backdrop>
        </Box>
      ) : isExpired ? (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="error">
            <AlertTitle>Lo Sentimos</AlertTitle>
            <strong>{errorMessage}</strong> -- Ha exedido el tiempo permitido
            para confirmar la reserva — vuelva a intentarlo
          </Alert>
        </Stack>
      ) : (
        <CheckoutReservation
          reservation={reservation}
          setReservation={setReservation}
        />
      )}
    </>
  );
};

export default PaymentPage;
