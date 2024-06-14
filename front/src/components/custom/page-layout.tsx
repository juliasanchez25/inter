'use client'

import { PropsWithChildren } from 'react'
import { Sidebar } from './sidebar'

type Props = PropsWithChildren

export const PageLayout = ({ children }: Props) => {
  return (
    <>
      <div className="flex w-full">
        <Sidebar />
        <div className="w-full p-6 pt-10 ml-[200px]">{children}</div>
      </div>
    </>
  )
}
