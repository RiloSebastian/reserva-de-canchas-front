import http from "../../http-common";

/* const upload = async (entity_type, owner_id, images) => {
  const formData = new FormData();
  formData.append("files", images[0].file);

  console.log("enviando form data con imagenes");
  console.log(images);
  console.log(formData);

  return await http.post(`/files/set/${entity_type}/${owner_id}`, formData, {
    headers: {
      Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).token,
      "Content-type": "multipart/form-data",
    },
  });
}; */

const upload = async (entity_type, owner_id, images) => {
  const formData = new FormData();
  //formData.append("files", image.file);

  for (let i = 0; i < images.length; i++) {
    formData.append("files", images[i].file);
  }

  return await http.post(`/files/set/${entity_type}/${owner_id}`, formData, {
    headers: {
      Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).token,
      "Content-type": "multipart/form-data",
    },
  });
};

const getById = async (id) => {
  try {
    const image = await http.get(`/photos/${id}`);
    console.log("image");
    console.log(image);
    return image;
  } catch (err) {
    console.log(" error al obtener image");
    console.log(err);
    return Promise.reject(err);
  }
};

export default {
  upload,
  getById,
};
