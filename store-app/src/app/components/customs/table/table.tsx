"use client";

//COMPONENTS
import Paginator from "../paginator/paginator";

//INTERFACES
import { TableProps } from "./interfaces/table.interface";

//UTILS
import { formatValue } from "@/app/utils/formatValue.util";

/**
 * A table component that renders a table with the given columns and data.
 *
 * @param {TableProps} props The props for the table component.
 * @param {Column[]} props.columns The columns to render.
 * @param {Paginator} props.paginator The paginator object with the total number of items, the current page, and the number of pages.
 * @param {any[]} props.data The data to render in the table.
 * @param {(page: number) => void} props.pageClick The function to call when the user clicks on a page number.
 * @returns {JSX.Element} The rendered table component.
 */
export function Table({ columns, paginator, data, pageClick }: Readonly<TableProps>) {
  return (
    <article>
      <table className="text-left border-collapse w-full">
        <thead>
          <tr className="text-white font-bold">
            {columns.map((column) => (
              <th className="py-2 min-w-[10rem]" key={column.id}>{column.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row._id}>
              {columns.map((column) => (
                <td className="py-2 border-big-stone-200 border-y text-big-stone-200" key={column.id}>{formatValue(row[column.field])}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <section className="flex justify-between gap-10 py-2">
        <Paginator paginator={paginator} changePage={pageClick} />
      </section>
    </article>
  );
}