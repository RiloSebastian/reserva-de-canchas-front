import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import CardCanchaLista from "../../components/CardCanchaLista";
import FormularioFiltroCanchas from "./../../components/formularios-datos/FormularioFiltroCanchas";
import {
  Container,
  Stack,
  Typography,
  Box,
  Grid,
  Pagination,
} from "@mui/material";
import { institutionsFounded as i } from "./../../assets/mocks/institutionsFounded";
import CardCancha from "../../components/items/CardCancha";
import CourtFilterSideBar from "../../components/courts/CourtFilterSideBar";
import CourtSort from "../../components/courts/CourtSort";
import { Card, CardContent } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(5, 2),
  textAlign: "left",
  color: theme.palette.text.secondary,
}));

const Home = () => {
  const [value, setValue] = useState(0);

  const [institutions, setInstitutions] = useState(i);

  const [openFilter, setOpenFilter] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    /*  <Box sx={{ height: 100, width: 1 }}>
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
        <Box
          gridColumn="span 2"
          sx={{
            height: "100%",
            display: "inline-block",
          }}
        >
          <Item>
            <FormularioFiltroCanchas />
          </Item>
        </Box>
        <Box
          gridColumn="span 10"
          sx={{
            height: "100%",
            display: "inline-block",
          }}
        >
          <Item>
            <CardCanchaLista />
          </Item>
        </Box>
      </Box>
    </Box> */
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 2,
        }}
      >
        <Container maxWidth={false}>
          {/* <CourtListToolbar /> */}
          <FormularioFiltroCanchas />
          <Box sx={{ m: 3 }} />
          <Box>
            <Card>
              <CardContent>
                <Typography variant="h4">
                  {institutions.length} Instituciones Encontradas
                </Typography>

                <Box sx={{ pt: 1 }}>
                  <Stack
                    direction="row"
                    flexWrap="wrap-reverse"
                    alignItems="center"
                    justifyContent="flex-end"
                  >
                    <Stack
                      direction="row"
                      spacing={1}
                      flexShrink={0}
                      sx={{ my: 1 }}
                    >
                      <CourtFilterSideBar
                        isOpenFilter={openFilter}
                        onOpenFilter={handleOpenFilter}
                        onCloseFilter={handleCloseFilter}
                      />
                      <CourtSort />
                    </Stack>
                  </Stack>
                  <Box
                    component="main"
                    sx={{
                      flexGrow: 1,
                      pt: 2,
                      pb: 8,
                    }}
                  >
                    <Container
                      sx={{
                        margin: 0,
                      }}
                      maxWidth="100%"
                    >
                      <Grid container spacing={2}>
                        {institutions.map((institution) => (
                          <Grid
                            item
                            key={institution.institution_id}
                            lg={3}
                            md={2}
                            xs={12}
                          >
                            <CardCancha institution={institution} />
                          </Grid>
                        ))}
                      </Grid>
                    </Container>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    pt: 3,
                  }}
                >
                  <Pagination color="primary" count={3} size="small" />
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Home;
