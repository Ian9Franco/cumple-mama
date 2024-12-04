'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, Gift, Map, Music, Shirt } from 'lucide-react'
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export function Invitation() {
  const [isRSVP, setIsRSVP] = useState(false)

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
      <motion.div
        initial="initial"
        animate="animate"
        className="w-full max-w-2xl"
      >
        <Card className="backdrop-blur-md bg-black/30 border border-gold/20 p-8 rounded-xl shadow-xl">
          <motion.div {...fadeIn} className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gold mb-4">¡Mi Cumpleaños!</h1>
            <p className="text-xl text-gold/80">Te invito a celebrar conmigo</p>
          </motion.div>

          <motion.div {...fadeIn} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <InfoItem
              icon={<Calendar className="w-6 h-6 text-gold" />}
              title="Fecha"
              description="15 de Enero, 2024"
              details="Únete a nosotros en esta fecha especial para celebrar juntos."
            />
            <InfoItem
              icon={<Clock className="w-6 h-6 text-gold" />}
              title="Hora"
              description="20:00 hrs"
              details="La celebración comenzará puntualmente. ¡No llegues tarde!"
            />
            <InfoItem
              icon={<Map className="w-6 h-6 text-gold" />}
              title="Lugar"
              description="Salón Dorado"
              details="Av. Principal #123, Ciudad. Estacionamiento disponible."
            />
            <InfoItem
              icon={<Shirt className="w-6 h-6 text-gold" />}
              title="Código de Vestimenta"
              description="Elegante"
              details="Sugerimos vestimenta formal para la ocasión. ¡Vístete para brillar!"
            />
            <InfoItem
              icon={<Gift className="w-6 h-6 text-gold" />}
              title="Regalo"
              description="Mesa de Regalos"
              details="Tu presencia es el mejor regalo, pero si deseas dar algo, aquí hay algunas sugerencias."
            />
            <InfoItem
              icon={<Music className="w-6 h-6 text-gold" />}
              title="Música"
              description="¡Sugiere una canción!"
              details="Ayúdanos a crear la playlist perfecta para la fiesta."
            />
          </motion.div>

          <motion.div {...fadeIn} className="flex flex-col items-center gap-4">
            <Button
              onClick={() => setIsRSVP(true)}
              className="bg-gold hover:bg-gold/80 text-black font-bold px-8 py-4 rounded-full transition-all"
            >
              Confirmar Asistencia
            </Button>
            <Button
              variant="outline"
              className="border-gold text-gold hover:bg-gold/20"
              onClick={() => {
                const event = {
                  text: 'Cumpleaños',
                  dates: '20240115T200000',
                  location: 'Salón Dorado, Av. Principal #123'
                }
                window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${event.text}&dates=${event.dates}/${event.dates}&location=${event.location}`)
              }}
            >
              Agregar al Calendario
            </Button>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  )
}

function InfoItem({ icon, title, description, details }: {
  icon: React.ReactNode
  title: string
  description: string
  details: string
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-4 p-4 rounded-lg bg-black/20 border border-gold/10 cursor-pointer hover:bg-black/30 transition-colors"
        >
          {icon}
          <div className="text-left">
            <h3 className="font-semibold text-gold">{title}</h3>
            <p className="text-sm text-gold/80">{description}</p>
          </div>
        </motion.div>
      </DialogTrigger>
      <DialogContent className="bg-black/95 border-gold/20">
        <DialogHeader>
          <DialogTitle className="text-gold">{title}</DialogTitle>
          <DialogDescription className="text-gold/80">
            {details}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

