'use client'

import { useRouter } from "next/navigation";
import { TableCell, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";
import StockStatus from "./stock-status";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";

export default function StockTableRow({ item }) {

    const router = useRouter();

  return (
    <TableRow
      key={item.empresa + item.codigo_articulo}
      onClick={() => router.push(`/home/stock/detail/${item.empresa}-${item.grupo_cliente}-${item.codigo_articulo}`)}
      className={"cursor-pointer hover:bg-muted transition-colors duration-200"}
    >
      <TableCell className="text-blue-600 font-semibold">{item.codigo_articulo}</TableCell>
      <TableCell className={"font-semibold"}>{item.nombre_serie}</TableCell>
      <TableCell><Badge variant="secondary">{item.nombre_familia}</Badge></TableCell>
      <TableCell>{item.nombre_formato}</TableCell>
      <TableCell>{item.nombre_articulo}</TableCell>
      <TableCell>{item.grupo_tarifa && <Badge variant="outline">{item.grupo_tarifa}</Badge>}</TableCell>
      <TableCell><Badge variant="secondary" className={'bg-blue-200 text-blue-800'}>{item.nombre_calidad}</Badge></TableCell>
      <TableCell><Badge variant="secondary" className={'bg-purple-200 text-purple-800'}>{item.tono}</Badge></TableCell>
      <TableCell><Badge variant="secondary" className={'bg-green-200 text-green-800'}>{item.calibre}</Badge></TableCell>
      <TableCell><Badge variant="outline">{item.clase_palet}</Badge></TableCell>
      <TableCell><StockStatus stock={item.existencias} /></TableCell>
      <TableCell>{item.nombre_unidad}</TableCell>
    </TableRow>
  );
}
