import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

const buttonVariants = cva(
  'inline-flex items-center active:scale-95 justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all focus:ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 focus-visible:outline-none focus:border-muted-foreground',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow hover:bg-primary/90 focus:ring-primary/25',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 focus:ring-destructive/25',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground focus:ring-primary/25',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 focus:ring-primary/25',
        ghost:
          'hover:bg-accent hover:text-accent-foreground focus:ring-primary/25',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'size-9 min-w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, loading = false, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        disabled={loading}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {loading && <Loader2 className='size-4 animate-spin' />}
        {props.children}
      </Comp>
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
