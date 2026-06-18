import * as React from 'react'
import { cn } from '@/lib/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'flex h-10 w-full rounded-lg border-2 border-input bg-card px-3 py-2 text-sm font-medium shadow-[inset_0_1px_2px_rgb(15_23_42/0.04)] transition-colors',
        'placeholder:font-normal placeholder:text-muted-foreground',
        'hover:border-muted-foreground/40',
        'focus-visible:border-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/15',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'file:border-0 file:bg-transparent file:text-sm file:font-medium',
        className
      )}
      {...props}
    />
  )
}

export { Input }
