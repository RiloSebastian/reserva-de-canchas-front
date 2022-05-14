import React, { useEffect, useState } from "react";
import DateAdapter from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import moment from "moment";

const SelectDate = ({ setHorariosYPrecios }) => {
  const [desde, setDesde] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const [hasta, setHasta] = useState(moment(new Date()).format("YYYY-MM-DD"));

  /*  useEffect(() => {
  
          let dates = getDates(desde, hasta);
  
          setHorariosYPrecios((body) => {
              return { ...body, ['dates']: dates };
          });
  
          setHorariosYPrecios((body) => {
              return { ...body, ['from']: desde, ['to']: hasta };
          });
  
      }, [desde, hasta]);*/

  /*
        const getDates = (startDate, stopDate) => {
            var dateArray = [];
    
            var currentDate = moment(startDate).clone();
            var lastDate = moment(stopDate);
    
            while (currentDate.isSameOrBefore(lastDate)) {
                dateArray.push(currentDate.format('YYYY-MM-DD'))
                currentDate.add(1, "day");
            }
    
            console.log('array dates')
            console.log(dateArray)
    
            return dateArray;
        }*/

  useEffect(() => {
    setHorariosYPrecios((body) => {
      return { ...body, ["from"]: desde, ["to"]: hasta };
    });
  }, []);

  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <MobileDatePicker
            label="Desde"
            value={desde}
            onChange={(newValue) => {
              setDesde(newValue);
              setHorariosYPrecios((body) => {
                return { ...body, ["from"]: newValue.format("YYYY-MM-DD") };
              });
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </Grid>
        <Grid item xs={6}>
          <MobileDatePicker
            label="Hasta"
            value={hasta}
            onChange={(newValue) => {
              setHasta(newValue);
              setHorariosYPrecios((body) => {
                return { ...body, ["to"]: newValue.format("YYYY-MM-DD") };
              });
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
};

export default SelectDate;
