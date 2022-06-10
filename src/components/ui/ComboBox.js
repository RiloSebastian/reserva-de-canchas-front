import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import GeoLocalizacionService from "../../services/geolocalizacion/GeoLocalizacionService";
const ComboBox = ({
  autoComplete,
  name,
  required,
  fullWidth,
  id,
  label,
  value,
  onChange,
}) => {
  const [open, setOpen] = useState(false);

  const [addressObtained, setAddressObtained] = useState([]);

  const handleChangeAddress = async (event) => {
    console.info("Buscando geolocalizacion para " + event.target.value);

    try {
      const addresses = await GeoLocalizacionService.getGeoLocalization(
        event.target.value
      ).then((data) => data.data);

      console.info("Direcciones Obtenidas ");
      console.info(addresses);

      setAddressObtained(addresses);

      console.info("Seteando la direccion ");

      const address = addresses[0];

      const institutionAddress = {
        geometry: {
          coordinates: [address.lat, address.lon],
          type: "Point",
        },
        textualAddress: address.display_address,
      };

      console.info(address);
    } catch (err) {
      console.info("Catcheando Error ");
      console.info(err);
    }
  };

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
      value={value}
      renderInput={(params) => (
        <TextField
          {...params}
          autoComplete="given-name"
          name="address"
          required
          fullWidth
          id="address"
          label="Direccion de la Institucion"
          onChange={handleChangeAddress}
        />
      )}
    />
  );
};

export default ComboBox;
