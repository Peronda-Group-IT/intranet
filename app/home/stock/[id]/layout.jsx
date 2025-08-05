import { cmsFetch, formatLoadDate } from "@/lib/utils";
import { loadTranslations } from "@/lib/server-utils";
import { Package } from "lucide-react";
import { Calendar } from "lucide-react";

export default async function StockLayout({ params, children }) {
  const { id } = await params;
  const translations = await loadTranslations();

  const earliestItem = await cmsFetch(
    `/stock_intranet/filter?grupo_cliente=${id}&page=1&pageSize=1`
  );

  const { fecha_cargado } = earliestItem[0];

  return (
    <article>
      <header className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold gap-2 flex items-center">
          <Package className="text-blue-500"></Package>{" "}
          {translations["stock-tittle"]}
        </h1>
        <div className="text-muted-foreground flex items-center">
          <Calendar className="inline mr-2" size={"16px"} />
          {formatLoadDate(fecha_cargado)}
        </div>
      </header>
      {children}
    </article>
  );
}
