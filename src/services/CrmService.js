import http from "../http-common";

const getAll = () => {
  return http.get("/empleado/");
};

const get = (id) => {
  return http.get(`/empleado/${id}/`);
};

const create = (data) => {
  return http.post("/empleado/", data);
};

const update = (id, data) => {
  return http.put(`/empleado/${id}/`, data);
};

const remove = (id) => {
  return http.delete(`/empleado/${id}/`);
};


const findByName = (title) => {
  return http.get(`/empleado/?name=${title}`);

};

const CrmService = {
  getAll,
  get,
  create,
  update,
  remove,
  findByName,
};

export default CrmService;
