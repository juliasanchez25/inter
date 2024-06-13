import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { ArchiveIcon } from '@radix-ui/react-icons'
import { useState } from 'react'

export function DashboardArchiveReservation() {
  const [open, setOpen] = useState(false)

  return (
    <AlertDialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open)
      }}
    >
      <AlertDialogTrigger asChild>
        <div className="w-full flex gap-2 items-center text-primary">
          <ArchiveIcon /> Arquivar reserva
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Deseja arquivar esta reserva?</AlertDialogTitle>
          <AlertDialogDescription>
            A ação não pode ser desfeita. Esta reserva será arquivada.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Fechar</AlertDialogCancel>
          <AlertDialogAction>Arquivar reserva</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
