'use client';

import ImageDisplay from './image-display';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { SquareSquareIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { getFiles } from '@/lib/files';
import { useT } from '@/contexts/TranslationContext';

export default function ImagesCard({ route, className }) {
  const [items, setItems] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const { t } = useT();

  useEffect(() => {
    const fetchItems = async () => {
      const newRoute = route.replace('1', 'PERONDA');

      const newItems = await getFiles(newRoute);

      if (!showAll) {
        const firstFour = newItems?.slice(0, 4);
        setItems(firstFour);
      } else {
        setItems(newItems);
      }
    };

    fetchItems();
  }, [showAll]);

  return (
    <Card className={`flex flex-col ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg text-gray-700">
          <SquareSquareIcon className="w-5 h-5 text-purple-600" />
          {t('pieces')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {items?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((item) => (
              <ImageDisplay image={item} key={item.key}/>
            ))}
          </div>
        ) : (
          <p>No hay elementos</p>
        )}
      </CardContent>
      <CardFooter>
        <Button
          variant="secondary"
          onClick={() => setShowAll(!showAll)}
          className={`mx-auto cursor-pointer ${
            items?.length === 0 || showAll ? 'hidden' : ''
          }`}
        >
          {t('load-all')}
        </Button>
      </CardFooter>
    </Card>
  );
}
