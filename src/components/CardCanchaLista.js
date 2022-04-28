import React, { useState } from "react";
import CardCancha from "./items/CardCancha";
import Stack from "@mui/material/Stack";
import { institutions as i } from "./../assets/mocks/Institutions";

const CardCanchaLista = () => {
  const [institutions, setInstitutions] = useState(i);

  return (
    <>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
      >
        {institutions.map((institution) => (
          <CardCancha institution={institution} />
        ))}
      </Stack>
      {/*<Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
      >
        <CardCancha institution={institutions[0]} />
        <CardCancha institution={institutions[0]} />
        <CardCancha institution={institutions[0]} />
      </Stack>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
      >
        <CardCancha institution={institutions[0]} />
        <CardCancha institution={institutions[0]} />
        <CardCancha institution={institutions[0]} />
  </Stack>*/}
    </>
  );
};

export default CardCanchaLista;
