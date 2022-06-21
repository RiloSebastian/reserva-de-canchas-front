import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Typography from "@mui/material/Typography";
import { DropzoneDialog } from "material-ui-dropzone";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { DropzoneDialogBase, DropzoneAreaBase } from "material-ui-dropzone";

const Input = styled("input")({
  display: "none",
});

const UploadPhotos = ({
  openUploadPhotos,
  setOpenUploadPhotos,
  images,
  setImages,
  handleUploadImage,
  fileObjects,
  setFileObjects,
  filesLimit,
  isModal,
}) => {
  /* function uploadSingleFile(e) {
    let ImagesArray = Object.entries(e.target.files).map((e) =>
      URL.createObjectURL(e[1])
    );
    console.log(ImagesArray);
    setImages([...images, ...ImagesArray]);
    console.log("images", images);
  }
 */
  function uploadSingleFile(files) {
    let ImagesArray = Object.entries(files).map((e) =>
      URL.createObjectURL(e[1])
    );
    console.log(ImagesArray);
    setImages([...images, ...ImagesArray]);
    console.log("images", images);
    handleClose();
  }

  function upload(e) {
    e.preventDefault();
    console.log(images);
  }

  function deleteFile(file) {
    const s = fileObjects.filter((image) => image.data !== file.data);
    setFileObjects(s);
  }

  const handleClose = () => {
    //setLoading(true);
    setOpenUploadPhotos(false);
  };

  const useStyles = makeStyles((theme) =>
    createStyles({
      previewChip: {
        minWidth: 160,
        maxWidth: 210,
      },
    })
  );

  const classes = useStyles();

  //const [fileObjects, setFileObjects] = useState([]);

  return (
    isModal ? (
      <DropzoneDialogBase
        dialogTitle="Carga las fotos de la Cancha"
        acceptedFiles={["image/*"]}
        cancelButtonText={"Cancelar"}
        submitButtonText={"Cargar Fotos"}
        open={openUploadPhotos}
        onClose={handleClose}
        onSave={(files) => {
          console.log("onSave", fileObjects);
          handleClose();
        }}
        onAdd={(newFileObjs) => {
          console.log("onAdd", newFileObjs);
          setFileObjects([].concat(fileObjects, newFileObjs));
        }}
        onDelete={(deleteFileObj) => {
          console.log("onDelete", deleteFileObj);
          deleteFile(deleteFileObj);
        }}
        fileObjects={fileObjects}
        showPreviews={true}
        showFileNamesInPreview={true}
        maxFileSize={50000000}
        showPreviewsInDropzone={false}
        previewGridProps={{
          container: { spacing: 1, direction: "row" },
        }}
        previewText="Imagenes Seleccionadas"
        filesLimit={filesLimit}
        dropzoneText="Arrastre y suelte una foto aquí o haga Clic"
      />
    ) : (
      <DropzoneAreaBase
        dialogTitle="Carga las fotos de la Cancha"
        acceptedFiles={["image/*"]}
        cancelButtonText={"Cancelar"}
        submitButtonText={"Cargar Fotos"}
        open={openUploadPhotos}
        onClose={handleClose}
        onSave={(files) => {
          console.log("onSave", fileObjects);
          handleClose();
        }}
        onAdd={(newFileObjs) => {
          console.log("onAdd", newFileObjs);
          setFileObjects([].concat(fileObjects, newFileObjs));
        }}
        onDelete={(deleteFileObj) => {
          console.log("onDelete", deleteFileObj);
          deleteFile(deleteFileObj);
        }}
        fileObjects={fileObjects}
        showPreviews={true}
        showFileNamesInPreview={true}
        maxFileSize={50000000}
        showPreviewsInDropzone={false}
        previewGridProps={{
          container: { spacing: 1, direction: "row" },
        }}
        previewText="Imagenes Seleccionadas"
        filesLimit={filesLimit}
        dropzoneText="Arrastre y suelte una foto aquí o haga Clic"
      />
    )

  );
};

export default UploadPhotos;
