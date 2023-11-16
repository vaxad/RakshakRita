import SendMail from './components/SendMail'
import './globals.css'
import { Outfit } from 'next/font/google'

const inter = Outfit({ subsets: ['latin'] })

export const metadata = {
  title: 'RakshakRita',
  description: 'Help us make your community safer.Share your feedback with your local police station.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
     integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossOrigin=""/>
     <link type="text/css" rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
     <script defer src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
     integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossOrigin=""></script>
     	<script defer src="https://unpkg.com/leaflet.heat@0.2.0/dist/leaflet-heat.js"></script>
      </head>
      <body className={inter.className}>
        <SendMail/>
        {children}</body>
    </html>
  )
}
