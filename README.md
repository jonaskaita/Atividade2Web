## Como executar

### Pré-requisitos

Antes de executar o projeto, é necessário ter instalado:

- Node.js
- npm

### Passo a passo

1. Clone o repositório:

   ```bash
   git clone https://github.com/jonaskaita/Atividade2Web.git
   cd Atividade2Web
   ```

Instale as dependências do projeto:

```bash
   npm install
```

Inicie o servidor:
```bash
   node backend/server.js
```

Abra o navegador e acesse:

```
http://localhost:3000
```

O frontend é servido automaticamente pelo backend, portanto não é necessário iniciar outro servidor.

Observação

O projeto utiliza um banco de dados SQLite em memória (:memory:). Assim, todos os dados são recriados sempre que o servidor é reiniciado.
