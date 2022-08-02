import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import EmailService from "../../services/email/EmailService";

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

export default function AccountConfirmation(props) {
  const classes = useStyles();

  let history = useHistory();

  const [user, setUser] = useState(history.location.state);

  console.log("CREANDO NUEVO USUARIO");
  console.log(user);

  const content = {
    header: `${
      user !== undefined && user.name !== undefined
        ? user.name || user.firstName
        : "Usuario"
    }, Ya casi terminamos...`,
    description:
      "Para completar el alta de tu cuenta, por favor, dirigite a la casilla de correo que agregaste previamente y hace click en el link que te enviamos para Activar tu cuenta.",
    "primary-action": "Volver al LogIn",
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

    history.push("/login");
  };

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
          onClick={renderLogin}
          variant="contained"
          color="primary"
          className={classes.action}
        >
          {content["primary-action"]}
        </Button>
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
