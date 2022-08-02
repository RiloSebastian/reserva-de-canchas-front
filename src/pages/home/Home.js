import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useReducer, useState } from "react";
import CourtFilterSideBar from "../../components/courts/CourtFilterSideBar";
import CourtSort from "../../components/courts/CourtSort";
import CardCancha from "../../components/items/CardCancha";
import { institutionsFounded as i } from "./../../assets/mocks/institutionsFounded";
import FormularioFiltroCanchas from "./../../components/formularios-datos/FormularioFiltroCanchas";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(5, 2),
  textAlign: "left",
  color: theme.palette.text.secondary,
}));

const reducer = (state, action) => {
  console.log("action", action.data);
  console.log("state", state);
  switch (action.type) {
    case "sport":
      return { ...state, sport: action.data };
    case "location":
      return { ...state, location: action.data };
    case "reservation_date":
      return { ...state, reservation_date: action.data };
    case "reservation_time":
      return { ...state, reservation_time: action.data };
    default:
      return state;
  }
};

const Home = () => {
  const [state, dispatch] = useReducer(reducer, {
    sport: "",
    location: [],
    reservation_date: new Date(),
    reservation_time: [],
  });

  const [institutions, setInstitutions] = useState(i);

  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 2,
        }}
      >
        <Container maxWidth={false}>
          <FormularioFiltroCanchas
            state={state}
            dispatch={dispatch}
            setInstitutions={setInstitutions}
          />
          <Box sx={{ m: 3 }} />
          <Box>
            <Card>
              <CardContent>
                <Typography variant="h4">
                  {institutions.length} Instituciones Encontradas
                </Typography>

                <Box sx={{ pt: 1 }}>
                  {institutions.length > 0 && (
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
                  )}
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
                            <CardCancha
                              institution={institution}
                              state={state}
                            />
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
