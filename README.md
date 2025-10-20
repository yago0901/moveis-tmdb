<h1 align="center">
  🎬 Movies TMDB
</h1>

<p align="center">
  <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen">
  <img alt="React" src="https://img.shields.io/badge/React-18+-61DAFB">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.0+-3178C6">
  <img alt="Vercel" src="https://img.shields.io/badge/deployed_on-Vercel-000000">
</p>

<p align="center">
 <a href="#-sobre-o-projeto">Sobre</a> •
 <a href="#-funcionalidades">Funcionalidades</a> •
 <a href="#-demonstração">Demonstração</a> • 
 <a href="#-como-executar">Como Executar</a> • 
 <a href="#-tecnologias">Tecnologias</a> •
 <a href="#-testes">Testes</a> •
 <a href="#-autor">Autor</a> •
 <a href="#-licença">Licença</a>
</p>

## 🎯 Sobre o Projeto

**Movies TMDB** é uma aplicação React moderna para explorar filmes, criar listas personalizadas de favoritos e descobrir novos conteúdos através da API do The Movie Database (TMDB).

O projeto demonstra habilidades avançadas em desenvolvimento Front-End com React, incluindo gerenciamento de estado global, consumo de APIs, roteamento e testes unitários.

**Live Demo**: [https://moveis-tmdb.vercel.app/](https://moveis-tmdb.vercel.app/)

---

## ✨ Funcionalidades

### 🏠 **Home**

- [x] Grid responsivo com filmes populares
- [x] Paginação com "Carregar Mais"
- [x] Loading states e tratamento de erros
- [x] Favoritar filmes diretamente do card

### 🔍 **Busca**

- [x] Busca global por filmes
- [x] Destaque do termo buscado nos títulos
- [x] Resultados em tempo real
- [x] Paginação de resultados

### ❤️ **Favoritos**

- [x] Lista personalizada de filmes favoritos
- [x] Ordenação por título e nota
- [x] Remoção individual de favoritos
- [x] Estado vazio com call-to-action

### 🎭 **Detalhes do Filme**

- [x] Informações completas do filme
- [x] Gêneros, nota TMDB, data de lançamento
- [x] Sinopse e poster
- [x] Botão de favoritar/remover

### 🛠 **Funcionalidades Técnicas**

- [x] Gerenciamento de estado global com Context API
- [x] Roteamento com React Router
- [x] Design responsivo com Tailwind CSS
- [x] Testes unitários com Vitest e React Testing Library

---

## 🎥 Demonstração

### 📱 Layout Responsivo

Interface adaptável para todos os dispositivos

### 🎨 Experiência do Usuário

- Feedback visual para todas as ações
- Tratamento elegante de erros
- Estados de loading e empty states

---

## 🚀 Como Executar

### Pré-requisitos

- Node.js 16+
- npm ou yarn
- Chave da API TMDB

```bash
# Clone este repositório
git clone https://github.com/seu-usuario/movies-tmdb.git

# Acesse a pasta do projeto
cd movies-tmdb

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env.local

# Adicione sua API key no arquivo .env
VITE_TMDB_API_KEY=sua_chave_aqui
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_IMAGE_BASE_URL=https://image.tmdb.org/t/p

# Execute a aplicação
npm run dev

# Acesse http://localhost:5173

```

### 📦 Scripts Disponíveis

npm run dev # Modo desenvolvimento
npm run build # Build produção  
npm run preview # Preview do build
npm run test # Executar testes
npm run test:ui # Interface visual dos testes

## 🛠 Tecnologias

**Frontend:**

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router

**Estado & Dados:**

- Context API
- TMDB API

**Testes:**

- Vitest
- React Testing Library

**Deploy:**

- Vercel

---

## 🧪 Testes

O projeto inclui testes unitários para garantir qualidade do código:

**Testes Implementados:**

- **MovieCard**: Renderização, estados de favorito, interações
- **Home**: Carregamento, estados de erro, paginação

**Executar Testes:**

```bash
npm run test          # Executar testes
npm run test:ui       # Interface visual
npm run test:watch    # Modo watch
## 👨‍💻 Autor

**Yago Santos Gigeck**

[![LinkedIn](https://img.shields.io/badge/-LinkedIn-blue?style=flat-square&logo=Linkedin&logoColor=white)](https://www.linkedin.com/in/yagogigeck/)
[![GitHub](https://img.shields.io/badge/-GitHub-000?style=flat-square&logo=GitHub&logoColor=white)](https://github.com/yago0901)

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

---

## 🎯 Objetivos Atendidos

**✅ Requisitos Técnicos**
- React 18+ com TypeScript
- React Router para navegação
- Context API para estado global
- Fetch API para requisições HTTP
- Tailwind CSS para estilização
- Testes unitários com Vitest

**✅ Funcionalidades Obrigatórias**
- [x] Home com filmes populares e paginação
- [x] Página de detalhes do filme
- [x] Gerenciamento de favoritos
- [x] Sistema de busca com highlight
- [x] Design responsivo

**✅ Entregáveis**
- [x] Código no GitHub com README
- [x] Variáveis de ambiente configuradas
- [x] Scripts de instalação e execução
- [x] Hospedagem na Vercel

---

<div align="center">
  Desenvolvido com ❤️ por <b>Yago Assina</b>
</div>
```
