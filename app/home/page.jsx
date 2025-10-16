import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { loadTranslations } from "@/lib/server-utils";
import { loadGroupsFromDb } from "@/lib/groups_actions";

const HomePage = async () => {
  const stockCategories = await loadGroupsFromDb();

  const translations = await loadTranslations();

  return (
    <div className="container mx-auto p-4 space-y-8">
      <section id="stock-categories">
        <h2 className="text-3xl font-bold text-center mb-8">
          {translations["stock-categories"]}
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stockCategories.length > 0 ? (stockCategories.map((category) => (
            <Link href={`/home/stock/${category.id}`} key={category.id}>
              <Card
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <CardTitle>{category.name}</CardTitle>
                  <CardDescription>
                    {translations["view-stock-for"]} {category.name}
                  </CardDescription>
                </CardHeader>
                <CardContent></CardContent>
              </Card>
            </Link>
          ))) : (
            <Card className="col-span-full text-center py-8">
              <CardHeader>
                <CardTitle>{translations["no-stock-categories"]}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  {translations["no-stock-categories-description"]}
                </CardDescription>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
