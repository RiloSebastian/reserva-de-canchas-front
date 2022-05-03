import HomePage from "./home/HomePage";
import Home from "./home/Home";
import ListaCanchas from "./canchas/ListaCanchas";
import ListaEmpleado from "./usuarios/empleados/ListaEmpleado";
import ListaPromociones from "./promociones/ListaPromociones";
import ListaFeedback from "./feedback/ListaFeedback";
import Checkout from "./checkout/Checkout";
import MisReservas from "./usuarios/clientes/MisReservas";
import Listainstitucions from "./instituciones/ListaInstituciones";
import ConfiguracionInstituciones from "./instituciones/ConfiguracionInstituciones";
import CustomerProfile from "./usuarios/profile/CustomerProfile";
import AdminProfile from "./usuarios/profile/AdminProfile";
import ReservaGrid from "./reservas/ReservaGrid";

export const BASE_URL_INSTITUTIONS = {
  base: "/dashboard",
};

export const BASE_URL_CUSTOMERS = {
  base: "/customer",
};

export const PATHS = {
  login: "/login",
  signup: "/signup",
  signupinstitution: "/signup/institution",
  forgotpass: "/forgot-pass",
  homepage: "/homepage",
};

export const CustomerRoutes = [
  {
    id: "home",
    path: "/home",
    component: Home,
    exact: true,
  },

  {
    id: "perfil",
    path: "/perfil",
    component: CustomerProfile,
    exact: true,
  },
  {
    id: "mis-reservas",
    path: "/mis-reservas",
    component: MisReservas,
    exact: true,
  },
  {
    id: "checkout",
    path: "/checkout",
    component: Checkout,
    exact: true,
  },
];

const InstitutionRoutes = [
  {
    id: "perfil",
    path: "/perfil",
    component: AdminProfile,
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
