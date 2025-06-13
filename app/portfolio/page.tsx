import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

export default function Portfolio() {
  // Imagens para "Como criamos nossa identidade"
  const identityImages = [
    { src: "/logo1.png", alt: "Logo CoMMSenso - Versão 1" },
    { src: "/logo2.png", alt: "Logo CoMMSenso - Versão 2" },
    { src: "/logo4.png", alt: "Logo CoMMSenso - Versão 4" },
    { src: "/CoMMSenso.png", alt: "Logo CoMMSenso - Versão Final" },
  ]

  // Imagens para "Onde ficará nossa compostagem"
  const spaceImages = [
    { src: "/+Compostagem.png", alt: "Processo de Compostagem" },
    { src: "/CaixaComposto.png", alt: "Caixa de Composto" },
    { src: "/EspacoCOmmsenso.png", alt: "Espaço do CoMMSenso" },
    { src: "/pesoComposto.png", alt: "Pesagem do Composto" },
    { src: "/shigueo.png", alt: "Equipe do Projeto" },
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
            <p className="text-lg text-gray-700 leading-relaxed">
              Nossa identidade visual foi desenvolvida para refletir os valores do projeto: sustentabilidade, tecnologia
              e educação. Utilizamos tons de verde para representar a natureza e a compostagem, combinados com elementos
              tecnológicos que simbolizam os sensores e a inovação presente no projeto.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              O processo de criação envolveu várias iterações até chegarmos ao design final que melhor representa
              nossa missão de conscientização, capacitação e monitoramento tecnológico da compostagem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {identityImages.map((img, index) => (
              <div 
                key={index} 
                className="relative bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200 p-4"
              >
                <div className="relative aspect-square w-full">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-contain hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="mt-4 text-center">
                  <h3 className="text-sm font-medium text-gray-700">{img.alt}</h3>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="space" className="space-y-6">
          <div className="prose max-w-none mb-8">
            <p className="text-lg text-gray-700 leading-relaxed">
              O espaço físico para nossa compostagem está sendo implementado no campus do IFSP Birigui. Foi projetado
              para ser um ambiente educativo, onde os alunos podem aprender na prática sobre compostagem e monitoramento
              por sensores. O espaço conta com diferentes recipientes de compostagem, todos equipados com sensores para
              coleta de dados em tempo real.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Acompanhe nossa jornada desde a instalação dos equipamentos até a operação completa do sistema de
              compostagem inteligente, incluindo a participação ativa da comunidade acadêmica.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {spaceImages.map((img, index) => (
              <div 
                key={index} 
                className="relative bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200"
              >
                <div className="relative aspect-video w-full">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-medium text-gray-700 text-center">{img.alt}</h3>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
