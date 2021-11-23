import Home from "./home/Home";
import ListaReserva from "./reservas/ListaReserva";
import ListaCanchas from './canchas/ListaCanchas';
import ListaEmpleado from "./usuarios/empleados/ListaEmpleado";
import ListaPromociones from './promociones/ListaPromociones';
import ListaFeedback from "./feedback/ListaFeedback";
import AltaCancha from "./canchas/AltaCancha";

export const BASE_URL = {
    base: '/dashboard',
}

export const PATHS = {
    login: '/login',
    signup: '/signup'
}

export const CustomerRoutes = [
    {
        id: 'home',
        path: '/home',
        component: Home,
        exact: true
    },
    {
        id: 'pagos',
        path: '/pagos',
        component: Home,
        exact: true
    }
];

const InstitutionRoutes = [
    {
        id: 'reservas',
        path: '/reservas',
        component: ListaReserva,
        exact: true
    },
    {
        id: 'canchas',
        path: '/canchas',
        component: ListaCanchas,
        exact: true
    },
    {
        id: 'altaCancha',
        path: '/alta-cancha',
        component: AltaCancha,
        exact: true
    },
    {
        id: 'promociones',
        path: '/promociones',
        component: ListaPromociones,
        exact: true
    },
    {
        id: 'empleados',
        path: '/empleados',
        component: ListaEmpleado,
        exact: true
    },
    {
        id: 'feedback',
        path: '/feedback',
        component: ListaFeedback,
        exact: true
    }
];

export default InstitutionRoutes;