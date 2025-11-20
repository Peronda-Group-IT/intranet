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
import { loadTranslations } from "@/lib/server-utils";


export default async function StockTable({ id, search, page, pageSize, totalPages }) {
  const items = search ? await cmsFetch(`/stock_intranet/search/${search}?grupo_cliente=${id}&page=${page}&pageSize=${pageSize}`) : await cmsFetch(`/stock_intranet/filter?grupo_cliente=${id}&page=${page}&pageSize=${pageSize}`);

  const translations = await loadTranslations()

  return (
    <>
      <section className={"bg-background rounded-md border"}>
        {items.length > 0 ?<> 
        <Table>
          <TableHeader>
            <TableRow className={"bg-muted text-muted-foreground font-semibold hover:bg-muted"}>
              <TableHead>{translations["article-header"]}</TableHead>
              <TableHead>{translations["collection-header"]}</TableHead>
              <TableHead>{translations["family-header"]}</TableHead>
              <TableHead>{translations["format-header"]}</TableHead>
              <TableHead>{translations["description-header"]}</TableHead>
              <TableHead>{translations["rate-group-header"]}</TableHead>
              <TableHead>{translations["quality-header"]}</TableHead>
              <TableHead>{translations["tone-header"]}</TableHead>
              <TableHead>{translations["caliber-header"]}</TableHead>
              <TableHead>{translations["pallet-type-header"]}</TableHead>
              <TableHead>{translations["pallet-name-header"]}</TableHead>
              <TableHead>{translations["available-header"]}</TableHead>
              <TableHead>{translations["unit-header"]}</TableHead>
            </TableRow>
          </TableHeader>
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
