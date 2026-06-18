import type { ReactNode } from 'react'

interface PageHeaderProps {
  title: string
  badge?: ReactNode
}

export function PageHeader({ title, badge }: PageHeaderProps) {
  return (
    <div className="mb-6 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
      <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
        <span className="text-gradient-brand">{title}</span>
      </h1>
      {badge}
    </div>
  )
}
