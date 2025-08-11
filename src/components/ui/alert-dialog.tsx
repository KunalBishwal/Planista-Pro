"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface AlertDialogContextValue {
  open: boolean
  setOpen: (open: boolean) => void
}

const AlertDialogContext = React.createContext<AlertDialogContextValue | null>(null)

export function AlertDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)
  return (
    <AlertDialogContext.Provider value={{ open, setOpen }}>
      {children}
    </AlertDialogContext.Provider>
  )
}

export function AlertDialogTrigger({
  children,
}: {
  children: React.ReactElement<{ onClick?: (e: React.MouseEvent) => void }>
}) {
  const ctx = React.useContext(AlertDialogContext)
  if (!ctx) throw new Error("AlertDialogTrigger must be inside AlertDialog")
  return React.cloneElement(children, {
    onClick: (e: React.MouseEvent) => {
      ctx.setOpen(true)
      children.props.onClick?.(e)
    },
  })
}

export function AlertDialogContent({
  children,
}: {
  children: React.ReactNode
}) {
  const ctx = React.useContext(AlertDialogContext)
  if (!ctx) throw new Error("AlertDialogContent must be inside AlertDialog")
  if (!ctx.open) return null

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className={cn("w-full max-w-md rounded-lg bg-white shadow-lg")}>
        {children}
      </div>
    </div>,
    document.body
  )
}

export function AlertDialogHeader({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={cn("rounded-t-lg px-4 py-3", className)}>{children}</div>
}

export function AlertDialogTitle({
  children,
}: {
  children: React.ReactNode
}) {
  return <h3 className="text-lg font-semibold">{children}</h3>
}

export function AlertDialogDescription({
  children,
}: {
  children: React.ReactNode
}) {
  return <p className="px-4 py-2 text-sm text-gray-700">{children}</p>
}

export function AlertDialogFooter({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("flex justify-end gap-2 px-4 py-3", className)}>
      {children}
    </div>
  )
}

export function AlertDialogCancel({
  children,
  className,
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const ctx = React.useContext(AlertDialogContext)
  if (!ctx) throw new Error("AlertDialogCancel must be inside AlertDialog")
  return (
    <Button
      variant="outline"
      className={cn(className)}
      onClick={() => ctx.setOpen(false)}
    >
      {children}
    </Button>
  )
}

export function AlertDialogAction({
  children,
  onClick,
  className,
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  onClick?: (e: React.MouseEvent) => void
}) {
  const ctx = React.useContext(AlertDialogContext)
  if (!ctx) throw new Error("AlertDialogAction must be inside AlertDialog")
  const handle = (e: React.MouseEvent) => {
    onClick?.(e)
    ctx.setOpen(false)
  }
  return (
    <Button
      variant="default"
      className={cn(
        className,
        "bg-[#F28179] text-white hover:bg-[#D0584E]"
      )}
      onClick={handle}
    >
      {children}
    </Button>
  )
}
