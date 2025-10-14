'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { getPresignedUrl } from '@/lib/files';
import { Loader } from 'lucide-react';
import { useState } from 'react';
import { Download } from 'lucide-react';
import { CircleX } from 'lucide-react';

const MagnifiedImageDialog = ({ imageSrc, altText, open, onOpenChange }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(true);

  // Extracts a user-friendly file name from the image path.
  const originalFileName = altText.split('/').pop();
  const baseFileName = originalFileName.split('.').slice(0, -1).join('.').replaceAll('_', ' ') || originalFileName; // Get filename without extension
  const downloadFileName = `${baseFileName}.jpeg`;

  /**
   * Handles the image download process in a single flow.
   * 1. Fetches a temporary, secure URL for the image.
   * 2. Fetches the image data from that URL as a blob.
   * 3. Creates a local URL for the blob.
   * 4. Programmatically creates and clicks a hidden link to trigger the browser download.
   * 5. Cleans up the created local URL.
   */
  const downloadImage = async () => {
    setLoading(true);
    setError(false);
    try {
      // Get the presigned URL for the image
      const presigned = await getPresignedUrl(altText);

      // Fetch the image data from the presigned URL
      const response = await fetch(presigned.url);

      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.statusText}`);
      }

      // Convert the image response to a blob
      const blob = await response.blob();

      // Create a temporary local URL for the blob
      const url = window.URL.createObjectURL(blob);

      // Create a temporary anchor element to trigger the download
      const a = document.createElement('a');
      a.href = url;
      a.download = downloadFileName; // Use the constructed downloadFileName
      
      // Programmatically click the anchor to start the download
      document.body.appendChild(a);
      a.click();
      
      // Clean up by removing the anchor and revoking the object URL
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

    } catch (err) {
      console.error('Error downloading image:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(val) => {
      onOpenChange(val);
      // Reset component state when the dialog is closed
      if (!val) {
        setError(false);
        setLoading(false);
      }
    }}>
      <DialogContent className="max-w-dvh max-h-lg overflow-hidden p-4">
        <DialogHeader className="pb-4">
          <DialogTitle>{baseFileName}</DialogTitle>
        </DialogHeader>
        {/* Image container */}
        <div className="relative w-full h-[calc(100vh-200px)]">
          <Image
            src={imageSrc}
            alt={altText}
            fill
            style={{ objectFit: 'contain' }}
            unoptimized
          />
        </div>
        {/* Dialog actions */}
        <DialogFooter className="pt-4">
          <Button onClick={downloadImage} disabled={loading} className="w-full cursor-pointer">
            {loading ? (
              
                <Loader className="h-4 w-4 animate-spin" />
              
            ) : error ? (
              <CircleX className="h-4 w-4 text-red-400"/>
            ) : (
              <Download />
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MagnifiedImageDialog;