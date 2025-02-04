const express = require("express");
const os = require("os"); // Para obter o hostname (nome do pod)
const app = express();
const PORT = 3000;

app.get("/", async (req, res) => {
  await new Promise((resolve, reject) =>  setTimeout(resolve, 1500)) //Promise para simular chamada de API externa, banco de dados, etc...
  console.log("promise resolved")
  res.send(`
    <h1>Servidor Node rodando no Kubernetes 🚀</h1>
    <p>Este pod está funcionando corretamente.</p>
    <p><strong>Pod: ${os.hostname()}</strong></p>
  `);
});

app.get("/unstable", (req, res) => {
  if (Math.random() < 0.3) {
    console.log("🔥 Falha simulada! O pod será reiniciado...");
    process.exit(1);
  }
  res.send(`<h1>Estável por enquanto...</h1><p>Pod: ${os.hostname()}</p>`);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
