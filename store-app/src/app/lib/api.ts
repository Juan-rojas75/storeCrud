import axios from "axios";

// Crear una instancia de axios con la configuración base
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
});

/**
 * Realiza una petición GET a la url especificada y devuelve los datos de la
 * respuesta.
 *
 * @param {string} url - La url a la que se va a realizar la petición.
 *
 * @returns {Promise<any>} - Los datos de la respuesta.
 */
export const apiGet = async (url: string) => {
  const res = await api.get(url);
  return res.data;
};

/**
 * Realiza una petición POST a la url especificada y devuelve los datos de la
 * respuesta.
 *
 * @param {string} url - La url a la que se va a realizar la petición.
 * @param {any} data - Los datos a enviar en el body de la petición.
 *
 * @returns {Promise<any>} - Los datos de la respuesta.
 */
export const apiPost = async (url: string, data: any) => {
  const res = await api.post(url, data);
  return res.data;
};

/**
 * Realiza una petición PATCH a la url especificada y devuelve los datos de la
 * respuesta.
 *
 * @param {string} url - La url a la que se va a realizar la petición.
 * @param {any} data - Los datos a enviar en el body de la petición.
 *
 * @returns {Promise<any>} - Los datos de la respuesta.
 */

export const apiPatch = async (url: string, data: any) => {
  const res = await api.patch(url, data);
  return res.data;
};

/**
 * Realiza una petición DELETE a la url especificada y devuelve los datos de la
 * respuesta.
 *
 * @param {string} url - La url a la que se va a realizar la petición.
 *
 * @returns {Promise<any>} - Los datos de la respuesta.
 */

export const apiDelete = async (url: string) => {
  const res = await api.delete(url);
  return res.data;
};

export default api;
