import React, { useState, useEffect } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import AccountProfile from "../../../components/profile/AccountProfile";
import { AccountProfileDetails } from "../../../components/profile/AccountProfileDetails";
import { SettingsPassword } from "../../../components/profile/SettingsPassword";
import InstitutionLayout from "../../../layout/InstitutionLayout";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import UserService from "../../../services/user.service";

import { useConfirm } from "material-ui-confirm";
import CustomizedSnackbars from "../../../components/ui/CustomizedSnackbars";

const AdminProfile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const confirm = useConfirm();
  const [open, setOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({});

  const handleSubmitChanges = async () => {
    confirm({
      title: "¿Esta Seguro que desea Eliminar la Cuenta?",
      cancellationText: "Cancelar",
    })
      .then(() => {
        console.log("elimando admin");

        //handleDeleteAccount(values);
      })
      .catch(() => console.log("Deletion cancelled."));
  };

  const handleDeleteAccount = async () => {
    console.log("ELIMINANDO CUENTA");

    try {
      const deletedUser = await UserService.remove(user.id);
    } catch (error) {}
  };

  return (
    <>
      <Typography>
        <title>Perfil</title>
      </Typography>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Typography sx={{ mb: 3 }} variant="h4">
            Perfil
          </Typography>
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <AccountProfile user={user} />
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <AccountProfileDetails user={user} />
            </Grid>
            <Grid item lg={4} md={6} xs={12}></Grid>
            <Grid item lg={8} md={6} xs={12}>
              <SettingsPassword user={user} />
            </Grid>

            <Grid item lg={4} md={6} xs={12}></Grid>
            <Grid item lg={8} md={6} xs={12}>
              <Button
                onClick={handleSubmitChanges}
                color="error"
                variant="contained"
                startIcon={<DeleteIcon />}
              >
                Eliminar Cuenta
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <CustomizedSnackbars
        message={snackbar.message}
        severity={snackbar.severity}
        setOpen={setOpen}
        open={open}
      />
    </>
  );
};

AdminProfile.getLayout = (page) => (
  <InstitutionLayout>{page}</InstitutionLayout>
);

export default AdminProfile;
