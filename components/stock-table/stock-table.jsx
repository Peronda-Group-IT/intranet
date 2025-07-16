import TablePagination from "@/components/table-pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cmsFetch } from "@/lib/utils";

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
              <TableRow
                key={item.empresa + item.codigo_articulo}
                className={"hover:bg-muted cursor-pointer"}
              >
                <TableCell>{item.codigo_articulo}</TableCell>
                <TableCell>{item.nombre_serie}</TableCell>
                <TableCell>{item.nombre_familia}</TableCell>
                <TableCell>{item.nombre_formato}</TableCell>
                <TableCell>{item.nombre_articulo}</TableCell>
                <TableCell>{item.grupo_tarifa}</TableCell>
                <TableCell>{item.nombre_calidad}</TableCell>
                <TableCell>{item.tono}</TableCell>
                <TableCell>{item.calibre}</TableCell>
                <TableCell>{item.clase_palet}</TableCell>
                <TableCell>{item.existencias}</TableCell>
                <TableCell>{item.nombre_unidad}</TableCell>
              </TableRow>
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
