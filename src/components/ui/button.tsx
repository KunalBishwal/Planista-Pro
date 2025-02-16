"use client"
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "outline" | "ghost" | "secondary"
    size?: "sm" | "default" | "lg"
    asChild?: boolean 
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Component = asChild ? Slot : "button"
    return (
      <Component
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
          variant === "default"
            ? "bg-primary text-primary-foreground hover:bg-primary/90"
            : "border border-input",
          size === "sm"
            ? "h-9 px-3 rounded-md"
            : size === "lg"
            ? "h-11 px-8 rounded-md"
            : "h-10 py-2 px-4 rounded-md",
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
