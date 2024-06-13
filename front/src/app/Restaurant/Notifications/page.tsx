import { PageLayout } from '@/components/custom/page-layout'
import { NotificationsDisplay } from './components/NotificationsDisplay'

export function Notifications() {
  return (
    <PageLayout>
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold">Notificações</h2>
      </div>
      <NotificationsDisplay />
    </PageLayout>
  )
}
