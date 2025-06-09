import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  ArrowRight,
  Users,
  Car,
  Lightbulb,
  Apple,
  ShoppingBag,
  Recycle,
  Shirt,
  TreesIcon as Tree,
  PiggyBank,
  Heart,
  Target,
  BarChart3,
  Leaf,
  HelpCircle,
  PartyPopper,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Home() {
  const sustainableActions = [
    {
      id: 1,
      title: "Dissemine informações",
      description: "Encoraje amigos, familiares e colegas a reduzir a pegada de carbono",
      icon: <Users className="h-8 w-8 text-green-600" />,
    },
    {
      id: 2,
      title: "Faça pressão política",
      description: "Converse com políticos e empresas locais sobre ações sustentáveis",
      icon: <Users className="h-8 w-8 text-green-600" />,
    },
    {
      id: 3,
      title: "Mude seu meio de transporte",
      description: "Transporte contribui para 1/4 das emissões globais",
      icon: <Car className="h-8 w-8 text-green-600" />,
    },
    {
      id: 4,
      title: "Controle seu consumo de energia",
      description: "Instale painéis solares, desligue aparelhos",
      icon: <Lightbulb className="h-8 w-8 text-green-600" />,
    },
    {
      id: 5,
      title: "Adapte sua dieta",
      description: "60% das terras agrícolas são ocupadas por pasto e gado",
      icon: <Apple className="h-8 w-8 text-green-600" />,
    },
    {
      id: 6,
      title: "Consuma produtos sustentáveis e locais",
      description: "Reduza emissões de transporte",
      icon: <ShoppingBag className="h-8 w-8 text-green-600" />,
    },
    {
      id: 7,
      title: "Não desperdice comida",
      description: '1/3 da comida mundial é desperdiçada. "Sobrou? COMPOSTE"',
      icon: <Recycle className="h-8 w-8 text-green-600" />,
    },
    {
      id: 8,
      title: "Vista-se com inteligência climática",
      description: "Compre menos, use mais tempo, recicle",
      icon: <Shirt className="h-8 w-8 text-green-600" />,
    },
    {
      id: 9,
      title: "Plante árvores, cuide dos rios e do mar",
      description: "Proteja a biodiversidade",
      icon: <Tree className="h-8 w-8 text-green-600" />,
    },
    {
      id: 10,
      title: "Faça investimentos favoráveis ao planeta",
      description: "Invista em empresas e projetos sustentáveis",
      icon: <PiggyBank className="h-8 w-8 text-green-600" />,
    },
  ]

  const causes = [
    {
      title: "Conscientização",
      description:
        "Sensibilização da comunidade de servidores, alunos e moradores do entorno do IFSP campus Birigui para a importância da compostagem e do correto descarte de resíduos orgânicos.",
      icon: <Heart className="h-12 w-12 text-green-600" />,
    },
    {
      title: "Capacitação de pessoas em situação de vulnerabilidade",
      description:
        "Treinar e capacitar indivíduos para transformar resíduos orgânicos em composto orgânico, promovendo inclusão e sustentabilidade.",
      icon: <Target className="h-12 w-12 text-green-600" />,
    },
    {
      title: "Monitoramento e Controle",
      description:
        "Integrar tecnologia sustentável, como sensores de compostagem, para aprimorar o processo e compartilhar dados úteis com a comunidade.",
      icon: <BarChart3 className="h-12 w-12 text-green-600" />,
    },
  ]

  const actionSteps = [
    {
      number: 1,
      title: "Separe seu Resíduo Orgânico",
      subtitle: "O que você faz com:",
      items: ["Sobras de legumes, frutas e verduras?", "Cascas de ovos?", "Pó de café?"],
      highlight: "NÃO JOGUE NO LIXO",
      action: "Traga para nossa Compostagem",
      icon: <Leaf className="h-16 w-16 text-green-600" />,
    },
    {
      number: 2,
      title: "Tá com Dúvida?",
      subtitle: "Não hesite",
      description: "Pode nos procurar. Se for preciso conversaremos e explicaremos para todos.",
      highlight: "PRECISAMOS DE VOCÊS NESSA!",
      icon: <HelpCircle className="h-16 w-16 text-green-600" />,
    },
    {
      number: 3,
      title: "Pode Comemorar: Você está dentro",
      subtitle: "Estamos muito felizes",
      description:
        "Tenha certeza de que estamos trabalhando com muita vontade para colocar essa iniciativa em prática e muito felizes por ter você.",
      highlight: "QUEREMOS MUDAR O ENTORNO DO NOSSO CAMPUS",
      icon: <PartyPopper className="h-16 w-16 text-green-600" />,
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Seção Principal */}
      <section className="relative bg-gradient-to-r from-green-800 to-green-600 text-white py-20">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Conscientização, Mão na Massa e Sensores com a compostagem de resíduos orgânicos
            </h1>
            <p className="text-lg mb-8">Um projeto de sustentabilidade do IFSP Campus Birigui</p>
            <div className="flex flex-wrap gap-4">
              <Button asChild className="bg-white text-green-700 hover:bg-gray-100">
                <Link href="/nossa-historia">
                  Conheça nossa história <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild className="bg-white text-green-700 hover:bg-gray-100">
                <Link href="/dados-sensores">
                  Ver dados dos sensores <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md aspect-square rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/CoMMSenso.png"
                alt="Logo CoMMSenso - Consumo e Produção Sustentável"
                width={500}
                height={500}
                className="object-contain bg-white p-4"
              />
            </div>
          </div>
        </div>
      </section>

              {/* Seção Nossas Causas */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-4">Nossas Causas</h2>
          <h3 className="text-xl text-center text-gray-600 mb-12">O que fazemos</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {causes.map((cause, index) => (
              <Card key={index} className="border-green-100 hover:shadow-lg transition-shadow">
                <CardContent className="p-8 text-center">
                  <div className="flex justify-center mb-6">{cause.icon}</div>
                  <h4 className="text-xl font-bold mb-4">{cause.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{cause.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

              {/* Seção Crise Climática */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              Não dá pra negar: eventos climáticos extremos estão cada vez mais frequentes
            </h2>
            <p className="text-xl font-semibold text-green-600 mb-8">Mas Ainda dá Tempo</p>
            <blockquote className="p-6 border-l-4 border-green-600 bg-white rounded-lg shadow-md italic text-gray-700">
              <p className="mb-4">
                "Nosso frágil planeta está por um fio. Ainda estamos à beira da catástrofe climática. É hora de
                entrarmos em estado de emergência - senão a nossa chance de zerar emissões se tornará, de fato, ZERO"
              </p>
              <footer className="font-medium text-gray-900">
                — António Guterres, Secretário Geral das Nações Unidas
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

              {/* 10 Ações Sustentáveis */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">10 Ações Sustentáveis</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sustainableActions.map((action) => (
              <Card key={action.id} className="border-green-100 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-green-50 p-3 rounded-full">{action.icon}</div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 flex items-center">
                        <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">
                          {action.id}
                        </span>
                        {action.title}
                      </h3>
                      <p className="text-gray-600">{action.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

              {/* Seção Faça sua Parte */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Faça sua Parte</h2>
            <h3 className="text-xl text-green-600 font-semibold">Comece a agir</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {actionSteps.map((step) => (
              <Card key={step.number} className="border-green-200 bg-white hover:shadow-lg transition-shadow">
                <CardContent className="p-8 text-center">
                  <div className="flex justify-center mb-6">{step.icon}</div>

                  <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {step.number}
                  </div>

                  <h4 className="text-xl font-bold mb-2">{step.title}</h4>
                  <p className="text-gray-600 font-medium mb-4">{step.subtitle}</p>

                  {step.items && (
                    <ul className="text-gray-600 mb-4 space-y-1">
                      {step.items.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  )}

                  {step.description && <p className="text-gray-600 mb-4">{step.description}</p>}

                  <div className="bg-red-100 border border-red-300 rounded-lg p-3 mb-3">
                    <p className="text-red-700 font-bold">{step.highlight}</p>
                  </div>

                  {step.action && <p className="text-green-600 font-semibold">{step.action}</p>}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
