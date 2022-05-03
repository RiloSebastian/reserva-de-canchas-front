import { Box, Container, Grid, Typography } from "@mui/material";
import { AccountProfile } from "../../../components/profile/AccountProfile";
import { AccountProfileDetails } from "../../../components/profile/AccountProfileDetails";
import { SettingsPassword } from "../../../components/profile/SettingsPassword";
import CustomerLayout from "./../../../layout/CustomerLayout";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

const CustomerProfile = () => (
  <>
    <Typography>
      <title>Perfil | Material Kit</title>
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
            <AccountProfile />
          </Grid>
          <Grid item lg={8} md={6} xs={12}>
            <AccountProfileDetails />
          </Grid>
          <Grid item lg={8} md={6} xs={12}>
            <SettingsPassword />
          </Grid>
          <Grid item lg={4} md={6} xs={12}></Grid>
          <Grid item lg={8} md={6} xs={12}>
            <Button
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
  </>
);

CustomerProfile.getLayout = (page) => <CustomerLayout>{page}</CustomerLayout>;

export default CustomerProfile;
