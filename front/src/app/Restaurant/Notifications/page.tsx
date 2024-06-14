import { PageLayout } from '@/components/custom/page-layout'
import { NotificationsDisplay } from './components/NotificationsDisplay'
import React from 'react'

export function Notifications() {
  React.useEffect(() => {
    document.title = 'Notificações'
  }, [])

  return (
    <PageLayout>
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold">Notificações</h2>
      </div>
      <NotificationsDisplay />
    </PageLayout>
  )
}
