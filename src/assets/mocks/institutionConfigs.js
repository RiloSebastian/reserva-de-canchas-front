export const institutionConfigs = {
  id: 1,
  institution_name: "Palermo Tenis",
  schedules: [
    {
      schedule_id: 1,
      days: ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"],
      from: "7:00",
      to: "23:00",
    },
    {
      schedule_id: 1,
      days: ["Sabado", "Domingo"],
      from: "9:00",
      to: "20:00",
    },
  ],
  sports: [
    {
      sport_id: 1,
      name: "Futbol",
      courts: [
        {
          sport_id: 1,
          court_id: 1,
          name: "Cancha 1",
          sign_percentage: 25,
          schedules: [
            {
              schedule_id: 1,
              from: "7:00",
              to: "18:00",
              price: 1500,
            },
            {
              schedule_id: 2,
              from: "19:00",
              to: "23:00",
              price: 1800,
            },
          ],
        },
        {
          sport_id: 1,
          court_id: 2,
          name: "Cancha 2",
          sign_percentage: 25,
          schedules: [
            {
              schedule_id: 3,
              from: "7:00",
              to: "18:00",
              price: 1500,
            },
            {
              schedule_id: 4,
              from: "19:00",
              to: "23:00",
              price: 1800,
            },
          ],
        },
        {
          sport_id: 1,
          court_id: 3,
          name: "Cancha 3",
          sign_percentage: 25,
          schedules: [
            {
              schedule_id: 5,
              from: "7:00",
              to: "18:00",
              price: 1500,
            },
            {
              schedule_id: 6,
              from: "19:00",
              to: "23:00",
              price: 1800,
            },
          ],
        },
      ],
    },
    {
      sport_id: 2,
      name: "Tenis",
      courts: [
        {
          sport_id: 2,
          court_id: 4,
          name: "Cancha Central",
          sign_percentage: 50,
          schedules: [
            {
              schedule_id: 7,
              from: "7:00",
              to: "18:00",
              price: 1500,
            },
          ],
        },
        {
          sport_id: 2,
          court_id: 5,
          name: "Cancha Secundaria",
          sign_percentage: 50,
          schedules: [
            {
              schedule_id: 9,
              from: "7:00",
              to: "18:00",
              price: 1500,
            },
            {
              schedule_id: 10,
              from: "19:00",
              to: "23:00",
              price: 1800,
            },
          ],
        },
      ],
    },
  ],
  address: "Jorge Luis Borges 2135, CABA",
  image:
    "https://as01.epimg.net/tenis/imagenes/2020/08/01/mas_tenis/1596293296_404365_1596293770_noticia_normal_recorte1.jpg",
  institution_rating: 5.0,
};
