import { formatDate } from "@/lib/utils";

export default function StockLayout({ children }) {

  return (
    <article>
    <header className="mb-4">
      <h1 className="text-2xl font-bold">Stock Disponible - {formatDate(new Date())}</h1>
    </header>
      {children}
    </article>
  );
}