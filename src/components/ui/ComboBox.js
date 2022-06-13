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
  institutionData,
  setInstitutionData
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

      console.log("Seteando la direccion ");

      const address = addresses[0];

      console.log(address);

      const institutionAddress = {
        geometry: {
          coordinates: [address.lon, address.lat],
          type: "Point",
        },
        langAddress: address.display_address,
      };

      console.log("seteando la institutionAddress");
      console.log(institutionAddress);

      setInstitutionData({
        ...institutionData,
        [event.target.name]: institutionAddress,
      });
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
