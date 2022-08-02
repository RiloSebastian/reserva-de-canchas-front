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
import { useConfirm } from "material-ui-confirm";
import { uploadPhotos } from "../../actions/photos";
import { useDispatch } from "react-redux";
import CustomizedSnackbars from "../ui/CustomizedSnackbars";

const getUserRole = () => {
  const userRole = JSON.parse(
    JSON.parse(authService.getCurrentUser())
  ).roles[0].replace(/ROLE_/g, "");

  return USER_ROLE[userRole].name;
};

const AccountProfile = (props) => {
  const confirm = useConfirm();

  const dispatch = useDispatch();

  const { user } = props;

  const [fileObjects, setFileObjects] = useState([]);

  const [openUploadPhotos, setOpenUploadPhotos] = useState(false);

  const [snackbar, setSnackbar] = useState({});

  const [open, setOpen] = useState(false);

  const handleMessageLoaded = (isSuccess) => {
    if (isSuccess) {
      setSnackbar({
        message: "Las Imagenes se han Guardado Exitasamente!",
        severity: "success",
      });
    } else {
      setSnackbar({
        message:
          "Hubo un error al intentar guardar las Imagenes. Vuelva a intentarlo",
        severity: "error",
      });
    }

    setOpen(true);
  };

  const handleUploadImage = async (fileObjects) => {
    confirm({
      title: "¿Esta Seguro que desea Subir estas Imagenes?",
      cancellationText: "Cancelar",
    })
      .then(() => {
        console.log("subiendo la imagen del usuario");
        console.log(fileObjects);

        handleUploadChanges(fileObjects);
      })
      .catch(() => console.log("Deletion cancelled."));
  };

  const handleUploadChanges = async (files) => {
    dispatch(uploadPhotos("user", user.id, files))
      .then((date) => {
        handleMessageLoaded(true);
      })
      .catch((error) => {
        handleMessageLoaded(false);
      });
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
              //src={user.avatar}
              src={user.profilePicture ? user.profilePicture : ""}
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
          handleUploadImage={handleUploadImage}
        />
      )}

      <CustomizedSnackbars
        message={snackbar.message}
        severity={snackbar.severity}
        setOpen={setOpen}
        open={open}
      />
    </>
  );
};

export default AccountProfile;
