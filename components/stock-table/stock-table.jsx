import TablePagination from "@/components/table-pagination";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cmsFetch } from "@/lib/utils";
import StockTableRow from "./stock-table-row";

export default async function StockTable({ id, search, page, pageSize, totalPages }) {
  const items = search ? await cmsFetch(`/stock_intranet/search/${search}?grupo_cliente=${id}&page=${page}&pageSize=${pageSize}`) : await cmsFetch(`/stock_intranet/filter?grupo_cliente=${id}&page=${page}&pageSize=${pageSize}`);

  return (
    <>
      <section className={"bg-background rounded-md border"}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Artículo</TableHead>
              <TableHead>Colección</TableHead>
              <TableHead>Familia</TableHead>
              <TableHead>Formato</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Grupo Tarifa</TableHead>
              <TableHead>Calidad</TableHead>
              <TableHead>Tono</TableHead>
              <TableHead>Calibre</TableHead>
              <TableHead>Tipo Palet</TableHead>
              <TableHead>Disponible</TableHead>
              <TableHead>Unidad</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <StockTableRow key={`${item.empresa}-${item.grupo_cliente}-${item.codigo_articulo}`} item={item} />
            ))}
          </TableBody>
        </Table>
        <div className="py-2 border-t">
          <TablePagination currentPage={page} totalPages={totalPages} />
        </div>
      </section>
    </>
  );
}
