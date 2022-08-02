import { createStyles, makeStyles } from "@material-ui/core/styles";
import { styled } from "@mui/material/styles";
import { DropzoneAreaBase, DropzoneDialogBase } from "material-ui-dropzone";
import React from "react";
import { useDispatch } from "react-redux";
import { uploadPhotos } from "../../actions/photos";

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
  entityId,
}) => {
  const dispatch = useDispatch();
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

  return isModal ? (
    <DropzoneDialogBase
      dialogTitle="Carga las fotos de la Cancha"
      acceptedFiles={["image/*"]}
      cancelButtonText={"Cancelar"}
      submitButtonText={"Cargar Fotos"}
      open={openUploadPhotos}
      onClose={handleClose}
      onSave={(files) => {
        console.log("onSave", fileObjects);
        handleUploadImage(fileObjects);
        handleClose();
      }}
      onAdd={(newFileObjs) => {
        console.log("onAdd", newFileObjs);
        console.log("files limit", filesLimit);
        if (filesLimit === 1) {
          setFileObjects([].concat(newFileObjs));
        } else {
          setFileObjects([].concat(fileObjects, newFileObjs));
        }
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
      acceptedFiles={["image/*"]}
      cancelButtonText={"Cancelar"}
      submitButtonText={"Cargar Fotos"}
      open={openUploadPhotos}
      onClose={handleClose}
      onSave={(files) => {
        console.log("onSave", fileObjects);
        handleUploadImage(files);
        handleClose();
      }}
      onAdd={(newFileObjs) => {
        console.log("onAdd", newFileObjs);
        console.log("files limit", filesLimit);
        if (filesLimit === 1) {
          setFileObjects([].concat(newFileObjs));
        } else {
          setFileObjects([].concat(fileObjects, newFileObjs));
        }
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
  );
};

export default UploadPhotos;
