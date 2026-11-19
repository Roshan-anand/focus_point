import { MessageCircle } from 'lucide-react'

import { WHATSAPP_URL } from '#/data/portfolio'

export function WhatsAppCta() {
  return (
    <div className="whatsapp-cta">
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with Focus Point Photography on WhatsApp"
      >
        <MessageCircle size={20} strokeWidth={1.5} />
        WhatsApp
      </a>
    </div>
  )
}
