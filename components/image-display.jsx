'use client'

import { useEffect, useState } from "react";
import Image from "next/image";
import { CircleSlash2, Loader } from "lucide-react";
import { fetchImageWebP } from "@/lib/tifs";


const ImageDisplay = ({ src, alt = "Product Image", width = 200, height = 40 }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!src) {
      setError(true);
      setLoading(false);
      return;
    }

    fetchImageWebP(src)
      .then((url) => {
        if (url) setImageSrc(url);
        else setError(true);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [src]);

  if (loading) {
    return <Loader className="animate-spin mx-auto my-auto" />;
  }

  if (error || !imageSrc) {
    return <CircleSlash2 className="text-red-500" />;
  }

  return (
    <div className="mx-auto">
    <Image
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
    />
    </div>
  );
};

export default ImageDisplay;
