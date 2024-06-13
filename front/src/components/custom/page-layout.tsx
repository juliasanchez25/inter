'use client'

import { PropsWithChildren } from 'react'
import { Sidebar } from './sidebar'

type Props = PropsWithChildren

export const PageLayout = ({ children }: Props) => {
  return (
    <>
      <div className="flex gap-5 w-full">
        <Sidebar />
        <div className="w-full p-6 pt-10">{children}</div>
      </div>
    </>
  )
}
