import React, { useState, useEffect } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import AccountProfile from "../../../components/profile/AccountProfile";
import { AccountProfileDetails } from "../../../components/profile/AccountProfileDetails";
import { SettingsPassword } from "../../../components/profile/SettingsPassword";
import CustomerLayout from "./../../../layout/CustomerLayout";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import UserService from "../../../services/user.service";
import { useSelector, useDispatch } from "react-redux";

import { useConfirm } from "material-ui-confirm";
import CustomizedSnackbars from "../../../components/ui/CustomizedSnackbars";

import { retrieveUser } from "../../../actions/auth";

const CustomerProfile = () => {
  //const user = JSON.parse(localStorage.getItem("user"));
  const { user } = useSelector((state) => state.auth);
  const confirm = useConfirm();
  const [open, setOpen] = useState(false);

  const [snackbar, setSnackbar] = useState({});

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
                onClick={handleDeleteAccount}
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

CustomerProfile.getLayout = (page) => <CustomerLayout>{page}</CustomerLayout>;

export default CustomerProfile;
