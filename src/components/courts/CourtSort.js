// material
import { Button, Menu, MenuItem, Typography } from "@mui/material";
import { useState } from "react";
// component
//import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

const SORT_BY_OPTIONS = [
  { value: "featured", label: "Destacadas" },
  { value: "priceDesc", label: "Precio: Mayor-Menor" },
  { value: "priceAsc", label: "Precio: Menor-Mayor" },
];

const CourtSort = () => {
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <Button
        color="inherit"
        disableRipple
        onClick={handleOpen}
        //endIcon={<Iconify icon={open ? 'eva:chevron-up-fill' : 'eva:chevron-down-fill'} />}
      >
        Ordenar por:&nbsp;
        <Typography
          component="span"
          variant="subtitle2"
          sx={{ color: "text.secondary" }}
        >
          Destacadas
        </Typography>
      </Button>
      <Menu
        keepMounted
        anchorEl={open}
        open={Boolean(open)}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {SORT_BY_OPTIONS.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === "newest"}
            onClick={handleClose}
            sx={{ typography: "body2" }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default CourtSort;
