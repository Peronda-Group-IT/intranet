import TablePagination from "@/components/table-pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const PERONDA_CMS_API_KEY = process.env.PERONDA_CMS_API_KEY;

export default async function StockPage({ params, searchParams }) {
  const { id } = await params;
  const { page } = await searchParams;
  const pageSize = 10;

  const actualPage = page ? parseInt(page, 10) : 1;

  const response = await fetch(
    `http://localhost:5006/cms/stock_intranet/filter?grupo_cliente=${id}&page=${actualPage}&pageSize=${pageSize}`,
    {
      method: "GET",
      headers: {
        Authorization: PERONDA_CMS_API_KEY,
        Origin: "StockPeronda",
      },
    }
  );

  const items = await response.json();

  return (
    <div>
      <h1>Stock ID: {id}</h1>
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
            <TableRow key={item.empresa + item.codigo_articulo} className={"hover:bg-muted"}>
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
        <TablePagination currentPage={actualPage} totalPages={20} />
      </div>
      </section>
    </div>
  );
}
