# 🌱 CommSenso - Compostagem com Sensores

## 📋 Sobre o Projeto

O **CommSenso** é uma aplicação web moderna desenvolvida para o IFSP Campus Birigui, focada na **conscientização, capacitação e monitoramento tecnológico da compostagem de resíduos orgânicos**. O projeto combina sustentabilidade, tecnologia e inclusão social para promover práticas ambientalmente responsáveis na comunidade acadêmica e no entorno do campus.

Este é o frontend do projeto CommSenso, uma versão moderna e aprimorada baseada na [versão legada desenvolvida em Wix](https://commsenso.wixsite.com/home).

## 🎯 Objetivos Principais

### 🧠 **Conscientização**
Sensibilização da comunidade de servidores, alunos e moradores do entorno do IFSP campus Birigui para a importância da compostagem e do correto descarte de resíduos orgânicos.

### 🎓 **Capacitação de Pessoas em Situação de Vulnerabilidade**
Treinar e capacitar indivíduos para transformar resíduos orgânicos em composto orgânico, promovendo inclusão social e sustentabilidade.

### 📊 **Monitoramento e Controle Tecnológico**
Integrar tecnologia sustentável através de sensores de compostagem para aprimorar o processo e compartilhar dados úteis com a comunidade.

## 🚀 Tecnologias Utilizadas

### **Frontend Framework**
- **Next.js 15.2.4** - React framework com App Router
- **React 19** - Biblioteca para interfaces de usuário
- **TypeScript 5** - Superset tipado do JavaScript

### **Estilização e UI**
- **Tailwind CSS 3.4.17** - Framework CSS utilitário
- **Shadcn/ui** - Biblioteca de componentes baseada em Radix UI
- **Tailwind Animate** - Animações CSS
- **Lucide React** - Ícones SVG otimizados
- **Next Themes** - Gerenciamento de temas (claro/escuro)

### **Componentes UI (Radix UI)**
- Accordion, Alert Dialog, Avatar, Checkbox
- Dialog, Dropdown Menu, Navigation Menu
- Tabs, Toast, Tooltip, Progress, Slider
- E muitos outros componentes acessíveis

### **Formulários e Validação**
- **React Hook Form 7.54.1** - Gerenciamento de formulários
- **Zod 3.24.1** - Validação de esquemas TypeScript
- **@hookform/resolvers** - Integração entre React Hook Form e Zod

### **Visualização de Dados**
- **Recharts 2.15.0** - Gráficos e visualizações de dados dos sensores
- **Date-fns** - Manipulação de datas
- **React Day Picker** - Seletor de datas

### **Funcionalidades Extras**
- **Embla Carousel** - Carrosséis responsivos
- **Sonner** - Sistema de notificações toast
- **CMDK** - Interface de comando
- **Input OTP** - Campos de entrada para códigos
- **React Resizable Panels** - Painéis redimensionáveis

## 📁 Estrutura do Projeto

```
commsenso-front/
├── app/                          # App Router do Next.js 15
│   ├── page.tsx                  # Página inicial
│   ├── layout.tsx                # Layout principal
│   ├── globals.css               # Estilos globais
│   ├── crise-climatica/          # Página sobre crise climática
│   ├── dados-sensores/           # Dashboard dos sensores de compostagem
│   ├── edital-273-2023/          # Informações sobre o edital
│   ├── nossa-historia/           # História do projeto
│   ├── nosso-time/               # Página da equipe
│   └── portfolio/                # Portfólio de projetos
├── components/                   # Componentes React
│   ├── ui/                       # Componentes UI (Shadcn)
│   ├── header.tsx                # Cabeçalho da aplicação
│   ├── footer.tsx                # Rodapé
│   └── theme-provider.tsx        # Provedor de temas
├── lib/                          # Utilitários e configurações
├── public/                       # Assets estáticos
├── styles/                       # Arquivos de estilo
└── ...                          # Arquivos de configuração
```

## 🌟 Funcionalidades Principais

### 🏠 **Página Inicial**
- Apresentação do projeto e seus objetivos
- 10 ações sustentáveis para redução da pegada de carbono
- Guia passo-a-passo para participação na compostagem
- Seção sobre causas climáticas e impactos ambientais

### 📈 **Dashboard de Sensores**
- Monitoramento em tempo real dos dados de compostagem
- Visualizações gráficas com Recharts
- Análise de temperatura, umidade e outros parâmetros

### 📖 **Seções Informativas**
- **Nossa História**: Origem e evolução do projeto
- **Nosso Time**: Apresentação da equipe
- **Crise Climática**: Conscientização sobre mudanças climáticas
- **Edital 273/2023**: Detalhes do financiamento do projeto

### 🎨 **Interface Moderna**
- Design responsivo e acessível
- Modo claro/escuro
- Componentes interativos e animados
- Experiência de usuário otimizada

## 🛠️ Instalação e Execução

### **Pré-requisitos**
- Node.js 18+ 
- PNPM (recomendado) ou NPM

### **Passos para Instalação**

1. **Clone o repositório**
```bash
git clone [URL_DO_REPOSITORIO]
cd commsenso_front
```

2. **Instale as dependências**
```bash
pnpm install
# ou
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env.local
# Edite o arquivo .env.local com suas configurações
```

4. **Execute o projeto em desenvolvimento**
```bash
pnpm dev
# ou
npm run dev
```

5. **Acesse a aplicação**
Abra [http://localhost:3000](http://localhost:3000) no seu navegador

## 📦 Scripts Disponíveis

```bash
# Desenvolvimento
pnpm dev

# Build para produção
pnpm build

# Executar versão de produção
pnpm start

# Linting
pnpm lint
```

## 🤝 Contribuindo

Este projeto faz parte de uma iniciativa de sustentabilidade do IFSP Campus Birigui. Para contribuições:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 🌍 Impacto Social e Ambiental

O CommSenso não é apenas um projeto tecnológico, mas uma iniciativa que visa:

- ♻️ **Reduzir o desperdício de resíduos orgânicos**
- 🌱 **Promover a compostagem sustentável**
- 👥 **Incluir socialmente pessoas em situação de vulnerabilidade**
- 📊 **Usar tecnologia para otimizar processos ambientais**
- 🎓 **Educar a comunidade sobre sustentabilidade**

## 📞 Contato

**IFSP Campus Birigui**  
Projeto CommSenso - Compostagem com Sensores

---

## 🔄 Status do Projeto

**Em desenvolvimento ativo** - Integrando com a API backend para funcionalidades completas de monitoramento de sensores e gerenciamento de dados.

---

*Feito com 💚 para um mundo mais sustentável*