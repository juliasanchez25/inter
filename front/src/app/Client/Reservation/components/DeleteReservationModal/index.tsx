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
import { toast } from '@/components/ui/use-toast'
import { useDeleteReservation } from '@/hooks/use-delete-reservation'
import { queryClient } from '@/main'
import { TrashIcon } from '@radix-ui/react-icons'
import { useState } from 'react'

type Props = {
  id: string
}

export function DeleteReservation({ id }: Props) {
  const [open, setOpen] = useState(false)

  const deleteReservation = useDeleteReservation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['readMyReservations'],
      })
      queryClient.invalidateQueries({
        queryKey: ['readReservations'],
      })
      setOpen(false)
      toast({
        description: 'Reserva excluída com sucesso',
        title: 'Exclusão',
        className: 'bg-red-400 text-white',
      })
    },
  })

  return (
    <AlertDialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open)
      }}
    >
      <AlertDialogTrigger asChild>
        <div className="w-full flex gap-2 items-center text-primary cursor-pointer">
          <TrashIcon className="hover:text-red-500" />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Deseja cancelar sua reserva?</AlertDialogTitle>
          <AlertDialogDescription>
            A ação não pode ser desfeita. Sua reserva será cancelada.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Fechar</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              deleteReservation.mutate(id)
            }}
          >
            Cancelar reserva
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
