import Home from "./home/Home";
import ListaReserva from "./reservas/ListaReserva";
import ReservaGrid from "./reservas/ReservaGrid";
import ListaCanchas from "./canchas/ListaCanchas";
import ListaEmpleado from "./usuarios/empleados/ListaEmpleado";
import ListaPromociones from "./promociones/ListaPromociones";
import ListaFeedback from "./feedback/ListaFeedback";
import Checkout from "./checkout/Checkout";
import MisReservas from "./usuarios/clientes/MisReservas";
import Listainstitucions from "./instituciones/ListaInstituciones";
import ConfiguracionInstituciones from "./instituciones/ConfiguracionInstituciones";

export const BASE_URL = {
  base: "/dashboard",
};

export const PATHS = {
  login: "/login",
  signup: "/signup",
  forgotpass: "/forgot-pass",
};

export const CustomerRoutes = [
  {
    id: "home",
    path: "/home",
    component: Home,
    exact: true,
  },
  {
    id: "checkout",
    path: "/checkout",
    component: Checkout,
    exact: true,
  },
  {
    id: "reservas",
    path: "/reservas",
    component: ReservaGrid,
    exact: true,
  },
];

const InstitutionRoutes = [
  {
    id: "home",
    path: "/home",
    component: Home,
    exact: true,
  },
  {
    id: "mis-reservas",
    path: "/home/mis-reservas",
    component: MisReservas,
    exact: true,
  },
  {
    id: "checkout",
    path: "/checkout",
    component: Checkout,
    exact: true,
  },
  {
    id: "reservas",
    path: "/reservas",
    component: ReservaGrid,
    exact: true,
  },
  {
    id: "instituciones",
    path: "/instituciones",
    component: Listainstitucions,
    exact: true,
  },
  {
    id: "canchas",
    path: "/canchas",
    component: ListaCanchas,
    exact: true,
  },
  {
    id: "promociones",
    path: "/promociones",
    component: ListaPromociones,
    exact: true,
  },
  {
    id: "empleados",
    path: "/empleados",
    component: ListaEmpleado,
    exact: true,
  },
  {
    id: "feedback",
    path: "/feedback",
    component: ListaFeedback,
    exact: true,
  },
  {
    id: "configuracion",
    path: "/configuracion",
    component: ConfiguracionInstituciones,
    exact: true,
  },
];

export default InstitutionRoutes;
