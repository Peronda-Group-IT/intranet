'use client';

import { useActionState, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { useT } from '@/contexts/TranslationContext';
import { deleteGroupFromDb } from '@/lib/groups_actions';
import { Loader } from 'lucide-react';
import { Trash } from 'lucide-react';


export function DeleteGroupDialog({ group }) {
  const defaultAction = async () => {
    const result = await deleteGroupFromDb(group.id);
    return result;
  };

  const { t } = useT();
  const [state, formAction, isPending] = useActionState(defaultAction, {
    success: false,
    message: '',
  });
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" className={'cursor-pointer'}>
          <Trash />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('delete_group_title') || 'Delete Group'}</DialogTitle>
          <DialogDescription>
            {t('delete_group_description') ||
              'Deleted items cannot be restored.'}
          </DialogDescription>
        </DialogHeader>
        <form action={formAction}>
          <div className="gap-4 py-4">
            {!state.success && <p className="text-red-400">{state.message}</p>}
          </div>
          <DialogFooter>
            <Button
              type="button"
              className={'cursor-pointer'}
              onClick={() => setOpen(false)}
            >
              {t('cancel_button') || 'Cancel'}
            </Button>
            <Button type="submit" className={'cursor-pointer'}>
              {isPending ? (
                <Loader className={'animate-spin'} />
              ) : (
                t('delete_button') || 'Delete'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
