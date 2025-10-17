'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
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
import { Separator } from '../ui/separator';
import { Checkbox } from '../ui/checkbox';
import { Loader } from 'lucide-react';
import { setExternalUserActive, upadteUserVisibilityInDb } from '@/lib/user-actions';

export function EditUserDialog({ children, user, groups }) {
  const { t } = useT();

  const [open, setOpen] = useState(false);
  const [visibility, setVisibility] = useState(
    user.visibility ? JSON.parse(user.visibility) : []
  );
  const [isPending, setIsPending] = useState(false);
  const [activationPending, setActivationPending] = useState(false);
  const [state, setState] = useState(null);

  const handleCheckboxChange = (groupId, isChecked) => {
    setVisibility((prevVisibility) => {
      if (isChecked) {
        return [...prevVisibility, groupId];
      } else {
        return prevVisibility.filter((id) => id !== groupId);
      }
    });
  };

  const handleSave = async () => {
    // Call the action to update visibility in the database
    setIsPending(true)
    const newState = await upadteUserVisibilityInDb(user.username, visibility);
    setState(newState);
    setIsPending(false);
  }

  const handleActivate = async () => {
    // Call the action to activate the user in the database
    setActivationPending(true)
    const newState = await setExternalUserActive(user.username);
    setState(newState);
    setActivationPending(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        setOpen(newOpen);
        if (!newOpen) {
          // Reset visibility when dialog closes
          setVisibility(user.visibility ? JSON.parse(user.visibility) : []);
        }
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{user.username}</DialogTitle>
          <DialogDescription>{user.email}</DialogDescription>
        </DialogHeader>
        <Separator />
        <div>
          {groups.map((group, index) => (
            <div key={index} className="flex items-center space-x-2 p-2">
              <Checkbox
                id={`group-${group.id}`}
                name={`group-${group.id}`}
                value={group.id}
                className={'cursor-pointer'}
                checked={visibility.includes(group.id)}
                onCheckedChange={(isChecked) =>
                  handleCheckboxChange(group.id, isChecked)
                }
              />
              <Label
                htmlFor={`group-${group.id}`}
                className="text-sm font-medium text-gray-700"
              >
                {group.name}
              </Label>
            </div>
          ))}
        </div>
        {state && <p className={`text-sm ${state?.success ? "text-green-400" : "text-red-400"} mt-2`}>{t(state.message)}</p>}
        <DialogFooter>
          {user.active === 'N' && 
          <Button type="submit" className={'cursor-pointer bg-red-500 hover:bg-red-400'} onClick={handleActivate} disabled={activationPending}>
            {activationPending ? (
              <Loader className={'animate-spin'} />
            ) : (
              t('activate_button') || 'Activate'
            )}
          </Button>
  }
          <Button type="submit" className={'cursor-pointer'} onClick={handleSave} disabled={isPending || user.active === 'N'}>
            {isPending ? (
              <Loader className={'animate-spin'} />
            ) : (
              t('save_button') || 'Save'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
