import { PageLayout } from '@/components/custom/page-layout'
import { Modal } from './components/modal'

export const Reserva = () => {
  return (
    <PageLayout>
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold">Minhas reservas</h2>
        <Modal />
      </div>
    </PageLayout>
  )
}
