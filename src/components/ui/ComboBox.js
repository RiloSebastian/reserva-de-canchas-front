import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
const ComboBox = ({
  autoComplete,
  name,
  required,
  fullWidth,
  id,
  label,
  value,
  onChange,
  addressObtained,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Autocomplete
      open={open}
      onInputChange={(_, value) => {
        if (value.length === 0) {
          if (open) setOpen(false);
        } else {
          if (!open) setOpen(true);
        }
      }}
      onClose={() => setOpen(false)}
      options={addressObtained}
      fullWidth
      getOptionLabel={(option) => option.display_name}
      filterOptions={(x) => x}
      renderInput={(params) => (
        <TextField
          {...params}
          autoComplete="given-name"
          name="address"
          required
          fullWidth
          id="address"
          label="Direccion de la Institucion"
          onChange={onChange}
        />
      )}
    />
  );
};

export default ComboBox;
