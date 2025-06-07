import Link from "next/link"
import { Instagram, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-green-900 text-white py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">CoMMSenso</h3>
            <p className="text-green-100 mb-4">
              Conscientização, Mão na Massa e Sensores com a Compostagem de Resíduos Orgânicos
            </p>
            <p className="text-green-100">Um projeto de sustentabilidade do IFSP Campus Birigui</p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-green-100 hover:text-white transition-colors">
                  Página Inicial
                </Link>
              </li>
              <li>
                <Link href="/nossa-historia" className="text-green-100 hover:text-white transition-colors">
                  Nossa História
                </Link>
              </li>
              <li>
                <Link href="/nosso-time" className="text-green-100 hover:text-white transition-colors">
                  Nosso Time
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-green-100 hover:text-white transition-colors">
                  Portfólio
                </Link>
              </li>
              <li>
                <Link href="/dados-sensores" className="text-green-100 hover:text-white transition-colors">
                  Dados dos Sensores
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contato</h3>
            <div className="space-y-3">
              <a
                href="mailto:commsenso@gmail.com"
                className="flex items-center gap-2 text-green-100 hover:text-white transition-colors"
              >
                <Mail className="h-5 w-5" />
                commsenso@gmail.com
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-green-100 hover:text-white transition-colors"
              >
                <Instagram className="h-5 w-5" />
                @commsenso
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-green-700 mt-8 pt-8 text-center text-green-100">
          <p>©2023 por CoMMSenso. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
