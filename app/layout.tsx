import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Text Behind Image Editor',
  description: 'Add text behind images with background removal',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
} 