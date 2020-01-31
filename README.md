Este projeto foi criado com [Create React App](https://github.com/facebook/create-react-app).

## Como executar o projeto

No diretório do projeto, execute:

### `npm install`

Instala as dependências do projeto<br />

No diretório do projeto, você pode executar:

### `npm start`

Roda o projeto em modo desenvolvimento.<br />
**Nota: Ao executar esse comando o servidor (node) rodará também**<br />
Abra [http://localhost:3000](http://localhost:3000) para ver o projeto no browser.<br />
Abra [http://localhost:3001/api/products](http://localhost:3001/api/products) para ver a api.

A página irá recarregar ao alterar o código.

### `npm test`

Inicia os testes.

### `npm run build`

Builda o projeto para produção dentro da pasta `build`.

O build será minificado.<br />
O projeto estará pronto para ser deployado em produção!

### `npm run prod`

Abra [http://localhost:5000](http://localhost:5000) para ver o projeto no browser (modo produção).<br />

#### Atenção

É necessário adicionar um arquivo `.env` e incluir a linha `REACT_APP_API_URL=http://localhost:3001` para funcionamento correto da aplicação