'use client'

import { useRouter } from "next/navigation";
import { TableCell, TableRow } from "../ui/table";

export default function StockTableRow({ item }) {

    const router = useRouter();

  return (
    <TableRow
      key={item.empresa + item.codigo_articulo}
      className={"hover:bg-muted cursor-pointer"}
      onClick={() => router.push(`/home/stock/detail/${item.empresa}-${item.grupo_cliente}-${item.codigo_articulo}`)}
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
  );
}
