import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import EmailService from "../../services/email/EmailService";
import { useParams } from "react-router-dom";
import AuthService from "../../services/auth.service";

const useStyles = makeStyles((theme) => ({
  container: {
    marginLeft: theme.spacing(0),
  },
  header: {
    color: theme.palette.common.black,
  },
  action: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      marginRight: theme.spacing(0),
      marginBottom: theme.spacing(2),
    },
  },
}));

export default function AccountVerification(props) {
  const { userToken } = useParams();
  const classes = useStyles();

  let history = useHistory();

  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("userPending"));

  const content = {
    header: `${
      user ? user.name : "Usuario"
    }, Lo sentimos, ha ocurrido un error al intentar validar su cuenta...`,
    description:
      "Haga Click en el siguiente Botón para enviarle un nuevo correo y volver a intentarlo.",
    "secondary-action": "Reenviar Correo de Confirmacion",
    ...props.content,
  };

  const renderLogin = () => {
    history.push("/login");
  };

  const resendConfirmationEmail = async () => {
    //Reenviar email de confirmacion

    try {
      const emailSended = await EmailService.sendVerificationEmail(
        user.email
      ).then((data) => data);
    } catch (error) {
      console.log("Error al reenviar el correo de confirmacion");
      console.log(error);
    }
  };

  useEffect(async () => {
    console.log("ENVIANDO TOKEN PARA VALIDAR LA CUENTA DEL USUARIO");
    console.log(userToken);
    try {
      const userEnabled = await AuthService.enable(userToken).then(
        (data) => data
      );

      setLoading(false);
      localStorage.removeItem("userPending");
      history.push({
        pathname: "/login",
        state: {
          accountEnable: true,
        },
      });
    } catch (error) {
      console.log("ERROR AL HABILITAR EL USUARIO");
      console.log(error);
      setLoading(false);
    }
  }, []);

  return (
    <Box
      position="fixed"
      width="100%"
      top={0}
      p={4}
      zIndex="modal"
      color="textSecondary"
      bgcolor="background.header"
    >
      <Container maxWidth="md" className={classes.container}>
        <Typography
          variant="h5"
          component="h2"
          gutterBottom={true}
          className={classes.header}
        >
          {content["header"]}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" paragraph={true}>
          {content["description"]}
        </Typography>
        <Button
          onClick={resendConfirmationEmail}
          variant="contained"
          color="secondary"
          className={classes.action}
        >
          {content["secondary-action"]}
        </Button>
      </Container>
    </Box>
  );
}
