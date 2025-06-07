import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"
import Link from "next/link"

export default function Edital() {
  const projects = [
    {
      id: 1,
      name: "Sustentabilidade no Saneamento Rural",
    },
    {
      id: 2,
      name: "Bioconversão de resíduos agroindustriais para o cultivo de cogumelos comestíveis em uma perspectiva de economia circular",
    },
    {
      id: 3,
      name: "Criação de um Jardim Agroecológico e de uma Agrofloresta como espaço e ferramenta para se trabalhar Economia Solidária e Soberania Alimentar",
    },
    {
      id: 4,
      name: "Identificação rápida de focos de incêndios na vegetação reflorestada e na área de cerrado localizadas na parte norte do Câmpus da UFSCar",
    },
    {
      id: 5,
      name: "Agroflorif: sistema agroflorestal no âmbito escolar",
    },
    {
      id: 6,
      name: "CoMMSenso: Conscientização, Mão na Massa e Sensores com a Compostagem de Resíduos Orgânicos",
      highlight: true,
    },
    {
      id: 7,
      name: "Bioprodutos para a agricultura familiar: produção de alimentos saudáveis, preservação dos recursos hídricos e valorização da biodiversidade.",
    },
    {
      id: 8,
      name: "Planejamento e Orçamento de obras de interesse social",
    },
    {
      id: 9,
      name: "Implementação de Sensor Virtual para Economia de Água e Segurança Operacional em Sistemas CLEAN In PLACE",
    },
    {
      id: 10,
      name: "Parque Agroecológico da Boa Vista",
    },
    {
      id: 11,
      name: "Produção de sabão: um destino ambientalmente adequado para óleos",
    },
    {
      id: 12,
      name: "MUVUCA: Criação de coletivo ecológico juvenil na cidade e no campo",
    },
    {
      id: 13,
      name: "Coffee Strategy",
    },
    {
      id: 14,
      name: "Compostagem & Biodigestão: Iniciativas para o tratamento adequado de resíduos para comunidades do IFSP Guarulhos",
    },
    {
      id: 15,
      name: "Canteiro Experimental Escola IFSP- SPO- DCC",
    },
    {
      id: 16,
      name: "Recicla Câmpus: implantação de coleta seletiva voluntária nas dependências do IFSP Jacareí",
    },
    {
      id: 17,
      name: "Irrigação automatizada para produção de banana na agricultura familiar no Vale do Ribeira de São Paulo",
    },
    {
      id: 18,
      name: "Economia solidária e água limpa: fortalecendo a agricultura familiar para alcançar os objetivos de desenvolvimento sustentável",
    },
    {
      id: 19,
      name: 'Articulação da comunidade do bairro do Goianã para Implantação e Gestão da Horta Comunitária "Ribeirão Carambeí"',
    },
    {
      id: 20,
      name: "Matão Sustentável",
    },
    {
      id: 21,
      name: "Sustentabilidade e ESG – Divulgando um Futuro Melhor",
    },
    {
      id: 22,
      name: "Projeto de Terreiro Suspenso para Secagem de Café com Revolvimento Automático de Grãos Alimentado por Energia Solar para Pequenos Produtores",
    },
    {
      id: 23,
      name: "Desenvolvimento de um Sistema de Captação de Água de Chuva para o Reaproveitamento em Sistemas de Válvulas de Descargas de Sanitários com Alto Índice de Utilização e Consumo de Água em Instituições de Ensino",
    },
    {
      id: 24,
      name: "Computador Antigo",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <h1 className="text-4xl font-bold text-center mb-6">Edital 273/2023</h1>

      <div className="max-w-4xl mx-auto prose prose-lg mb-12">
        <p className="text-lg text-gray-700 leading-relaxed">
          Em 09 de maio de 2023, o reitor do IFSP lançou o edital de apoio a projetos de Sustentabilidade e Economia
          Solidária em algum dos eixos: Resíduos; Água; Economia Solidária; Tecnologia Associada a Resíduos, água e
          economia solidária. Devido a esse apoio foi possível a existência do CoMMSenso e, caso queira, você pode ver
          mais detalhes sobre o edital{" "}
          <Link href="#" className="text-green-600 hover:text-green-700 inline-flex items-center gap-1">
            aqui
            <ExternalLink className="h-4 w-4" />
          </Link>
          .
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Projetos Participantes</h2>
        <p className="text-gray-600 mb-6">
          Preparamos uma lista dos projetos que participaram do edital, em ordem de classificação, para você ter uma
          ideia de quantas ações maravilhosas são pensadas nos diversos campus do IFSP.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {projects.map((project) => (
          <Card
            key={project.id}
            className={`border ${project.highlight ? "border-green-500 bg-green-50" : "border-gray-200"}`}
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-full ${project.highlight ? "bg-green-600" : "bg-gray-200"} flex items-center justify-center text-white font-bold`}
                >
                  {project.id <= 18 ? String(project.id).padStart(2, "0") : project.id}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 leading-tight">{project.name}</h3>
                  {project.highlight && <Badge className="mt-2 bg-green-600 hover:bg-green-700">Nosso Projeto</Badge>}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 bg-green-50 rounded-lg p-6 text-center">
        <h3 className="text-xl font-bold text-green-800 mb-2">Impacto Coletivo</h3>
        <p className="text-gray-700">
          Todos esses projetos demonstram o compromisso do IFSP com a sustentabilidade e o desenvolvimento de soluções
          inovadoras para os desafios ambientais e sociais do nosso tempo.
        </p>
      </div>
    </div>
  )
}
