"use client";

import ImageDisplay from "./image-display";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import fetchCollectionItems from "@/lib/tifs";
import { SquareSquareIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

const CMS_API = process.env.NEXT_PUBLIC_CMS_API

export default function ImagesCard({ route }) {
  const [items, setItems] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      const newItems = await fetchCollectionItems(route);

      if (!showAll) {
        const firstFour = newItems?.slice(0, 4)
        setItems(firstFour);
      } else {
        setItems(newItems);
      }
    };

    fetchItems();
  }, [showAll]);

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg text-gray-700">
          <SquareSquareIcon className="w-5 h-5 text-purple-600" />
          Despiece
        </CardTitle>
      </CardHeader>
      <CardContent>
        {items.length > 0 ? 
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((name) => (
            <ImageDisplay
              key={name}
              src={`${CMS_API}/render-png?path=${route}/${name}`}
              alt={name}
              className={"mx-auto"}
            />
          ))}
        </div>
        : <p>No hay elementos</p>}
      </CardContent>
      <CardFooter>
        <Button variant="secondary" onClick={() => setShowAll(!showAll)} className={`mx-auto cursor-pointer ${items.length === 0 || showAll ? 'hidden' : ''}`}>Load All</Button>
      </CardFooter>
    </Card>
  );
}
