import { Box, Container, Grid, Typography } from "@mui/material";
import { AccountProfile } from "../../../components/profile/AccountProfile";
import { AccountProfileDetails } from "../../../components/profile/AccountProfileDetails";
import InstitutionLayout from "../../../layout/InstitutionLayout";

const AdminProfile = () => (
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
            <AccountProfile />
          </Grid>
          <Grid item lg={8} md={6} xs={12}>
            <AccountProfileDetails />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

AdminProfile.getLayout = (page) => (
  <InstitutionLayout>{page}</InstitutionLayout>
);

export default AdminProfile;
