'use client'

import * as React from 'react'
import { ChevronDownIcon, CheckIcon } from '@radix-ui/react-icons'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

const days = [
  {
    value: 'sunday',
    label: 'Domingo',
  },
  {
    value: 'monday',
    label: 'Segunda-feira',
  },
  {
    value: 'tuesday',
    label: 'Terça-feira',
  },
  {
    value: 'wednesday',
    label: 'Quarta-feira',
  },
  {
    value: 'thursday',
    label: 'Quinta-feira',
  },
  {
    value: 'friday',
    label: 'Sexta-feira',
  },
  {
    value: 'saturday',
    label: 'Sábado',
  },
]

export function OpenDaysBox() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState('')

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? days.find((day) => day.value === value)?.label
            : 'Selecionar dias...'}
          <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Pesquisar dia..." />
          <CommandList>
            <CommandEmpty>Dia não encontrado.</CommandEmpty>
            <CommandGroup>
              {days.map((day) => (
                <CommandItem
                  key={day.value}
                  value={day.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? '' : currentValue)
                    setOpen(false)
                  }}
                >
                  <CheckIcon
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === day.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {day.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
