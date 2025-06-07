"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navigation = [
    { name: "Página Inicial", href: "/" },
    { name: "Nossa História", href: "/nossa-historia" },
    { name: "Nosso Time", href: "/nosso-time" },
    { name: "Portfólio", href: "/portfolio" },
    { name: "Crise Climática", href: "/crise-climatica" },
    { name: "Edital 273/2023", href: "/edital-273-2023" },
    { name: "Dados dos Sensores", href: "/dados-sensores" },
    { name: "IFSP-Birigui", href: "https://bri.ifsp.edu.br/", external: true },
  ]

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-green-600">CoMMSenso</span>
          </Link>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navigation.map((item) => (
            <div key={item.name}>
              {item.external ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium transition-colors hover:text-green-600"
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-green-600 ${
                    isActive(item.href) ? "text-green-600" : "text-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Mobile navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Menu">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <div className="flex justify-between items-center mb-6">
              <span className="text-xl font-bold text-green-600">CoMMSenso</span>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-6 w-6" />
              </Button>
            </div>
            <nav className="flex flex-col gap-4">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-medium transition-colors hover:text-green-600 block py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className={`text-base font-medium transition-colors hover:text-green-600 block py-2 ${
                        isActive(item.href) ? "text-green-600" : "text-foreground"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
