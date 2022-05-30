export const courts = [
  {
    id: 1,
    institution_name: "Palermo Tenis",
    sport: {
      schedules: [
        {
          schedule_id: 1,
          schedule: "9:00",
          courts: [
            {
              court_id: 1,
              name: "Cancha 1",
              price: 1500,
            },
            {
              court_id: 2,
              name: "Cancha 2",
              price: 1500,
            },
            {
              court_id: 3,
              name: "Cancha 3",
              price: 1500,
            },
          ],
        },
        {
          schedule_id: 2,
          schedule: "11:00",
          courts: [
            {
              court_id: 1,
              name: "Cancha 1",
              price: 1500,
            },
            {
              court_id: 2,
              name: "Cancha 2",
              price: 1500,
            },
          ],
        },
        {
          schedule_id: 3,
          schedule: "14:00",
          courts: [
            {
              court_id: 3,
              name: "Cancha 3",
              price: 1500,
            },
          ],
        },
      ],
    },
    sports: [
      {
        sport_id: 1,
        courts: [
          {
            court_id: 1,
            schedules: [
              { schedule_id: 1, schedule: "10:00" },
              { schedule_id: 2, schedule: "11:00" },
              { schedule_id: 3, schedule: "12:00" },
            ],
          },
        ],
      },
    ],
    address: "Jorge Luis Borges 2135, CABA",
    image:
      "https://as01.epimg.net/tenis/imagenes/2020/08/01/mas_tenis/1596293296_404365_1596293770_noticia_normal_recorte1.jpg",
    institution_rating: 5.0,
  },
  {
    id: 2,
    institution_name: "Parque Norte",
    sport: {
      schedules: [
        {
          schedule_id: 2,
          schedule: "11:00",
          courts: [
            {
              court_id: 1,
              name: "Cancha 1",
              price: 1800,
            },
            {
              court_id: 2,
              name: "Cancha 2",
              price: 1800,
            },
          ],
        },
        {
          schedule_id: 3,
          schedule: "14:00",
          courts: [
            {
              court_id: 3,
              name: "Cancha 3",
              price: 1800,
            },
          ],
        },
      ],
    },
    sports: [
      {
        sport_id: 1,
        courts: [
          {
            court_id: 2,
            schedules: [
              { schedule_id: 1, schedule: "11:00" },
              { schedule_id: 2, schedule: "12:00" },
              { schedule_id: 3, schedule: "13:00" },
            ],
          },
        ],
      },
    ],
    address: "Av. Int. Cantilo 2569, Buenos Aires",
    image: "https://www.elcomercioonline.com.ar/imagenes/027947.jpg",
    institution_rating: 4.5,
  },
  {
    id: 3,
    institution_name: "Club Italiano",
    sport: {
      schedules: [
        {
          schedule_id: 1,
          schedule: "9:00",
          day: "07/05/2022",
          courts: [
            {
              court_id: 1,
              name: "Cancha 1",
              price: 1200,
            },
            {
              court_id: 2,
              name: "Cancha 2",
              price: 1500,
            },
            {
              court_id: 3,
              name: "Cancha 3",
              price: 1800,
            },
          ],
        },
        {
          schedule_id: 2,
          schedule: "11:00",
          courts: [
            {
              court_id: 1,
              name: "Cancha 1",
              price: 1800,
            },
            {
              court_id: 2,
              name: "Cancha 2",
              price: 1800,
            },
          ],
        },
      ],
    },
    sports: [
      {
        sport_id: 1,
        courts: [
          {
            court_id: 3,
          },
        ],
      },
    ],
    address: "Av. Rivadavia 4731, CABA",
    image:
      "https://italianodeescobar.files.wordpress.com/2020/12/fleje-tenis-ok-3.jpeg?w=820&h=312&crop=1",
    institution_rating: 3.5,
  },
];
