import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { ConfirmProvider } from "material-ui-confirm";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInstitutionSchedules } from "../../actions/institution";
import AdvancePaymentConfig from "../../components/settings/AdvancePaymentConfig";
import { Holidays } from "../../components/settings/Holidays";
import { ImagesSection } from "../../components/settings/ImagesSection";
import { InstitutionDetails } from "../../components/settings/InstitutionDetails";
import { NonWorkingDays } from "../../components/settings/NonWorkingDays";
import { OpenAndCloseTimes } from "../../components/settings/OpenAndCloseTimes";
import InstitucionService from "../../services/instituciones/InstitucionService";

const reducer = (state, action) => {
  console.log("action", action.data);
  console.log("state", state);
  switch (action.type) {
    case "schedules":
      return { ...state, schedules: action.data };
    default:
      return state;
  }
};

const ConfiguracionInstituciones = () => {
  const dispatch = useDispatch();

  const institution = useSelector((state) => state.institution);

  const handleChanges = () => {
    console.log("actualizando datos de la institucion");

    try {
      const instititionDetails = InstitucionService.update().then(
        (data) => data
      );
    } catch (error) {}
  };

  useEffect(() => {
    //Obtener Datos de la Institucions

    dispatch(getInstitutionSchedules(institution.id))
      .then((data) => {})
      .catch((error) =>
        console.log("ERROR AL OBTENER LOS HORARIOS DE LA INSTITUCION")
      );
  }, []);

  return (
    <>
      <ConfirmProvider>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
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
                maxWidth="lg"
              >
                <Typography sx={{ mb: 3 }} variant="h4">
                  <InstitutionDetails institution={institution} />
                </Typography>
                <Box sx={{ pt: 3 }}>
                  <ImagesSection institution={institution} />
                </Box>
                <Box sx={{ pt: 3 }}>
                  <OpenAndCloseTimes institution={institution} />
                </Box>
                <Box sx={{ pt: 3 }}>
                  <NonWorkingDays institution={institution} />
                </Box>
                {/* <Box sx={{ pt: 3 }}>
                  <Holidays institution={institution} />
                </Box> */}
                <Box sx={{ pt: 3 }}>
                  <AdvancePaymentConfig institution={institution} />
                </Box>
              </Container>
            </Box>
          </CardContent>
        </Card>
      </ConfirmProvider>
    </>
  );
};

export default ConfiguracionInstituciones;
