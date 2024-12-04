'use client'

import { motion, useAnimation, useInView } from 'framer-motion'
import { Calendar, Clock, Gift, MapPin, Music, Shirt } from 'lucide-react'
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
import Confetti from 'react-confetti'

export function Invitation() {
  // const [isRSVP, setIsRSVP] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
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

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
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
            className="absolute inset-0 z-0"
            animate={{
              background: [
                'radial-gradient(circle, rgba(212,175,55,0.1) 0%, rgba(0,0,0,0) 70%)',
                'radial-gradient(circle, rgba(212,175,55,0.2) 0%, rgba(0,0,0,0) 70%)',
                'radial-gradient(circle, rgba(212,175,55,0.1) 0%, rgba(0,0,0,0) 70%)',
              ],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
          <div className="relative z-10">
            <motion.div variants={itemVariants} className="text-center mb-12">
              <motion.h1
                className="text-5xl md:text-7xl font-bold text-gold mb-4"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                ¡Cumpleaños de Silvana!
              </motion.h1>
              <motion.p
                className="text-2xl text-gold/80"
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
                details="Ayúdanos a crear la playlist perfecta para la fiesta de Silvana."
              />
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col items-center gap-4">
              <Button
                onClick={() => {
                  setShowConfetti(true)
                  setTimeout(() => setShowConfetti(false), 5000)
                }}
                className="bg-gold hover:bg-gold/80 text-black font-bold px-8 py-4 rounded-full transition-all transform hover:scale-105"
              >
                Confirmar Asistencia
              </Button>
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
            </motion.div>
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
  details: string
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div
          whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(212,175,55,0.3)' }}
          className="flex items-center gap-4 p-4 rounded-lg bg-black/20 border border-gold/10 cursor-pointer hover:bg-black/30 transition-all"
        >
          <motion.div
            initial={{ rotate: 0 }}
            whileHover={{ rotate: 360 }}
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
          <DialogTitle className="text-gold">{title}</DialogTitle>
          <DialogDescription className="text-gold/80">
            {details}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

