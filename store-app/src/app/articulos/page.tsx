"use client";
import { useEffect, useState } from "react";
import { apiGet } from "../lib/api";
import { Table } from "../components/customs/table/table";
import { useLoading } from "../context/loaderContext";

export default function Articulos() {
  //HOOKS
  const { showLoader, hideLoader } = useLoading();

  //Search
  const [searchTerm, setSearchTerm] = useState('');

  //List of products
  const [data, setData] = useState([]); 
  const [paginator, setPaginator] = useState({total: 0, page: 1, pages: 0, items_per_page: 0}); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const columns = [{field: "name" ,name:"Nombre",id:1},{field: "price" ,name:"Precio",id:2}, {field: "category" ,name:"Categoria",id:3}, {field: "stock" ,name:"Existencias",id:4}, {field: "description" ,name:"Descripción",id:5}, {field: "brand" ,name:"Marca",id:6}, {field: "sku" ,name:"Referencia",id:7}, {field: "tags" ,name:"Etiquetas",id:8}];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (e.target.value === "") {
      fetchArticles();
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
      const response = await apiGet(`/products?page=${page}&limit=${limit}&search=${searchTerm}`); // Ajusta la URL según tu API
      if (!response.meta.status) throw new Error("Error al obtener los datos");
      const result = response;
      setPaginator(result.meta.paginator);
      setData(result.data); // Guardar los datos en el estado
      hideLoader();
    } catch (err: any) {
      setError(err.message);
      hideLoader();
    } finally {
      setLoading(false);
      hideLoader();
    }
  }

  useEffect(() => {
    fetchArticles();
  }, []);

  
  /**
   * Handle page click event and fetch articles for the given page.
   * @param {number} page Page number to fetch.
   */
  async function handlePageClick(page: number) {
    fetchArticles(page);
  }

  return (
    <article className="flex flex-col min-h-screen w-full gap-10 h-full p-8">
      <section className="flex flex-col h-fit w-full gap-4 p-8 bg-big-stone-950 rounded-md">
        <h1 className="text-4xl text-left font-bold text-white">Articulos</h1>
      </section>
       <article className="flex flex-col items-start justify-start h-fit w-full gap-10 bg-big-stone-950 p-4 rounded-md">
        {(() => {
          if (loading) {
            return <p className="text-primary-950">Cargando...</p>;
          } else if (error) {
            return <p className="text-red-500">Error: {error}</p>;
          } else {
            return (
              <div className="flex flex-col w-full gap-4">
                <div className="flex justify-stretch w-full gap-4">
                  <input type="text" name="search" placeholder="Buscar precios para un usuario" className="max-w-sm w-full p-2 rounded-md outline-none"
                  value={searchTerm} // Enlazamos el valor con el estado
                  onChange={handleInputChange}/>
                  <button className="p-2 rounded-md bg-charade-950 hover:bg-charade-700 text-white" onClick={() => fetchArticles()}>Buscar</button>
                </div>
                <Table 
                  columns={columns} 
                  data={data} 
                  paginator={paginator} 
                  pageClick={handlePageClick} 
                />
              </div>
            );
          }
        })()}
      </article>
    </article>
  );
}
