import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cumpleaños de Silvana',
  description: 'Celebremos los 49 años de Silvana',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="font-sans">{children}</body>
    </html>
  )
}

