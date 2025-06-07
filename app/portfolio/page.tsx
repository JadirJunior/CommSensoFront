import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

export default function Portfolio() {
  const identityImages = [
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
  ]

  const spaceImages = [
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
  ]

  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <h1 className="text-4xl font-bold text-center mb-12">Acompanhe nosso crescimento</h1>

      <Tabs defaultValue="identity" className="max-w-5xl mx-auto">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="identity">Como criamos nossa identidade?</TabsTrigger>
          <TabsTrigger value="space">Onde ficará nossa compostagem?</TabsTrigger>
        </TabsList>

        <TabsContent value="identity" className="space-y-6">
          <div className="prose max-w-none mb-8">
            <p>
              Nossa identidade visual foi desenvolvida para refletir os valores do projeto: sustentabilidade, tecnologia
              e educação. Utilizamos tons de verde para representar a natureza e a compostagem, combinados com elementos
              tecnológicos que simbolizam os sensores e a inovação presente no projeto.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {identityImages.map((img, index) => (
              <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
                <Image
                  src={img || "/placeholder.svg"}
                  alt={`Identidade visual ${index + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="space" className="space-y-6">
          <div className="prose max-w-none mb-8">
            <p>
              O espaço físico para nossa compostagem está sendo implementado no campus do IFSP Birigui. Foi projetado
              para ser um ambiente educativo, onde os alunos podem aprender na prática sobre compostagem e monitoramento
              por sensores. O espaço conta com diferentes recipientes de compostagem, todos equipados com sensores para
              coleta de dados em tempo real.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {spaceImages.map((img, index) => (
              <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
                <Image
                  src={img || "/placeholder.svg"}
                  alt={`Espaço de compostagem ${index + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
