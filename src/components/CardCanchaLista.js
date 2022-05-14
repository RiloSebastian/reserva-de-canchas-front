import { Container, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { institutionsFounded as i } from "./../assets/mocks/institutionsFounded";
import CourtFilterSideBar from "./courts/CourtFilterSideBar";
import CourtSort from "./courts/CourtSort";
import CardCancha from "./items/CardCancha";

const CardCanchaLista = () => {
  const [institutions, setInstitutions] = useState(i);

  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    <Container>
      <Typography variant="h4">Instituciones Encontradas</Typography>

      <Stack
        direction="row"
        flexWrap="wrap-reverse"
        alignItems="center"
        justifyContent="flex-end"
        sx={{ mb: 5 }}
      >
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          <CourtFilterSideBar
            isOpenFilter={openFilter}
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
          />
          <CourtSort />
        </Stack>
      </Stack>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
      >
        {/*institutions.map((institution) => (
          <CardCancha institution={institution} />
        ))*/}
        {institutions.map((institution) => (
          <CardCancha institution={institution} />
        ))}
      </Stack>
    </Container>
  );
};

export default CardCanchaLista;
