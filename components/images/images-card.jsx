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
import { Button } from '../ui/button';
import { getFiles } from '@/lib/files';
import { useT } from '@/contexts/TranslationContext';

export default function ImagesCard({ id, route, className }) {
  const [items, setItems] = useState([]);
  const [allImages, setAllImages] = useState([]);
  const [visibleImageCount, setVisibleImageCount] = useState(4);
  const { t } = useT();

  useEffect(() => {
    const fetchAllImages = async () => {
      const newRoute = route.replace('1', 'PERONDA');
      const fetchedImages = await getFiles(newRoute);

      // assuming `id` is available in the component scope
      const filtered = fetchedImages.filter((item) =>
        item.key.includes(`${newRoute}/${id}`)
      );

      setAllImages(filtered);
      setItems(filtered.slice(0, visibleImageCount));
    };

    fetchAllImages();
  }, [route]);

  useEffect(() => {
    setItems(allImages?.slice(0, visibleImageCount));
  }, [visibleImageCount, allImages]);

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
              <ImageDisplay image={item} key={item.key} />
            ))}
          </div>
        ) : (
          <p>{t('no-items')}</p>
        )}
      </CardContent>
      <CardFooter>
        <Button
          variant="secondary"
          onClick={() => setVisibleImageCount((prevCount) => prevCount + 8)}
          className={`mx-auto cursor-pointer ${
            visibleImageCount >= allImages?.length ? 'hidden' : ''
          }`}
        >
          {t('load-all')}
        </Button>
      </CardFooter>
    </Card>
  );
}
