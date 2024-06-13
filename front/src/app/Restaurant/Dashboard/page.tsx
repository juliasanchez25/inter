import { PageLayout } from '@/components/custom/page-layout'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DashboardDatePicker } from './components/DashboardDatePicker'
import { DashboardActionMenuDropdown } from './components/DashboardActionMenuDropdown'

const clients = [
  {
    client: 'John Doe',
    contact: '(17) 98206-6123',
    bookingDay: '2024-06-10',
    quantity: '5',
  },
  {
    client: 'Jane Smith',
    contact: '(17) 96206-2323',
    bookingDay: '2024-06-11',
    quantity: '3',
  },
  {
    client: 'Michael Brown',
    contact: '(17) 98266-8932',
    bookingDay: '2024-06-12',
    quantity: '4',
  },
  {
    client: 'Emily Davis',
    contact: '(17) 95206-5124',
    bookingDay: '2024-06-13',
    quantity: '2',
  },
  {
    client: 'Chris Wilson',
    contact: '(17) 99212-0072',
    bookingDay: '2024-06-14',
    quantity: '6',
  },
  {
    client: 'Jessica Lee',
    contact: '(17) 92206-5432',
    bookingDay: '2024-06-15',
    quantity: '1',
  },
  {
    client: 'Daniel Taylor',
    contact: '(17) 97206-7123',
    bookingDay: '2024-06-16',
    quantity: '8',
  },
]

export function Dashboard() {
  return (
    <PageLayout>
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold">Reservas</h2>
        <DashboardDatePicker />
      </div>
      <Table className="mt-10">
        <TableHeader>
          <TableRow>
            <TableHead>Cliente</TableHead>
            <TableHead>Contato</TableHead>
            <TableHead>Dia da reserva</TableHead>
            <TableHead>Quantidade de pessoas</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.client}>
              <TableCell className="font-medium">{client.client}</TableCell>
              <TableCell>{client.contact}</TableCell>
              <TableCell>{client.bookingDay}</TableCell>
              <TableCell>{client.quantity}</TableCell>
              <TableCell>
                <DashboardActionMenuDropdown />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {/* <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter> */}
      </Table>
    </PageLayout>
  )
}
