import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Users,
  Car,
  Lightbulb,
  Apple,
  ShoppingBag,
  Recycle,
  Shirt,
  TreesIcon as Tree,
  PiggyBank,
  ArrowRight,
  Megaphone,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function CriseClimatica() {
  const sustainableActions = [
    {
      id: 1,
      title: "Dissemine Informações",
      description: "Encoraje amigos, familiares e colegas a reduzir a pegada de carbono.",
      icon: <Users className="h-8 w-8 text-green-600" />,
    },
    {
      id: 2,
      title: "Faça Pressão Política",
      description:
        "Converse com políticos, empresas e representação locais a se empenharem na adoção de ações sustentáveis. Você merece ser ouvido. Para termos sucesso no combate à emergência climática TODOS temos que fazer parte da solução.",
      icon: <Megaphone className="h-8 w-8 text-green-600" />,
    },
    {
      id: 3,
      title: "Mude seu Meio de Transporte",
      description:
        "Os meios de transporte contribuem para cerca de 1/4 das emissões globais de gases de efeito estufa. Muitos governos estão tentando implementar políticas públicas para mudar. Mude você também: deixe seu carro em casa, caminhe, pedale, ofereça carona. Não se esqueça que bike, moto ou carro elétrico é uma alternativa.",
      icon: <Car className="h-8 w-8 text-green-600" />,
    },
    {
      id: 4,
      title: "Controle seu Consumo de Energia",
      description:
        "É possível instalar painéis solares? Então aja. Desligue aparelhos e luzes quando não estiver usando. Parece óbvio, mas é preciso ser dito.",
      icon: <Lightbulb className="h-8 w-8 text-green-600" />,
    },
    {
      id: 5,
      title: "Adapte sua Dieta",
      description:
        "Muitas pessoas consomem mais alimentos de origem animal do que é considerado saudável. Cerca de 60% das terras agrícolas do mundo são ocupadas por pasto e gado, o que sem os cuidados necessários é altamente prejudicial ao aquecimento global.",
      icon: <Apple className="h-8 w-8 text-green-600" />,
    },
    {
      id: 6,
      title: "Consuma Produtos Sustentáveis e de Origem Local",
      description:
        "Opte por alimentos locais. Ajude as pequenas empresas e plantações de sua região reduzindo as emissões de combustíveis fósseis geradas durante o transporte e refrigeração dos alimentos. A agricultura sustentável usa menos energia, produz menos emissões e admite uma maior biodiversidade. Ah! Plante suas próprias frutas, vegetais e ervas.",
      icon: <ShoppingBag className="h-8 w-8 text-green-600" />,
    },
    {
      id: 7,
      title: "Não Desperdice Comida",
      description:
        "1/3 de toda a comida produzida no mundo é perdida ou desperdiçada. Aproveite os alimentos que compra, cozinhe o necessário, seja criativo com las sobras.",
      highlight: "Não teve jeito? Sobrou? C o m p o s t e",
      icon: <Recycle className="h-8 w-8 text-green-600" />,
    },
    {
      id: 8,
      title: "Vista-se com Inteligência Climática",
      description:
        "Não compre sem necessidade. Procure marcas sustentáveis e serviços de aluguel em ocasiões especiais. Compre menos roupas e use-as por mais tempo. Recicle. Faça reparos. Doe.",
      icon: <Shirt className="h-8 w-8 text-green-600" />,
    },
    {
      id: 9,
      title: "Plante Árvores, Cuide dos Rios e do Mar",
      description:
        "As árvores contribuem para regular a temperatura e umidade do nosso planeta. Podemos ajudar o meio ambiente colaborando com o plantio de árvores ou financiando iniciativas que fazem o reflorestamento. Vamos num esforço global para conter degradação das terras, do oceano, proteger a biodiversidade e reconstruir os ecossistemas.",
      icon: <Tree className="h-8 w-8 text-green-600" />,
    },
    {
      id: 10,
      title: "Faça Investimentos Favoráveis ao Planeta",
      description:
        "Estimule a mudança direcionando suas economias e investimentos para instituições financeiras que promovam ações sustentáveis.",
      icon: <PiggyBank className="h-8 w-8 text-green-600" />,
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-red-800 to-orange-600 text-white py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">A Realidade que Não Podemos Negar</h1>
            <p className="text-xl md:text-2xl mb-8 leading-relaxed">
              Não dá para negar: eventos climáticos extremos estão cada vez mais frequentes.
            </p>
            <div className="relative w-full max-w-2xl mx-auto aspect-video rounded-lg overflow-hidden shadow-xl mb-8">
              <Image
                src="/Crise.png"
                alt="Crise climática - paisagem devastada pela mudança climática"
                width={800}
                height={400}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Still Time Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-green-600">Mas Ainda Dá Tempo</h2>

            <blockquote className="p-8 border-l-4 border-orange-500 bg-white rounded-lg shadow-lg mb-8">
              <p className="text-lg md:text-xl italic text-gray-700 leading-relaxed mb-6">
                "Nosso frágil planeta está por um fio. Ainda estamos à beira da catástrofe climática. É hora de
                entrarmos em estado de emergência - senão a nossa chance de zerar emissões se tornará, de fato, ZERO".
              </p>
              <footer className="text-right">
                <div className="font-bold text-gray-900 text-lg">António Guterres</div>
                <div className="text-gray-600">Secretário Geral das Nações Unidas</div>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Good News Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              A BOA Notícia é que Há Muitas Coisas que Podemos Fazer
            </h2>
            <p className="text-lg opacity-90">
              Extraído do Programa para o Meio Ambiente da Organização das Nações Unidas (ONU)
            </p>
          </div>
        </div>
      </section>

      {/* 10 Actions Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sustainableActions.map((action) => (
              <Card key={action.id} className="border-green-100 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-green-50 p-3 rounded-full flex-shrink-0">{action.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-3 flex items-center">
                        <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3 flex-shrink-0">
                          {String(action.id).padStart(2, "0")}
                        </span>
                        {action.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-3">{action.description}</p>
                      {action.highlight && (
                        <div className="bg-green-100 border border-green-300 rounded-lg p-3 mt-3">
                          <p className="text-green-800 font-bold text-center">{action.highlight}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CoMMSenso CTA Section */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-4 text-green-800">CoMMSenso</h2>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Conscientização, Mão na Massa e Sensores com a Compostagem de Resíduos Orgânicos
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="bg-green-600 hover:bg-green-700">
                  <Link href="/nossa-historia">
                    Conheça nosso projeto <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                  <Link href="/dados-sensores">
                    Ver dados dos sensores <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
