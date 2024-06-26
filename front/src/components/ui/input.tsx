import * as React from 'react'

import { cn } from '@/lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
  label?: string
  leading?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, leading, ...props }, ref) => {
    return (
      <div>
        {props.label && (
          <label
            className="block text-xs leading-6 text-gray-600"
            htmlFor={props.id}
          >
            {props.label}
          </label>
        )}
        <div className="flex gap-2 items-center">
          <input
            type={type}
            className={cn(
              'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
              className,
              error && 'border-red-600',
            )}
            ref={ref}
            {...props}
          />
          {leading}
        </div>
        {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
      </div>
    )
  },
)
Input.displayName = 'Input'

export { Input }
