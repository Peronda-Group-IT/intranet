import { SearchBar } from "@/components/searchbar";
import StockTable from "@/components/stock-table/stock-table";
import { cmsFetch } from "@/lib/utils";

export default async function StockPage({ params, searchParams }) {
  const { id } = await params;
  const { page, search } = await searchParams;

  const allItems = search ? await cmsFetch(`/stock_intranet/search/${search}?grupo_cliente=${id}&count=true`) : await cmsFetch(`/stock_intranet/filter?grupo_cliente=${id}&count=true`);

  const pageSize = 20; // Define the number of items per page
  const actualPage = page ? parseInt(page, 10) : 1;

  const { count } = allItems[0];

  const totalPages = Math.ceil(count / pageSize);

  return (
    <div className="flex flex-col space-y-4">
      <SearchBar buttonSearchText={'Buscar'}/>
      <StockTable id={id} search={search} page={actualPage} pageSize={pageSize} totalPages={totalPages}/>
    </div>
  );
}