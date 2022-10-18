require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Conexión al servidor en el port ${port}`);
});

const channels = require("./channel.json");
console.log(channels);
console.log(channels.data.multicast);

app.get("/", (req, res) => {
  res.send("Node JS api");
});

app.get("/api/channels", (req, res) => {
  res.send(channels.data);
});

app.get("/api/channel/:id", (req, res) => {
  const channel = channels.data.find((c) => c.id === parseInt(req.params.id));

  if (!channel) return res.status(400).send("Canal no encontrado");
  else res.send(channel);
});
app.get("/api/numero/:numero", (req, res) => {
  const number = channels.data.find((c) => c.numero === req.params.numero);

  if (!number) return res.status(400).send("Canal no encontrado");
  else res.send(number);
});

app.get("/api/proveedor/:proveedor", (req, res) => {
  const proveedor = channels.data.filter(
    (c) => c.proveedor === req.params.proveedor
  );

  if (!proveedor) return res.status(400).send("Canal no encontrado");
  else res.send(proveedor);
});
app.get("/api/categoria/:tipo", (req, res) => {
  const tipo = channels.data.filter((c) => c.tipo === req.params.tipo);

  if (!tipo) return res.status(400).send("Categoria no encontrada");
  else res.send(tipo);
});
app.get("/api/name/:nombre", (req, res) => {
  const nombre = channels.data.filter((c) => c.nombre === req.params.nombre);

  if (!nombre) return res.status(400).send("Canal no encontrado");
  else res.send(nombre);
});

app.post("/api/agregar", (req, res) => {
  const channel = {
    id: channels.length + 1,
    tipo: req.body.tipo,
    nombre: req.body.nombre,
    numero: req.body.numero,
    multicast: [
      {
        adsl: req.body.adsl
      },
      {
          fca: req.body.fca
      },
      {
          mpeg4: req.body.mpeg4
      },
      
    ],
    criticidad: req.body.criticidad,
    bw: req.body.bw,
    imagen: req.body.imagen,
    proveedor: req.body.proveedor,
    contacto: [
      {
        tecnico: req.body.tecnico,
        telefono: req.body.telefono
      }
    ]
  };

  channels.push(channel);
  res.send(channel);
});

/* app.post('/api/channels/:id', (req, res)=>{
    const channel = channels.find(e => e.id === parseInt(req.params.id));
    if(!channel) return res.status(404).send('Canal no encontrado')

    const index = channels.indexOf(channel)
    channels.splice(index, 1);

    channels.push(channel);
    res.send(channel);
}) */
