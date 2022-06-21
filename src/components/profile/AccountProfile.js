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
  console.log(userRole);

  return USER_ROLE[userRole].name;
};

const AccountProfile = (props) => {
  const [fileObjects, setFileObjects] = useState([]);

  const [openUploadPhotos, setOpenUploadPhotos] = useState(false);

  const user = {
    avatar: "/static/images/avatars/avatar_6.png",
    jobTitle: getUserRole(),
    name: "Carlos Perez",
  };

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
          <Button
            color="primary"
            fullWidth
            variant="text"
            onClick={() => setOpenUploadPhotos(true)}
          >
            Subir Imagen de Perfil
          </Button>
        </CardActions>
      </Card>
      {openUploadPhotos && (
        <UploadPhotos
          openUploadPhotos={openUploadPhotos}
          setOpenUploadPhotos={setOpenUploadPhotos}
          fileObjects={fileObjects}
          setFileObjects={setFileObjects}
          filesLimit={0}
        />
      )}
    </>
  );
};

export default AccountProfile;
