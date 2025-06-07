import { Card, CardContent } from "@/components/ui/card"
import { Github, Linkedin, Mail, Instagram } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function OurTeam() {
  const teamMembers = [
    {
      name: "Jadir Pires de Borba Junior",
      role: "Aluno do Curso de Engenharia de Computação",
      position: "Bolsista",
      bio: "Desenvolve soluções tecnológicas para monitoramento de compostagem, com foco em sensores IoT e análise de dados em tempo real.",
      image: "/placeholder.svg?height=300&width=300",
      social: {
        email: "jadir@example.com",
        github: "#",
        linkedin: "#",
      },
    },
    {
      name: "Lourenço Henrique Neves Pereira",
      role: "Aluno do Curso de Engenharia de Computação",
      position: "Bolsista",
      bio: "Responsável pelo desenvolvimento de interfaces e visualização de dados dos sensores, integrando tecnologia e sustentabilidade.",
      image: "/placeholder.svg?height=300&width=300",
      social: {
        email: "lourenco@example.com",
        github: "#",
        linkedin: "#",
      },
    },
    {
      name: "Helen de Freitas Santos",
      role: "Professora da Área de Informática",
      position: "Coordenadora",
      bio: "Especialista em tecnologias educacionais e sustentabilidade, lidera o projeto CoMMSenso com foco na integração de IoT e práticas sustentáveis.",
      image: "/placeholder.svg?height=300&width=300",
      social: {
        email: "helen@example.com",
        linkedin: "#",
        instagram: "#",
      },
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <h1 className="text-4xl font-bold text-center mb-6">Nosso Time</h1>

      {/* About Section */}
      <div className="max-w-4xl mx-auto mb-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Sobre</h2>
        <div className="bg-green-50 rounded-lg p-8 text-center">
          <h3 className="text-xl font-semibold mb-4 text-green-800">Estamos sempre em busca de inspiração</h3>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Não sabemos qual a fórmula, mas procuramos ser criativos, inovadores, éticos, plural, conscientes, ativos,
            apaixonados, respeitando a diversidade e a humanização, lutando por justiça, igualdade e equidade.
          </p>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h4 className="text-lg font-bold text-green-700 mb-2">Quer trabalhar com gente?</h4>
            <p className="text-green-600 font-semibold text-lg">Estamos de braços abertos. SEMPRE.</p>
          </div>
        </div>
      </div>

      {/* Team Members */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <Card key={index} className="overflow-hidden border-green-100 hover:shadow-lg transition-shadow">
            <div className="aspect-square relative">
              <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-1">{member.name}</h3>
              <p className="text-green-600 font-medium mb-1">{member.role}</p>
              <p className="text-sm text-gray-500 mb-4">{member.position}</p>
              <p className="text-gray-600 mb-4">{member.bio}</p>

              <div className="flex space-x-3">
                {member.social.email && (
                  <Link href={`mailto:${member.social.email}`} className="text-gray-500 hover:text-green-600">
                    <Mail className="h-5 w-5" />
                    <span className="sr-only">Email</span>
                  </Link>
                )}
                {member.social.github && (
                  <Link href={member.social.github} className="text-gray-500 hover:text-green-600">
                    <Github className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                  </Link>
                )}
                {member.social.linkedin && (
                  <Link href={member.social.linkedin} className="text-gray-500 hover:text-green-600">
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </Link>
                )}
                {member.social.instagram && (
                  <Link href={member.social.instagram} className="text-gray-500 hover:text-green-600">
                    <Instagram className="h-5 w-5" />
                    <span className="sr-only">Instagram</span>
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
