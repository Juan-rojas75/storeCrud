"use client";
import { useEffect, useState } from "react";
import { useLoading } from "../context/loaderContext";
import { useToast } from "../context/ToastContext";
import { apiGet, apiPost } from "../lib/api";
import Dropdown from "../components/customs/dropdown/dropdown";


export default function Subida() {
  //List of products
  const [data, setData] = useState([]); 

  //Product selected
  const [product, setProduct] = useState("");
  //HOOKS
  const { showLoader, hideLoader } = useLoading();
  const { showToast } = useToast();

/**
 * Handles the form submission for creating a special price.
 * Prevents the default form submission behavior and gathers form data.
 * Displays a loader during the process.
 * Validates that the required fields 'user', 'product', and 'price' are filled.
 * Sends a POST request to store the special price if validation passes.
 * Displays a success toast message on successful submission, or an error toast on failure.
 * Hides the loader after the process is complete.
 *
 * @param {any} e - The event object from the form submission.
 */

  const handleSubmit = async (e : any) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    showLoader();
    try {
      if (formData) {
          const user = formData.get("user") as string | null;
          const price = formData.get("price") as number | null;
          if (user && product && price) {
            // await authContext.login(email, password);
            await apiPost(`/precios-especiales`,{user:user.toLowerCase(), productoId:product, precio:price});
            showToast("¡Éxito!", "Precio especial almacenado correctamente.", 4000);
          } else {
            showToast("Error!", "Por favor completa todos los campos.", 4000);
          }
          hideLoader();
        }
      } catch (error) {
        showToast("Error!", "Error al subir el precio especial.", 4000);
        hideLoader();
    }
  };


/**
 * Fetches articles from the API.
 * Shows a loader while the data is being fetched.
 * Tries to fetch the data, and if successful, sets the state with the results.
 * If there is an error, hides the loader.
 * Finally, hides the loader.
 * @param {number} [page=1] Page number to fetch.
 * @param {number} [limit=20] Limit of items to fetch.
 */
  async function fetchArticles(page = 1, limit = 20) {
    showLoader();
    try {
      const response = await apiGet(`/products?page=${1}&limit=${0}`);
      if (!response.meta.status) throw new Error("Error al obtener los datos");
      const result = response;
      setData(result.data.map((item: any) => {
        return{
          value: item._id,
          label: item.name
        }
      }));
      hideLoader();
    } catch (err: any) {
      hideLoader();
    } finally {
      hideLoader();
    }
  }

  useEffect(() => {
    fetchArticles();
  }, []);


  return (
    <article className="flex flex-col items-center min-h-screen w-full gap-10 h-full p-8">
      <section className="flex flex-col h-fit w-full gap-4 p-8 bg-big-stone-950 rounded-md">
        <h1 className="text-4xl text-left font-bold text-white">Subir precios especiales</h1>
      </section>
        <article className="flex flex-row justify-center h-fit w-fit bg-big-stone-950 p-4 rounded-md">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
             <div>
              <label htmlFor="user-label" className="text-white">Usuario</label>
              <input type="text" id="user" name="user" className="w-full px-2 py-1 rounded-md bg-white outline-none" />
             </div>
             <div>
              <label htmlFor="marca" className="text-white">Marca</label>
              <Dropdown options={data} onSelect={(option) => setProduct(option.value)}/>
             </div>
             <div>
              <label htmlFor="price" className="text-white">Precio especial</label>
              <input type="number" id="price" name="price" className="w-full px-2 py-1 rounded-md bg-white outline-none" />
             </div>
             <button type="submit" className="w-full px-4 py-2 bg-green-600 rounded-md text-white hover:bg-green-500">Subir</button>
          </form>
      </article>
    </article>
  );
}
