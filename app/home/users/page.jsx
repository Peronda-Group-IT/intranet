import { SearchBar } from '@/components/searchbar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { EditUserDialog } from '@/components/users/edit-user-dialog';
import { loadGroupsFromDb } from '@/lib/groups_actions';
import { loadTranslations } from '@/lib/server-utils';
import { loadUsersFromDb } from '@/lib/user-actions';

export default async function UsersPage({ searchParams }) {
  const translations = await loadTranslations();

  const { search } = (await searchParams) || '';

  const users = await loadUsersFromDb(search);
  const groups = await loadGroupsFromDb();

  return (
    <section className="flex flex-col items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 max-w-5xl mx-auto h-full">
      <header className="flex flex-row justify-between w-full items-center">
        <div className="flex-col">
          <h1 className="text-3xl font-bold text-gray-900">
            {translations['users_title']}
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            {translations['edit_user_description']}
          </p>
        </div>
      </header>
      <SearchBar buttonSearchText={translations['search']} />
      <Card className={'w-full max-h-155 md:max-h-175 overflow-auto'}>
        <CardContent>
          {users.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {users.map((user, index) => (
                <EditUserDialog key={index} user={user} groups={groups}> 
                  <li key={index} className="py-4 cursor-pointer hover:bg-gray-50 px-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex w-full justify-between">
                          <p className="text-sm font-medium text-gray-900">
                            {user.username}
                          </p>
                          <Badge
                            className={`${
                              user.type === 'external'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-green-100 text-green-800'
                            } block md:hidden`}
                          >
                            {translations[user.type]}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                      <Badge
                        className={`${
                          user.type === 'external'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-green-100 text-green-800'
                        } hidden md:block`}
                      >
                        {translations[user.type]}
                      </Badge>
                    </div>
                  </li>
                </EditUserDialog>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">{translations['no-items']}</p>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
