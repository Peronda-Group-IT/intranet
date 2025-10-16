import { loadGroupsFromDb } from '@/lib/groups_actions';
import { loadTranslations } from '@/lib/server-utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CreateGroupDialog } from '@/components/groups/create-group-dialog';
import { DeleteGroupDialog } from '@/components/groups/delete-group-dialos';

export default async function GroupsPage() {
  const groups = await loadGroupsFromDb();
  const translations = await loadTranslations();

  return (
    <div className="flex flex-col items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 max-w-5xl mx-auto h-full">
      <header className="flex flex-row justify-between w-full items-center">
        <div className='flex-col'>
          <h1 className="text-3xl font-bold text-gray-900">
            {translations['groups_title']}
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            {translations['groups_subtitle']}
          </p>
        </div>
        <CreateGroupDialog />
      </header>

      <Card
        className="sm:col-span-2 w-full h-full"
        x-chunk="dashboard-05-chunk-0"
      >
        <CardContent className={'flex justify-center h-full'}>
          {groups.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{translations['groups_id_header']}</TableHead>
                  <TableHead>{translations['groups_name_header']}</TableHead>
                  <TableHead className={'w-20'}></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {groups.map((group) => (
                  <TableRow key={group.id}>
                    <TableCell>{group.id}</TableCell>
                    <TableCell>{group.name}</TableCell>
                    <TableCell>
                      <div className="flex justify-end">
                        <DeleteGroupDialog group={group} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-center text-muted-foreground my-auto">
              No groups available.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
