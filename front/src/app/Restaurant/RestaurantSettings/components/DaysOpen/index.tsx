import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useState } from 'react'
import { UseFormSetValue } from 'react-hook-form'
import { FormData } from '../../page'

type Props = {
  setValue: UseFormSetValue<FormData>
  submit: () => void
  defaultValue?: string[]
}

export function DaysOpen({ setValue, submit, defaultValue }: Props) {
  const daysOptions = [
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
    'Domingo',
  ]
  const [days, setDays] = useState<string[]>(defaultValue || [])

  return (
    <Card className="w-fit">
      <CardHeader>
        <CardTitle className="flex justify-between">Dias abertos</CardTitle>
        <CardDescription>
          Dias em que o restaurante estará aberto.
        </CardDescription>
        <CardContent className="p-0">
          <div className="grid grid-cols-3 gap-2 mt-4 ">
            {daysOptions.map((day) => (
              <Badge
                key={day}
                className={`w-[75px] ${days.includes(day) ? 'bg-red-400 hover:bg-red-300' : 'bg-gray-400 hover:bg-gray-300'} cursor-pointer`}
                onClick={() => {
                  if (days.includes(day)) {
                    setDays(days.filter((d) => d !== day))
                    setValue(
                      'daysOpen',
                      days.filter((d) => d !== day),
                    )
                  } else {
                    setDays([...days, day])
                    setValue('daysOpen', [...days, day])
                  }
                  submit()
                }}
              >
                {day}
              </Badge>
            ))}
          </div>
        </CardContent>
      </CardHeader>
    </Card>
  )
}
