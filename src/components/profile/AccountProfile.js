import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";

const user = {
  avatar: "/static/images/avatars/avatar_6.png",
  jobTitle: "Administrador",
  name: "Carlos Perez",
};

export const AccountProfile = (props) => (
  <Card {...props}>
    <CardContent>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Avatar
          src={user.avatar}
          sx={{
            height: 64,
            mb: 2,
            width: 64,
          }}
        />
        <Typography color="textPrimary" gutterBottom variant="h5">
          {user.name}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {`${user.jobTitle}`}
        </Typography>
      </Box>
    </CardContent>
    <Divider />
    <CardActions>
      <Button color="primary" fullWidth variant="text">
        Subir Imagen de Perfil
      </Button>
    </CardActions>
  </Card>
);
