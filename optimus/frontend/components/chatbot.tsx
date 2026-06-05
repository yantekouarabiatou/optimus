"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Message {
  id: number
  type: "bot" | "user"
  text: string
}

const initialMessage: Message = {
  id: 0,
  type: "bot",
  text: "Bonjour ! Je suis l'assistant virtuel d'Optimus+ Solutions. Comment puis-je vous aider aujourd'hui ?",
}

const quickReplies = [
  "Quels sont vos services ?",
  "Comment vous contacter ?",
  "Où êtes-vous situés ?",
  "Accéder à la boutique",
]

function getBotResponse(message: string): string {
  const lowerMessage = message.toLowerCase()

  if (lowerMessage.includes("service") || lowerMessage.includes("offre") || lowerMessage.includes("proposez")) {
    return "Nous proposons 6 domaines d'expertise :\n\n• IT & Infrastructure\n• Intelligence Artificielle\n• Développement web et mobile\n• Solutions Énergétiques\n• Sécurité Informatique\n• Design & UX\n• Formation & Accompagnement\n\nQuel domaine vous intéresse ?"
  }

  if (lowerMessage.includes("contact") || lowerMessage.includes("joindre") || lowerMessage.includes("appeler")) {
    return "Vous pouvez nous contacter par :\n\n📧 Email : contact@optimusplus.bj\n📞 Téléphone : +229 01 40 84 19 00\n\nOu utilisez notre formulaire de contact sur cette page !"
  }

  if (lowerMessage.includes("situé") || lowerMessage.includes("adresse") || lowerMessage.includes("localisation") || lowerMessage.includes("où")) {
    return "Nous sommes basés à Cotonou, Bénin 🇧🇯\n\nNous intervenons dans plusieurs pays d'Afrique de l'Ouest et au-delà."
  }

  if (lowerMessage.includes("optimus") || lowerMessage.includes("entreprise") || lowerMessage.includes("qui êtes")) {
    return "OPTIMUS+ SOLUTIONS SARL est une entreprise africaine spécialisée dans les technologies innovantes.\n\nNous accompagnons les organisations dans leur transformation digitale depuis plus de 10 ans."
  }

  if (lowerMessage.includes("boutique") || lowerMessage.includes("shop") || lowerMessage.includes("acheter") || lowerMessage.includes("produit")) {
    return "Notre boutique en ligne propose des équipements IT, composants énergie et matériels tech.\n\n👉 Cliquez sur 'Notre Boutique' dans la navigation pour y accéder !"
  }

  if (lowerMessage.includes("prix") || lowerMessage.includes("tarif") || lowerMessage.includes("devis") || lowerMessage.includes("coût")) {
    return "Nos tarifs dépendent de vos besoins spécifiques. Pour obtenir un devis personnalisé :\n\n1. Décrivez votre projet via le formulaire de contact\n2. Notre équipe vous répondra sous 24h\n\nChaque solution est sur mesure !"
  }

  if (lowerMessage.includes("merci") || lowerMessage.includes("super") || lowerMessage.includes("parfait")) {
    return "Avec plaisir ! N'hésitez pas si vous avez d'autres questions. L'équipe Optimus+ est là pour vous accompagner. 🙌"
  }

  if (lowerMessage.includes("bonjour") || lowerMessage.includes("salut") || lowerMessage.includes("hello")) {
    return "Bonjour ! Comment puis-je vous aider aujourd'hui ? Vous pouvez me poser des questions sur nos services, notre localisation ou comment nous contacter."
  }

  return "Je suis désolé, je n'ai pas compris votre demande. Pourriez-vous reformuler ou choisir l'une des options ci-dessous ?\n\nVous pouvez aussi nous contacter directement à contact@optimusplus.bj"
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([initialMessage])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async (text?: string) => {
    const messageText = text || input
    if (!messageText.trim()) return

    const userMessage: Message = {
      id: Date.now(),
      type: "user",
      text: messageText,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate bot response delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const botResponse: Message = {
      id: Date.now() + 1,
      type: "bot",
      text: getBotResponse(messageText),
    }

    setIsTyping(false)
    setMessages((prev) => [...prev, botResponse])
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 bg-accent text-primary rounded-full shadow-lg flex items-center justify-center hover:bg-accent/90 transition-colors ${
          isOpen ? "hidden" : ""
        }`}
        aria-label="Ouvrir le chat"
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] bg-card rounded-2xl shadow-2xl border border-border overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary-foreground text-sm">
                    Assistant Optimus+
                  </h3>
                  <p className="text-primary-foreground/70 text-xs">
                    En ligne
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                aria-label="Fermer le chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-4 chatbot-messages bg-background">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${
                    message.type === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      message.type === "bot"
                        ? "bg-accent/20"
                        : "bg-primary"
                    }`}
                  >
                    {message.type === "bot" ? (
                      <Bot className="w-4 h-4 text-accent" />
                    ) : (
                      <User className="w-4 h-4 text-primary-foreground" />
                    )}
                  </div>
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                      message.type === "bot"
                        ? "bg-muted text-foreground rounded-tl-none"
                        : "bg-primary text-primary-foreground rounded-tr-none"
                    }`}
                  >
                    <p className="whitespace-pre-line">{message.text}</p>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2"
                >
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-accent" />
                  </div>
                  <div className="bg-muted rounded-2xl rounded-tl-none p-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            <div className="px-4 py-2 bg-muted/50 border-t border-border">
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {quickReplies.map((reply) => (
                  <button
                    key={reply}
                    onClick={() => handleSend(reply)}
                    className="px-3 py-1.5 bg-card border border-border rounded-full text-xs text-foreground hover:border-accent hover:text-accent transition-colors whitespace-nowrap"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border bg-card">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Écrivez votre message..."
                  className="flex-1"
                />
                <Button
                  onClick={() => handleSend()}
                  size="icon"
                  className="bg-accent text-primary hover:bg-accent/90"
                  disabled={!input.trim()}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
