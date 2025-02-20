import { ButtonProps } from '@renderer/types'
import { twMerge } from 'tailwind-merge'

export const ActionButton = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={twMerge(
        'px-2 py-1.5 rounded-md border border-zinc-400/50 hover:bg-zinc-600/50 transition-colors duration-100',
        className
      )}
    >
      {children}
    </button>
  )
}
