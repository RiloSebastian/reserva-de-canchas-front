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
import { useState } from "react";
import { USER_ROLE } from "../../constants/userRole";
import authService from "../../services/auth.service";
import UploadPhotos from "../ui/UploadPhotos";

const getUserRole = () => {
  const userRole = JSON.parse(
    JSON.parse(authService.getCurrentUser())
  ).roles[0].replace(/ROLE_/g, "");

  return USER_ROLE[userRole].name;
};

const AccountProfile = (props) => {
  const { user } = props;

  const [fileObjects, setFileObjects] = useState([]);

  const [openUploadPhotos, setOpenUploadPhotos] = useState(false);

  return (
    <>
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
              //src={user.avatar}
              src={user.photo}
              sx={{
                height: 64,
                mb: 2,
                width: 64,
              }}
            />
            <Typography color="textPrimary" gutterBottom variant="h5">
              {user.email}
            </Typography>
            <Typography color="textSecondary" variant="body2">
              {getUserRole(user.roles[0])}
            </Typography>
          </Box>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            fullWidth
            variant="text"
            onClick={() => setOpenUploadPhotos(true)}
          >
            Cambiar Imagen de Perfil
          </Button>
        </CardActions>
      </Card>
      {openUploadPhotos && (
        <UploadPhotos
          openUploadPhotos={openUploadPhotos}
          setOpenUploadPhotos={setOpenUploadPhotos}
          fileObjects={fileObjects}
          setFileObjects={setFileObjects}
          filesLimit={1}
          isModal={true}
        />
      )}
    </>
  );
};

export default AccountProfile;
