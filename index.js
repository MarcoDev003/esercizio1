import express from "express";
import fs from "fs";

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.get("/frase", (req, res) => {
  const frasi = fs.readFileSync("./frasi.json");
  const frasiJson = JSON.parse(frasi);
  const randomIndex = Math.floor(Math.random() * frasiJson.frasi.length);
  const frase = frasiJson.frasi[randomIndex];
  return res.json(frase);
});

app.get("/converti", (req, res) => {
  const { k } = req.query;
  const convertire = k * 0.621371;
  return res.json(convertire);
});

app.get("/somma", (req, res) => {
  const { a, b } = req.query;
  const somma = +a + +b;
  console.log(a, b, somma);
  return res.json(somma);
});

app.post("/testo", (req, res) => {
  const { testo } = req.body;
  fs.writeFileSync("./testo.txt", testo);
  return res.json(testo);
});
app.delete("/testo", (req, res) => {
  fs.unlinkSync("./testo.txt");
  return res.json({ message: "File deleted" });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
