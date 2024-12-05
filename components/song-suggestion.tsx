import { Button } from "@/components/ui/button"
import { Music } from 'lucide-react'

const SPOTIFY_PLAYLIST_URL = 'https://open.spotify.com/playlist/1Xfdpwm0zdJxUTUMiqkwaH'

export function SongSuggestion() {
  return (
    <div className="space-y-4">
      <p className="text-gold/80">Ayúdanos a crear la playlist perfecta para la fiesta de Silvana.</p>
      <Button
        className="w-full bg-[#1DB954] hover:bg-[#1ED760] text-black font-bold py-2 px-4 rounded-full flex items-center justify-center gap-2 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
        onClick={() => window.open(SPOTIFY_PLAYLIST_URL, '_blank')}
      >
        <Music className="w-5 h-5" />
        Agregar canciones a la playlist
      </Button>
    </div>
  )
}

