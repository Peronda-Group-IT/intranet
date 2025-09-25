'use client'

import { CircleSlash2 } from "lucide-react";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const ImageDisplay = ({ src, alt = "Product Image", width = 200, height = 40 }) => {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

  if (!src) {
    return <div className="flex items-center justify-center h-full bg-gray-200 text-gray-500">No Image Available</div>;
  }

  const showError = () => {
    console.log("error")
    setLoading(false) 
    setError(true)
  }

  return (
    <div className="relative w-full flex items-center justify-center">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader className="animate-spin" />
        </div>
      )}
        {error && (
        <div className="absolute inset-0 flex items-center justify-center">
          <CircleSlash2 className="text-red-500" />
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        onLoad={() => setLoading(false)}
        onError={() => showError()}
        className={`${error ? 'hidden' : ''}`}
      />
    </div>
  );
};

export default ImageDisplay;