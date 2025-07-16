import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { loadTranslations } from "@/lib/server-utils";

const HomePage = async () => {

  const stockCategories = [
    { name: "Peronda", route: "/home/stock/99" },
    { name: "Discontinuados", route: "/home/stock/97" },
    { name: "Comerciales", route: "/home/stock/96" },
    { name: "Harmony", route: "/home/stock/94" },
  ];

  const translations = await loadTranslations();

  return (
    <div className="container mx-auto p-4 space-y-8">
      <section id="stock-categories">
        <h2 className="text-3xl font-bold text-center mb-8">{translations['stock-categories']}</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stockCategories.map((category) => (
              <Card
                className="hover:shadow-lg transition-shadow"
                key={category.name}
              >
                <CardHeader>
                  <CardTitle>{category.name}</CardTitle>
                  <CardDescription>{translations['view-stock-for']} {category.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href={category.route} >
                    <Button variant="outline" className={"cursor-pointer w-full"}>{translations["go-to-stock"]}</Button>
                  </Link>
                </CardContent>
              </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
