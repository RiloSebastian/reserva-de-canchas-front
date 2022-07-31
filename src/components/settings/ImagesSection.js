import React, { useEffect, useState } from "react";
import PickersDay from "@mui/lab/PickersDay";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import UploadPhotos from "../ui/UploadPhotos";

import { useConfirm } from "material-ui-confirm";
import { useDispatch } from "react-redux";
import { uploadPhotos } from "../../actions/photos";
import CustomizedSnackbars from "../ui/CustomizedSnackbars";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import MuiAlert from "@mui/material/Alert";

const flexContainer = {
  display: "flex",
  flexDirection: "row",
  padding: 0,
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) => prop !== "selected",
})(({ theme, selected }) => ({
  ...(selected && {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    "&:hover, &:focus": {
      backgroundColor: theme.palette.primary.dark,
    },
    borderTopLeftRadius: "50%",
    borderBottomLeftRadius: "50%",
    borderTopRightRadius: "50%",
    borderBottomRightRadius: "50%",
  }),
}));

export const ImagesSection = ({ props, institution }) => {
  const dispatch = useDispatch();
  const confirm = useConfirm();
  const [open, setOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({});
  const [values, setValues] = useState([]);

  const [fileObjects, setFileObjects] = useState([]);

  const findDate = (dates, date) => {
    const dateTime = date.getTime();
    return dates.find((item) => item.getTime() === dateTime);
  };

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

  const handleSubmitChanges = async () => {
    confirm({
      title: "¿Esta Seguro que desea Subir estass Imagenes?",
      cancellationText: "Cancelar",
    })
      .then(() => {
        console.log("subiendo imagenes de la institucion");

        handleUploadChanges(fileObjects);
      })
      .catch(() => console.log("Deletion cancelled."));
  };

  const handleUploadChanges = async (files) => {
    dispatch(uploadPhotos("institution", institution.id, files))
      .then((date) => {
        handleMessageLoaded(true);
        setFileObjects([]);
      })
      .catch((error) => {
        handleMessageLoaded(false);
      });
  };

  return (
    <>
      <form autoComplete="off" noValidate {...props}>
        <Card>
          <CardHeader title="Seccion de Imagenes" />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <UploadPhotos
                  setFileObjects={setFileObjects}
                  fileObjects={fileObjects}
                  images={[]}
                  isModal={false}
                />
              </Grid>
            </Grid>
            {institution.pictures && institution.pictures.length > 0 ? (
              <ImageList
                style={flexContainer}
                sx={{ width: "100%", height: 200 }}
              >
                {institution.pictures.map((item) => (
                  <ImageListItem
                    sx={{ width: 300, height: 200 }}
                    key={item.img}
                  >
                    <img
                      src={item}
                      srcSet={item}
                      alt={item.title}
                      loading="lazy"
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            ) : (
              <Grid container justifyContent="center">
                <Alert severity="warning">
                  no hay imagenes cargadas para esta cancha
                </Alert>
              </Grid>
            )}
          </CardContent>
          <Divider />
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              p: 2,
            }}
          >
            <Button
              onClick={handleSubmitChanges}
              color="primary"
              variant="contained"
            >
              Guardar Imagenes de la Institucion
            </Button>
          </Box>
        </Card>
      </form>

      <CustomizedSnackbars
        message={snackbar.message}
        severity={snackbar.severity}
        setOpen={setOpen}
        open={open}
      />
    </>
  );
};
