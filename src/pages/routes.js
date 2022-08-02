import ListaCanchas from "./canchas/ListaCanchas";
import Checkout from "./checkout/Checkout";
import ListaFeedback from "./feedback/ListaFeedback";
import Home from "./home/Home";
import ConfiguracionInstituciones from "./instituciones/ConfiguracionInstituciones";
import Listainstitucions from "./instituciones/ListaInstituciones";
import ListaPromociones from "./promociones/ListaPromociones";
import ReservaGridCustom2 from "./reservas/ReservaGridCustom2";
import ReservaGrid from "./reservas/ReservaGrid";
import MisReservas from "./usuarios/clientes/MisReservas";
import ListaEmpleado from "./usuarios/empleados/ListaEmpleado";
import AdminProfile from "./usuarios/profile/AdminProfile";
import CustomerProfile from "./usuarios/profile/CustomerProfile";

export const FooterRoutes = [
  { name: "Home", link: "/" },
  { name: "About", link: "/about" },
];

export const BASE_URL_INSTITUTIONS = {
  base: "/dashboard",
};

export const BASE_URL_CUSTOMERS = {
  base: "/customer",
};

export const PATHS = {
  login: "/login",
  signup: "/signup",
  accountconfirmation: "/account-confirmation",
  accountverification: "/account-validation/:userToken",
  signupinstitution: "/signup/institution",
  forgotpass: "/forgot-pass",
  homepage: "/homepage",
  payments: "/customer/checkout/:userToken",
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
    id: "mis-reservas",
    path: "/mis-reservas",
    component: MisReservas,
    exact: true,
  },
  {
    id: "reservas",
    path: "/reservas",
    //component: ReservaGridCustom2,
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

export const SocialMediaRoutes = {
  instagram: "https://www.instagram.com",
  facebook: "https://www.facebook.com",
  github: "https://github.com",
  homepage: "/homepage",
};

export default InstitutionRoutes;
