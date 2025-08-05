import { formatDate } from "@/lib/utils";
import { loadTranslations } from "@/lib/server-utils";
import { Package } from "lucide-react";
import { Calendar } from "lucide-react";

export default async function StockLayout({ children }) {

  const translations = await loadTranslations(); 

  return (
    <article>
    <header className="mb-4 flex items-center justify-between">
      <h1 className="text-2xl font-bold gap-2 flex items-center">
        <Package className="text-blue-500"></Package> {translations['stock-tittle']}
      </h1>
      <div className="text-muted-foreground flex items-center">
        <Calendar className="inline mr-2" size={"16px"}/>
        {formatDate(new Date())}
      </div>
    </header>
      {children}
    </article>
  );
}