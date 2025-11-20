import TablePagination from "@/components/table-pagination";
import {
  Table,
  TableBody
} from "@/components/ui/table";
import { cmsFetch } from "@/lib/utils";
import StockTableRow from "./stock-table-row";
import { loadTranslations } from "@/lib/server-utils";
import StockTableHeader from "./stock-table-header";


export default async function StockTable({ id, search, page, pageSize, totalPages, orderBy, orderDirection }) {

  const searchQuery = `/stock_intranet/search/${search}?grupo_cliente=${id}&page=${page}&pageSize=${pageSize}`
  const filterQuery = `/stock_intranet/filter?grupo_cliente=${id}&page=${page}&pageSize=${pageSize}`

  let query = search ? searchQuery : filterQuery

  if (orderBy && orderDirection) {
    query += `&orderBy=${orderBy}&orderDirection=${orderDirection}`
  }

  const items = await cmsFetch(query)

  const translations = await loadTranslations()

  const headers = [
    {
      key:"codigo_articulo",
      label: translations["article-header"]
    },
    {
      key:"nombre_serie",
      label: translations["collection-header"]
    },
    {
      key:"nombre_familia",
      label: translations["family-header"]
    },
    {
      key:"nombre_formato",
      label: translations["format-header"]
    },
    {
      key:"nombre_articulo",
      label: translations["description-header"]
    },
    {
      key:"grupo_tarifa",
      label: translations["rate-group-header"]
    },
    {
      key:"nombre_calidad",
      label: translations["quality-header"]
    },
    {
      key:"tono",
      label: translations["tone-header"]
    },
    {
      key:"calibre",
      label: translations["caliber-header"]
    },
    {
      key:"clase_palet",
      label: translations["pallet-type-header"]
    },
    {
      key:"nombre_pallet",
      label: translations["pallet-name-header"]
    },
    {
      key:"existencias",
      label: translations["available-header"]
    },
    {
      key:"nombre_unidad",
      label: translations["unit-header"]
    }
  ]

  return (
    <>
      <section className={"bg-background rounded-md border"}>
        {items.length > 0 ?<> 
        <Table>
          <StockTableHeader headers={headers} />
          <TableBody>
            {items.map((item) => (
              <StockTableRow key={`${item?.empresa}-${item?.grupo_cliente}-${item?.codigo_articulo}`} item={item} />
            ))}
          </TableBody>
        </Table>
        
        <div className="py-2 border-t">
          <TablePagination currentPage={page} totalPages={totalPages} />
        </div>
        </>
        : <div className="p-4 flex"><p className="mx-auto">{translations["no-items"]}</p></div>}
      </section>
    </>
  );
}
