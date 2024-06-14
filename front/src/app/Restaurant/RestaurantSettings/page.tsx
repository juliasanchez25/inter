import { PageLayout } from '@/components/custom/page-layout'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { CheckIcon, Pencil1Icon } from '@radix-ui/react-icons'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import { DaysOpen } from './components/DaysOpen'
import { useReadConfiguration } from '@/hooks/use-read-configuration'
import { useForm } from 'react-hook-form'
import { useCreateConfiguration } from '@/hooks/use-create-configuration'
import { useUpdateConfiguration } from '@/hooks/use-update-configuration'
import { IConfigurationModel } from '@/models/configuration'
import { transformNumberToPhone } from '@/utils/masks'

export type FormData = {
  daysOpen?: string[]
  address?: string
  phone?: string
  workingHours?: string
  website?: string
  capacity?: number
}

export function RestaurantSettings() {
  const [editAddress, setEditAddress] = useState(false)
  const [editPhone, setEditPhone] = useState(false)
  const [editWorkingHours, setEditWorkingHours] = useState(false)
  const [editWebsite, setEditWebsite] = useState(false)
  const [editCapacity, setEditCapacity] = useState(false)

  React.useEffect(() => {
    document.title = 'Configurações do restaurante'
  }, [])

  const readConfiguration = useReadConfiguration<IConfigurationModel[]>()
  const configuration = readConfiguration.data?.[0]

  const createConfiguration = useCreateConfiguration({
    onSuccess: () => {
      readConfiguration.refetch()
    },
  })
  const updateConfiguration = useUpdateConfiguration({
    onSuccess: () => {
      readConfiguration.refetch()
    },
  })

  const { watch, setValue, handleSubmit } = useForm<FormData>()

  useEffect(() => {
    if (configuration) {
      setValue('daysOpen', configuration.daysOpen)
      setValue('address', configuration.address)
      setValue('phone', configuration.phone)
      setValue('website', configuration.website)
      setValue('workingHours', configuration.workingHours)
      setValue('capacity', configuration.capacity)
    }
  }, [configuration])

  const submit = handleSubmit((data) => {
    if (configuration) {
      updateConfiguration.mutate({
        ...data,
        id: configuration.id,
      })
      return
    }
    createConfiguration.mutate(data)
  })

  return (
    <PageLayout>
      <h2 className="text-xl font-semibold">Configurações do restaurante</h2>
      {!readConfiguration.isLoading && (
        <div className="mt-6 max-md:grid-cols-1 grid md:grid-cols-2 gap-10">
          <DaysOpen
            setValue={setValue}
            submit={submit}
            defaultValue={configuration?.daysOpen}
          />

          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between">
                Informações
              </CardTitle>
              <CardDescription>
                Informações sobre o restaurante.
              </CardDescription>
              <CardContent className="p-0">
                <div className="flex items-center gap-2 mt-4">
                  <Input
                    disabled={!editAddress}
                    label="Endereço"
                    placeholder={editAddress ? 'Preencha' : undefined}
                    defaultValue={configuration?.address}
                    onChange={(e) => {
                      setValue('address', e.target.value)
                    }}
                    leading={
                      !editAddress ? (
                        <button onClick={() => setEditAddress(true)}>
                          <Pencil1Icon
                            width={18}
                            height={18}
                            className="text-gray-600 hover:text-red-400"
                          />
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setEditAddress(false)
                            submit()
                          }}
                        >
                          <CheckIcon
                            width={18}
                            height={18}
                            className="text-gray-600 hover:text-red-400"
                          />
                        </button>
                      )
                    }
                  />
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <Input
                    disabled={!editWorkingHours}
                    label="Horário de funcionamento"
                    placeholder={editWorkingHours ? 'Preencha' : undefined}
                    defaultValue={configuration?.workingHours}
                    onChange={(e) => {
                      setValue('workingHours', e.target.value)
                    }}
                    leading={
                      !editWorkingHours ? (
                        <button onClick={() => setEditWorkingHours(true)}>
                          <Pencil1Icon
                            width={18}
                            height={18}
                            className="text-gray-600 hover:text-red-400"
                          />
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setEditWorkingHours(false)
                            submit()
                          }}
                        >
                          <CheckIcon
                            width={18}
                            height={18}
                            className="text-gray-600 hover:text-red-400"
                          />
                        </button>
                      )
                    }
                  />
                </div>
              </CardContent>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between">Contato</CardTitle>
              <CardDescription>
                Informações sobre o contato do restaurante.
              </CardDescription>
              <CardContent className="p-0">
                <div className="flex items-center gap-2 mt-4">
                  <Input
                    disabled={!editPhone}
                    label="Telefone"
                    maxLength={15}
                    placeholder={editPhone ? 'Preencha' : undefined}
                    defaultValue={transformNumberToPhone(
                      configuration?.phone || '',
                    )}
                    value={watch('phone')}
                    onChange={(e) => {
                      setValue('phone', transformNumberToPhone(e.target.value))
                    }}
                    leading={
                      !editPhone ? (
                        <button onClick={() => setEditPhone(true)}>
                          <Pencil1Icon
                            width={18}
                            height={18}
                            className="text-gray-600 hover:text-red-400"
                          />
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setEditPhone(false)
                            submit()
                          }}
                        >
                          <CheckIcon
                            width={18}
                            height={18}
                            className="text-gray-600 hover:text-red-400"
                          />
                        </button>
                      )
                    }
                  />
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <Input
                    disabled={!editWebsite}
                    label="Website"
                    placeholder={editWebsite ? 'Preencha' : undefined}
                    defaultValue={configuration?.website}
                    onChange={(e) => {
                      setValue('website', e.target.value)
                    }}
                    leading={
                      !editWebsite ? (
                        <button onClick={() => setEditWebsite(true)}>
                          <Pencil1Icon
                            width={18}
                            height={18}
                            className="text-gray-600 hover:text-red-400"
                          />
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setEditWebsite(false)
                            submit()
                          }}
                        >
                          <CheckIcon
                            width={18}
                            height={18}
                            className="text-gray-600 hover:text-red-400"
                          />
                        </button>
                      )
                    }
                  />
                </div>
              </CardContent>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between">
                Restaurante
              </CardTitle>
              <CardDescription>
                Informações sobre o restaurante.
              </CardDescription>
              <CardContent className="p-0">
                <div className="flex items-center gap-2 mt-4">
                  <Input
                    disabled={!editCapacity}
                    label="Lugares disponíveis"
                    placeholder={editCapacity ? 'Preencha' : undefined}
                    defaultValue={configuration?.capacity}
                    value={watch('capacity')}
                    type="number"
                    onChange={(e) => {
                      setValue(
                        'capacity',
                        e.target.value === ''
                          ? undefined
                          : Number(e.target.value),
                      )
                    }}
                    leading={
                      !editCapacity ? (
                        <button onClick={() => setEditCapacity(true)}>
                          <Pencil1Icon
                            width={18}
                            height={18}
                            className="text-gray-600 hover:text-red-400"
                          />
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setEditCapacity(false)
                            submit()
                          }}
                        >
                          <CheckIcon
                            width={18}
                            height={18}
                            className="text-gray-600 hover:text-red-400"
                          />
                        </button>
                      )
                    }
                  />
                </div>
              </CardContent>
            </CardHeader>
          </Card>
        </div>
      )}
    </PageLayout>
  )
}
