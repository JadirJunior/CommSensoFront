import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export default function OurHistory() {
  const historySteps = [
    {
      id: 1,
      title: "Tudo começou com o 995 Laboratório Vivo (995LL)",
      description:
        "Uma iniciativa familiar e sem fins lucrativos de Araçatuba, que realizou a compostagem de mais de 2 toneladas de resíduos ao longo de 20 meses, através do Método Lages de Compostagem (MLC), também denominado Minicompostagem Ecológica (MCE).",
      year: "2021",
    },
    {
      id: 2,
      title: "O Método Lages de Compostagem (MLC)",
      description:
        "O MLC consiste em depositar o resíduo orgânico em um recipiente, cobri-lo com material orgânico de difícil decomposição, como serragem, folhas secas, gramas cortadas ou galhos triturados e esperar por 30 dias para utilizar o composto em plantas, jardins e hortas (Carvalho, 2020; GÜTTLER et al., 2014).",
      year: "2021",
    },
    {
      id: 3,
      title: "Desenvolvimento da plataforma digital boracompostar.com.br",
      description:
        "A equipe do 995LL percebeu a necessidade de realizar o monitoramento e controle do processo de compostagem, e desenvolveu uma plataforma digital para registro da coleta, distribuição e cálculo da neutralização das emissões de carbono por meio do processo de compostagem, a qual está disponível em boracompostar.com.br.",
      year: "2022",
    },
    {
      id: 4,
      title: "Parceria IFSP-Birigui para sensores",
      description:
        "O 995LL buscou parceria com o IFSP campus Birigui para instalar sensores nos recipientes do processo de compostagem e realizar algumas medições tais como: temperatura, umidade, pH e NPK (nitrogênio, fósforo e potássio).",
      year: "2022",
    },
    {
      id: 5,
      title: "Atividades pedagógicas com sensores",
      description:
        "A partir da iniciativa do 995LL, a professora Helen desenvolveu algumas atividades de ensino envolvendo sensores em suas disciplinas, como forma de contextualizar os conteúdos durante o processo de ensino-aprendizagem.",
      year: "2023",
    },
    {
      id: 6,
      title: "Surgimento do CoMMSenso via Edital 273/2023",
      description:
        "Pensando na possibilidade de educação sustentável voltada para a inserção de iniciativas globais que tragam impactos positivos tanto para a comunidade interna quanto externa do IFSP campus Birigui, como a compostagem de resíduos orgânicos, as iniciativas do 995LL impulsionaram o surgimento desse projeto, que somente foi possível devido ao Edital nº 273/2023 do IFSP.",
      year: "2023",
    },
    {
      id: 7,
      title: "Alinhamento com Science with and For Society (SWAFS)",
      description:
        "Estas iniciativas estão pautadas no Programa de Trabalho da Comissão Europeia para o biênio 2018-2020, formalizando o direcionamento para se fazer Ciência com e para a Sociedade, definido por Science with and For Society (SWAFS).",
      year: "2023",
    },
  ]

  const references = [
    { name: "Biocycle", logo: "/referencias/biocycle-logo.jpg" },
    { name: "SWAFS", logo: "/referencias/swafs-logo.jpg" },
    { name: "Horizon 2020", logo: "/referencias/horizon2020-logo.jpg" },
    { name: "Food Wastage Footprint", logo: "/referencias/food-wastage-logo.jpg" },
    { name: "Aquífero Guarani", logo: "/referencias/aquifero-guarani-logo.jpg" },
    { name: "ODS", logo: "/referencias/ods-logo.jpg" },
  ]

  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <h1 className="text-4xl font-bold text-center mb-6">Nossa História</h1>

      {/* Introdução */}
      <div className="max-w-4xl mx-auto prose prose-lg mb-12">
        <p className="text-lg text-gray-700 leading-relaxed">
          CoMMSenso surgiu a partir do Edital de Ação de Sustentabilidade, nº 273/2023, lançado pelo IFSP. Nós
          submetemos o projeto e fomos contemplados para iniciar a compostagem de resíduos sólidos orgânicos no campus
          Birigui.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          O projeto teve início em agosto de 2023 e vai até maio de 2024.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed font-medium">
          Vamos contar um pouquinho da nossa história:
        </p>
      </div>

              {/* Linha do Tempo */}
      <div className="relative">
                  {/* Linha da Cronologia */}
        <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-green-200"></div>

                  {/* Itens da Cronologia */}
        <div className="space-y-12">
          {historySteps.map((step, index) => (
            <div key={step.id} className="relative">
                              {/* Ponto da Cronologia */}
              <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 -translate-y-4 w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
                {step.id}
              </div>

                              {/* Conteúdo */}
              <div className={`md:w-5/12 ml-10 md:ml-0 ${index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"}`}>
                <Card className="border-green-100">
                  <CardContent className="p-6">
                    <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium mb-3">
                      {step.year}
                    </span>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>

              {/* Declaração de Missão */}
      <section className="mt-20 bg-green-50 rounded-lg p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4 text-green-800">Nossa Missão</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Estamos buscando sensibilizar e educar alunos, servidores e comunidade do entorno do campus para a
            consciência da destinação correta dos resíduos orgânicos, transformando-os em composto que pode ser
            caracterizado como fertilizante orgânico, condicionador de solo e outros produtos de uso agrícola.
          </p>
        </div>
      </section>

              {/* Seção Referências */}
      <section className="mt-20">
        <h2 className="text-2xl font-bold text-center mb-8">Referências e Parcerias</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {references.map((ref, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-4 border rounded-lg hover:shadow-md transition-shadow"
            >
                              <Image src={ref.logo} alt={ref.name} width={120} height={60} className="mb-2" />
              <span className="text-sm font-medium text-gray-700">{ref.name}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
