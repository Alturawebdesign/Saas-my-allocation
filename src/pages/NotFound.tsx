import { Link } from 'react-router-dom'
import { Button } from '@/components/ui'

export function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <div className="font-serif text-6xl text-gold">404</div>
      <p className="mt-3 text-mute">Cette page n'existe pas dans l'espace allocataire.</p>
      <Link to="/" className="mt-6"><Button variant="default">Retour au tableau de bord</Button></Link>
    </div>
  )
}
