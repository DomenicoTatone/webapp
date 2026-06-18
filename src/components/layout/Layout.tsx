import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { Toaster } from 'sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { useTheme } from '@/hooks/useTheme'
import { Header } from './Header'
import { Footer } from './Footer'
import { Fab } from './Fab'

export function Layout() {
  const { theme } = useTheme()
  return (
    <TooltipProvider delayDuration={200}>
      <div className="flex min-h-dvh flex-col">
        <Header />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
          <Suspense
            fallback={
              <div className="flex justify-center py-20">
                <Loader2 className="size-6 animate-spin text-primary" />
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </main>
        <Footer />
        <Fab />
        <Toaster theme={theme} richColors position="bottom-right" />
      </div>
    </TooltipProvider>
  )
}
