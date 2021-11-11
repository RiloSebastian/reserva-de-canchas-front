import Home from "./home/Home";
import ListaReserva from "./reservas/ListaReserva";
import ListaCanchas from './canchas/ListaCanchas';


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
        id: 'promociones',
        path: '/promociones',
        component: ListaReserva,
        exact: true
    },
    {
        id: 'empleados',
        path: '/empleados',
        component: ListaReserva,
        exact: true
    },
    {
        id: 'feedback',
        path: '/feedback',
        component: ListaReserva,
        exact: true
    }
];

export default InstitutionRoutes;