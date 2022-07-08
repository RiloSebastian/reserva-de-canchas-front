import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import GeoLocalizacionService from "../../services/geolocalizacion/GeoLocalizacionService";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Typography from "@mui/material/Typography";

const ComboBox = ({ address, setValues }) => {
  // const [open, setOpen] = useState(false);

  const [addressObtained, setAddressObtained] = useState([]);

  //const [value, setValue] = useState(addressObtained[0]);

  const [value, setValue] = useState(
    address ? address.langAddress : addressObtained[0]
  );
  const [inputValue, setInputValue] = useState("");

  const handleListItemClick = (event, option) => {
    console.log("SETEANDO LA DIRECCION SELECCIONADA ");
    //Agregar la direccion de la institucion
    /*  const address = {
      geometry: {
        coordinates: [option.lon, option.lat],
        type: "Point",
      },
      langAddress: option.display_address,
    }; */

    const address = {
      geometry: {
        x: Number(option.lon),
        y: Number(option.lat),
      },
      langAddress: option.display_address,
    };

    console.log(address);

    setInputValue(option.display_address);

    setValues((prevState) => {
      return {
        ...prevState,
        address,
      };
    });
  };

  const handleChangeAddress = async (event) => {
    console.info("Buscando geolocalizacion para " + event.target.value);

    setInputValue(event.target.value);

    try {
      const addresses = await GeoLocalizacionService.getGeoLocalization(
        event.target.value
      ).then((data) => data.data);

      console.info("Direcciones Obtenidas ");
      console.info(addresses);

      setAddressObtained(addresses);
    } catch (err) {
      console.error("Catcheando Error ");
      console.error(err);
    }
  };

  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      options={addressObtained}
      fullWidth
      getOptionLabel={(option) =>
        address ? address.langAddress : option.display_name
      }
      filterOptions={(x) => x}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Direccion de la Institucion"
          onChange={handleChangeAddress}
        />
      )}
      renderOption={(props, option) => {
        console.log("RENDER OPTIONS");

        console.log(props);
        console.log(option.display_address);

        return (
          <li {...props}>
            <Grid
              onClick={(event) => handleListItemClick(event, option)}
              container
              alignItems="center"
            >
              <Grid item>
                <Box
                  component={LocationOnIcon}
                  sx={{ color: "text.secondary", mr: 2 }}
                />
              </Grid>
              <Grid item xs>
                <Typography variant="body2" color="text.secondary">
                  {option.display_address}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
};

export default ComboBox;
