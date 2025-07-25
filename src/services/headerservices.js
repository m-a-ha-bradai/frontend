
import axios_ from "../Api/axios";
const HEADER_API = "headers";

export const fetchheaders = async () => {
  return await axios_.get(HEADER_API);
};

export const fetchheaderById = async (id) => {
  return await axios_.get(HEADER_API + '/' + id);
};

export const deleteheader = async (id) => {
  return await axios_.delete(HEADER_API + '/' + id);
};

export const addheader = async (header) => {
  return await axios_.post(HEADER_API, header);
};

export const editheader = (header) => {
  return axios_.put(HEADER_API + '/' + header._id, header);
};
