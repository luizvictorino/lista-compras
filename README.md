# Lista de Compras

Este repositório contém uma aplicação de lista de compras desenvolvida com React e implantada no Vercel. Este projeto foi criado como parte do curso PWIII.

## Índice

- [Instalação](#instalação)
- [Uso](#uso)
- [Funcionalidades](#funcionalidades)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Contribuindo](#contribuindo)

## Instalação

Para instalar e rodar o projeto localmente, siga os passos abaixo:

1. Clone o repositório:
  ```
  git clone https://github.com/luizvictorino/lista-compras.git
  ```
2. Navegue até o diretório do projeto:
  ```
  cd lista-compras
  ```
3. Instale as dependências:
  ```
  npm install
  ```
4. Inicie o servidor de desenvolvimento:
  ```
  npm start
  ```

# Uso
Após iniciar o servidor, a aplicação estará disponível em http://localhost:3000.

## Funcionalidades
- Adicionar novos itens à lista de compras.
- Editar itens existentes.
- Remover itens da lista.
- Marcar itens como comprados.
- Autenticação via Firebase:
  - Login com Google.
  - Login com email e senha.
  - Registro com email e senha.
  - Redirecionamento automático para a página de lista de produtos - após login bem-sucedido.
- Manipulação de produtos do usuário:
  - Exclusão de produtos do usuário autenticado.

## Estrutura do Projeto

- lista-compras/
  - public/
    - index.html
    - ...
  - src/
    - components/
      - Navbar.js
      - ...
    - pages/
      - Home.js
      - ...
    - App.js
    - firebaseConfig.js
    - index.js
    - ...
  - .gitignore
  - package-lock.json
  - package.json
  - README.md
 

## Descrição dos Principais Arquivos e Pastas

- public/: Contém arquivos estáticos.
- src/: Contém o código-fonte da aplicação.
- components/: Contém os componentes reutilizáveis da aplicação.
- pages/: Contém as páginas da aplicação.
- firebaseConfig.js: Configuração do Firebase.
- App.js: Componente principal da aplicação.
- index.js: Ponto de entrada da aplicação.  

# Contribuindo

1. Fork este repositório.
2. Crie uma nova branch com a sua feature: 
  ```
  git checkout -b my-feature
  ```
3. Commit suas alterações: 
  ```
  git commit -m 'Add some feature'
  ```
4. Push para a branch: git push origin my-feature
5. Abra um Pull Request.  
  
---  
  
Sinta-se à vontade para ajustar conforme necessário. Este README fornece uma visão geral completa do projeto, incluindo instruções de instalação, uso, funcionalidades e como contribuir.