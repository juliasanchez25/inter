import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useDeleteNotification } from '@/hooks/use-delete-notification'
import { useReadNotifications } from '@/hooks/use-read-notifications'
import { useToggleReadNotification } from '@/hooks/use-toggle-read-notification'
import { queryClient } from '@/main'
import { INotification } from '@/models/notification'
import {
  EnvelopeClosedIcon,
  EnvelopeOpenIcon,
  TrashIcon,
} from '@radix-ui/react-icons'
import dayjs from 'dayjs'

export function NotificationsDisplay() {
  const readNotifications = useReadNotifications<INotification[]>()
  const deleteNotification = useDeleteNotification({
    onSuccess: () => readNotifications.refetch(),
  })
  const toggleReadNotification = useToggleReadNotification({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['readNotifications'] })
    },
  })
  const orderedNotifications = readNotifications.data?.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )

  return (
    <section>
      <div className="space-y-5 mt-5 max-h-[500px] overflow-y-auto w-fit pr-2">
        {readNotifications.data && readNotifications.data.length > 0 ? (
          orderedNotifications!.map((notification) => (
            <Card className="w-[350px]" key={notification.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        toggleReadNotification.mutate(notification.id)
                      }
                    >
                      {notification.isRead ? (
                        <EnvelopeOpenIcon className="w-4 h-4 text-green-500" />
                      ) : (
                        <EnvelopeClosedIcon className="w-4 h-4 text-gray-500" />
                      )}
                    </button>
                    {notification.title}
                  </div>
                  <button>
                    <TrashIcon
                      onClick={() => deleteNotification.mutate(notification.id)}
                      className="w-4 h-4 text-red-500"
                    />
                  </button>
                </CardTitle>
                <CardDescription>
                  {notification.message.replace('00:00:00', '')}
                </CardDescription>
                <CardFooter className="p-0">
                  <p className="text-xs text-gray-600">
                    {dayjs(notification.createdAt).format(
                      '[Recebida em] DD/MM/YYYY [às] HH:mm',
                    )}
                  </p>
                </CardFooter>
              </CardHeader>
            </Card>
          ))
        ) : (
          <p className="text-sm text-gray-600">
            Nenhuma notificação encontrada
          </p>
        )}
      </div>
    </section>
  )
}
