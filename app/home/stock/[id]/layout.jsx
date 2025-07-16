import { formatDate } from "@/lib/utils";
import { loadTranslations } from "@/lib/server-utils";

export default async function StockLayout({ children }) {

  const translations = await loadTranslations(); 

  return (
    <article>
    <header className="mb-4">
      <h1 className="text-2xl font-bold">{translations['stock-tittle']} - {formatDate(new Date())}</h1>
    </header>
      {children}
    </article>
  );
}