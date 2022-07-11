import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Stack } from "@mui/material";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackbarAlertMessageComponent = ({ openSnackbar, setOpenSnackbar }) => {
  const handleCloseSnackbar = (event, reason) => {
    setOpenSnackbar((prevState) => {
      return { ...prevState, open: false };
    });
  };

  return (
    <div>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          autoHideDuration={4000}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={openSnackbar.open}
          onClose={handleCloseSnackbar}
        >
          <Alert
            severity={openSnackbar.severity}
            onClose={handleCloseSnackbar}
            sx={{ width: "100%" }}
          >
            {openSnackbar.message}
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  );
};

export default SnackbarAlertMessageComponent;
