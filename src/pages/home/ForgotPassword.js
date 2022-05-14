import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "./modules/components/Typography";
import FormButton from "./modules/form/FormButton";
import RFTextField from "./modules/form/RFTextField";
import { email, required } from "./modules/form/validation";
import AppAppBar from "./modules/views/AppAppBar";
import AppForm from "./modules/views/AppForm";
import withRoot from "./modules/withRoot";

function ForgotPassword() {
  const [sent, setSent] = React.useState(false);

  const validate = (values) => {
    const errors = required(["email"], values);

    if (!errors.email) {
      const emailError = email(values.email);
      if (emailError) {
        errors.email = emailError;
      }
    }

    return errors;
  };

  const handleSubmit = () => {
    setSent(true);
  };

  return (
    <React.Fragment>
      <AppAppBar />
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Olvidaste tu Contraseña?
          </Typography>
          <Typography variant="body2" align="center">
            {
              "Ingrese su dirección de correo electrónico a continuación y le enviaremos un enlace para restaurar su contraseña."
            }
          </Typography>
        </React.Fragment>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {({ handleSubmit: handleSubmit2, submitting }) => (
            <Box
              component="form"
              onSubmit={handleSubmit2}
              noValidate
              sx={{ mt: 6 }}
            >
              <TextField
                autoFocus
                autoComplete="email"
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="Email"
                margin="normal"
                name="email"
                required
                size="large"
              />
              <FormButton
                sx={{ mt: 3, mb: 2 }}
                disabled={submitting || sent}
                size="large"
                color="secondary"
                fullWidth
              >
                {submitting || sent ? "In progress…" : "Send reset link"}
              </FormButton>
            </Box>
          )}
        </Box>
      </AppForm>
    </React.Fragment>
  );
}

export default withRoot(ForgotPassword);
