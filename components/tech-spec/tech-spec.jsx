import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getFiles, getPresignedUrl } from '@/lib/files';
import { File } from 'lucide-react';
import { SquareSquareIcon } from 'lucide-react';
import DownloadTechSpec from './download-tech-spec';

export default async function TechSpecCard({ id, route, className }) {

  const fetchedFiles = await getFiles(route);

  const files = fetchedFiles.filter((file) =>
    file.key.toLowerCase().includes(id)
  );

  return (
    <Card className={`flex flex-col ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg text-gray-700">
          <File className="w-5 h-5 text-violet-600" />
          {'Fichas tecnicas'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {files?.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {files.map((file) => (
              <div className="flex flex-row gap-2 items-center" key={file.key}>
                <div className='flex flex-row gap-2 max-w-128 overflow-x-auto'>
                  <File className="w-5 h-5 hidden md:block" />
                  <p>{file.key.substring(route.length + 1)}</p>
                </div>
                <DownloadTechSpec
                  file={file.key}
                  urlPromise={getPresignedUrl(file.key)}
                />
              </div>
            ))}
          </div>
        ) : (
          <p>{'Sin fichas'}</p>
        )}
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
