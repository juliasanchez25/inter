'use client'

import { PropsWithChildren } from 'react'
import { Sidebar } from './sidebar'
import { BottomBar } from './bottom-bar'

type Props = PropsWithChildren

export const PageLayout = ({ children }: Props) => {
  return (
    <>
      <div className="flex w-full max-sm:flex-col pb-20">
        <Sidebar />
        <div className="w-full p-6 pt-10 ml-[200px] max-sm:ml-0">
          {children}
        </div>
        <BottomBar />
      </div>
    </>
  )
}
