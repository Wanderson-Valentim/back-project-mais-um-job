# Back do Projeto +1 Job

Este projeto representa a parte de back-end desenvolvida durante o curso de Ciência da Computação na disciplina de Desenvolvimento Web.

## Requisitos do Sistema

Antes de prosseguir, verifique se você possui as seguintes ferramentas instaladas em sua máquina:

1. [Node.js](https://nodejs.org/) (v20.x ou superior)
2. [npm](https://www.npmjs.com/) (v10.x ou superior)
3. MySQL Server (v8.0.x)

## Instalação

### 1. Clonar o Repositório

```bash
git clone https://github.com/Wanderson-Valentim/back-project-mais-um-job.git
cd back-project-mais-um-job
```

### 2. Instalar Dependências

No diretório do projeto, execute:

```bash
npm install
```

## Configuração do Arquivo .env

Antes de iniciar o servidor, é crucial configurar corretamente o arquivo `.env`. Um exemplo de como preencher este arquivo pode ser encontrado em `.env.example`.

Certifique-se de seguir as instruções no arquivo `.env.example` e fornecer os valores corretos para todas as variáveis necessárias, incluindo as configurações do MySQL.

**Atenção: Certifique-se de configurar o arquivo `.env` antes de executar o servidor.**

## Executando as Migrations do Sequelize

Antes de iniciar o servidor, é necessário executar as migrações do Sequelize para configurar o banco de dados. Certifique-se de ter configurado corretamente o arquivo `.env` com os detalhes do banco de dados MySQL.

Para executar as migrações, utilize o seguinte comando:

```bash
npx sequelize-cli db:migrate
```

Isso aplicará todas as migrações pendentes e atualizará o banco de dados de acordo.

## Executando o Servidor

Após configurar o arquivo `.env` e aplicar as migrações do Sequelize, você pode iniciar o servidor Express executando o seguinte comando:

```bash
npm run dev
```

Este comando utiliza o `nodemon` para reiniciar automaticamente o servidor sempre que houver alterações nos arquivos.