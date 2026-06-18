import { lazy } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from '@/components/theme-provider'
import { Layout } from '@/components/layout/Layout'

// Code-split each tab so the initial bundle stays small.
const BookingPage = lazy(() =>
  import('@/pages/BookingPage').then((m) => ({ default: m.BookingPage }))
)
const TradedoublerPage = lazy(() =>
  import('@/pages/TradedoublerPage').then((m) => ({ default: m.TradedoublerPage }))
)
const GetYourGuidePage = lazy(() =>
  import('@/pages/GetYourGuidePage').then((m) => ({ default: m.GetYourGuidePage }))
)
const CivitatisPage = lazy(() =>
  import('@/pages/CivitatisPage').then((m) => ({ default: m.CivitatisPage }))
)
const CarRentalPage = lazy(() =>
  import('@/pages/CarRentalPage').then((m) => ({ default: m.CarRentalPage }))
)
const ImageToolPage = lazy(() =>
  import('@/pages/ImageToolPage').then((m) => ({ default: m.ImageToolPage }))
)
const FeedbackPage = lazy(() =>
  import('@/pages/FeedbackPage').then((m) => ({ default: m.FeedbackPage }))
)
const NotFoundPage = lazy(() =>
  import('@/pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage }))
)

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Navigate to="/booking" replace />} />
            <Route path="booking" element={<BookingPage />} />
            <Route path="tradedoubler" element={<TradedoublerPage />} />
            <Route path="getyourguide" element={<GetYourGuidePage />} />
            <Route path="civitatis" element={<CivitatisPage />} />
            <Route path="car-rental" element={<CarRentalPage />} />
            <Route path="images" element={<ImageToolPage />} />
            <Route path="feedback" element={<FeedbackPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
