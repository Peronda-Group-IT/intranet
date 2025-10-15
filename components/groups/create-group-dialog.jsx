"use client";

import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog";
import { useT } from "@/contexts/TranslationContext";
import { Plus } from "lucide-react";
import { createGroupAction } from "@/lib/groups_actions";
import { Loader } from "lucide-react";



export function CreateGroupDialog() {
    const { t } = useT();
    const [state, formAction, isPending] = useActionState(createGroupAction, { success: false, message: "" });
    const [open, setOpen] = useState(false); 

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="icon" className={"cursor-pointer"}><Plus /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{t("create_group_title") || "Create New Group"}</DialogTitle>
                    <DialogDescription>
                        {t("create_group_description") || "Enter the ID and name for your new group."}
                    </DialogDescription>
                </DialogHeader>
                <form action={formAction}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="groupId" className="text-right">
                                {t("group_id_label") || "Group ID"}
                            </Label>
                            <Input
                                id="groupId"
                                name="groupId"
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="groupName" className="text-right">
                                {t("group_name_label") || "Group Name"}
                            </Label>
                            <Input
                                id="groupName"
                                name="groupName"
                                className="col-span-3"
                                required
                            />
                        </div>
                        {!state.success && <p className="text-red-400">{state.message}</p>}
                    </div>
                    <DialogFooter>
                        <Button type="submit">
                            {isPending ? <Loader className={"animate-spin"}/> : t("create_button") || "Create"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}