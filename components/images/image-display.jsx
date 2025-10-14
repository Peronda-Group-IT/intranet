'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { CircleSlash2, Loader } from 'lucide-react';
import { getPresignedUrl } from '@/lib/files';
import MagnifiedImageDialog from './magnified-image-dialog';

const ImageDisplay = ({ image, width = 200, height = 80 }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isMagnified, setIsMagnified] = useState(false);

  useEffect(() => {
    const loadImage = async () => {
      try {
        setError(false);
        setLoading(true);

        const presigned = await getPresignedUrl(image.key);
        setImageSrc(presigned.url);
      } catch (err) {
        console.error('Error loading image:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadImage();
  }, [image]);

  if (loading) {
    return <Loader className="animate-spin mx-auto my-auto" />;
  }

  if (error || !imageSrc) {
    return <CircleSlash2 className="text-red-500 mx-auto my-auto" />;
  }

  const handleImageClick = () => {
    setIsMagnified(true);
  };

  const handleOpenChange = (open) => {
    setIsMagnified(open);
  };

  return (
    <>
      <div
        className={`relative w-[200px] h-[80px] mx-auto cursor-pointer`}
        onClick={handleImageClick}
      >
        <Image
          src={imageSrc}
          alt={image.key}
          fill
          style={{ objectFit: 'contain' }} // maintains aspect ratio
          unoptimized // optional if using presigned URLs
        />
      </div>
      <MagnifiedImageDialog
        imageSrc={imageSrc}
        altText={image.key}
        open={isMagnified}
        onOpenChange={handleOpenChange}
      />
    </>
  );
};

export default ImageDisplay;
