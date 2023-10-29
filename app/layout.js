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
      <body className={inter.className}>{children}</body>
    </html>
  )
}
