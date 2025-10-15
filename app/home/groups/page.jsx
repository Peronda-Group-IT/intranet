import { loadGroupsFromDb } from "@/lib/groups_actions";
import { loadTranslations } from "@/lib/server-utils";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateGroupDialog } from "@/components/groups/create-group-dialog";
import { DeleteGroupDialog } from "@/components/groups/delete-group-dialos";


export default async function GroupsPage() {

    const groups = await loadGroupsFromDb();
    const translations = await loadTranslations();

    return (
        <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 max-w-6xl mx-auto h-full">
            <Card className="sm:col-span-2 h-full" x-chunk="dashboard-05-chunk-0">
                <CardHeader className="pb-3 items-center">
                    <div className="flex flex-row justify-between w-full">
                        <div>
                            <CardTitle>{translations["groups_title"]}</CardTitle>
                            <CardDescription className="max-w-lg text-balance leading-relaxed">
                                {translations["groups_subtitle"]}
                            </CardDescription>
                        </div>
                        <CreateGroupDialog />
                    </div>
                </CardHeader>
                <CardContent className={"flex justify-center h-full"}>
                    {groups.length > 0 ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>{translations["groups_id_header"]}</TableHead>
                                <TableHead>{translations["groups_name_header"]}</TableHead>
                                <TableHead className={"w-20"}></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {groups.map((group) => (
                                <TableRow key={group.id}>
                                    <TableCell>{group.id}</TableCell>
                                    <TableCell>{group.name}</TableCell>
                                    <TableCell>
                                        <div className="flex justify-end">
                                            <DeleteGroupDialog group={group}/>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>) : (
                        <p className="text-center text-muted-foreground my-auto">No groups available.</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}