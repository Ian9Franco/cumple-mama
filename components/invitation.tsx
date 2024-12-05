'use client'

import { motion, useAnimation, useInView } from 'framer-motion'
import { Calendar, Clock, Gift, MapPin, Music, Shirt, UserPlus } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
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
import { Input } from '@/components/ui/input'
import Confetti from 'react-confetti'
import { SongSuggestion } from './song-suggestion'

export function Invitation() {
  const [showConfetti, setShowConfetti] = useState(false)
  const [attendees, setAttendees] = useState<string[]>([])
  const [newAttendee, setNewAttendee] = useState('')
  const [showAttendeesList, setShowAttendeesList] = useState(false)
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref)

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }

  const handleRSVP = (e: React.FormEvent) => {
    e.preventDefault()
    if (newAttendee.trim()) {
      setAttendees([...attendees, newAttendee.trim()])
      setNewAttendee('')
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 5000)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center bg-gradient-radial from-black to-gray-900">
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="w-full max-w-4xl"
      >
        <Card className="backdrop-blur-md bg-black/30 border border-gold/20 p-8 rounded-xl shadow-xl overflow-hidden relative">
          <motion.div
            className="absolute inset-0 z-0 bg-gradient-to-r from-gold/10 via-gold/5 to-gold/10 animate-shimmer"
            style={{
              backgroundSize: '200% 100%',
            }}
          />
          <div className="relative z-10">
            <motion.div variants={itemVariants} className="text-center mb-12">
              <motion.h1
                className="text-5xl md:text-7xl font-bold text-gold mb-4 tracking-wider"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                ¡Cumpleaños de Silvana!
              </motion.h1>
              <motion.p
                className="text-2xl text-gold/80 italic"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Celebremos mis 48 años juntos
              </motion.p>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <InfoItem
                icon={<Calendar className="w-6 h-6 text-gold" />}
                title="Fecha"
                description="21 de Diciembre, 2023"
                details="Únete a nosotros en esta fecha especial para celebrar juntos."
              />
              <InfoItem
                icon={<Clock className="w-6 h-6 text-gold" />}
                title="Hora"
                description="21:00 hrs"
                details="La celebración comenzará puntualmente a las 9 de la noche. ¡No llegues tarde!"
              />
              <InfoItem
                icon={<MapPin className="w-6 h-6 text-gold" />}
                title="Lugar"
                description="Villa Luzuriaga"
                details="Ituzaingo 5458, Villa Luzuriaga. Estacionamiento disponible en la zona."
              />
              <InfoItem
                icon={<Shirt className="w-6 h-6 text-gold" />}
                title="Código de Vestimenta"
                description="Elegante Casual"
                details="Sugerimos vestimenta elegante pero cómoda para la ocasión. ¡Vístete para celebrar!"
              />
              <InfoItem
                icon={<Gift className="w-6 h-6 text-gold" />}
                title="Regalo"
                description="Tu presencia es el mejor regalo"
                details="Si deseas dar algo, un detalle significativo será apreciado."
              />
              <InfoItem
                icon={<Music className="w-6 h-6 text-gold" />}
                title="Música"
                description="¡Sugiere una canción!"
                details={<SongSuggestion />}
              />
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col items-center gap-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    className="bg-gold hover:bg-gold/80 text-black font-bold px-8 py-4 rounded-full transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Confirmar Asistencia
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-black/95 border-gold/20">
                  <DialogHeader>
                    <DialogTitle className="text-gold text-2xl">Confirmar Asistencia</DialogTitle>
                    <DialogDescription className="text-gold/80">
                      Ingresa tu nombre o grupo familiar para confirmar tu asistencia.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleRSVP} className="space-y-4">
                    <Input
                      type="text"
                      placeholder="Nombre o Grupo Familiar"
                      value={newAttendee}
                      onChange={(e) => setNewAttendee(e.target.value)}
                      className="bg-black/20 border-gold/20 text-gold placeholder-gold/50 focus:ring-gold/50"
                    />
                    <Button type="submit" className="w-full bg-gold hover:bg-gold/80 text-black font-bold transition-all transform hover:scale-105">
                      Confirmar
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
              <Button
                variant="outline"
                className="border-gold text-gold hover:bg-gold/20 transform hover:scale-105 transition-all"
                onClick={() => {
                  const event = {
                    text: 'Cumpleaños de Silvana',
                    dates: '20231221T210000',
                    location: 'Ituzaingo 5458, Villa Luzuriaga'
                  }
                  window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${event.text}&dates=${event.dates}/${event.dates}&location=${event.location}`)
                }}
              >
                Agregar al Calendario
              </Button>
              <Button
                variant="outline"
                className="border-gold text-gold hover:bg-gold/20 transform hover:scale-105 transition-all"
                onClick={() => setShowAttendeesList(!showAttendeesList)}
              >
                {showAttendeesList ? 'Ocultar' : 'Mostrar'} Lista de Invitados
              </Button>
            </motion.div>

            {showAttendeesList && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="mt-8"
              >
                <h3 className="text-2xl font-bold text-gold mb-4">Invitados Confirmados</h3>
                {attendees.length > 0 ? (
                  <ul className="space-y-2">
                    {attendees.map((attendee, index) => (
                      <motion.li
                        key={index}
                        className="flex items-center gap-2 text-gold/80"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <UserPlus className="w-4 h-4 text-gold" />
                        {attendee}
                      </motion.li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gold/80">Aún no hay invitados confirmados.</p>
                )}
              </motion.div>
            )}
          </div>
        </Card>
      </motion.div>
    </div>
  )
}

function InfoItem({ icon, title, description, details }: {
  icon: React.ReactNode
  title: string
  description: string
  details: string | React.ReactNode
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div
          whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(212,175,55,0.3)' }}
          className="flex items-center gap-4 p-4 rounded-lg bg-black/20 border border-gold/10 cursor-pointer hover:bg-black/30 transition-all"
        >
          <motion.div
            className="p-2 bg-gold/10 rounded-full"
            initial={{ rotate: 0 }}
            whileHover={{ rotate: 360, backgroundColor: 'rgba(212,175,55,0.2)' }}
            transition={{ duration: 0.5 }}
          >
            {icon}
          </motion.div>
          <div className="text-left">
            <h3 className="font-semibold text-gold">{title}</h3>
            <p className="text-sm text-gold/80">{description}</p>
          </div>
        </motion.div>
      </DialogTrigger>
      <DialogContent className="bg-black/95 border-gold/20">
        <DialogHeader>
          <DialogTitle className="text-gold text-2xl">{title}</DialogTitle>
          <DialogDescription className="text-gold/80">
            {details}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

