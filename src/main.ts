import express from "express";
import path from "path";

const app = express();
const port = 3000;

const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../view");

const mensagensRecebidas: Array<{
  nome: string;
  mensagem: string;
  data: string;
}> = [];

app.use(express.static(publicPath));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (request, response) => {
  response.sendFile(path.join(viewsPath, "home.html"));
});

app.get("/sobre", (request, response) => {
  response.sendFile(path.join(viewsPath, "sobre.html"));
});

app.get("/contato", (request, response) => {
  response.sendFile(path.join(viewsPath, "contato.html"));
});

app.post("/contato", (request, response) => {
  const nome = String(request.body.nome || "").trim();
  const mensagem = String(request.body.mensagem || "").trim();

  if (!nome || !mensagem) {
    return response.status(400).send("Preencha o nome e a mensagem.");
  }

  const novaMensagem = {
    nome,
    mensagem,
    data: new Date().toLocaleString("pt-BR"),
  };

  mensagensRecebidas.push(novaMensagem);
  console.log("Mensagem recebida:", novaMensagem);

  response.send(`
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>Mensagem enviada</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <main class="container">
          <section class="card">
            <h1>Mensagem enviada com sucesso</h1>
            <p>Obrigado, ${nome}. Sua mensagem foi recebida.</p>
            <a class="botao-link" href="/">Voltar para o início</a>
            <a class="botao-link secundario-link" href="/contato">Enviar outra mensagem</a>
          </section>
        </main>
      </body>
    </html>
  `);
});

app.get("/mensagens", (request, response) => {
  response.json(mensagensRecebidas);
});

app.use((request, response) => {
  response.status(404).sendFile(path.join(viewsPath, "404.html"));
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
