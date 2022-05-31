import axios from "axios";

const getAllFeriados = async (year) => {

    console.log("Obteniendo feriados")

    const FERIADOS_API_URL =  `https://nolaborables.com.ar/api/v2/feriados/2022?&incluir=opcional`

    return await axios
      .get(FERIADOS_API_URL)
      .then((response) => {
        console.log("feriados");
        console.log(response.data)
        return response.data;
      });
  };

export default {
    getAllFeriados,
};
