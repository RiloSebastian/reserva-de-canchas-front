import React, { forwardRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import MaterialTable from "material-table";
import RatingCourts from "../../components/RatingCourts";
import FeedbackService from "../../services/feedbacks/FeedbackService";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const ListaFeedback = () => {
  const institution = useSelector((state) => state.institution);

  const [open, setOpen] = useState(false);

  const [columns, setColumns] = useState([
    { title: "Usuarios", field: "name" },
    {
      title: "Comentarios",
      field: "comentario",
      initialEditValue: "initial edit value",
    },
    //{ title: 'Birth Year', field: 'birthYear', type: 'numeric' },
    {
      title: "Ratings",
      field: "rating",
      customFilterAndSearch: (term, rowData) => term == rowData.rating,
      render: (rowData, renderType) => (
        <RatingCourts rowData={rowData} renderType={renderType} />
      ),
    },
  ]);

  const [data, setData] = useState([
    { name: "Cristian", comentario: "Excelentes Canchas", rating: 5 },
    { name: "Marcela", comentario: "Precios muy buenos", rating: 4.5 },
    {
      name: "Sergio",
      comentario: "La cancha 1 de tenis esta en mal estado",
      rating: 2,
    },
    { name: "Marta", comentario: "Los vestuarios estan sucios", rating: 2 },
    {
      name: "Santiago",
      comentario: "Las luces de las canchas estan muy buenas",
      rating: 4,
    },
  ]);

  const desplegarModal = () => {
    setOpen(true);
  };

  const handleGetFeedbacks = async () => {
    try {
      const feedbackList = await FeedbackService.getAllByInstitution(
        institution.id
      ).then((data) => data);

      setData(feedbackList);
    } catch (error) {
      console.log(
        "MANEJANDO ERROR AL OBTENER TODOS LOS FEEDBACKS DE LA INSTITUCION"
      );
      //setData([]);
    }
  };

  useEffect(() => {
    // OBTENER TODOS LOS FEEDBACKS DE LA INSTITUCION

    console.log("OBTENER TODOS LOS FEEDBACKS DE LA INSTITUCION");

    handleGetFeedbacks();
  }, []);

  return (
    <>
      <MaterialTable
        icons={tableIcons}
        title="Listado de Feedbacks"
        columns={columns}
        data={data}
        options={{
          grouping: true,
          filtering: true,
        }}
        localization={{
          pagination: {
            labelDisplayedRows: "{from}-{to} de {count}",
            labelRowsSelect: "feedbacks",
            nextTooltip: "Proxima Pagina",
            previousTooltip: "Pagina Previa",
            firstTooltip: "Primer Pagina",
            lastTooltip: "Ultima Pagina",
          },
          toolbar: {
            nRowsSelected: "{0} Feedback(s) seleccionado(s)",
            searchTooltip: "Buscar",
            searchPlaceholder: "Buscar Feedback",
          },
          header: {
            actions: "Opciones",
          },
          body: {
            emptyDataSourceMessage:
              "Aun no existen feedbacks asociados a la institucion",
            filterRow: {
              filterTooltip: "Filter",
            },
          },
          grouping: {
            placeholder: "Arrastre los encabezados aquí para agruparlos",
          },
        }}
      />
    </>
  );
};

export default ListaFeedback;
