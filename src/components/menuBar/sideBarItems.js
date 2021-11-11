import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import PeopleIcon from '@mui/icons-material/People';
import FeedbackIcon from '@mui/icons-material/Feedback';
import SportsScoreIcon from '@mui/icons-material/SportsScore';

const ReservationMenu = [
    {
        name: "Reservas",
        url: "/reservas",
        icon: <EventAvailableIcon />
    },
    {
        name: "Canchas",
        url: "/canchas",
        icon: <SportsScoreIcon />
    },
    {
        name: "Promociones",
        url: "/promociones",
        icon: <WhatshotIcon />
    },
    {
        name: "Empleados",
        url: "/empleados",
        icon: <PeopleIcon />,
        children: [
            {
                name: "Child31",
                url: "/child31"
            },
            {
                name: "Child32",
                url: "/child32"
            },
            {
                name: "Child33",
                url: "/child33"
            }
        ]
    },
    {
        name: "Feedback",
        url: "/feedback",
        icon: <FeedbackIcon />,
        children: [
            {
                name: "Child41",
                url: "/child41"
            },
            {
                name: "Child42",
                url: "/child42"
            },
            {
                name: "Child43",
                children: [
                    {
                        name: "Child431",
                        url: "/child431"
                    },
                    {
                        name: "Child432",
                        url: "/child432,"
                    },
                    {
                        name: "Child433",
                        url: "/child433"
                    }
                ]
            }
        ]
    }
];


export default ReservationMenu;