import { ExternalLink, Plus, Save, Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export const CalculationMenu = () => {
  const dialogs = [
    {
      trigger: <Plus />,
      title: <Plus className="size-10 mb-2 mx-auto" />,
      description: 'Dodanie nowej kalkulacji nadpisze niezapisane dane',
      action: <Button onClick={() => {}}>Dodaj</Button>,
    },
    {
      trigger: <ExternalLink />,
      title: <ExternalLink className="size-10 mb-2 mx-auto" />,
      description: 'Otwórz nową kalkulację',
      action: <Button onClick={() => {}}>Otwórz</Button>,
    },
    {
      trigger: <Save />,
      title: <Save className="size-10 mb-2 mx-auto" />,
      description: 'Zapisz bieżącą kalkulację',
      action: <Button>Zapisz</Button>,
    },
    {
      trigger: <Trash2 />,
      title: <Trash2 className="size-10 mb-2 mx-auto" />,
      description: 'Trwale usunąć bieżącą kalkulację?',
      action: <Button onClick={() => {}}>Usuń</Button>,
    },
  ]

  return (
    <div className="flex gap-4">
      {dialogs.map(({ trigger, title, description, action }, index) => (
        <Dialog key={index}>
          <DialogTrigger>
            <Button size="icon">{trigger}</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription className="mx-auto">
              {description}
            </DialogDescription>
            <DialogFooter className="mt-4 mx-auto gap-4">
              <Button variant="outline" asChild>
                <DialogClose>Anuluj</DialogClose>
              </Button>
              {action}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  )
}
