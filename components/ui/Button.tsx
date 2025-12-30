/**
 * AUTHORITATIVE BUTTON SYSTEM
 * Single source of truth for all button styling
 * Import this component - do not create custom buttons
 * 
 * Usage:
 *   <Button variant="primary">Click Me</Button>
 *   <Button variant="secondary" size="lg">Action</Button>
 *   <Button as="link" href="/page">Navigate</Button>
 */

'use client';

import { brand } from '@/design/brand';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from '@radix-ui/primitive';
import * as React from 'react';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-lg font-bold tracking-wider transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: `text-black font-bold hover:scale-105 active:scale-95 focus-visible:ring-offset-black`,
        secondary: `border-2 hover:bg-white/10 active:bg-white/20 focus-visible:ring-offset-black`,
        ghost: `hover:bg-white/10 active:bg-white/20 focus-visible:ring-offset-black`,
        danger: `hover:scale-105 active:scale-95 focus-visible:ring-offset-black`,
      },
      size: {
        sm: 'px-4 py-2 text-sm',
        base: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
        xl: 'px-10 py-5 text-xl',
      },
    },
    compoundVariants: [
      {
        variant: 'primary',
        className: 'bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 active:from-cyan-500 active:to-blue-600',
      },
      {
        variant: 'secondary',
        className: 'border-cyan-400 text-cyan-400 hover:text-cyan-300 hover:border-cyan-300',
      },
      {
        variant: 'ghost',
        className: 'text-white hover:text-cyan-300',
      },
      {
        variant: 'danger',
        className: 'bg-red-600 text-white hover:bg-red-500 active:bg-red-700',
      },
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'base',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={buttonVariants({ variant, size, className })}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
