'use client'

import { format } from 'date-fns'
import { CalendarIcon } from '@radix-ui/react-icons'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ptBR } from 'date-fns/locale'
import { Matcher } from 'react-day-picker'

type Props = {
  error: string | undefined
  value: Date | undefined
  setValue: (value: Date | undefined) => void
  disabled?: Matcher | Matcher[]
}

export function ReservationDatePicker({
  error,
  value,
  setValue,
  disabled,
}: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex flex-col">
          <Button
            type="button"
            variant={'outline'}
            className={cn(
              'justify-start text-left font-normal',
              !value && 'text-muted-foreground',
              error && 'border-red-600',
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? (
              format(value, 'PPP', {
                locale: ptBR,
              })
            ) : (
              <span>Escolha um dia</span>
            )}
          </Button>
          {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={setValue}
          initialFocus
          locale={ptBR}
          disabled={disabled}
        />
      </PopoverContent>
    </Popover>
  )
}
